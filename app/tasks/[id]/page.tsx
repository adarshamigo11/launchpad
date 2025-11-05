"use client"
import { useEffect, useState } from "react"
import type React from "react"

import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { useApp, type Task, type Submission } from "@/components/state/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function TaskDetailPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const { currentUser, submitTask, setVisited, fetchTask, fetchSubmissions, fetchCategories } = useApp()
  const [file, setFile] = useState<File | null>(null)
  const [message, setMessage] = useState("")
  const [task, setTask] = useState<Task | null>(null)
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [loading, setLoading] = useState(true)
  const [hasAccess, setHasAccess] = useState<boolean | null>(null)

  useEffect(() => {
    if (!currentUser) router.push("/login")
    if (currentUser?.email === "admin@admin.com") router.push("/admin/tasks")
  }, [currentUser, router])

  useEffect(() => {
    if (currentUser && currentUser.email !== "admin@admin.com") {
      Promise.all([fetchTask(id), fetchSubmissions(), fetchCategories()]).then(([taskData, subsData, categoriesData]) => {
        setTask(taskData)
        setSubmissions(subsData.filter((s) => s.taskId === id))
        
        // Check access to category
        if (taskData) {
          const category = categoriesData.find((c) => c.id === taskData.categoryId)
          if (category) {
            const isFree = !category.price || category.price === 0
            if (!isFree) {
              // Check access status
              fetch("/api/payments/check-access", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  userId: currentUser.id,
                  categoryId: category.id,
                }),
              })
                .then((res) => res.json())
                .then((data) => {
                  setHasAccess(data.ok && data.hasAccess)
                })
                .catch(() => setHasAccess(false))
            } else {
              setHasAccess(true) // Free category
            }
          } else {
            setHasAccess(true) // Category not found, allow access
          }
          setVisited(id)
        }
        setLoading(false)
      })
    }
  }, [id, currentUser, fetchTask, fetchSubmissions, fetchCategories, setVisited])

  if (!currentUser || currentUser.email === "admin@admin.com") return null

  if (loading) {
    return (
      <section className="mx-auto max-w-3xl px-4 pt-32 pb-8">
        <p className="text-muted-foreground">Loading task...</p>
      </section>
    )
  }

  if (!task) {
    return (
      <section className="mx-auto max-w-3xl px-4 pt-32 pb-8">
        <p className="text-muted-foreground">Task not found.</p>
      </section>
    )
  }

  // Check access - show locked message if user doesn't have access
  if (hasAccess === false) {
    return (
      <section className="mx-auto max-w-3xl px-4 pt-32 pb-8">
        <Card className="border-destructive/40">
          <CardHeader>
            <CardTitle className="text-destructive">🔒 Access Restricted</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              You need to purchase access to this category to view and submit tasks.
            </p>
            <Link href="/tasks">
              <Button>Go Back to Categories</Button>
            </Link>
          </CardContent>
        </Card>
      </section>
    )
  }

  const mySubs = submissions.filter((s) => s.userEmail === currentUser.email)

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const isExpired = (timestamp: number) => {
    return new Date(timestamp) < new Date()
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) return
    const res = await submitTask(task.id, file, message)
    if (res.ok) {
      setFile(null)
      setMessage("")
      // Refresh submissions
      const subsData = await fetchSubmissions()
      setSubmissions(subsData.filter((s) => s.taskId === id))
    }
  }

  return (
    <section className="mx-auto max-w-3xl px-4 pt-32 pb-8 grid gap-6">
      <Link href="/tasks" className="text-sm hover:underline text-muted-foreground">
        ← Back to tasks
      </Link>
      <Card className="border-primary/40 shadow-[0_0_24px_-10px] shadow-primary/40">
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <CardTitle className="text-balance text-xl">{task.challengeName}</CardTitle>
            <div className="flex items-center gap-2">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                task.category === "basic" 
                  ? "bg-blue-100 text-blue-800" 
                  : "bg-yellow-100 text-yellow-800"
              }`}>
                {task.category}
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Points:</span>
              <span className="text-primary font-semibold">{task.points}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Deadline:</span>
              <span className={`font-medium ${isExpired(task.lastDate) ? 'text-red-600' : 'text-green-600'}`}>
                {formatDate(task.lastDate)}
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-muted-foreground leading-relaxed">{task.description}</p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Guidelines</h3>
              <p className="text-muted-foreground leading-relaxed">{task.guidelines}</p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Submission Guidelines</h3>
              <p className="text-muted-foreground leading-relaxed">{task.submissionGuidelines}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <form onSubmit={onSubmit} className="grid gap-3 rounded-lg border border-primary/40 p-4">
        <div className="grid gap-2">
          <label className="text-sm font-medium">Upload file</label>
          <Input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
        </div>
        <div className="grid gap-2">
          <label className="text-sm font-medium">Message (Optional)</label>
          <Textarea 
            placeholder="Add a message to explain your submission or provide additional context..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={3}
            maxLength={500}
          />
          <p className="text-xs text-muted-foreground">{message.length}/500 characters</p>
        </div>
        <Button type="submit" className="bg-primary text-primary-foreground">
          Submit
        </Button>
      </form>

      <div className="grid gap-3">
        <h3 className="font-medium">Previous Submissions</h3>
        {mySubs.length === 0 ? (
          <p className="text-sm text-muted-foreground">No submissions yet.</p>
        ) : (
          <ul className="grid gap-2">
            {mySubs.map((s) => (
              <li
                key={s.id}
                className={`rounded-md p-3 border ${
                  s.status === "approved"
                    ? "border-primary bg-primary/10"
                    : s.status === "rejected"
                      ? "border-destructive bg-destructive/10"
                      : "border-accent bg-accent/10"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm">
                    {s.fileName} —{" "}
                    {s.status === "approved" ? "Approved" : s.status === "rejected" ? "Rejected" : "Submitted"}
                  </span>
                  <a href={s.dataUrl} download={s.fileName} className="text-xs underline hover:no-underline">
                    Download
                  </a>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
