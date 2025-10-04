import { MongoClient, type Db } from "mongodb"

const options = {
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  bufferMaxEntries: 0,
  useNewUrlParser: true,
  useUnifiedTopology: true,
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
  console.log("MongoDB URI length:", uri.length)
  console.log("MongoDB URI starts with:", uri.substring(0, 20))

  try {
    if (process.env.NODE_ENV === "development") {
      // In development mode, use a global variable so that the value
      // is preserved across module reloads caused by HMR (Hot Module Replacement).
      if (!global._mongoClientPromise) {
        client = new MongoClient(uri, options)
        global._mongoClientPromise = client.connect()
      }
      return global._mongoClientPromise
    } else {
      // In production mode, it's best to not use a global variable.
      client = new MongoClient(uri, options)
      return client.connect()
    }
  } catch (error) {
    console.error("Failed to create MongoDB client:", error)
    throw new Error("Failed to connect to MongoDB database")
  }
}

export async function getDb(): Promise<Db> {
  const client = await getClientPromise()
  return client.db("Launchpad")
}

export default getClientPromise
