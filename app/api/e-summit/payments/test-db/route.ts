import { NextRequest, NextResponse } from "next/server"
import { getDb } from "@/lib/mongodb"

export async function GET(req: NextRequest) {
  try {
    const db = await getDb()
    const eSummitPaymentsCollection = db.collection("eSummitPayments")
    
    // Fetch all payments with detailed logging
    const payments = await eSummitPaymentsCollection
      .find({})
      .sort({ createdAt: -1 })
      .toArray()
    
    console.log("[E-Summit DB Test] Found payments:", payments.length)
    console.log("[E-Summit DB Test] Sample payments:", payments.slice(0, 3))
    
    // Return raw data for debugging
    return NextResponse.json({ 
      ok: true, 
      count: payments.length,
      payments: payments.map((p: any) => ({
        ...p,
        _id: p._id.toString(),
        createdAt: p.createdAt instanceof Date ? p.createdAt.toISOString() : p.createdAt,
        updatedAt: p.updatedAt instanceof Date ? p.updatedAt.toISOString() : p.updatedAt,
      }))
    })
  } catch (error) {
    console.error("[E-Summit DB Test] Error:", error)
    return NextResponse.json(
      { ok: false, message: "Failed to fetch payments", error: error instanceof Error ? error.message : String(error) }, 
      { status: 500 }
    )
  }
}