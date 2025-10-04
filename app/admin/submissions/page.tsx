"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useApp, type Submission, type Task, type User } from "@/components/state/auth-context"
import { Button } from "@/components/ui/button"

export default function AdminSubmissionsPage() {
  const { currentUser, isAdmin, approveSubmission, rejectSubmission, fetchSubmissions, fetchTasks, fetchLeaderboard } =
    useApp()
  const router = useRouter()
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [tasks, setTasks] = useState<Task[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!currentUser) router.push("/login")
    if (currentUser && !isAdmin) router.push("/tasks")
  }, [currentUser, isAdmin, router])

  useEffect(() => {
    if (currentUser && isAdmin) {
      loadData()
    }
  }, [currentUser, isAdmin])

  const loadData = async () => {
    const [subsData, tasksData, usersData] = await Promise.all([fetchSubmissions(), fetchTasks(), fetchLeaderboard()])
    setSubmissions(subsData.sort((a, b) => b.createdAt - a.createdAt))
    setTasks(tasksData)
    setUsers(usersData)
    setLoading(false)
  }

  if (!currentUser || !isAdmin) return null

  if (loading) {
    return (
      <section className="mx-auto max-w-5xl px-4 py-8">
        <p className="text-muted-foreground">Loading submissions...</p>
      </section>
    )
  }

  const onApprove = async (id: string) => {
    await approveSubmission(id)
    await loadData()
  }

  const onReject = async (id: string) => {
    await rejectSubmission(id)
    await loadData()
  }

  return (
    <section className="mx-auto max-w-5xl px-4 py-8 grid gap-6">
      <h1 className="text-2xl font-semibold">Submissions</h1>
      {submissions.length === 0 ? (
        <p className="text-sm text-muted-foreground">No submissions yet.</p>
      ) : (
        <ul className="grid gap-2">
          {submissions.map((s) => {
            const user = users.find((u) => u.email === s.userEmail)
            const task = tasks.find((t) => t.id === s.taskId)
            return (
              <li
                key={s.id}
                className={`rounded-md border px-4 py-3 ${
                  s.status === "approved"
                    ? "border-primary bg-primary/10"
                    : s.status === "rejected"
                      ? "border-destructive bg-destructive/10"
                      : "border-accent bg-accent/10"
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="grid">
                    <span className="text-sm">
                      {user?.name} — {user?.email}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Task: {task?.title} ({task?.points} pts)
                    </span>
                  </div>
                  <a href={s.dataUrl} download={s.fileName} className="text-xs underline">
                    Download
                  </a>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <Button
                    size="sm"
                    className="bg-primary text-primary-foreground"
                    disabled={s.status !== "pending"}
                    onClick={() => onApprove(s.id)}
                  >
                    Approve
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-destructive/50 text-destructive hover:bg-destructive hover:text-destructive-foreground bg-transparent"
                    disabled={s.status !== "pending"}
                    onClick={() => onReject(s.id)}
                  >
                    Reject
                  </Button>
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}
