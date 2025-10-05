"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useApp, type User } from "@/components/state/auth-context"

export default function LeaderboardPage() {
  const { currentUser, fetchLeaderboard } = useApp()
  const router = useRouter()
  const [ranked, setRanked] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!currentUser) router.push("/login")
    if (currentUser?.email === "admin@admin.com") router.push("/admin/tasks")
  }, [currentUser, router])

  useEffect(() => {
    if (currentUser && currentUser.email !== "admin@admin.com") {
      fetchLeaderboard().then((users) => {
        setRanked(users)
        setLoading(false)
      })
    }
  }, [currentUser, fetchLeaderboard])

  if (!currentUser || currentUser.email === "admin@admin.com") return null

  if (loading) {
    return (
      <section className="mx-auto max-w-3xl px-4 pt-32 pb-10">
        <p className="text-muted-foreground">Loading leaderboard...</p>
      </section>
    )
  }

  const refreshLeaderboard = async () => {
    setLoading(true)
    const users = await fetchLeaderboard()
    setRanked(users)
    setLoading(false)
  }

  return (
    <section className="mx-auto max-w-3xl px-4 pt-32 pb-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Leaderboard</h1>
        <button
          onClick={refreshLeaderboard}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
        >
          Refresh
        </button>
      </div>
      <ul className="grid gap-2">
        {ranked.map((u, idx) => (
          <li key={u.email} className="flex items-center justify-between rounded-md border border-primary/40 px-4 py-3">
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground w-6">{idx + 1}.</span>
              <span className="text-sm font-medium text-primary bg-primary/10 px-2 py-1 rounded-md">
                {u.uniqueId}
              </span>
            </div>
            <span className="text-primary font-semibold">{u.points}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
