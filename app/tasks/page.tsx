"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useApp, type Task } from "@/components/state/auth-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function TasksPage() {
  const { currentUser, fetchTasks } = useApp()
  const router = useRouter()
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<"basic" | "advanced" | null>(null)

  useEffect(() => {
    if (!currentUser) router.push("/login")
    if (currentUser?.email === "admin@admin.com") router.push("/admin/tasks")
  }, [currentUser, router])

  useEffect(() => {
    if (currentUser && currentUser.email !== "admin@admin.com") {
      fetchTasks().then((data) => {
        setTasks(data)
        setLoading(false)
      })
    }
  }, [currentUser, fetchTasks])

  if (!currentUser || currentUser.email === "admin@admin.com") return null

  if (loading) {
    return (
      <section className="mx-auto max-w-6xl px-4 pt-32 pb-8">
        <p className="text-muted-foreground">Loading tasks...</p>
      </section>
    )
  }

  const basicTasks = tasks.filter(task => task.category === "basic")
  const advancedTasks = tasks.filter(task => task.category === "advanced")

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

  if (selectedCategory) {
    const categoryTasks = selectedCategory === "basic" ? basicTasks : advancedTasks
    const categoryName = selectedCategory === "basic" ? "Basic" : "Advanced"
    
    return (
      <section className="mx-auto max-w-6xl px-4 pt-32 pb-8">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => setSelectedCategory(null)}
            className="text-primary hover:text-primary/80 font-medium"
          >
            ← Back to Categories
          </button>
          <h1 className="text-2xl font-semibold">{categoryName} Challenges</h1>
        </div>
        
        {categoryTasks.length === 0 ? (
          <p className="text-muted-foreground">No {categoryName.toLowerCase()} challenges available yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryTasks.map((task) => (
              <Link key={task.id} href={`/tasks/${task.id}`}>
                <Card className="border-primary/40 hover:border-primary transition-colors shadow-lg hover:shadow-xl">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="text-lg font-semibold">{task.challengeName}</CardTitle>
                      <Badge 
                        variant={task.category === "basic" ? "default" : "secondary"}
                        className={task.category === "basic" ? "bg-blue-100 text-blue-800" : "bg-yellow-100 text-yellow-800"}
                      >
                        {task.category}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground line-clamp-3">{task.description}</p>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Points</span>
                      <span className="text-primary font-semibold">{task.points}</span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Deadline</span>
                      <span className={`font-medium ${isExpired(task.lastDate) ? 'text-red-600' : 'text-green-600'}`}>
                        {formatDate(task.lastDate)}
                      </span>
                    </div>
                    
                    <div className="text-xs">
                      {(currentUser.visitedTaskIds || []).includes(task.id) ? (
                        <span className="px-2 py-1 rounded bg-green-100 text-green-800">Visited</span>
                      ) : (
                        <span className="px-2 py-1 rounded bg-primary/20 text-primary">Not Visited</span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </section>
    )
  }

  return (
    <section className="mx-auto max-w-6xl px-4 pt-32 pb-8">
      <h1 className="text-2xl font-semibold mb-6">Challenge Categories</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card 
          className="border-blue-200 hover:border-blue-400 transition-colors cursor-pointer shadow-lg hover:shadow-xl"
          onClick={() => setSelectedCategory("basic")}
        >
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🎯</span>
            </div>
            <CardTitle className="text-xl text-blue-800">Basic Challenges</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground mb-4">
              Perfect for beginners starting their entrepreneurial journey. Build foundational skills and confidence.
            </p>
            <div className="flex items-center justify-center gap-2">
              <Badge variant="outline" className="border-blue-200 text-blue-800">
                {basicTasks.length} Challenges
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card 
          className="border-yellow-200 hover:border-yellow-400 transition-colors cursor-pointer shadow-lg hover:shadow-xl"
          onClick={() => setSelectedCategory("advanced")}
        >
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🚀</span>
            </div>
            <CardTitle className="text-xl text-yellow-800">Advanced Challenges</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground mb-4">
              For experienced entrepreneurs ready to scale their business and take on complex challenges.
            </p>
            <div className="flex items-center justify-center gap-2">
              <Badge variant="outline" className="border-yellow-200 text-yellow-800">
                {advancedTasks.length} Challenges
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
