import { MongoClient, type Db } from "mongodb"

let cachedClient: MongoClient | null = null
let cachedDb: Db | null = null

export async function connectToDatabase(): Promise<{ client: MongoClient; db: Db }> {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb }
  }

  if (!process.env.MongoDBuri) {
    throw new Error("MongoDB URI not found in environment variables")
  }

  const client = new MongoClient(process.env.MongoDBuri, {
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
  })

  try {
    await client.connect()
    const db = client.db("Launchpad")
    
    cachedClient = client
    cachedDb = db
    
    return { client, db }
  } catch (error) {
    console.error("MongoDB connection error:", error)
    throw error
  }
}

export async function getDbAlt(): Promise<Db> {
  const { db } = await connectToDatabase()
  return db
}
