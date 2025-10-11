import { NextResponse } from "next/server"
import { getDb } from "@/lib/mongodb"

export async function GET() {
  try {
    const db = await getDb()
    
    // Test basic connection
    const collections = await db.listCollections().toArray()
    
    // Test tasks collection
    const tasksCollection = db.collection("tasks")
    const taskCount = await tasksCollection.countDocuments()
    
    // Test categories collection
    const categoriesCollection = db.collection("categories")
    const categoryCount = await categoriesCollection.countDocuments()
    
    return NextResponse.json({
      ok: true,
      message: "Database connection successful",
      collections: collections.map(c => c.name),
      taskCount,
      categoryCount,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error("[Launchpad] Database test error:", error)
    return NextResponse.json({
      ok: false,
      message: `Database connection failed: ${error}`,
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}