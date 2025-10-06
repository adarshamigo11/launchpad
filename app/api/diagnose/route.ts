import { type NextRequest, NextResponse } from "next/server"
import { MongoClient } from "mongodb"

export async function GET(req: NextRequest) {
  let client: MongoClient | null = null
  
  try {
    if (!process.env.MongoDBuri) {
      return NextResponse.json({ 
        ok: false, 
        message: "MongoDB URI not found in environment variables",
        step: "environment_check"
      }, { status: 500 })
    }

    const uri = process.env.MongoDBuri
    // console.log("Diagnosis - Starting comprehensive test")
    // console.log("Diagnosis - URI length:", uri.length)
    // console.log("Diagnosis - URI preview:", uri.substring(0, 50) + "...")
    
    // Step 1: Test basic connection
    // console.log("Diagnosis - Step 1: Testing basic connection...")
    client = new MongoClient(uri, {
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 10000,
    })
    
    await client.connect()
    // console.log("Diagnosis - Step 1: Connection successful!")
    
    // Step 2: Test ping
    // console.log("Diagnosis - Step 2: Testing ping...")
    await client.db("admin").admin().ping()
    // console.log("Diagnosis - Step 2: Ping successful!")
    
    // Step 3: Test database access
    // console.log("Diagnosis - Step 3: Testing database access...")
    const db = client.db("Launchpad")
    const collections = await db.listCollections().toArray()
    // console.log("Diagnosis - Step 3: Database access successful!")
    
    // Step 4: Test user collection
    // console.log("Diagnosis - Step 4: Testing users collection...")
    const usersCollection = db.collection("users")
    const userCount = await usersCollection.countDocuments()
    // console.log("Diagnosis - Step 4: Users collection access successful!")
    
    return NextResponse.json({ 
      ok: true, 
      message: "All diagnosis tests passed!",
      results: {
        connection: "success",
        ping: "success", 
        databaseAccess: "success",
        usersCollection: "success",
        userCount: userCount,
        collections: collections.length
      }
    })
  } catch (error) {
    console.error("Diagnosis failed:", error)
    
    const errorInfo = {
      message: error instanceof Error ? error.message : "Unknown error",
      code: (error as any)?.code,
      name: (error as any)?.name,
      errno: (error as any)?.errno,
      syscall: (error as any)?.syscall,
      hostname: (error as any)?.hostname,
      isNetworkError: (error as any)?.code === 'ENOTFOUND' || (error as any)?.code === 'ETIMEDOUT',
      isAuthError: (error as any)?.code === 18 || (error as any)?.code === 'AuthenticationFailed',
      isTimeoutError: (error as any)?.code === 'ETIMEDOUT',
      isDNSError: (error as any)?.code === 'ENOTFOUND'
    }
    
    return NextResponse.json({ 
      ok: false, 
      message: "Diagnosis failed",
      ...errorInfo
    }, { status: 500 })
  } finally {
    if (client) {
      try {
        await client.close()
        // console.log("Diagnosis - Client closed")
      } catch (closeError) {
        console.error("Diagnosis - Error closing client:", closeError)
      }
    }
  }
}

