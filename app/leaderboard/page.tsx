"use client"
import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { useApp, type User } from "@/components/state/auth-context"

export default function LeaderboardPage() {
  const { currentUser, fetchLeaderboard, forceRefreshLeaderboard, isAdmin } = useApp()
  const router = useRouter()
  const [ranked, setRanked] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const lastUpdateRef = useRef<number>(0)

  useEffect(() => {
    if (!currentUser) router.push("/login")
  }, [currentUser, router])

  const loadLeaderboard = async (silent = false) => {
    if (!silent) setLoading(true)
    
    try {
      const users = await fetchLeaderboard()
      setRanked(users)
    } catch (error) {
      console.error("Failed to load leaderboard:", error)
    } finally {
      setLoading(false)
    }
  }

  const checkForUpdates = async () => {
    try {
      // Check if leaderboard was updated
      const res = await fetch('/api/leaderboard/last-updated')
      const data = await res.json()
      
      if (data.lastUpdated > lastUpdateRef.current) {
        console.log("[Leaderboard] New update detected, refreshing...", {
          lastKnown: new Date(lastUpdateRef.current).toISOString(),
          newUpdate: new Date(data.lastUpdated).toISOString(),
        })
        lastUpdateRef.current = data.lastUpdated
        await loadLeaderboard(true) // Silent refresh
      }
    } catch (error) {
      console.error("Failed to check for updates:", error)
    }
  }

  useEffect(() => {
    if (currentUser) {
      // Initialize last update timestamp
      fetch('/api/leaderboard/last-updated')
        .then(res => res.json())
        .then(data => {
          lastUpdateRef.current = data.lastUpdated
        })
        .catch(console.error)
      
      loadLeaderboard()
      
      // Set up polling for updates (check every 2 seconds for non-admin users)
      if (!isAdmin) {
        intervalRef.current = setInterval(() => {
          checkForUpdates()
        }, 2000) // Check every 2 seconds
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [currentUser, isAdmin])

  // Listen for leaderboard update events and tab visibility changes
  useEffect(() => {
    const handleLeaderboardUpdate = () => {
      console.log("Leaderboard update event received - checking for updates")
      checkForUpdates()
    }

    // Refresh when user returns to tab (in case they missed updates)
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        console.log("Tab became visible - checking for updates")
        checkForUpdates()
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
      console.log("Window focused - checking for updates")
      checkForUpdates()
    })
    
    return () => {
      window.removeEventListener('leaderboard-updated', handleLeaderboardUpdate)
      window.removeEventListener('storage', handleLeaderboardUpdate)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('focus', handleLeaderboardUpdate)
    }
  }, [])

  if (!currentUser) return null

  if (loading) {
    return (
      <section className="mx-auto max-w-3xl px-4 sm:px-6 pt-32 pb-10">
        <div className="text-center">
          <p className="text-muted-foreground">Loading leaderboard...</p>
        </div>
      </section>
    )
  }


  const refreshLeaderboard = async () => {
    console.log("[Admin] Manual refresh triggered")
    setLoading(true)
    try {
      // Use force refresh for admin users
      const users = await forceRefreshLeaderboard()
      setRanked(users)
      // Update local timestamp
      const res = await fetch('/api/leaderboard/last-updated')
      const data = await res.json()
      lastUpdateRef.current = data.lastUpdated
      console.log("[Admin] Manual refresh completed, timestamp updated")
    } catch (error) {
      console.error("[Admin] Manual refresh failed:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="mx-auto max-w-3xl px-4 sm:px-6 pt-32 pb-10">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <h1 className="text-xl sm:text-2xl font-semibold text-center sm:text-left">Leaderboard</h1>
        {isAdmin && (
          <button
            onClick={refreshLeaderboard}
            disabled={loading}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 w-full sm:w-auto"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></div>
                Loading...
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
        )}
      </div>
      <ul className="grid gap-3">
        {ranked.map((u, idx) => (
          <li key={u.email} className="flex items-center justify-between rounded-lg border border-border bg-card px-3 sm:px-4 py-3 sm:py-4 hover:shadow-md transition-shadow overflow-hidden">
            <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-1">
              {/* Rank */}
              <div className="flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-primary text-primary-foreground font-bold text-xs sm:text-sm flex-shrink-0">
                {idx + 1}
              </div>
              
              {/* Profile Photo */}
              <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full overflow-hidden bg-muted flex items-center justify-center flex-shrink-0">
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
                  <span className="text-sm sm:text-lg font-medium text-muted-foreground">
                    {u.name.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              
              {/* User Info */}
              <div className="flex flex-col min-w-0 flex-1">
                <span className="text-xs sm:text-sm text-primary bg-primary/10 px-1 sm:px-2 py-1 rounded-md inline-block w-fit break-all">
                  {u.uniqueId}
                </span>
              </div>
            </div>
            
            {/* Points */}
            <div className="text-right flex-shrink-0 ml-2">
              <span className="text-lg sm:text-2xl font-bold text-primary">{u.points}</span>
              <div className="text-xs text-muted-foreground">points</div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
