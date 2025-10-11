import { NextResponse } from "next/server"
import { getDb } from "@/lib/mongodb"
import type { TaskDoc, CategoryDoc } from "@/lib/models"

export async function POST(req: Request) {
  try {
    const { userEmail } = await req.json()

    // Only allow admin to migrate tasks
    if (userEmail !== "admin@admin.com") {
      return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 403 })
    }

    const db = await getDb()
    const tasksCollection = db.collection<TaskDoc>("tasks")
    const categoriesCollection = db.collection<CategoryDoc>("categories")

    // First, create a sample category if none exist
    const existingCategories = await categoriesCollection.find({}).toArray()
    
    let sampleCategoryId = ""
    if (existingCategories.length === 0) {
      const sampleCategory = {
        name: "Web Development",
        description: "Learn web development skills and build amazing websites",
        photo: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=500&h=300&fit=crop",
        status: "active" as const,
        createdAt: new Date(),
      }
      
      const categoryResult = await categoriesCollection.insertOne(sampleCategory)
      sampleCategoryId = categoryResult.insertedId.toString()
    } else {
      sampleCategoryId = existingCategories[0]._id?.toString() || ""
    }

    // Create sample tasks
    const sampleTasks = [
      {
        challengeName: "Build a Personal Portfolio",
        description: "Create a beautiful personal portfolio website showcasing your skills and projects.",
        guidelines: "Use HTML, CSS, and JavaScript. Make it responsive and visually appealing.",
        submissionGuidelines: "Submit a link to your deployed portfolio or upload the source code.",
        points: 50,
        lastDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
        categoryId: sampleCategoryId,
        subcategory: "basic" as const,
        status: "published" as const,
        createdAt: new Date(),
      },
      {
        challengeName: "Create a Todo App",
        description: "Build a functional todo application with add, edit, delete, and mark complete features.",
        guidelines: "Use any framework or vanilla JavaScript. Include local storage functionality.",
        submissionGuidelines: "Submit a working demo link or upload the source code.",
        points: 75,
        lastDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        categoryId: sampleCategoryId,
        subcategory: "basic" as const,
        status: "published" as const,
        createdAt: new Date(),
      },
      {
        challengeName: "Build a Full-Stack E-commerce Platform",
        description: "Create a complete e-commerce platform with user authentication, product management, and payment integration.",
        guidelines: "Use modern frameworks like React/Next.js for frontend and Node.js for backend. Include database integration.",
        submissionGuidelines: "Submit a deployed application with working features and source code.",
        points: 200,
        lastDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000), // 60 days from now
        categoryId: sampleCategoryId,
        subcategory: "advanced" as const,
        status: "published" as const,
        createdAt: new Date(),
      }
    ]

    // Insert sample tasks
    const result = await tasksCollection.insertMany(sampleTasks)

    return NextResponse.json({
      ok: true,
      message: "Sample tasks created successfully",
      createdTasks: result.insertedCount,
      categoryId: sampleCategoryId
    })

  } catch (error) {
    console.error("[Launchpad] Migrate tasks error:", error)
    return NextResponse.json({ ok: false, message: "Internal server error" }, { status: 500 })
  }
}
