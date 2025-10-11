import { NextResponse } from "next/server"
import { getDb } from "@/lib/mongodb"
import type { UserDoc } from "@/lib/models"

export async function POST(req: Request) {
  try {
    const { userEmail } = await req.json()

    // Only allow admin to reset database
    if (userEmail !== "admin@admin.com") {
      return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 403 })
    }

    const db = await getDb()
    const submissionsCollection = db.collection("submissions")
    const usersCollection = db.collection<UserDoc>("users")

    // Remove all submissions
    const deleteSubmissionsResult = await submissionsCollection.deleteMany({})
    console.log(`Deleted ${deleteSubmissionsResult.deletedCount} submissions`)

    // Reset all user points to 0 (except admin)
    const resetPointsResult = await usersCollection.updateMany(
      { email: { $ne: "admin@admin.com" } },
      { $set: { points: 0 } }
    )
    console.log(`Reset points for ${resetPointsResult.modifiedCount} users`)

    // Update leaderboard timestamp
    try {
      await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/leaderboard/last-updated`, {
        method: 'POST',
      })
    } catch (error) {
      console.error("Failed to update leaderboard timestamp:", error)
    }

    return NextResponse.json({
      ok: true,
      message: "Database reset successfully",
      deletedSubmissions: deleteSubmissionsResult.deletedCount,
      resetUsers: resetPointsResult.modifiedCount
    })

  } catch (error) {
    console.error("[Launchpad] Reset database error:", error)
    return NextResponse.json({ ok: false, message: "Internal server error" }, { status: 500 })
  }
}
