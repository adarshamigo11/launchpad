import { type NextRequest, NextResponse } from "next/server"
import { getDb } from "@/lib/mongodb"
import { ObjectId } from "mongodb"
import type { SubmissionDoc, TaskDoc, UserDoc } from "@/lib/models"

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { userEmail } = await req.json()

    if (userEmail !== "admin@admin.com") {
      return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 403 })
    }

    const db = await getDb()
    const submissionsCollection = db.collection<SubmissionDoc>("submissions")
    const tasksCollection = db.collection<TaskDoc>("tasks")
    const usersCollection = db.collection<UserDoc>("users")

    const submissionId = params.id

    // Get submission
    const submission = await submissionsCollection.findOne({ _id: new ObjectId(submissionId) })
    if (!submission) {
      return NextResponse.json({ ok: false, message: "Submission not found" }, { status: 404 })
    }

    // Get task to get points
    const task = await tasksCollection.findOne({ _id: new ObjectId(submission.taskId) })
    if (!task) {
      return NextResponse.json({ ok: false, message: "Task not found" }, { status: 404 })
    }

    // Update submission status
    await submissionsCollection.updateOne({ _id: new ObjectId(submissionId) }, { $set: { status: "approved" } })

    // Add points to user
    await usersCollection.updateOne({ email: submission.userEmail }, { $inc: { points: task.points } })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("[Launchpad] Approve submission error:", error)
    return NextResponse.json({ ok: false, message: "Internal server error" }, { status: 500 })
  }
}
