import { MongoClient, type Db } from "mongodb"

const options = {
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 30000,
  socketTimeoutMS: 45000,
  connectTimeoutMS: 30000,
  tls: true,
  // Remove development-only settings for production
  // tlsAllowInvalidCertificates: true, // Remove for production
  // tlsAllowInvalidHostnames: true, // Remove for production
}

let client: MongoClient
let clientPromise: Promise<MongoClient>

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined
}

function getClientPromise(): Promise<MongoClient> {
  if (!process.env.MongoDBuri) {
    console.error("MongoDB URI not found in environment variables")
    throw new Error("MongoDB URI not configured. Please add MongoDBuri to environment variables.")
  }

  const uri = process.env.MongoDBuri
  // Removed sensitive logging of MongoDB URI

  try {
    if (process.env.NODE_ENV === "development") {
      // In development mode, use a global variable so that the value
      // is preserved across module reloads caused by HMR (Hot Module Replacement).
      if (!global._mongoClientPromise) {
        // For development, we might need to allow invalid certificates
        const devOptions = {
          ...options,
          tlsAllowInvalidCertificates: true, // Temporarily allow for development
          tlsAllowInvalidHostnames: true, // Temporarily allow for development
        }
        client = new MongoClient(uri, devOptions)
        global._mongoClientPromise = client.connect()
      }
      return global._mongoClientPromise
    } else {
      // In production mode, it's best to not use a global variable.
      // Use strict TLS settings for production
      client = new MongoClient(uri, options)
      return client.connect()
    }
  } catch (error) {
    console.error("Failed to create MongoDB client:", error)
    console.error("Error details:", {
      message: error instanceof Error ? error.message : "Unknown error",
      code: (error as any)?.code,
      name: (error as any)?.name,
      stack: error instanceof Error ? error.stack : "No stack"
    })
    throw error // Re-throw the original error instead of a generic one
  }
}

export async function getDb(): Promise<Db> {
  const client = await getClientPromise()
  return client.db("Launchpad")
}

export default getClientPromise