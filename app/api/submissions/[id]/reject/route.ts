import { type NextRequest, NextResponse } from "next/server"
import { getDb } from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { userEmail } = await req.json()

    if (userEmail !== "admin@admin.com") {
      return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 403 })
    }

    const db = await getDb()
    const submissionsCollection = db.collection("submissions")

    const submissionId = params.id

    await submissionsCollection.updateOne({ _id: new ObjectId(submissionId) }, { $set: { status: "rejected" } })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("[v0] Reject submission error:", error)
    return NextResponse.json({ ok: false, message: "Internal server error" }, { status: 500 })
  }
}
