import type { ObjectId } from "mongodb"

export type SubmissionStatus = "pending" | "approved" | "rejected"

export interface UserDoc {
  _id?: ObjectId
  email: string
  password: string
  name: string
  phone: string
  profilePhoto: string
  points: number
  visitedTaskIds: string[]
  uniqueId: string
  createdAt: Date
}

export interface TaskDoc {
  _id?: ObjectId
  challengeName: string
  description: string
  guidelines: string
  submissionGuidelines: string
  points: number
  lastDate: Date
  categoryId: string
  subcategory: "basic" | "advanced"
  status: "draft" | "published"
  createdAt: Date
}

export interface SubmissionDoc {
  _id?: ObjectId
  taskId: string
  userEmail: string
  fileName: string
  dataUrl: string
  message: string
  status: SubmissionStatus
  createdAt: Date
}

export interface MessageDoc {
  _id?: ObjectId
  name: string
  mobile: string
  email: string
  message: string
  status: "unread" | "read" | "replied"
  createdAt: Date
}

export interface CategoryDoc {
  _id?: ObjectId
  name: string
  description: string
  photo: string
  status: "active" | "inactive"
  price: number // Price in INR (0 means free)
  createdAt: Date
}

export interface PasswordResetDoc {
  _id?: ObjectId
  email: string
  token: string
  expiresAt: Date
  used: boolean
  createdAt: Date
}

// Client-side types (without _id)
export type User = {
  id: string
  email: string
  name: string
  phone: string
  profilePhoto: string
  points: number
  visitedTaskIds: string[]
  uniqueId: string
}

export type Task = {
  id: string
  challengeName: string
  description: string
  guidelines: string
  submissionGuidelines: string
  points: number
  lastDate: number
  categoryId: string
  subcategory: "basic" | "advanced"
  status: "draft" | "published"
}

export type Submission = {
  id: string
  taskId: string
  userEmail: string
  fileName: string
  dataUrl: string
  message: string
  status: SubmissionStatus
  createdAt: number
}

export type Message = {
  id: string
  name: string
  mobile: string
  email: string
  message: string
  status: "unread" | "read" | "replied"
  createdAt: number
}

export interface PaymentDoc {
  _id?: ObjectId
  userId: string
  userEmail: string
  categoryId: string
  amount: number
  transactionId: string // PhonePe transaction ID
  phonepeTransactionId?: string // PhonePe's transaction ID
  status: "pending" | "success" | "failed" | "cancelled"
  paymentMethod: string
  createdAt: Date
  updatedAt: Date
}

export interface CategoryAccessDoc {
  _id?: ObjectId
  userId: string
  userEmail: string
  categoryId: string
  paymentId: string // Reference to PaymentDoc
  accessGranted: boolean
  accessGrantedAt: Date
  createdAt: Date
}

export type Category = {
  id: string
  name: string
  description: string
  photo: string
  status: "active" | "inactive"
  price: number
}

export type Payment = {
  id: string
  userId: string
  userEmail: string
  categoryId: string
  amount: number
  transactionId: string
  status: "pending" | "success" | "failed" | "cancelled"
  createdAt: number
}

export type CategoryAccess = {
  id: string
  userId: string
  userEmail: string
  categoryId: string
  accessGranted: boolean
  accessGrantedAt: number
}
