import { type NextRequest, NextResponse } from "next/server"
import { getDb } from "@/lib/mongodb"
import type { UserDoc } from "@/lib/models"

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()

    if (!email || !password) {
      return NextResponse.json({ ok: false, message: "Missing credentials" }, { status: 400 })
    }

    // Check if MongoDB URI is available
    if (!process.env.MongoDBuri) {
      console.error("MongoDB URI not found in environment variables")
      return NextResponse.json({ 
        ok: false, 
        message: "Database configuration error. Please contact support." 
      }, { status: 500 })
    }

    const db = await getDb()
    const usersCollection = db.collection<UserDoc>("users")

    const user = await usersCollection.findOne({ email, password })

    if (!user) {
      return NextResponse.json({ ok: false, message: "Invalid credentials" }, { status: 401 })
    }

    // Return user data (in production, use JWT or session)
    return NextResponse.json({
      ok: true,
      user: {
        id: user._id?.toString(),
        email: user.email,
        name: user.name,
        profilePhoto: user.profilePhoto,
        points: user.points,
        visitedTaskIds: user.visitedTaskIds,
      },
    })
  } catch (error) {
    console.error("[API/Login] Error:", error)
    
    // Provide more specific error messages
    if (error instanceof Error) {
      if (error.message.includes("MongoDBuri")) {
        return NextResponse.json({ 
          ok: false, 
          message: "Database connection error. Please contact support." 
        }, { status: 500 })
      }
      
      if (error.message.includes("connect")) {
        return NextResponse.json({ 
          ok: false, 
          message: "Unable to connect to database. Please try again later." 
        }, { status: 500 })
      }
    }
    
    return NextResponse.json({ 
      ok: false, 
      message: "Internal server error. Please try again later." 
    }, { status: 500 })
  }
}
