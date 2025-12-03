import { NextRequest, NextResponse } from "next/server"
import { getDb } from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function GET(req: NextRequest) {
  try {
    const db = await getDb()
    const eSummitPaymentsCollection = db.collection("eSummitPayments")
    
    // Fetch all payments, sorted by creation date (newest first)
    const payments = await eSummitPaymentsCollection
      .find({})
      .sort({ createdAt: -1 })
      .toArray()
    
    console.log("[E-Summit] Found payments in DB:", payments.length)
    
    // Transform the data to match our frontend type
    const formattedPayments = payments.map((payment: any) => ({
      id: payment._id?.toString() || '',
      name: payment.name || '',
      email: payment.email || '',
      phone: payment.phone || '',
      senderName: payment.senderName || '',
      passType: payment.passType || '',
      passName: payment.passName || '',
      amount: payment.amount || 0,
      promoCode: payment.promoCode || null,
      transactionId: payment.transactionId || '',
      status: payment.status || 'pending',
      createdAt: payment.createdAt ? new Date(payment.createdAt).getTime() : Date.now()
    })).filter(payment => payment.id) // Filter out any payments without valid IDs
    
    console.log("[E-Summit] Formatted payments:", formattedPayments.length)
    
    return NextResponse.json({ 
      ok: true, 
      payments: formattedPayments 
    })
  } catch (error) {
    console.error("[E-Summit] Error fetching payments:", error)
    return NextResponse.json(
      { ok: false, message: "Failed to fetch payments", error: error instanceof Error ? error.message : String(error) }, 
      { status: 500 }
    )
  }
}