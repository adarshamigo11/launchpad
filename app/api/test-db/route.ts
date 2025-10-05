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

    const uri = process.env.MongoDBuri
    console.log("MongoDB URI length:", uri.length)
    console.log("MongoDB URI preview:", uri.substring(0, 50) + "...")

    // Try to connect to database
    console.log("Attempting to connect to database...")
    const db = await getDb()
    console.log("Database connection successful")
    
    // Try to ping the database
    await db.admin().ping()
    console.log("Database ping successful")
    
    // Try to access the users collection
    const usersCollection = db.collection("users")
    const userCount = await usersCollection.countDocuments()
    console.log("User count:", userCount)
    
    return NextResponse.json({ 
      ok: true, 
      message: "Database connection successful",
      hasEnvVar: true,
      userCount: userCount,
      databaseName: "Launchpad",
      uriLength: uri.length,
      uriPreview: uri.substring(0, 30) + "..."
    })
  } catch (error) {
    console.error("[API/Test-DB] Error:", error)
    
    const uri = process.env.MongoDBuri
    const errorDetails = {
      message: error instanceof Error ? error.message : "Unknown error",
      hasEnvVar: !!process.env.MongoDBuri,
      uriLength: uri?.length || 0,
      uriPreview: uri ? uri.substring(0, 30) + "..." : "Not found",
      errorType: error instanceof Error ? error.constructor.name : "Unknown",
      errorCode: (error as any)?.code || "No code",
      errorName: (error as any)?.name || "No name"
    }
    
    return NextResponse.json({ 
      ok: false, 
      ...errorDetails
    }, { status: 500 })
  }
}
