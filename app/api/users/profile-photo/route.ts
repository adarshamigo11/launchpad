import { NextRequest, NextResponse } from "next/server"
import { writeFile, mkdir } from "fs/promises"
import { join } from "path"
import { existsSync } from "fs"
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

    // Create uploads directory if it doesn't exist
    const uploadsDir = join(process.cwd(), "public", "uploads", "profile-photos")
    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true })
    }

    // Generate unique filename
    const fileExtension = file.name.split('.').pop()
    const fileName = `${userEmail.replace(/[^a-zA-Z0-9]/g, '_')}_${Date.now()}.${fileExtension}`
    const filePath = join(uploadsDir, fileName)

    // Convert file to buffer and save
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    await writeFile(filePath, buffer)

    // Generate the public URL
    const publicUrl = `/uploads/profile-photos/${fileName}`

    // Update the user's profile photo in the database
    const db = await getDb()
    const usersCollection = db.collection<UserDoc>("users")
    
    const updateResult = await usersCollection.updateOne(
      { email: userEmail },
      { $set: { profilePhoto: publicUrl } }
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
      photoUrl: publicUrl 
    })

  } catch (error) {
    console.error("Error uploading profile photo:", error)
    return NextResponse.json({ 
      ok: false, 
      message: "Failed to upload profile photo" 
    }, { status: 500 })
  }
}
