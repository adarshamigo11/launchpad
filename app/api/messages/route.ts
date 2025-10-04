import { type NextRequest, NextResponse } from "next/server"
import { getDb } from "@/lib/mongodb"
import type { MessageDoc } from "@/lib/models"

export async function GET(req: NextRequest) {
  try {
    const db = await getDb()
    const messagesCollection = db.collection<MessageDoc>("messages")

    // Get all messages sorted by creation date (newest first)
    const messages = await messagesCollection
      .find({})
      .sort({ createdAt: -1 })
      .toArray()

    // Transform messages for client
    const transformedMessages = messages.map(message => ({
      id: message._id?.toString(),
      name: message.name,
      mobile: message.mobile,
      email: message.email,
      message: message.message,
      status: message.status,
      createdAt: message.createdAt.getTime(),
    }))

    return NextResponse.json({
      ok: true,
      messages: transformedMessages
    })
  } catch (error) {
    console.error("[Messages] Error:", error)
    return NextResponse.json({ 
      ok: false, 
      message: "Internal server error" 
    }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { messageId, status } = await req.json()

    if (!messageId || !status) {
      return NextResponse.json({ 
        ok: false, 
        message: "Message ID and status are required" 
      }, { status: 400 })
    }

    if (!["unread", "read", "replied"].includes(status)) {
      return NextResponse.json({ 
        ok: false, 
        message: "Invalid status" 
      }, { status: 400 })
    }

    const db = await getDb()
    const messagesCollection = db.collection<MessageDoc>("messages")

    const result = await messagesCollection.updateOne(
      { _id: new (await import("mongodb")).ObjectId(messageId) },
      { $set: { status } }
    )

    if (result.modifiedCount > 0) {
      return NextResponse.json({
        ok: true,
        message: "Message status updated successfully"
      })
    } else {
      return NextResponse.json({ 
        ok: false, 
        message: "Message not found" 
      }, { status: 404 })
    }
  } catch (error) {
    console.error("[Messages] Update error:", error)
    return NextResponse.json({ 
      ok: false, 
      message: "Internal server error" 
    }, { status: 500 })
  }
}
