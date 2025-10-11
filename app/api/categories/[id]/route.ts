import { NextResponse } from "next/server"
import { getDb } from "@/lib/mongodb"
import { ObjectId } from "mongodb"
import type { CategoryDoc } from "@/lib/models"

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const { name, description, photo, status, userEmail } = await req.json()

    if (userEmail !== "admin@admin.com") {
      return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 403 })
    }

    const db = await getDb()
    const categoriesCollection = db.collection<CategoryDoc>("categories")

    const result = await categoriesCollection.updateOne(
      { _id: new ObjectId(params.id) },
      { $set: { name, description, photo, status } }
    )

    if (result.matchedCount === 0) {
      return NextResponse.json({ ok: false, message: "Category not found" }, { status: 404 })
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("[Launchpad] Update category error:", error)
    return NextResponse.json({ ok: false, message: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const { userEmail } = await req.json()

    if (userEmail !== "admin@admin.com") {
      return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 403 })
    }

    const db = await getDb()
    const categoriesCollection = db.collection<CategoryDoc>("categories")

    const result = await categoriesCollection.deleteOne({ _id: new ObjectId(params.id) })

    if (result.deletedCount === 0) {
      return NextResponse.json({ ok: false, message: "Category not found" }, { status: 404 })
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("[Launchpad] Delete category error:", error)
    return NextResponse.json({ ok: false, message: "Internal server error" }, { status: 500 })
  }
}
