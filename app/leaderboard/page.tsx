"use client"
import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { useApp, type User } from "@/components/state/auth-context"

export default function LeaderboardPage() {
  const { currentUser, fetchLeaderboard } = useApp()
  const router = useRouter()
  const [ranked, setRanked] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (!currentUser) router.push("/login")
    if (currentUser?.email === "admin@admin.com") router.push("/admin/tasks")
  }, [currentUser, router])

  const loadLeaderboard = async (silent = false) => {
    if (!silent) setLoading(true)
    else setUpdating(true)
    
    try {
      const users = await fetchLeaderboard()
      setRanked(users)
    } catch (error) {
      console.error("Failed to load leaderboard:", error)
    } finally {
      setLoading(false)
      setUpdating(false)
    }
  }

  useEffect(() => {
    if (currentUser && currentUser.email !== "admin@admin.com") {
      loadLeaderboard()
      
      // Set up polling every 3 seconds for real-time updates
      intervalRef.current = setInterval(() => {
        loadLeaderboard(true) // Silent refresh
      }, 3000)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [currentUser, fetchLeaderboard])

  // Listen for leaderboard update events from admin actions (immediate updates)
  useEffect(() => {
    const handleLeaderboardUpdate = () => {
      console.log("Leaderboard update event received - immediate refresh")
      // Force immediate refresh without delay
      loadLeaderboard(true) // Silent refresh
    }

    // Refresh when user returns to tab (in case they missed updates)
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        console.log("Tab became visible - refreshing leaderboard")
        loadLeaderboard(true)
      }
    }

    // Listen for both custom events and storage events (for cross-tab communication)
    window.addEventListener('leaderboard-updated', handleLeaderboardUpdate)
    window.addEventListener('storage', (e) => {
      if (e.key === 'leaderboard-updated') {
        console.log("Cross-tab leaderboard update detected")
        handleLeaderboardUpdate()
      }
    })
    document.addEventListener('visibilitychange', handleVisibilityChange)
    // Also refresh when window gains focus (user switches back to tab)
    window.addEventListener('focus', () => {
      console.log("Window focused - refreshing leaderboard")
      loadLeaderboard(true)
    })
    
    return () => {
      window.removeEventListener('leaderboard-updated', handleLeaderboardUpdate)
      window.removeEventListener('storage', handleLeaderboardUpdate)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('focus', handleLeaderboardUpdate)
    }
  }, [])

  if (!currentUser || currentUser.email === "admin@admin.com") return null

  if (loading) {
    return (
      <section className="mx-auto max-w-3xl px-4 pt-32 pb-10">
        <p className="text-muted-foreground">Loading leaderboard...</p>
      </section>
    )
  }

  const refreshLeaderboard = async () => {
    await loadLeaderboard()
  }

  return (
    <section className="mx-auto max-w-3xl px-4 pt-32 pb-10">
      {/* Update Notification */}
      {updating && (
        <div className="fixed top-20 right-4 z-50 bg-primary text-primary-foreground px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 animate-in slide-in-from-right duration-300">
          <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></div>
          <span className="text-sm font-medium">Leaderboard updating...</span>
        </div>
      )}
      
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Leaderboard</h1>
          {updating && (
            <p className="text-sm text-muted-foreground">
              Updating...
            </p>
          )}
        </div>
        <button
          onClick={refreshLeaderboard}
          disabled={updating}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {updating ? (
            <>
              <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></div>
              Updating...
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Refresh
            </>
          )}
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
