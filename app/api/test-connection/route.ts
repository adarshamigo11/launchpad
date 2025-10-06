import { type NextRequest, NextResponse } from "next/server"
import { MongoClient } from "mongodb"

export async function GET(req: NextRequest) {
  let client: MongoClient | null = null
  
  try {
    if (!process.env.MongoDBuri) {
      return NextResponse.json({ 
        ok: false, 
        message: "MongoDB URI not found in environment variables"
      }, { status: 500 })
    }

    const uri = process.env.MongoDBuri
    // console.log("Connection test - URI:", uri)
    
    // Test with very basic connection options
    client = new MongoClient(uri, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 5000,
    })
    
    // console.log("Connection test - Attempting to connect...")
    await client.connect()
    // console.log("Connection test - Connected successfully!")
    
    // Test ping
    await client.db("admin").admin().ping()
    // console.log("Connection test - Ping successful!")
    
    return NextResponse.json({ 
      ok: true, 
      message: "Connection test successful!",
      uri: uri.substring(0, 30) + "..."
    })
  } catch (error) {
    console.error("Connection test failed:", error)
    
    const errorDetails = {
      message: error instanceof Error ? error.message : "Unknown error",
      code: (error as any)?.code,
      name: (error as any)?.name,
      errno: (error as any)?.errno,
      syscall: (error as any)?.syscall,
      hostname: (error as any)?.hostname,
      isNetworkError: (error as any)?.code === 'ENOTFOUND' || (error as any)?.code === 'ETIMEDOUT',
      isAuthError: (error as any)?.code === 18 || (error as any)?.code === 'AuthenticationFailed',
      isTimeoutError: (error as any)?.code === 'ETIMEDOUT'
    }
    
    return NextResponse.json({ 
      ok: false, 
      message: "Connection test failed",
      ...errorDetails
    }, { status: 500 })
  } finally {
    if (client) {
      try {
        await client.close()
        // console.log("Connection test - Client closed")
      } catch (closeError) {
        console.error("Connection test - Error closing client:", closeError)
      }
    }
  }
}

