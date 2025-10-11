import { NextResponse } from "next/server"
import { getDb } from "@/lib/mongodb"
import type { UserDoc } from "@/lib/models"

export async function POST(req: Request) {
  try {
    const { userEmail } = await req.json()

    // Only allow admin to force refresh
    if (userEmail !== "admin@admin.com") {
      return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 403 })
    }

    const db = await getDb()
    const usersCollection = db.collection<UserDoc>("users")

    // Force refresh by getting fresh data from database
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
        uniqueId: u.uniqueId || "LP000",
      })),
      timestamp: new Date().toISOString(),
      forceRefreshed: true,
    })

    // Ensure no caching for force refresh
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
    response.headers.set('Pragma', 'no-cache')
    response.headers.set('Expires', '0')
    response.headers.set('Surrogate-Control', 'no-store')

    return response
  } catch (error) {
    console.error("[Launchpad] Force refresh leaderboard error:", error)
    return NextResponse.json({ ok: false, message: "Internal server error" }, { status: 500 })
  }
}
