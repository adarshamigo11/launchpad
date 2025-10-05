import { getDb } from './mongodb'
import type { UserDoc } from './models'

export async function generateUniqueId(): Promise<string> {
  const db = await getDb()
  const usersCollection = db.collection<UserDoc>("users")
  
  // Get all users with uniqueId to find the highest number
  const users = await usersCollection
    .find({ uniqueId: { $exists: true, $regex: /^LP\d{3}$/ } })
    .toArray()
  
  if (users.length === 0) {
    return "LP001"
  }
  
  // Extract numbers and find the maximum
  let maxNumber = 0
  for (const user of users) {
    const number = parseInt(user.uniqueId.replace("LP", ""))
    if (number > maxNumber) {
      maxNumber = number
    }
  }
  
  const nextNumber = maxNumber + 1
  return `LP${nextNumber.toString().padStart(3, "0")}`
}
