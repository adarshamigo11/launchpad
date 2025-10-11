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

export type Category = {
  id: string
  name: string
  description: string
  photo: string
  status: "active" | "inactive"
}
