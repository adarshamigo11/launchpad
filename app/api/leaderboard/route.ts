import { NextResponse } from "next/server"
import { getDb } from "@/lib/mongodb"
import type { UserDoc } from "@/lib/models"

export async function GET() {
  try {
    const db = await getDb()
    const usersCollection = db.collection<UserDoc>("users")

    const users = await usersCollection
      .find({ email: { $ne: "admin@admin.com" } })
      .sort({ points: -1 })
      .toArray()

    return NextResponse.json({
      ok: true,
      users: users.map((u) => ({
        id: u._id?.toString(),
        email: u.email,
        name: u.name,
        profilePhoto: u.profilePhoto,
        points: u.points,
        visitedTaskIds: u.visitedTaskIds,
      })),
    })
  } catch (error) {
    console.error("[v0] Get leaderboard error:", error)
    return NextResponse.json({ ok: false, message: "Internal server error" }, { status: 500 })
  }
}
