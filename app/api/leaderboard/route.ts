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

    const response = NextResponse.json({
      ok: true,
      users: users.map((u) => ({
        id: u._id?.toString(),
        email: u.email,
        name: u.name,
        phone: u.phone,
        profilePhoto: u.profilePhoto,
        points: u.points,
        visitedTaskIds: u.visitedTaskIds,
        uniqueId: u.uniqueId || "LP000", // Fallback for users without uniqueId
      })),
      timestamp: new Date().toISOString(),
    })

    // Ensure no caching for real-time updates
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
    response.headers.set('Pragma', 'no-cache')
    response.headers.set('Expires', '0')
    response.headers.set('Surrogate-Control', 'no-store')

    return response
  } catch (error) {
    console.error("[Launchpad] Get leaderboard error:", error)
    return NextResponse.json({ ok: false, message: "Internal server error" }, { status: 500 })
  }
}
