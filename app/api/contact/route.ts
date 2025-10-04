import { type NextRequest, NextResponse } from "next/server"
import { getDb } from "@/lib/mongodb"
import type { MessageDoc } from "@/lib/models"

export async function POST(req: NextRequest) {
  try {
    const { name, mobile, email, message } = await req.json()

    // Validate required fields
    if (!name || !mobile || !email || !message) {
      return NextResponse.json({ 
        ok: false, 
        message: "All fields are required" 
      }, { status: 400 })
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ 
        ok: false, 
        message: "Please enter a valid email address" 
      }, { status: 400 })
    }

    const db = await getDb()
    const messagesCollection = db.collection<MessageDoc>("messages")

    // Save message to database
    const result = await messagesCollection.insertOne({
      name,
      mobile,
      email,
      message,
      status: "unread",
      createdAt: new Date(),
    })

    if (result.insertedId) {
      return NextResponse.json({
        ok: true,
        message: "Message sent successfully",
        id: result.insertedId.toString()
      })
    } else {
      return NextResponse.json({ 
        ok: false, 
        message: "Failed to save message" 
      }, { status: 500 })
    }
  } catch (error) {
    console.error("[Contact] Error:", error)
    return NextResponse.json({ 
      ok: false, 
      message: "Internal server error" 
    }, { status: 500 })
  }
}
