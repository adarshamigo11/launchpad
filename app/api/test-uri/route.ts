import { type NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  try {
    // Check environment variables
    const hasMongoDBuri = !!process.env.MongoDBuri
    const mongoDBuriLength = process.env.MongoDBuri?.length || 0
    const mongoDBuriStart = process.env.MongoDBuri?.substring(0, 50) || "Not found"
    const mongoDBuriFull = process.env.MongoDBuri || "Not found"
    
    // Check for case sensitivity issues
    const hasCluster0Capital = mongoDBuriFull.includes("Cluster0")
    const hasCluster0Lower = mongoDBuriFull.includes("cluster0")
    
    // Check Node environment
    const nodeEnv = process.env.NODE_ENV
    
    // Check if we're in Vercel
    const isVercel = !!process.env.VERCEL
    
    return NextResponse.json({
      ok: true,
      debug: {
        hasMongoDBuri,
        mongoDBuriLength,
        mongoDBuriStart,
        mongoDBuriFull,
        hasCluster0Capital,
        hasCluster0Lower,
        nodeEnv,
        isVercel,
        timestamp: new Date().toISOString()
      }
    })
  } catch (error) {
    return NextResponse.json({
      ok: false,
      error: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 })
  }
}

