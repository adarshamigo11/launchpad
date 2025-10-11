import { NextResponse } from "next/server"
import { getDb } from "@/lib/mongodb"
import type { CategoryDoc } from "@/lib/models"

export async function GET() {
  try {
    const db = await getDb()
    const categoriesCollection = db.collection<CategoryDoc>("categories")

    const categories = await categoriesCollection
      .find({ status: "active" })
      .sort({ createdAt: -1 })
      .toArray()

    return NextResponse.json({
      ok: true,
      categories: categories.map((c) => ({
        id: c._id?.toString(),
        name: c.name,
        description: c.description,
        photo: c.photo,
        status: c.status,
      })),
    })
  } catch (error) {
    console.error("[Launchpad] Get categories error:", error)
    return NextResponse.json({ ok: false, message: "Internal server error" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const { name, description, photo, status, userEmail } = await req.json()

    if (userEmail !== "admin@admin.com") {
      return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 403 })
    }

    const db = await getDb()
    const categoriesCollection = db.collection<CategoryDoc>("categories")

    const category = {
      name,
      description,
      photo,
      status: status || "active",
      createdAt: new Date(),
    }

    const result = await categoriesCollection.insertOne(category)

    return NextResponse.json({
      ok: true,
      category: {
        id: result.insertedId.toString(),
        name,
        description,
        photo,
        status: status || "active",
      },
    })
  } catch (error) {
    console.error("[Launchpad] Create category error:", error)
    return NextResponse.json({ ok: false, message: "Internal server error" }, { status: 500 })
  }
}
