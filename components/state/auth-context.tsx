"use client"
import { createContext, useCallback, useContext, useEffect, useState } from "react"
import type React from "react"

export type User = {
  id: string
  email: string
  name: string
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
  category: "basic" | "advanced"
  status: "draft" | "published"
}

export type Submission = {
  id: string
  taskId: string
  userEmail: string
  fileName: string
  dataUrl: string
  message: string
  status: "pending" | "approved" | "rejected"
  createdAt: number
}

type Ctx = {
  currentUser: User | null
  isAdmin: boolean
  login: (email: string, password: string) => Promise<{ ok: boolean; message?: string }>
  signup: (email: string, password: string, name: string) => Promise<{ ok: boolean; message?: string }>
  logout: () => void
  refreshUser: () => Promise<void>
  fetchTasks: () => Promise<Task[]>
  fetchTask: (id: string) => Promise<Task | null>
  publishTask: (payload: Omit<Task, "id" | "status">) => Promise<void>
  deleteTask: (id: string) => Promise<void>
  submitTask: (taskId: string, file: File, message: string) => Promise<{ ok: boolean; message?: string }>
  setVisited: (taskId: string) => Promise<void>
  fetchSubmissions: () => Promise<Submission[]>
  approveSubmission: (submissionId: string) => Promise<void>
  rejectSubmission: (submissionId: string) => Promise<void>
  fetchLeaderboard: () => Promise<User[]>
}

const AppContext = createContext<Ctx | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // No persistent login - users must login each time
  useEffect(() => {
    setLoading(false)
  }, [])

  const isAdmin = currentUser?.email === "admin@admin.com"

  const signup: Ctx["signup"] = useCallback(async (email, password, name) => {
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name }),
      })
      const data = await res.json()
      return data
    } catch (error) {
      console.error("[Launchpad] Signup error:", error)
      return { ok: false, message: "Network error" }
    }
  }, [])

  const login: Ctx["login"] = useCallback(async (email, password) => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()
      if (data.ok) {
        setCurrentUser(data.user)
        // No localStorage - session only
      }
      return data
    } catch (error) {
      console.error("[Launchpad] Login error:", error)
      return { ok: false, message: "Network error" }
    }
  }, [])

  const logout = useCallback(() => {
    setCurrentUser(null)
    // No localStorage to clear - session only
  }, [])

  const refreshUser = useCallback(async () => {
    if (!currentUser) return
    try {
      const res = await fetch("/api/auth/me", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: currentUser.email }),
      })
      const data = await res.json()
      if (data.ok) {
        setCurrentUser(data.user)
      }
    } catch (error) {
      console.error("[Launchpad] Refresh user error:", error)
    }
  }, [currentUser])

  const fetchTasks: Ctx["fetchTasks"] = useCallback(async () => {
    try {
      const res = await fetch("/api/tasks")
      const data = await res.json()
      return data.ok ? data.tasks : []
    } catch (error) {
      console.error("[Launchpad] Fetch tasks error:", error)
      return []
    }
  }, [])

  const fetchTask: Ctx["fetchTask"] = useCallback(async (id: string) => {
    try {
      const res = await fetch(`/api/tasks/${id}`)
      const data = await res.json()
      return data.ok ? data.task : null
    } catch (error) {
        console.error("[Launchpad] Fetch task error:", error)
      return null
    }
  }, [])

  const publishTask: Ctx["publishTask"] = useCallback(
    async (payload) => {
      if (!currentUser) return { ok: false, message: "Not logged in" }
      try {
        const response = await fetch("/api/tasks", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...payload, userEmail: currentUser.email }),
        })
        const result = await response.json()
        return result
      } catch (error) {
        console.error("[Launchpad] Publish task error:", error)
        return { ok: false, message: "Network error" }
      }
    },
    [currentUser],
  )

  const deleteTask: Ctx["deleteTask"] = useCallback(
    async (id) => {
      if (!currentUser) return
      try {
        await fetch(`/api/tasks/${id}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userEmail: currentUser.email }),
        })
      } catch (error) {
        console.error("[Launchpad] Delete task error:", error)
      }
    },
    [currentUser],
  )

  const fileToDataUrl = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(String(reader.result))
      reader.onerror = reject
      reader.readAsDataURL(file)
    })

  const submitTask: Ctx["submitTask"] = useCallback(
    async (taskId, file, message) => {
      if (!currentUser) return { ok: false, message: "Not logged in" }
      try {
        const dataUrl = await fileToDataUrl(file)
        const res = await fetch("/api/submissions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            taskId,
            userEmail: currentUser.email,
            fileName: file.name,
            dataUrl,
            message: message || "",
          }),
        })
        const data = await res.json()
        return data
      } catch (error) {
        console.error("[Launchpad] Submit task error:", error)
        return { ok: false, message: "Network error" }
      }
    },
    [currentUser],
  )

  const setVisited: Ctx["setVisited"] = useCallback(
    async (taskId) => {
      if (!currentUser) return
      try {
        await fetch("/api/users/visited", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userEmail: currentUser.email, taskId }),
        })
        await refreshUser()
      } catch (error) {
        console.error("[Launchpad] Set visited error:", error)
      }
    },
    [currentUser, refreshUser],
  )

  const fetchSubmissions: Ctx["fetchSubmissions"] = useCallback(async () => {
    if (!currentUser) return []
    try {
      const res = await fetch(`/api/submissions?userEmail=${currentUser.email}`)
      const data = await res.json()
      return data.ok ? data.submissions : []
    } catch (error) {
      console.error("[Launchpad] Fetch submissions error:", error)
      return []
    }
  }, [currentUser])

  const approveSubmission: Ctx["approveSubmission"] = useCallback(
    async (submissionId) => {
      if (!currentUser) return
      try {
        await fetch(`/api/submissions/${submissionId}/approve`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userEmail: currentUser.email }),
        })
      } catch (error) {
        console.error("[Launchpad] Approve submission error:", error)
      }
    },
    [currentUser],
  )

  const rejectSubmission: Ctx["rejectSubmission"] = useCallback(
    async (submissionId) => {
      if (!currentUser) return
      try {
        await fetch(`/api/submissions/${submissionId}/reject`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userEmail: currentUser.email }),
        })
      } catch (error) {
        console.error("[Launchpad] Reject submission error:", error)
      }
    },
    [currentUser],
  )

  const fetchLeaderboard: Ctx["fetchLeaderboard"] = useCallback(async () => {
    try {
      const res = await fetch("/api/leaderboard")
      const data = await res.json()
      return data.ok ? data.users : []
    } catch (error) {
      console.error("[Launchpad] Fetch leaderboard error:", error)
      return []
    }
  }, [])

  const value: Ctx = {
    currentUser,
    isAdmin: !!isAdmin,
    login,
    signup,
    logout,
    refreshUser,
    fetchTasks,
    fetchTask,
    publishTask,
    deleteTask,
    submitTask,
    setVisited,
    fetchSubmissions,
    approveSubmission,
    rejectSubmission,
    fetchLeaderboard,
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    )
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error("useApp must be used within AuthProvider")
  return ctx
}
