import { MongoClient } from "mongodb"
import { config } from "dotenv"

// Load environment variables from .env file
config()

const uri = process.env.MongoDBuri

if (!uri) {
  console.error("MongoDBuri environment variable is not set")
  process.exit(1)
}

async function seedAdmin() {
  const client = new MongoClient(uri)

  try {
    await client.connect()
    console.log("Connected to MongoDB")

    const db = client.db("Launchpad")
    const usersCollection = db.collection("users")

    // Check if admin exists
    const existingAdmin = await usersCollection.findOne({ email: "admin@admin.com" })

    if (existingAdmin) {
      console.log("Admin user already exists")
    } else {
      // Create admin user
      await usersCollection.insertOne({
        email: "admin@admin.com",
        password: "123",
        name: "Admin",
        profilePhoto: "/placeholder-user.jpg",
        points: 0,
        visitedTaskIds: [],
        createdAt: new Date(),
      })
      console.log("Admin user created successfully")
    }
  } catch (error) {
    console.error("Error seeding admin:", error)
  } finally {
    await client.close()
    console.log("Disconnected from MongoDB")
  }
}

seedAdmin()
