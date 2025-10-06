import { type NextRequest, NextResponse } from "next/server"
import { MongoClient } from "mongodb"

export async function GET(req: NextRequest) {
  let client: MongoClient | null = null
  
  try {
    if (!process.env.MongoDBuri) {
      return NextResponse.json({ 
        ok: false, 
        message: "MongoDB URI not found",
        hasEnvVar: false
      }, { status: 500 })
    }

    const uri = process.env.MongoDBuri
    // console.log("Raw test - URI:", uri)
    
    // Create client with minimal options
    client = new MongoClient(uri, {
      serverSelectionTimeoutMS: 10000,
    })
    
    // console.log("Raw test - Attempting connection...")
    await client.connect()
    // console.log("Raw test - Connection successful")
    
    // Test basic operations
    const admin = client.db("admin")
    await admin.admin().ping()
    // console.log("Raw test - Ping successful")
    
    const db = client.db("Launchpad")
    const collections = await db.listCollections().toArray()
    // console.log("Raw test - Collections:", collections.length)
    
    return NextResponse.json({ 
      ok: true, 
      message: "Raw MongoDB connection successful",
      collections: collections.length,
      collectionNames: collections.map(c => c.name)
    })
  } catch (error) {
    console.error("Raw test error:", error)
    
    const errorInfo = {
      message: error instanceof Error ? error.message : "Unknown error",
      code: (error as any)?.code,
      name: (error as any)?.name,
      errno: (error as any)?.errno,
      syscall: (error as any)?.syscall,
      hostname: (error as any)?.hostname,
      stack: error instanceof Error ? error.stack?.substring(0, 500) : "No stack"
    }
    
    return NextResponse.json({ 
      ok: false, 
      ...errorInfo
    }, { status: 500 })
  } finally {
    if (client) {
      try {
        await client.close()
        // console.log("Raw test - Client closed")
      } catch (closeError) {
        console.error("Raw test - Error closing client:", closeError)
      }
    }
  }
}

