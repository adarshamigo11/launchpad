import { type NextRequest, NextResponse } from "next/server"
import { getDb } from "@/lib/mongodb"
import type { UserDoc, PasswordResetDoc } from "@/lib/models"

export async function POST(req: NextRequest) {
  try {
    const { token, password } = await req.json()

    if (!token || !password) {
      return NextResponse.json({ 
        ok: false, 
        message: "Token and password are required" 
      }, { status: 400 })
    }

    if (password.length < 6) {
      return NextResponse.json({ 
        ok: false, 
        message: "Password must be at least 6 characters long" 
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

    // Update user password
    const usersCollection = db.collection<UserDoc>("users")
    const updateResult = await usersCollection.updateOne(
      { email: resetRecord.email },
      { $set: { password } } // In production, hash this password!
    )

    if (updateResult.matchedCount === 0) {
      return NextResponse.json({ 
        ok: false, 
        message: "User not found" 
      }, { status: 404 })
    }

    // Mark token as used
    await passwordResetsCollection.updateOne(
      { _id: resetRecord._id },
      { $set: { used: true } }
    )

    return NextResponse.json({ 
      ok: true, 
      message: "Password has been reset successfully" 
    })
  } catch (error) {
    console.error("[Launchpad] Reset password error:", error)
    return NextResponse.json({ 
      ok: false, 
      message: "Internal server error" 
    }, { status: 500 })
  }
}
