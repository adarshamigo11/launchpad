import { type NextRequest, NextResponse } from "next/server"
import { getDb } from "@/lib/mongodb"
import type { UserDoc } from "@/lib/models"
import { generateUniqueId } from "@/lib/server-utils"

export async function POST(req: NextRequest) {
  try {
    const { email, password, name, phone } = await req.json()

    if (!email || !password || !name || !phone) {
      return NextResponse.json({ ok: false, message: "Missing required fields" }, { status: 400 })
    }

    const db = await getDb()
    const usersCollection = db.collection<UserDoc>("users")

    // Check if user already exists
    const existingUser = await usersCollection.findOne({ email })
    if (existingUser) {
      return NextResponse.json({ ok: false, message: "User already exists" }, { status: 400 })
    }

    // Generate unique ID for new user
    const uniqueId = await generateUniqueId()

    // Create new user
    const newUser: UserDoc = {
      email,
      password, // In production, hash this password!
      name,
      phone,
      profilePhoto: "/placeholder-user.jpg",
      points: 0,
      visitedTaskIds: [],
      uniqueId,
      createdAt: new Date(),
    }

    await usersCollection.insertOne(newUser)

    return NextResponse.json({ ok: true, message: "User created successfully" })
  } catch (error) {
    console.error("[Launchpad] Signup error:", error)
    return NextResponse.json({ ok: false, message: "Internal server error" }, { status: 500 })
  }
}
