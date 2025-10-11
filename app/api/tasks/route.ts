import { type NextRequest, NextResponse } from "next/server"
import { getDb } from "@/lib/mongodb"
import type { TaskDoc } from "@/lib/models"

// GET all published tasks
export async function GET() {
  try {
    const db = await getDb()
    const tasksCollection = db.collection<TaskDoc>("tasks")

    const tasks = await tasksCollection.find({ status: "published" }).sort({ createdAt: -1 }).toArray()

    const mappedTasks = tasks.map((t) => ({
      id: t._id?.toString(),
      challengeName: t.challengeName || t.title || "Untitled Challenge",
      description: t.description || t.details || "No description provided.",
      guidelines: t.guidelines || "No guidelines provided.",
      submissionGuidelines: t.submissionGuidelines || "No submission guidelines provided.",
      points: t.points || 0,
      lastDate: t.lastDate ? t.lastDate.getTime() : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).getTime(), // 30 days from now if no date
      categoryId: t.categoryId || "",
      subcategory: t.subcategory || "basic",
      status: t.status,
    }))

    return NextResponse.json({
      ok: true,
      tasks: mappedTasks,
    })
  } catch (error) {
    console.error("[Launchpad] Get tasks error:", error)
    return NextResponse.json({ ok: false, message: "Internal server error" }, { status: 500 })
  }
}

// POST create new task (admin only)
export async function POST(req: NextRequest) {
  try {
    const { challengeName, description, guidelines, submissionGuidelines, points, lastDate, categoryId, subcategory, userEmail } = await req.json()

    // Simple admin check
    if (userEmail !== "admin@admin.com") {
      return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 403 })
    }

    const db = await getDb()
    const tasksCollection = db.collection<TaskDoc>("tasks")

    const newTask: TaskDoc = {
      challengeName,
      description,
      guidelines,
      submissionGuidelines,
      points,
      lastDate: new Date(lastDate),
      categoryId,
      subcategory,
      status: "published",
      createdAt: new Date(),
    }

    const result = await tasksCollection.insertOne(newTask)

    return NextResponse.json({
      ok: true,
      task: {
        id: result.insertedId.toString(),
        challengeName,
        description,
        guidelines,
        submissionGuidelines,
        points,
        lastDate: newTask.lastDate.getTime(),
        categoryId,
        subcategory,
        status: "published",
      },
    })
  } catch (error) {
    console.error("[Launchpad] Create task error:", error)
    return NextResponse.json({ ok: false, message: "Internal server error" }, { status: 500 })
  }
}
