"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
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
      <ul className="grid gap-3">
        {ranked.map((u, idx) => (
          <li key={u.email} className="flex items-center justify-between rounded-lg border border-border bg-card px-4 py-4 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              {/* Rank */}
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold text-sm">
                {idx + 1}
              </div>
              
              {/* Profile Photo */}
              <div className="w-12 h-12 rounded-full overflow-hidden bg-muted flex items-center justify-center">
                {u.profilePhoto && u.profilePhoto !== "/placeholder-user.jpg" && !u.profilePhoto.startsWith("/placeholder") ? (
                  <Image
                    src={u.profilePhoto}
                    alt={`${u.name}'s profile`}
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                    unoptimized
                  />
                ) : (
                  <span className="text-lg font-medium text-muted-foreground">
                    {u.name.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              
              {/* User Info */}
              <div className="flex flex-col">
                <span className="text-sm text-primary bg-primary/10 px-2 py-1 rounded-md inline-block w-fit">
                  {u.uniqueId}
                </span>
              </div>
            </div>
            
            {/* Points */}
            <div className="text-right">
              <span className="text-2xl font-bold text-primary">{u.points}</span>
              <div className="text-xs text-muted-foreground">points</div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
