import { type NextRequest, NextResponse } from "next/server"
import { getDb } from "@/lib/mongodb"

export async function GET(req: NextRequest) {
  try {
    // Check if MongoDB URI is available
    if (!process.env.MongoDBuri) {
      return NextResponse.json({ 
        ok: false, 
        message: "MongoDB URI not found in environment variables",
        hasEnvVar: false
      }, { status: 500 })
    }

    // Try to connect to database
    const db = await getDb()
    
    // Try to ping the database
    await db.admin().ping()
    
    // Try to access the users collection
    const usersCollection = db.collection("users")
    const userCount = await usersCollection.countDocuments()
    
    return NextResponse.json({ 
      ok: true, 
      message: "Database connection successful",
      hasEnvVar: true,
      userCount: userCount,
      databaseName: "Launchpad"
    })
  } catch (error) {
    console.error("[API/Test-DB] Error:", error)
    
    return NextResponse.json({ 
      ok: false, 
      message: error instanceof Error ? error.message : "Unknown error",
      hasEnvVar: !!process.env.MongoDBuri,
      error: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 })
  }
}
