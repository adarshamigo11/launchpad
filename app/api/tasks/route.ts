import { type NextRequest, NextResponse } from "next/server"
import { getDb } from "@/lib/mongodb"
import type { TaskDoc } from "@/lib/models"

// GET all published tasks
export async function GET() {
  try {
    const db = await getDb()
    const tasksCollection = db.collection<TaskDoc>("tasks")

    const tasks = await tasksCollection.find({ status: "published" }).sort({ createdAt: -1 }).toArray()

    return NextResponse.json({
      ok: true,
      tasks: tasks.map((t) => ({
        id: t._id?.toString(),
        title: t.title,
        details: t.details,
        image: t.image,
        points: t.points,
        status: t.status,
      })),
    })
  } catch (error) {
    console.error("[v0] Get tasks error:", error)
    return NextResponse.json({ ok: false, message: "Internal server error" }, { status: 500 })
  }
}

// POST create new task (admin only)
export async function POST(req: NextRequest) {
  try {
    const { title, details, image, points, userEmail } = await req.json()

    // Simple admin check
    if (userEmail !== "admin@admin.com") {
      return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 403 })
    }

    const db = await getDb()
    const tasksCollection = db.collection<TaskDoc>("tasks")

    const newTask: TaskDoc = {
      title,
      details,
      image,
      points,
      status: "published",
      createdAt: new Date(),
    }

    const result = await tasksCollection.insertOne(newTask)

    return NextResponse.json({
      ok: true,
      task: {
        id: result.insertedId.toString(),
        title,
        details,
        image,
        points,
        status: "published",
      },
    })
  } catch (error) {
    console.error("[v0] Create task error:", error)
    return NextResponse.json({ ok: false, message: "Internal server error" }, { status: 500 })
  }
}
