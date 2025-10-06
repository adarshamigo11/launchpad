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
    // console.log("Atlas test - Starting connection test")
    
    // Test with different connection options
    const options = {
      serverSelectionTimeoutMS: 15000,
      connectTimeoutMS: 15000,
      socketTimeoutMS: 15000,
      maxPoolSize: 1,
      retryWrites: true,
      w: 'majority'
    }
    
    client = new MongoClient(uri, options)
    
    // console.log("Atlas test - Attempting connection with options:", options)
    await client.connect()
    // console.log("Atlas test - Connection successful")
    
    // Test server info
    const serverInfo = await client.db("admin").admin().serverStatus()
    // console.log("Atlas test - Server info retrieved")
    
    // Test database access
    const db = client.db("Launchpad")
    const stats = await db.stats()
    // console.log("Atlas test - Database stats retrieved")
    
    return NextResponse.json({ 
      ok: true, 
      message: "Atlas connection test successful",
      serverVersion: serverInfo.version,
      databaseSize: stats.dataSize,
      collections: stats.collections
    })
  } catch (error) {
    console.error("Atlas test error:", error)
    
    const errorInfo = {
      message: error instanceof Error ? error.message : "Unknown error",
      code: (error as any)?.code,
      name: (error as any)?.name,
      errno: (error as any)?.errno,
      syscall: (error as any)?.syscall,
      hostname: (error as any)?.hostname,
      isNetworkError: (error as any)?.code === 'ENOTFOUND' || (error as any)?.code === 'ETIMEDOUT',
      isAuthError: (error as any)?.code === 18 || (error as any)?.code === 'AuthenticationFailed'
    }
    
    return NextResponse.json({ 
      ok: false, 
      ...errorInfo
    }, { status: 500 })
  } finally {
    if (client) {
      try {
        await client.close()
        // console.log("Atlas test - Client closed")
      } catch (closeError) {
        console.error("Atlas test - Error closing client:", closeError)
      }
    }
  }
}

