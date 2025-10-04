import { type NextRequest, NextResponse } from "next/server"
import { MongoClient } from "mongodb"

export async function GET(req: NextRequest) {
  let client: MongoClient | null = null
  
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
    console.log("Alternative connection test - URI length:", uri.length)
    console.log("Alternative connection test - URI preview:", uri.substring(0, 50) + "...")

    // Create a new client with minimal options
    client = new MongoClient(uri, {
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 10000,
    })

    // Try to connect
    await client.connect()
    console.log("Alternative connection successful")
    
    // Try to ping
    await client.db("admin").admin().ping()
    console.log("Alternative ping successful")
    
    // Try to access the Launchpad database
    const db = client.db("Launchpad")
    const usersCollection = db.collection("users")
    const userCount = await usersCollection.countDocuments()
    console.log("Alternative user count:", userCount)
    
    return NextResponse.json({ 
      ok: true, 
      message: "Alternative database connection successful",
      hasEnvVar: true,
      userCount: userCount,
      databaseName: "Launchpad",
      uriLength: uri.length,
      uriPreview: uri.substring(0, 30) + "...",
      connectionMethod: "alternative"
    })
  } catch (error) {
    console.error("[API/Test-DB-Alt] Error:", error)
    
    const uri = process.env.MongoDBuri
    const errorDetails = {
      message: error instanceof Error ? error.message : "Unknown error",
      hasEnvVar: !!process.env.MongoDBuri,
      uriLength: uri?.length || 0,
      uriPreview: uri ? uri.substring(0, 30) + "..." : "Not found",
      errorType: error instanceof Error ? error.constructor.name : "Unknown",
      errorCode: (error as any)?.code || "No code",
      errorName: (error as any)?.name || "No name",
      connectionMethod: "alternative"
    }
    
    return NextResponse.json({ 
      ok: false, 
      ...errorDetails
    }, { status: 500 })
  } finally {
    if (client) {
      await client.close()
    }
  }
}
