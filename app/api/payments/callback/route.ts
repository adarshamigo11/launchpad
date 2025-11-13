import { NextRequest, NextResponse } from "next/server"
import { getDb } from "@/lib/mongodb"
import { ObjectId } from "mongodb"
import type { PaymentDoc, CategoryAccessDoc, PhonePeMetaInfo } from "@/lib/models"
import { getStandardCheckoutOrderStatus } from "@/lib/phonepe"

function normalizeMetaInfo(meta: unknown): PhonePeMetaInfo | undefined {
  if (!meta || typeof meta !== "object") return undefined
  const record = meta as Record<string, unknown>

  const normalized: PhonePeMetaInfo = {}
  if (typeof record.udf1 === "string") normalized.udf1 = record.udf1
  if (typeof record.udf2 === "string") normalized.udf2 = record.udf2
  if (typeof record.udf3 === "string") normalized.udf3 = record.udf3
  if (typeof record.udf4 === "string") normalized.udf4 = record.udf4
  if (typeof record.udf5 === "string") normalized.udf5 = record.udf5

  return Object.values(normalized).some(Boolean) ? normalized : undefined
}

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text()

    if (!rawBody) {
      return NextResponse.json({ ok: false, message: "Empty callback body" }, { status: 400 })
    }

    let callbackPayload: Record<string, unknown> = {}
    try {
      callbackPayload = JSON.parse(rawBody) as Record<string, unknown>
    } catch (error) {
      console.error("[Launchpad] Failed to parse PhonePe callback body:", error, rawBody)
      return NextResponse.json({ ok: false, message: "Invalid callback payload" }, { status: 400 })
    }

    const db = await getDb()
    const paymentsCollection = db.collection<PaymentDoc>("payments")
    const categoryAccessCollection = db.collection<CategoryAccessDoc>("categoryAccess")

    const metaInfo = normalizeMetaInfo(callbackPayload.metaInfo)
    const callbackMerchantOrderId =
      (typeof callbackPayload.merchantOrderId === "string" ? callbackPayload.merchantOrderId : undefined) ||
      (typeof callbackPayload.originalMerchantOrderId === "string" ? callbackPayload.originalMerchantOrderId : undefined) ||
      (typeof callbackPayload.merchantTransactionId === "string" ? callbackPayload.merchantTransactionId : undefined)

    let payment: PaymentDoc | null = null

    if (metaInfo?.udf3) {
      try {
        payment = await paymentsCollection.findOne({
          _id: new ObjectId(metaInfo.udf3),
        })
      } catch (error) {
        console.warn("[Launchpad] Invalid paymentId in PhonePe meta info:", metaInfo.udf3, error)
      }
    }

    if (!payment && callbackMerchantOrderId) {
      payment = await paymentsCollection.findOne({ transactionId: callbackMerchantOrderId })
    }

    if (!payment) {
      return NextResponse.json({ ok: false, message: "Payment record not found" }, { status: 404 })
    }

    const merchantOrderId = payment.transactionId

    let orderStatus
    try {
      orderStatus = await getStandardCheckoutOrderStatus(merchantOrderId, true)
    } catch (error) {
      console.error("[Launchpad] Failed to fetch PhonePe order status:", {
        merchantOrderId,
        error,
      })
      return NextResponse.json({ ok: false, message: "Failed to verify payment status" }, { status: 502 })
    }

    const orderState =
      typeof orderStatus?.state === "string" ? (orderStatus.state as string) : undefined
    const orderId =
      typeof orderStatus?.orderId === "string" ? (orderStatus.orderId as string) : undefined

    const orderPaymentDetails = Array.isArray(orderStatus?.paymentDetails)
      ? (orderStatus.paymentDetails as Array<Record<string, unknown>>)
      : []

    const latestOrderDetail =
      orderPaymentDetails.length > 0
        ? orderPaymentDetails[orderPaymentDetails.length - 1]
        : undefined

    const completedOrderDetail =
      orderPaymentDetails.find(
        (detail) => typeof detail?.state === "string" && detail.state === "COMPLETED"
      ) || latestOrderDetail

    const phonepeTransactionId =
      (typeof completedOrderDetail?.transactionId === "string"
        ? (completedOrderDetail.transactionId as string)
        : undefined) ||
      (typeof latestOrderDetail?.transactionId === "string"
        ? (latestOrderDetail.transactionId as string)
        : undefined)

    const paymentStateFromDetails =
      (typeof completedOrderDetail?.state === "string"
        ? (completedOrderDetail.state as string)
        : undefined) ||
      (typeof latestOrderDetail?.state === "string"
        ? (latestOrderDetail.state as string)
        : undefined)

    const currentState = paymentStateFromDetails || orderState

    const isSuccess =
      currentState === "COMPLETED" || currentState === "SUCCESS" || orderState === "COMPLETED"

    const isPending =
      currentState === "PENDING" ||
      currentState === "PENDING_VBV" ||
      currentState === "PENDING_INPUT" ||
      orderState === "PENDING"

    if (isSuccess) {
      // Update payment status
      const payloadBase = {
        callback: callbackPayload,
        orderStatus,
      }
      const existingPayload =
        payment.phonepePayload && typeof payment.phonepePayload === "object"
          ? (payment.phonepePayload as Record<string, unknown>)
          : { initiate: payment.phonepePayload }

      const payloadUpdate: Record<string, unknown> = {
        ...existingPayload,
        callback: {
          state: currentState,
          rawBody,
          paymentDetails: orderPaymentDetails,
          payload: payloadBase,
        },
      }

      const paymentUpdate: Partial<PaymentDoc> = {
        status: "success",
        phonepeTransactionId,
        phonepeState: currentState || payment.phonepeState,
        phonepePayload: payloadUpdate,
        updatedAt: new Date(),
      }

      if (orderId) {
        paymentUpdate.phonepeOrderId = orderId
      } else if (typeof callbackPayload.orderId === "string") {
        paymentUpdate.phonepeOrderId = callbackPayload.orderId as string
      }

      if (metaInfo) {
        paymentUpdate.phonepeMetaInfo = metaInfo
      }

      await paymentsCollection.updateOne({ _id: payment._id }, { $set: paymentUpdate })

      // Check if access already exists
      const existingAccess = await categoryAccessCollection.findOne({
        userId: payment.userId,
        categoryId: payment.categoryId,
        accessGranted: true,
      })

      if (!existingAccess) {
        // Grant access to category
        const accessDoc: CategoryAccessDoc = {
          userId: payment.userId,
          userEmail: payment.userEmail,
          categoryId: payment.categoryId,
          paymentId: payment._id?.toString() || "",
          accessGranted: true,
          accessGrantedAt: new Date(),
          createdAt: new Date(),
        }
        await categoryAccessCollection.insertOne(accessDoc)
      }
    } else if (isPending) {
      const payloadBase = {
        callback: callbackPayload,
        orderStatus,
      }
      const existingPayload =
        payment.phonepePayload && typeof payment.phonepePayload === "object"
          ? (payment.phonepePayload as Record<string, unknown>)
          : { initiate: payment.phonepePayload }

      const payloadUpdate: Record<string, unknown> = {
        ...existingPayload,
        pending: {
          state: currentState,
          rawBody,
          paymentDetails: orderPaymentDetails,
          payload: payloadBase,
        },
      }

      await paymentsCollection.updateOne(
        { _id: payment._id },
        {
          $set: {
            status: "pending",
            phonepeTransactionId,
            phonepeState: currentState || "PENDING",
            phonepePayload: payloadUpdate,
            updatedAt: new Date(),
          },
        }
      )
    } else {
      // Update payment status to failed
      const payloadBase = {
        callback: callbackPayload,
        orderStatus,
      }
      const existingPayload =
        payment.phonepePayload && typeof payment.phonepePayload === "object"
          ? (payment.phonepePayload as Record<string, unknown>)
          : { initiate: payment.phonepePayload }

      const payloadUpdate: Record<string, unknown> = {
        ...existingPayload,
        error: {
          state: currentState,
          rawBody,
          paymentDetails: orderPaymentDetails,
          payload: payloadBase,
        },
      }

      await paymentsCollection.updateOne(
        { _id: payment._id },
        {
          $set: {
            status: "failed",
            phonepeTransactionId,
            phonepeState: currentState || "FAILED",
            phonepePayload: payloadUpdate,
            updatedAt: new Date(),
          },
        }
      )
    }

    return NextResponse.json({ ok: true, message: "Callback processed" })
  } catch (error) {
    console.error("[Launchpad] Payment callback error:", error)
    return NextResponse.json({ ok: false, message: "Internal server error" }, { status: 500 })
  }
}

// Handle GET requests (redirect from PhonePe)
export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const transactionId = searchParams.get("transactionId") || searchParams.get("merchantOrderId")

  if (!transactionId) {
    return NextResponse.redirect(new URL("/tasks?payment=failed", req.url))
  }

  // Verify payment status by checking with PhonePe
  try {
    const db = await getDb()
    const paymentsCollection = db.collection<PaymentDoc>("payments")
    const categoryAccessCollection = db.collection<CategoryAccessDoc>("categoryAccess")
    const payment = await paymentsCollection.findOne({ transactionId })

    if (!payment) {
      console.error("[Launchpad] Payment not found for transactionId:", transactionId)
      return NextResponse.redirect(new URL("/tasks?payment=failed", req.url))
    }

    // Fetch latest status from PhonePe
    try {
      const orderStatus = await getStandardCheckoutOrderStatus(transactionId, true)
      const orderState = typeof orderStatus?.state === "string" ? orderStatus.state : undefined
      const orderId = typeof orderStatus?.orderId === "string" ? orderStatus.orderId : undefined
      
      const orderPaymentDetails = Array.isArray(orderStatus?.paymentDetails)
        ? (orderStatus.paymentDetails as Array<Record<string, unknown>>)
        : []

      const latestOrderDetail = orderPaymentDetails.length > 0
        ? orderPaymentDetails[orderPaymentDetails.length - 1]
        : undefined

      const completedOrderDetail = orderPaymentDetails.find(
        (detail) => typeof detail?.state === "string" && detail.state === "COMPLETED"
      ) || latestOrderDetail

      const phonepeTransactionId = typeof completedOrderDetail?.transactionId === "string"
        ? completedOrderDetail.transactionId
        : typeof latestOrderDetail?.transactionId === "string"
        ? latestOrderDetail.transactionId
        : undefined

      const paymentStateFromDetails = typeof completedOrderDetail?.state === "string"
        ? completedOrderDetail.state
        : typeof latestOrderDetail?.state === "string"
        ? latestOrderDetail.state
        : undefined

      const currentState = paymentStateFromDetails || orderState
      const isSuccess = currentState === "COMPLETED" || currentState === "SUCCESS" || orderState === "COMPLETED"

      if (isSuccess) {
        // Update payment status to success
        const paymentUpdate: Partial<PaymentDoc> = {
          status: "success",
          phonepeTransactionId,
          phonepeState: currentState || payment.phonepeState,
          phonepePayload: {
            ...(typeof payment.phonepePayload === "object" ? payment.phonepePayload : {}),
            orderStatus,
          },
          updatedAt: new Date(),
        }

        if (orderId) {
          paymentUpdate.phonepeOrderId = orderId
        }

        await paymentsCollection.updateOne(
          { _id: payment._id },
          { $set: paymentUpdate }
        )

        // Grant access if not already granted
        const existingAccess = await categoryAccessCollection.findOne({
          userId: payment.userId,
          categoryId: payment.categoryId,
          accessGranted: true,
        })

        if (!existingAccess) {
          const accessDoc: CategoryAccessDoc = {
            userId: payment.userId,
            userEmail: payment.userEmail,
            categoryId: payment.categoryId,
            paymentId: payment._id?.toString() || "",
            accessGranted: true,
            accessGrantedAt: new Date(),
            createdAt: new Date(),
          }
          await categoryAccessCollection.insertOne(accessDoc)
        }

        console.log("[Launchpad] Payment verified as successful:", transactionId)
        return NextResponse.redirect(new URL("/tasks?payment=success", req.url))
      } else {
        console.log("[Launchpad] Payment not completed. State:", currentState)
        return NextResponse.redirect(new URL("/tasks?payment=pending", req.url))
      }
    } catch (statusError) {
      console.error("[Launchpad] Error checking PhonePe status:", statusError)
      // Fallback to database status
      if (payment.status === "success") {
        return NextResponse.redirect(new URL("/tasks?payment=success", req.url))
      } else {
        return NextResponse.redirect(new URL("/tasks?payment=failed", req.url))
      }
    }
  } catch (error) {
    console.error("[Launchpad] Payment redirect error:", error)
    return NextResponse.redirect(new URL("/tasks?payment=failed", req.url))
  }
}

