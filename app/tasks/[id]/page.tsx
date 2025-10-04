"use client"
import { useEffect, useState } from "react"
import type React from "react"

import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { useApp, type Task, type Submission } from "@/components/state/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function TaskDetailPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const { currentUser, submitTask, setVisited, fetchTask, fetchSubmissions } = useApp()
  const [file, setFile] = useState<File | null>(null)
  const [task, setTask] = useState<Task | null>(null)
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!currentUser) router.push("/login")
    if (currentUser?.email === "admin@admin.com") router.push("/admin/tasks")
  }, [currentUser, router])

  useEffect(() => {
    if (currentUser && currentUser.email !== "admin@admin.com") {
      Promise.all([fetchTask(id), fetchSubmissions()]).then(([taskData, subsData]) => {
        setTask(taskData)
        setSubmissions(subsData.filter((s) => s.taskId === id))
        setLoading(false)
        if (taskData) setVisited(id)
      })
    }
  }, [id, currentUser, fetchTask, fetchSubmissions, setVisited])

  if (!currentUser || currentUser.email === "admin@admin.com") return null

  if (loading) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-8">
        <p className="text-muted-foreground">Loading task...</p>
      </section>
    )
  }

  if (!task) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-8">
        <p className="text-muted-foreground">Task not found.</p>
      </section>
    )
  }

  const mySubs = submissions.filter((s) => s.userEmail === currentUser.email)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) return
    const res = await submitTask(task.id, file)
    if (res.ok) {
      setFile(null)
      // Refresh submissions
      const subsData = await fetchSubmissions()
      setSubmissions(subsData.filter((s) => s.taskId === id))
    }
  }

  return (
    <section className="mx-auto max-w-3xl px-4 py-8 grid gap-6">
      <Link href="/tasks" className="text-sm hover:underline text-muted-foreground">
        ← Back to tasks
      </Link>
      <Card className="border-primary/40 shadow-[0_0_24px_-10px] shadow-primary/40">
        <CardHeader>
          <CardTitle className="text-balance">{task.title}</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Image
            src={task.image || "/placeholder.svg?height=240&width=640&query=neon%20task%20detail"}
            alt={task.title}
            width={960}
            height={480}
            className="rounded-md w-full h-56 object-cover"
          />
          <p className="text-muted-foreground leading-relaxed">{task.details}</p>
          <div className="text-sm">
            <span className="text-muted-foreground">Points: </span>
            <span className="text-primary font-medium">{task.points}</span>
          </div>
        </CardContent>
      </Card>

      <form onSubmit={onSubmit} className="grid gap-3 rounded-lg border border-primary/40 p-4">
        <label className="text-sm">Upload file</label>
        <Input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
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
