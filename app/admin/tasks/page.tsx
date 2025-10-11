"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useApp, type Task, type Category } from "@/components/state/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AdminTasksPage() {
  const { currentUser, isAdmin, publishTask, fetchTasks, deleteTask, fetchCategories, migrateTasks } = useApp()
  const router = useRouter()
  const [challengeName, setChallengeName] = useState("")
  const [description, setDescription] = useState("")
  const [guidelines, setGuidelines] = useState("")
  const [submissionGuidelines, setSubmissionGuidelines] = useState("")
  const [points, setPoints] = useState<number>(10)
  const [lastDate, setLastDate] = useState("")
  const [categoryId, setCategoryId] = useState("")
  const [subcategory, setSubcategory] = useState<"basic" | "advanced">("basic")
  const [tasks, setTasks] = useState<Task[]>([])
  const [categories, setCategories] = useState<Category[]>([])
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
    const [tasksData, categoriesData] = await Promise.all([fetchTasks(), fetchCategories()])
    setTasks(tasksData)
    setCategories(categoriesData)
    setLoading(false)
  }

  if (!currentUser || !isAdmin) return null

  const onPublish = async () => {
    if (!challengeName.trim()) {
      alert("Please enter a challenge name")
      return
    }
    if (!lastDate) {
      alert("Please select a deadline")
      return
    }
    if (!categoryId) {
      alert("Please select a category")
      return
    }
    
    try {
      const result = await publishTask({
        challengeName: challengeName.trim(),
        description: description.trim() || "No description provided.",
        guidelines: guidelines.trim() || "No guidelines provided.",
        submissionGuidelines: submissionGuidelines.trim() || "No submission guidelines provided.",
        points: Number(points) || 0,
        lastDate: new Date(lastDate).getTime(),
        categoryId: categoryId,
        subcategory: subcategory,
      })
      
      if (result.ok) {
        alert("Task published successfully!")
      } else {
        alert("Failed to publish task: " + result.message)
      }
      
      setChallengeName("")
      setDescription("")
      setGuidelines("")
      setSubmissionGuidelines("")
      setPoints(10)
      setLastDate("")
      setCategoryId("")
      setSubcategory("basic")
      await loadData()
    } catch (error) {
      console.error("Error publishing task:", error)
      alert("Failed to publish task. Please try again.")
    }
  }

  const onDiscard = () => {
    setChallengeName("")
    setDescription("")
    setGuidelines("")
    setSubmissionGuidelines("")
    setPoints(10)
    setLastDate("")
    setCategoryId("")
    setSubcategory("basic")
  }

  const onDelete = async (id: string) => {
    await deleteTask(id)
    await loadData()
  }

  const onMigrateTasks = async () => {
    if (confirm("This will create sample tasks and categories for testing. Continue?")) {
      const result = await migrateTasks()
      if (result.ok) {
        alert(`✅ Sample tasks created successfully!\n\nCreated ${result.createdTasks} tasks\nCategory ID: ${result.categoryId}`)
        await loadData()
      } else {
        alert(`❌ Error: ${result.message}`)
      }
    }
  }

  if (loading) {
    return (
      <section className="mx-auto max-w-5xl px-4 pt-32 pb-8">
        <p className="text-muted-foreground">Loading...</p>
      </section>
    )
  }

  return (
    <section className="mx-auto max-w-5xl px-4 pt-32 pb-8 grid gap-8">
      <Card className="border-primary/40">
        <CardHeader>
          <CardTitle>Create Task</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="challengeName">Challenge Name</Label>
            <Input id="challengeName" value={challengeName} onChange={(e) => setChallengeName(e.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="guidelines">Guidelines</Label>
            <Textarea id="guidelines" value={guidelines} onChange={(e) => setGuidelines(e.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="submissionGuidelines">Submission Guidelines</Label>
            <Textarea id="submissionGuidelines" value={submissionGuidelines} onChange={(e) => setSubmissionGuidelines(e.target.value)} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="points">Points</Label>
              <Input
                id="points"
                type="number"
                min={0}
                value={points}
                onChange={(e) => setPoints(Number(e.target.value))}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="lastDate">Last Date to Submit</Label>
              <Input
                id="lastDate"
                type="datetime-local"
                value={lastDate}
                onChange={(e) => setLastDate(e.target.value)}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <Select value={categoryId} onValueChange={setCategoryId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="subcategory">Subcategory</Label>
              <Select value={subcategory} onValueChange={(value: "basic" | "advanced") => setSubcategory(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="basic">Basic</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button onClick={onPublish} className="bg-primary text-primary-foreground">
              Publish
            </Button>
            <Button variant="outline" onClick={onDiscard} className="border-primary/40 bg-transparent">
              Discard
            </Button>
            <Button 
              variant="outline" 
              onClick={onMigrateTasks} 
              className="border-green-500 text-green-600 hover:bg-green-50"
            >
              🚀 Create Sample Tasks
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-3">
        <h2 className="text-xl font-semibold">Existing Tasks</h2>
        {tasks.length === 0 ? (
          <p className="text-sm text-muted-foreground">No tasks yet.</p>
        ) : (
          <ul className="grid gap-2">
            {tasks.map((t) => {
              const category = categories.find(c => c.id === t.categoryId)
              return (
                <li
                  key={t.id}
                  className="flex items-center justify-between rounded-md border border-primary/40 px-4 py-3"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-medium">{t.challengeName}</span>
                    <span className="text-xs text-muted-foreground">({t.points} pts)</span>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-md">
                      {category?.name || 'Unknown Category'}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-md ${
                      t.subcategory === "basic" 
                        ? "bg-green-100 text-green-800" 
                        : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {t.subcategory}
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    className="border-destructive/50 text-destructive hover:bg-destructive hover:text-destructive-foreground bg-transparent"
                    onClick={() => onDelete(t.id)}
                  >
                    Delete
                  </Button>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </section>
  )
}
