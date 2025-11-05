import { NextRequest, NextResponse } from "next/server"
import { getDb } from "@/lib/mongodb"
import { ObjectId } from "mongodb"
import type { CategoryAccessDoc } from "@/lib/models"

export async function POST(req: NextRequest) {
  try {
    const { userId, categoryId } = await req.json()

    if (!userId || !categoryId) {
      return NextResponse.json({ ok: false, message: "Missing userId or categoryId" }, { status: 400 })
    }

    const db = await getDb()
    const categoryAccessCollection = db.collection<CategoryAccessDoc>("categoryAccess")

    // Check if user has access to this category
    const access = await categoryAccessCollection.findOne({
      userId,
      categoryId,
      accessGranted: true,
    })

    return NextResponse.json({
      ok: true,
      hasAccess: !!access,
      accessGrantedAt: access?.accessGrantedAt ? access.accessGrantedAt.getTime() : null,
    })
  } catch (error) {
    console.error("[Launchpad] Check access error:", error)
    return NextResponse.json({ ok: false, message: "Internal server error" }, { status: 500 })
  }
}


