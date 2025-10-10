"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useApp } from "@/components/state/auth-context"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"

export default function ResourcesPage() {
  const { currentUser } = useApp()
  const router = useRouter()
  const [showComingSoon, setShowComingSoon] = useState(false)

  useEffect(() => {
    if (!currentUser) router.push("/login")
    if (currentUser?.email === "admin@admin.com") router.push("/admin/tasks")
  }, [currentUser, router])

  if (!currentUser || currentUser.email === "admin@admin.com") return null

  const handleCardClick = () => {
    setShowComingSoon(true)
  }

  const closeModal = () => {
    setShowComingSoon(false)
  }

  return (
    <div className="min-h-screen bg-background">
      <section className="mx-auto max-w-6xl px-4 pt-32 pb-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Resources</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Access valuable resources to help you on your entrepreneurial journey. 
            More resources are coming soon!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Resource Card 1 */}
          <div 
            className="bg-card border border-border rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer group"
            onClick={handleCardClick}
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-card-foreground mb-2">Resource 1</h3>
              <p className="text-muted-foreground mb-4">
                Essential business planning templates and guides to help you structure your startup journey.
              </p>
              <div className="text-sm text-primary font-medium group-hover:text-primary/80">
                Click to access →
              </div>
            </div>
          </div>

          {/* Resource Card 2 */}
          <div 
            className="bg-card border border-border rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer group"
            onClick={handleCardClick}
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-card-foreground mb-2">Resource 2</h3>
              <p className="text-muted-foreground mb-4">
                Marketing strategies and tools to help you reach your target audience effectively.
              </p>
              <div className="text-sm text-primary font-medium group-hover:text-primary/80">
                Click to access →
              </div>
            </div>
          </div>

          {/* Resource Card 3 */}
          <div 
            className="bg-card border border-border rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer group"
            onClick={handleCardClick}
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-card-foreground mb-2">Resource 3</h3>
              <p className="text-muted-foreground mb-4">
                Financial planning resources and funding guides to secure your startup's future.
              </p>
              <div className="text-sm text-primary font-medium group-hover:text-primary/80">
                Click to access →
              </div>
            </div>
          </div>
        </div>

        {/* Coming Soon Modal */}
        {showComingSoon && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-card border border-border rounded-xl shadow-2xl max-w-md w-full p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-card-foreground mb-2">Coming Soon!</h3>
              <p className="text-muted-foreground mb-6">
                We're working hard to bring you amazing resources. Stay tuned for updates!
              </p>
              <Button 
                onClick={closeModal}
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 rounded-lg font-medium"
              >
                Got it!
              </Button>
            </div>
          </div>
        )}
      </section>
    </div>
  )
}
