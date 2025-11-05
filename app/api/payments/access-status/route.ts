import { NextRequest, NextResponse } from "next/server"
import { getDb } from "@/lib/mongodb"
import type { CategoryAccessDoc } from "@/lib/models"

export async function POST(req: NextRequest) {
  try {
    const { userId, categoryIds } = await req.json()

    if (!userId) {
      return NextResponse.json({ ok: false, message: "Missing userId" }, { status: 400 })
    }

    const db = await getDb()
    const categoryAccessCollection = db.collection<CategoryAccessDoc>("categoryAccess")

    // Get access status for all requested categories
    const accessRecords = await categoryAccessCollection
      .find({
        userId,
        categoryId: { $in: categoryIds || [] },
        accessGranted: true,
      })
      .toArray()

    // Create a map of categoryId -> hasAccess
    const accessMap: Record<string, boolean> = {}
    accessRecords.forEach((record) => {
      accessMap[record.categoryId] = true
    })

    return NextResponse.json({
      ok: true,
      accessMap,
    })
  } catch (error) {
    console.error("[Launchpad] Get access status error:", error)
    return NextResponse.json({ ok: false, message: "Internal server error" }, { status: 500 })
  }
}


