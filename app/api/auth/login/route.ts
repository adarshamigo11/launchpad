import { type NextRequest, NextResponse } from "next/server"
import { getDb } from "@/lib/mongodb"
import type { UserDoc } from "@/lib/models"

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()

    if (!email || !password) {
      return NextResponse.json({ ok: false, message: "Missing credentials" }, { status: 400 })
    }

    const db = await getDb()
    const usersCollection = db.collection<UserDoc>("users")

    const user = await usersCollection.findOne({ email, password })

    if (!user) {
      return NextResponse.json({ ok: false, message: "Invalid credentials" }, { status: 401 })
    }

    // Return user data (in production, use JWT or session)
    return NextResponse.json({
      ok: true,
      user: {
        id: user._id?.toString(),
        email: user.email,
        name: user.name,
        profilePhoto: user.profilePhoto,
        points: user.points,
        visitedTaskIds: user.visitedTaskIds,
      },
    })
  } catch (error) {
    console.error("[v0] Login error:", error)
    return NextResponse.json({ ok: false, message: "Internal server error" }, { status: 500 })
  }
}
