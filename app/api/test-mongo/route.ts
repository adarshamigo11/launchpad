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
    
    // Test with the most basic connection
    client = new MongoClient(uri)
    
    // console.log("Testing basic MongoDB connection...")
    await client.connect()
    // console.log("Basic connection successful")
    
    // Test database access
    const db = client.db("Launchpad")
    const collections = await db.listCollections().toArray()
    // console.log("Collections found:", collections.length)
    
    return NextResponse.json({ 
      ok: true, 
      message: "Basic MongoDB connection successful",
      collections: collections.length,
      collectionNames: collections.map(c => c.name)
    })
  } catch (error) {
    console.error("Basic MongoDB test error:", error)
    
    return NextResponse.json({ 
      ok: false, 
      message: error instanceof Error ? error.message : "Unknown error",
      errorCode: (error as any)?.code,
      errorName: (error as any)?.name
    }, { status: 500 })
  } finally {
    if (client) {
      try {
        await client.close()
      } catch (closeError) {
        console.error("Error closing client:", closeError)
      }
    }
  }
}
