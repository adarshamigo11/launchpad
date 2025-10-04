import { type NextRequest, NextResponse } from "next/server"
import { getDb } from "@/lib/mongodb"

export async function POST(req: NextRequest) {
  try {
    const { userEmail, taskId } = await req.json()

    if (!userEmail || !taskId) {
      return NextResponse.json({ ok: false, message: "Missing required fields" }, { status: 400 })
    }

    const db = await getDb()
    const usersCollection = db.collection("users")

    await usersCollection.updateOne({ email: userEmail }, { $addToSet: { visitedTaskIds: taskId } })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("[v0] Update visited error:", error)
    return NextResponse.json({ ok: false, message: "Internal server error" }, { status: 500 })
  }
}
