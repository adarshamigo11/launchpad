import { NextRequest, NextResponse } from "next/server"
import { getDb } from "@/lib/mongodb"
import { ObjectId } from "mongodb"
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
    console.log("[E-Summit] Environment check:", {
      hasClientId: !!PHONEPE_CLIENT_ID,
      hasClientSecret: !!PHONEPE_CLIENT_SECRET,
      clientIdLength: PHONEPE_CLIENT_ID?.length,
      env: process.env.PHONEPE_ENV,
      baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    })

    if (!PHONEPE_CLIENT_ID || !PHONEPE_CLIENT_SECRET) {
      console.error("[E-Summit] PhonePe configuration missing:", {
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

    const { 
      name, 
      email, 
      phone, 
      senderName, 
      passType, 
      passName, 
      amount, 
      promoCode 
    } = await req.json()

    console.log("[E-Summit] Received payment request:", {
      name,
      email,
      phone,
      senderName,
      passType,
      passName,
      amount,
      promoCode,
      hasAmount: !!amount,
      amountType: typeof amount
    });

    // Validate required fields
    if (!name || !email || !phone || !senderName || !passType || !passName || amount === undefined) {
      return NextResponse.json({ ok: false, message: "Missing required fields" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ ok: false, message: "Invalid email format" }, { status: 400 })
    }

    // Validate phone format (10 digits)
    const phoneRegex = /^\d{10}$/
    if (!phoneRegex.test(phone)) {
      return NextResponse.json({ ok: false, message: "Invalid phone number format" }, { status: 400 })
    }

    // Validate amount is a valid number
    if (typeof amount !== 'number' || isNaN(amount) || amount < 0) {
      return NextResponse.json({ ok: false, message: "Invalid amount" }, { status: 400 })
    }

    const db = await getDb()
    const eSummitPaymentsCollection = db.collection("eSummitPayments")

    // Generate unique merchant order ID (transaction ID)
    const merchantOrderId = randomUUID()
    console.log("[E-Summit] Generated merchant order ID:", merchantOrderId);

    // Create payment record
    const paymentDoc = {
      name,
      email,
      phone,
      senderName,
      passType,
      passName,
      amount,
      promoCode: promoCode || null,
      transactionId: merchantOrderId,
      status: "pending",
      paymentMethod: "phonepe",
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const paymentResult = await eSummitPaymentsCollection.insertOne(paymentDoc)
    const paymentId = paymentResult.insertedId.toString()
    console.log("[E-Summit] Created payment record with ID:", paymentId);

    // Prepare redirect URL
    const redirectUrl = `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/e-summit/payments/callback?transactionId=${merchantOrderId}`
    console.log("[E-Summit] Prepared redirect URL:", redirectUrl);

    // Build meta info with additional details
    const phonePeMetaInfo = {
      udf1: paymentId,
      udf2: passType,
      udf3: email,
      udf4: name,
    }

    const metaInfo = buildPhonePeMetaInfo(phonePeMetaInfo)
    const amountInPaise = Math.round(amount * 100)
    
    // Ensure minimum amount requirement
    if (amountInPaise < 100) {
      console.error("[E-Summit] Invalid amount for PhonePe:", amountInPaise)
      return NextResponse.json(
        { 
          ok: false, 
          message: "Minimum payment amount is ₹1.00" 
        }, 
        { status: 400 }
      )
    }
    
    console.log("[E-Summit] Preparing PhonePe payment:", {
      merchantOrderId,
      amountInPaise,
      redirectUrl,
      env: PHONEPE_ENV,
    })

    // Check if amount is valid for PhonePe (minimum 100 paise = ₹1)
    if (amountInPaise < 100) {
      console.error("[E-Summit] Invalid amount for PhonePe:", amountInPaise)
      await eSummitPaymentsCollection.updateOne(
        { _id: paymentResult.insertedId },
        {
          $set: {
            status: "failed",
            updatedAt: new Date(),
          },
        }
      )
      
      // Provide more specific error messages
      if (amountInPaise < 100 && amountInPaise > 0) {
        return NextResponse.json(
          { 
            ok: false, 
            message: "Invalid payment amount. Minimum amount is ₹1." 
          }, 
          { status: 400 }
        )
      }
      
      return NextResponse.json(
        { 
          ok: false, 
          message: "Invalid payment amount." 
        }, 
        { status: 400 }
      )
    }

    let response
    try {
      response = await initiateStandardCheckoutPayment({
        merchantOrderId,
        amountInPaise,
        redirectUrl,
        metaInfo,
      })
    } catch (sdkError: any) {
      console.error("[E-Summit] PhonePe SDK error:", sdkError)
      await eSummitPaymentsCollection.updateOne(
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
      console.log("[E-Summit] PhonePe payment initiated successfully:", {
        orderId: response.orderId,
        state: response.state,
        expireAt: response.expireAt,
      })

      const paymentUpdate: Record<string, any> = {
        phonepeState: response.state,
        phonepeMetaInfo: phonePeMetaInfo,
        phonepePayload: JSON.parse(JSON.stringify(response)),
        updatedAt: new Date(),
      }

      if (response.orderId) {
        paymentUpdate.phonepeOrderId = response.orderId
      }

      await eSummitPaymentsCollection.updateOne(
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
      console.error("[E-Summit] PhonePe payment initiation failed - no redirect URL")
      await eSummitPaymentsCollection.updateOne(
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
  } catch (error: any) {
    console.error("[E-Summit] Initiate payment error:", error)
    
    // Provide more specific error messages
    if (error instanceof Error) {
      if (error.message.includes("credentials") || error.message.includes("configured")) {
        return NextResponse.json(
          { 
            ok: false, 
            message: "Payment gateway not configured. Please contact support." 
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
        message: "Failed to initiate payment. Please try again." 
      }, 
      { status: 500 }
    )
  }
}