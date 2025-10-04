import type { ObjectId } from "mongodb"

export type SubmissionStatus = "pending" | "approved" | "rejected"

export interface UserDoc {
  _id?: ObjectId
  email: string
  password: string
  name: string
  profilePhoto: string
  points: number
  visitedTaskIds: string[]
  createdAt: Date
}

export interface TaskDoc {
  _id?: ObjectId
  title: string
  details: string
  image: string
  points: number
  status: "draft" | "published"
  createdAt: Date
}

export interface SubmissionDoc {
  _id?: ObjectId
  taskId: string
  userEmail: string
  fileName: string
  dataUrl: string
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

// Client-side types (without _id)
export type User = {
  id: string
  email: string
  name: string
  profilePhoto: string
  points: number
  visitedTaskIds: string[]
}

export type Task = {
  id: string
  title: string
  details: string
  image: string
  points: number
  status: "draft" | "published"
}

export type Submission = {
  id: string
  taskId: string
  userEmail: string
  fileName: string
  dataUrl: string
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
