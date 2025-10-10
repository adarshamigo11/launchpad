import { NextRequest, NextResponse } from "next/server"
import { getDb } from "@/lib/mongodb"
import type { UserDoc } from "@/lib/models"

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get("profilePhoto") as File
    const userEmail = formData.get("userEmail") as string

    if (!file || !userEmail) {
      return NextResponse.json({ ok: false, message: "Missing file or user email" }, { status: 400 })
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ ok: false, message: "File must be an image" }, { status: 400 })
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ ok: false, message: "File size must be less than 5MB" }, { status: 400 })
    }

    // Convert file to base64 data URL
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const base64 = buffer.toString('base64')
    const dataUrl = `data:${file.type};base64,${base64}`

    // Update the user's profile photo in the database
    const db = await getDb()
    const usersCollection = db.collection<UserDoc>("users")
    
    const updateResult = await usersCollection.updateOne(
      { email: userEmail },
      { $set: { profilePhoto: dataUrl } }
    )

    if (updateResult.matchedCount === 0) {
      return NextResponse.json({ 
        ok: false, 
        message: "User not found" 
      }, { status: 404 })
    }

    return NextResponse.json({ 
      ok: true, 
      message: "Profile photo updated successfully",
      photoUrl: dataUrl 
    })

  } catch (error) {
    console.error("Error uploading profile photo:", error)
    return NextResponse.json({ 
      ok: false, 
      message: "Failed to upload profile photo" 
    }, { status: 500 })
  }
}
