import { NextRequest, NextResponse } from "next/server"
import { getDb } from "@/lib/mongodb"
import { ObjectId } from "mongodb"
import type { CategoryDoc, PaymentDoc, PhonePeMetaInfo } from "@/lib/models"
import { randomUUID } from "crypto"
import {
  buildPhonePeMetaInfo,
  initiateStandardCheckoutPayment,
  PHONEPE_ENV,
} from "@/lib/phonepe"

const PHONEPE_CLIENT_ID = process.env.PHONEPE_CLIENT_ID || ""
const PHONEPE_CLIENT_SECRET = process.env.PHONEPE_CLIENT_SECRET || ""

export async function POST(req: NextRequest) {
  try {
    // Validate PhonePe configuration
    if (!PHONEPE_CLIENT_ID || !PHONEPE_CLIENT_SECRET) {
      console.error("[Launchpad] PhonePe configuration missing:", {
        hasClientId: !!PHONEPE_CLIENT_ID,
        hasClientSecret: !!PHONEPE_CLIENT_SECRET,
      })
      return NextResponse.json(
        { 
          ok: false, 
          message: "Payment gateway not configured. Please contact support." 
        }, 
        { status: 500 }
      )
    }

    const { userId, userEmail, categoryId, promoCode } = await req.json()

    if (!userId || !userEmail || !categoryId) {
      return NextResponse.json({ ok: false, message: "Missing required fields" }, { status: 400 })
    }

    const db = await getDb()
    const categoriesCollection = db.collection<CategoryDoc>("categories")
    const categoryAccessCollection = db.collection("categoryAccess")
    const paymentsCollection = db.collection<PaymentDoc>("payments")
    const promoCodesCollection = db.collection("promoCodes")

    // Check if category exists and get price
    const category = await categoriesCollection.findOne({ _id: new ObjectId(categoryId) })
    if (!category) {
      return NextResponse.json({ ok: false, message: "Category not found" }, { status: 404 })
    }

    // Check if user already has access
    const existingAccess = await categoryAccessCollection.findOne({
      userId,
      categoryId,
      accessGranted: true,
    })

    if (existingAccess) {
      return NextResponse.json({ ok: false, message: "You already have access to this category" }, { status: 400 })
    }

    // If category is free, grant access immediately
    if (category.price === 0 || !category.price) {
      const accessDoc = {
        userId,
        userEmail,
        categoryId,
        paymentId: "",
        accessGranted: true,
        accessGrantedAt: new Date(),
        createdAt: new Date(),
      }
      await categoryAccessCollection.insertOne(accessDoc)
      return NextResponse.json({ ok: true, message: "Access granted (free category)", hasAccess: true })
    }

    // Calculate final amount with promo code
    let finalAmount = category.price
    let discount = 0
    let appliedPromoCode = null

    if (promoCode) {
      // Validate and apply promo code
      const promo = await promoCodesCollection.findOne({
        code: { $regex: new RegExp(`^${promoCode}$`, "i") },
        isActive: true,
      })

      if (promo) {
        const now = new Date()
        if (now >= promo.validFrom && now <= promo.validUntil) {
          if (!promo.minAmount || category.price >= promo.minAmount) {
            if (!promo.usageLimit || promo.usedCount < promo.usageLimit) {
              // Calculate discount
              if (promo.discountType === "percentage") {
                discount = (category.price * promo.discountValue) / 100
                if (promo.maxDiscount) {
                  discount = Math.min(discount, promo.maxDiscount)
                }
              } else {
                discount = promo.discountValue
              }
              discount = Math.min(discount, category.price)
              finalAmount = Math.max(0, category.price - discount)
              appliedPromoCode = promo.code

              // Increment usage count
              await promoCodesCollection.updateOne(
                { _id: promo._id },
                { $inc: { usedCount: 1 }, $set: { updatedAt: new Date() } }
              )
            }
          }
        }
      }
    }

    if (finalAmount <= 0) {
      const accessDoc = {
        userId,
        userEmail,
        categoryId,
        paymentId: "",
        accessGranted: true,
        accessGrantedAt: new Date(),
        createdAt: new Date(),
      }
      await categoryAccessCollection.insertOne(accessDoc)
      return NextResponse.json({
        ok: true,
        message: "Access granted via promo code",
        hasAccess: true,
      })
    }

    // Generate unique merchant order ID (transaction ID)
    const merchantOrderId = randomUUID()

    // Create payment record
    const paymentDoc: PaymentDoc = {
      userId,
      userEmail,
      categoryId,
      amount: finalAmount,
      transactionId: merchantOrderId,
      status: "pending",
      paymentMethod: "phonepe",
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const paymentResult = await paymentsCollection.insertOne(paymentDoc)
    const paymentId = paymentResult.insertedId.toString()

    // Prepare redirect URL
    const redirectUrl = `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/payments/callback?transactionId=${merchantOrderId}`

    // Build meta info with additional details
    const phonePeMetaInfo: PhonePeMetaInfo = {
      udf1: userId,
      udf2: categoryId,
      udf3: paymentId,
    }
    if (appliedPromoCode) {
      phonePeMetaInfo.udf4 = appliedPromoCode
    }

    const metaInfo = buildPhonePeMetaInfo(phonePeMetaInfo)
    const amountInPaise = Math.round(finalAmount * 100)

    console.log("[Launchpad] Initiating PhonePe payment:", {
      merchantOrderId,
      amount: amountInPaise,
      redirectUrl,
      env: PHONEPE_ENV,
    })

    let response
    try {
      response = await initiateStandardCheckoutPayment({
        merchantOrderId,
        amountInPaise,
        redirectUrl,
        metaInfo,
      })
    } catch (sdkError) {
      console.error("[Launchpad] PhonePe SDK error:", sdkError)
      await paymentsCollection.updateOne(
        { _id: paymentResult.insertedId },
        {
          $set: {
            status: "failed",
            updatedAt: new Date(),
          },
        }
      )
      throw sdkError
    }

    // Check if payment was initiated successfully
    if (response.redirectUrl) {
      console.log("[Launchpad] PhonePe payment initiated successfully:", {
        orderId: response.orderId,
        state: response.state,
        expireAt: response.expireAt,
      })

      const paymentUpdate: Partial<PaymentDoc> = {
        phonepeState: response.state,
        phonepeMetaInfo: phonePeMetaInfo,
        phonepePayload: JSON.parse(JSON.stringify(response)),
        updatedAt: new Date(),
      }

      if (response.orderId) {
        paymentUpdate.phonepeOrderId = response.orderId
      }

      await paymentsCollection.updateOne(
        { _id: paymentResult.insertedId },
        { $set: paymentUpdate }
      )

      return NextResponse.json({
        ok: true,
        paymentUrl: response.redirectUrl,
        transactionId: merchantOrderId,
        paymentId,
        orderId: response.orderId,
      })
    } else {
      // Update payment status to failed
      console.error("[Launchpad] PhonePe payment initiation failed - no redirect URL")
      await paymentsCollection.updateOne(
        { _id: new ObjectId(paymentId) },
        { $set: { status: "failed", updatedAt: new Date() } }
      )
      return NextResponse.json(
        { 
          ok: false, 
          message: "Failed to initiate payment. Please try again." 
        }, 
        { status: 500 }
      )
    }
  } catch (error) {
    console.error("[Launchpad] Initiate payment error:", error)
    
    // Provide more specific error messages
    if (error instanceof Error) {
      if (error.message.includes("credentials") || error.message.includes("configured")) {
        return NextResponse.json(
          { 
            ok: false, 
            message: "Payment gateway configuration error. Please contact support." 
          }, 
          { status: 500 }
        )
      }
      
      if (error.message.includes("amount") || error.message.includes("minimum")) {
        return NextResponse.json(
          { 
            ok: false, 
            message: "Invalid payment amount. Minimum amount is ₹1." 
          }, 
          { status: 400 }
        )
      }
    }
    
    return NextResponse.json(
      { 
        ok: false, 
        message: error instanceof Error ? error.message : "Internal server error. Please try again." 
      }, 
      { status: 500 }
    )
  }
}

