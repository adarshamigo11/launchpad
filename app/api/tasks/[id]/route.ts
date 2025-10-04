import { type NextRequest, NextResponse } from "next/server"
import { getDb } from "@/lib/mongodb"
import { ObjectId } from "mongodb"

// DELETE task by id (admin only)
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { userEmail } = await req.json()

    if (userEmail !== "admin@admin.com") {
      return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 403 })
    }

    const db = await getDb()
    const tasksCollection = db.collection("tasks")
    const submissionsCollection = db.collection("submissions")

    const taskId = params.id

    // Delete task
    await tasksCollection.deleteOne({ _id: new ObjectId(taskId) })

    // Delete related submissions
    await submissionsCollection.deleteMany({ taskId })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("[v0] Delete task error:", error)
    return NextResponse.json({ ok: false, message: "Internal server error" }, { status: 500 })
  }
}

// GET single task by id
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const db = await getDb()
    const tasksCollection = db.collection("tasks")

    const task = await tasksCollection.findOne({ _id: new ObjectId(params.id) })

    if (!task) {
      return NextResponse.json({ ok: false, message: "Task not found" }, { status: 404 })
    }

    return NextResponse.json({
      ok: true,
      task: {
        id: task._id.toString(),
        title: task.title,
        details: task.details,
        image: task.image,
        points: task.points,
        status: task.status,
      },
    })
  } catch (error) {
    console.error("[v0] Get task error:", error)
    return NextResponse.json({ ok: false, message: "Internal server error" }, { status: 500 })
  }
}
