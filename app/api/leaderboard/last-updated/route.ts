import { NextResponse } from "next/server"

// Store the last update timestamp in memory (in production, you might want to use Redis or a database)
let lastUpdateTimestamp = Date.now()

export async function GET() {
  return NextResponse.json({
    lastUpdated: lastUpdateTimestamp,
    timestamp: new Date().toISOString(),
  })
}

export async function POST() {
  // Update the timestamp when leaderboard changes
  lastUpdateTimestamp = Date.now()
  return NextResponse.json({
    success: true,
    lastUpdated: lastUpdateTimestamp,
    timestamp: new Date().toISOString(),
  })
}
