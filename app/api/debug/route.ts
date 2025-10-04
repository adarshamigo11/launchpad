import { type NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  try {
    // Check environment variables
    const hasMongoDBuri = !!process.env.MongoDBuri
    const mongoDBuriLength = process.env.MongoDBuri?.length || 0
    const mongoDBuriStart = process.env.MongoDBuri?.substring(0, 20) || "Not found"
    
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
