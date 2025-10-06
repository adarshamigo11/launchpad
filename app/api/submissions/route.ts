import { type NextRequest, NextResponse } from "next/server"
import { getDb } from "@/lib/mongodb"
import type { SubmissionDoc } from "@/lib/models"

// GET all submissions (admin) or user's submissions
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const userEmail = searchParams.get("userEmail")

    if (!userEmail) {
      return NextResponse.json({ ok: false, message: "User email required" }, { status: 400 })
    }

    const db = await getDb()
    const submissionsCollection = db.collection<SubmissionDoc>("submissions")

    let query = {}
    if (userEmail !== "admin@admin.com") {
      query = { userEmail }
    }

    const submissions = await submissionsCollection.find(query).sort({ createdAt: -1 }).toArray()

    return NextResponse.json({
      ok: true,
      submissions: submissions.map((s) => ({
        id: s._id?.toString(),
        taskId: s.taskId,
        userEmail: s.userEmail,
        fileName: s.fileName,
        dataUrl: s.dataUrl,
        message: s.message || "",
        status: s.status,
        createdAt: s.createdAt.getTime(),
      })),
    })
  } catch (error) {
    console.error("[Launchpad] Get submissions error:", error)
    return NextResponse.json({ ok: false, message: "Internal server error" }, { status: 500 })
  }
}

// POST create new submission
export async function POST(req: NextRequest) {
  try {
    const { taskId, userEmail, fileName, dataUrl, message } = await req.json()

    if (!taskId || !userEmail || !fileName || !dataUrl) {
      return NextResponse.json({ ok: false, message: "Missing required fields" }, { status: 400 })
    }

    const db = await getDb()
    const submissionsCollection = db.collection<SubmissionDoc>("submissions")

    const newSubmission: SubmissionDoc = {
      taskId,
      userEmail,
      fileName,
      dataUrl,
      message: message || "",
      status: "pending",
      createdAt: new Date(),
    }

    const result = await submissionsCollection.insertOne(newSubmission)

    return NextResponse.json({
      ok: true,
      submission: {
        id: result.insertedId.toString(),
        taskId,
        userEmail,
        fileName,
        dataUrl,
        message: message || "",
        status: "pending",
        createdAt: Date.now(),
      },
    })
  } catch (error) {
    console.error("[Launchpad] Create submission error:", error)
    return NextResponse.json({ ok: false, message: "Internal server error" }, { status: 500 })
  }
}
