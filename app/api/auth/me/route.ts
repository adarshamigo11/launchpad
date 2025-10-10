import { type NextRequest, NextResponse } from "next/server"
import { getDb } from "@/lib/mongodb"
import type { UserDoc } from "@/lib/models"

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()

    if (!email) {
      return NextResponse.json({ ok: false, message: "Email required" }, { status: 400 })
    }

    const db = await getDb()
    const usersCollection = db.collection<UserDoc>("users")

    const user = await usersCollection.findOne({ email })

    if (!user) {
      return NextResponse.json({ ok: false, message: "User not found" }, { status: 404 })
    }

    return NextResponse.json({
      ok: true,
      user: {
        id: user._id?.toString(),
        email: user.email,
        name: user.name,
        phone: user.phone,
        profilePhoto: user.profilePhoto,
        points: user.points,
        visitedTaskIds: user.visitedTaskIds,
        uniqueId: user.uniqueId,
      },
    })
  } catch (error) {
    console.error("[Launchpad] Get user error:", error)
    return NextResponse.json({ ok: false, message: "Internal server error" }, { status: 500 })
  }
}
