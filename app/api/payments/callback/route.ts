import { NextRequest, NextResponse } from "next/server"
import { getDb } from "@/lib/mongodb"
import { ObjectId } from "mongodb"
import type { PaymentDoc, CategoryAccessDoc } from "@/lib/models"
import crypto from "crypto"

const PHONEPE_SALT_KEY = process.env.PHONEPE_SALT_KEY || ""
const PHONEPE_SALT_INDEX = process.env.PHONEPE_SALT_INDEX || "1"

// Verify PhonePe callback
function verifyXVerify(xVerify: string, payload: string, endpoint: string): boolean {
  const [hash, saltIndex] = xVerify.split("###")
  if (saltIndex !== PHONEPE_SALT_INDEX) return false

  const stringToHash = payload + endpoint + PHONEPE_SALT_KEY
  const computedHash = crypto.createHash("sha256").update(stringToHash).digest("hex")
  return computedHash === hash
}

export async function POST(req: NextRequest) {
  try {
    const xVerify = req.headers.get("x-verify")
    if (!xVerify) {
      return NextResponse.json({ ok: false, message: "Missing X-VERIFY header" }, { status: 400 })
    }

    const body = await req.json()
    const base64Response = body.response || body

    // Decode the response
    const decodedResponse = Buffer.from(base64Response, "base64").toString("utf-8")
    const responseData = JSON.parse(decodedResponse)

    // Note: PhonePe callback verification - adjust endpoint based on your PhonePe setup
    // For webhook callbacks, verification may differ
    const endpoint = "/pg/v1/status/"
    // In production, verify the callback properly based on PhonePe documentation
    // For now, we'll verify the signature
    const isVerified = verifyXVerify(xVerify, base64Response, endpoint)

    if (!isVerified) {
      console.error("[Launchpad] Payment callback verification failed")
      return NextResponse.json({ ok: false, message: "Verification failed" }, { status: 400 })
    }

    const db = await getDb()
    const paymentsCollection = db.collection<PaymentDoc>("payments")
    const categoryAccessCollection = db.collection<CategoryAccessDoc>("categoryAccess")

    const transactionId = responseData.data?.merchantTransactionId
    const phonepeTransactionId = responseData.data?.transactionId
    const code = responseData.code
    const state = responseData.data?.state

    // Find payment record
    const payment = await paymentsCollection.findOne({ transactionId })
    if (!payment) {
      return NextResponse.json({ ok: false, message: "Payment record not found" }, { status: 404 })
    }

    // Check payment status
    const isSuccess = code === "PAYMENT_SUCCESS" || code === "PAYMENT_PENDING" || state === "COMPLETED"

    if (isSuccess) {
      // Update payment status
      await paymentsCollection.updateOne(
        { _id: payment._id },
        {
          $set: {
            status: "success",
            phonepeTransactionId,
            updatedAt: new Date(),
          },
        }
      )

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
    } else {
      // Update payment status to failed
      await paymentsCollection.updateOne(
        { _id: payment._id },
        {
          $set: {
            status: "failed",
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
  const transactionId = searchParams.get("transactionId")

  if (!transactionId) {
    return NextResponse.redirect(new URL("/tasks?payment=failed", req.url))
  }

  // Verify payment status
  try {
    const db = await getDb()
    const paymentsCollection = db.collection<PaymentDoc>("payments")
    const payment = await paymentsCollection.findOne({ transactionId })

    if (payment && payment.status === "success") {
      return NextResponse.redirect(new URL("/tasks?payment=success", req.url))
    } else {
      return NextResponse.redirect(new URL("/tasks?payment=failed", req.url))
    }
  } catch (error) {
    console.error("[Launchpad] Payment redirect error:", error)
    return NextResponse.redirect(new URL("/tasks?payment=failed", req.url))
  }
}

