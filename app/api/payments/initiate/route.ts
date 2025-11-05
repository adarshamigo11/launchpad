import { NextRequest, NextResponse } from "next/server"
import { getDb } from "@/lib/mongodb"
import { ObjectId } from "mongodb"
import type { CategoryDoc, PaymentDoc } from "@/lib/models"
import crypto from "crypto"

// PhonePe Configuration
const PHONEPE_MERCHANT_ID = process.env.PHONEPE_MERCHANT_ID || ""
const PHONEPE_SALT_KEY = process.env.PHONEPE_SALT_KEY || ""
const PHONEPE_SALT_INDEX = process.env.PHONEPE_SALT_INDEX || "1"
const PHONEPE_BASE_URL = process.env.PHONEPE_BASE_URL || "https://api.phonepe.com/apis/hermes"

// Generate PhonePe X-VERIFY header
function generateXVerify(payload: string, endpoint: string): string {
  const stringToHash = payload + endpoint + PHONEPE_SALT_KEY
  const hash = crypto.createHash("sha256").update(stringToHash).digest("hex")
  return hash + "###" + PHONEPE_SALT_INDEX
}

export async function POST(req: NextRequest) {
  try {
    const { userId, userEmail, categoryId } = await req.json()

    if (!userId || !userEmail || !categoryId) {
      return NextResponse.json({ ok: false, message: "Missing required fields" }, { status: 400 })
    }

    const db = await getDb()
    const categoriesCollection = db.collection<CategoryDoc>("categories")
    const categoryAccessCollection = db.collection("categoryAccess")
    const paymentsCollection = db.collection<PaymentDoc>("payments")

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

    // Generate transaction ID
    const transactionId = `TXN${Date.now()}${Math.random().toString(36).substr(2, 9)}`

    // Create payment record
    const paymentDoc: PaymentDoc = {
      userId,
      userEmail,
      categoryId,
      amount: category.price,
      transactionId,
      status: "pending",
      paymentMethod: "phonepe",
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const paymentResult = await paymentsCollection.insertOne(paymentDoc)
    const paymentId = paymentResult.insertedId.toString()

    // Prepare PhonePe payment request
    const redirectUrl = `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/payments/callback`
    const callbackUrl = `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/payments/callback`

    const payload = {
      merchantId: PHONEPE_MERCHANT_ID,
      merchantTransactionId: transactionId,
      amount: category.price * 100, // Convert to paise
      merchantUserId: userId,
      redirectUrl,
      redirectMode: "REDIRECT",
      callbackUrl,
      paymentInstrument: {
        type: "PAY_PAGE",
      },
    }

    const base64Payload = Buffer.from(JSON.stringify(payload)).toString("base64")
    const endpoint = "/pg/v1/pay"
    const xVerify = generateXVerify(base64Payload, endpoint)

    // Make request to PhonePe
    const response = await fetch(`${PHONEPE_BASE_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-VERIFY": xVerify,
      },
      body: JSON.stringify({ request: base64Payload }),
    })

    const responseData = await response.json()

    if (responseData.success && responseData.data?.instrumentResponse?.redirectInfo?.url) {
      return NextResponse.json({
        ok: true,
        paymentUrl: responseData.data.instrumentResponse.redirectInfo.url,
        transactionId,
        paymentId,
      })
    } else {
      // Update payment status to failed
      await paymentsCollection.updateOne(
        { _id: new ObjectId(paymentId) },
        { $set: { status: "failed", updatedAt: new Date() } }
      )
      return NextResponse.json({ ok: false, message: "Failed to initiate payment" }, { status: 500 })
    }
  } catch (error) {
    console.error("[Launchpad] Initiate payment error:", error)
    return NextResponse.json({ ok: false, message: "Internal server error" }, { status: 500 })
  }
}

