import { type NextRequest, NextResponse } from "next/server"
import { getDb } from "@/lib/mongodb"
import type { PasswordResetDoc } from "@/lib/models"

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const token = searchParams.get('token')

    if (!token) {
      return NextResponse.json({ 
        ok: false, 
        message: "Token is required" 
      }, { status: 400 })
    }

    const db = await getDb()
    const passwordResetsCollection = db.collection<PasswordResetDoc>("passwordResets")

    // Find the reset token
    const resetRecord = await passwordResetsCollection.findOne({
      token,
      used: false,
      expiresAt: { $gt: new Date() } // Token not expired
    })

    if (!resetRecord) {
      return NextResponse.json({ 
        ok: false, 
        message: "Invalid or expired reset token" 
      }, { status: 400 })
    }

    return NextResponse.json({ 
      ok: true, 
      message: "Token is valid" 
    })
  } catch (error) {
    console.error("[Launchpad] Validate token error:", error)
    return NextResponse.json({ 
      ok: false, 
      message: "Internal server error" 
    }, { status: 500 })
  }
}
