"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useApp, type Task, type Category } from "@/components/state/auth-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default function TasksPage() {
  const { currentUser, fetchTasks, fetchCategories } = useApp()
  const router = useRouter()
  const [tasks, setTasks] = useState<Task[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  const [selectedSubcategory, setSelectedSubcategory] = useState<"basic" | "advanced" | null>(null)

  useEffect(() => {
    if (!currentUser) router.push("/login")
    if (currentUser?.email === "admin@admin.com") router.push("/admin/tasks")
  }, [currentUser, router])

  useEffect(() => {
    if (currentUser && currentUser.email !== "admin@admin.com") {
      loadData()
    }
  }, [currentUser])

  const loadData = async () => {
    try {
      setLoading(true)
      const [tasksData, categoriesData] = await Promise.all([fetchTasks(), fetchCategories()])
      setTasks(tasksData)
      setCategories(categoriesData)
    } catch (error) {
      console.error("Error loading data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleCategoryClick = (category: Category) => {
    console.log("Category clicked:", category.name)
    setSelectedCategory(category)
    setSelectedSubcategory(null)
  }

  const handleSubcategoryClick = (subcategory: "basic" | "advanced") => {
    console.log("Subcategory clicked:", subcategory)
    setSelectedSubcategory(subcategory)
  }

  const handleBackToCategories = () => {
    setSelectedCategory(null)
    setSelectedSubcategory(null)
  }

  const handleBackToSubcategories = () => {
    setSelectedSubcategory(null)
  }

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

  if (!currentUser || currentUser.email === "admin@admin.com") return null

  if (loading) {
    return (
      <section className="mx-auto max-w-6xl px-4 sm:px-6 pt-32 pb-8">
        <div className="text-center">
          <p className="text-muted-foreground">Loading challenges...</p>
        </div>
      </section>
    )
  }

  // Show tasks for selected subcategory
  if (selectedSubcategory && selectedCategory) {
    const categoryTasks = tasks.filter(task => task.categoryId === selectedCategory.id)
    const subcategoryTasks = categoryTasks.filter(task => task.subcategory === selectedSubcategory)
    const subcategoryName = selectedSubcategory === "basic" ? "Basic" : "Advanced"
    
    return (
      <section className="mx-auto max-w-6xl px-4 sm:px-6 pt-32 pb-8">
        <div className="flex flex-col gap-3 mb-6">
          <Button 
            variant="outline" 
            onClick={handleBackToSubcategories}
            className="flex items-center gap-2 w-full sm:w-auto text-sm sm:text-base self-start"
          >
            ← Back to Categories
          </Button>
          <div className="text-center sm:text-left">
            <h2 className="text-lg sm:text-xl font-semibold text-muted-foreground mb-1 break-words">
              {selectedCategory.name}
            </h2>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold break-words leading-tight">
              {subcategoryName} Challenges
            </h1>
          </div>
        </div>
        
        {subcategoryTasks.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No {subcategoryName.toLowerCase()} challenges available yet.
            </p>
            <p className="text-muted-foreground text-sm mt-2">
              Check back later for new challenges!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {subcategoryTasks.map((task) => (
              <Link key={task.id} href={`/tasks/${task.id}`}>
                <Card className="border-primary/40 hover:border-primary transition-colors shadow-lg hover:shadow-xl h-full overflow-hidden">
                  <CardHeader className="pb-3">
                    <div className="flex flex-col sm:flex-row items-start justify-between gap-2">
                      <CardTitle className="text-base sm:text-lg font-semibold line-clamp-2 flex-1 min-w-0">
                        {task.challengeName}
                      </CardTitle>
                      <Badge 
                        variant={task.subcategory === "basic" ? "default" : "secondary"}
                        className={`text-xs whitespace-nowrap ${task.subcategory === "basic" ? "bg-blue-100 text-blue-800" : "bg-yellow-100 text-yellow-800"}`}
                      >
                        {task.subcategory}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3 pt-0">
                    <p className="text-sm text-muted-foreground line-clamp-3 break-words">
                      {task.description}
                    </p>
                    
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-sm">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-medium text-primary">{task.points} pts</span>
                        {isExpired(task.lastDate) && (
                          <Badge variant="destructive" className="text-xs">
                            Expired
                          </Badge>
                        )}
                      </div>
                      <span className="text-muted-foreground text-xs sm:text-sm">
                        Due: {formatDate(task.lastDate)}
                      </span>
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

  // Show subcategory selection
  if (selectedCategory) {
    const categoryTasks = tasks.filter(task => task.categoryId === selectedCategory.id)
    const basicTasks = categoryTasks.filter(task => task.subcategory === "basic")
    const advancedTasks = categoryTasks.filter(task => task.subcategory === "advanced")
    
    return (
      <section className="mx-auto max-w-6xl px-4 sm:px-6 pt-32 pb-8">
        <div className="flex flex-col gap-3 mb-6">
          <Button 
            variant="outline" 
            onClick={handleBackToCategories}
            className="flex items-center gap-2 w-full sm:w-auto text-sm sm:text-base self-start"
          >
            ← Back to Categories
          </Button>
          <div className="text-center sm:text-left">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold break-words leading-tight">
              {selectedCategory.name}
            </h1>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card 
            className="border-blue-200 hover:border-blue-400 transition-colors cursor-pointer shadow-lg hover:shadow-xl"
            onClick={() => handleSubcategoryClick("basic")}
          >
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <CardTitle className="text-xl text-blue-800">Basic Challenges</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground mb-4">
                Perfect for beginners starting their journey in {selectedCategory.name.toLowerCase()}.
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
            onClick={() => handleSubcategoryClick("advanced")}
          >
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚀</span>
              </div>
              <CardTitle className="text-xl text-yellow-800">Advanced Challenges</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground mb-4">
                For experienced users ready to take on complex {selectedCategory.name.toLowerCase()} challenges.
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

  // Show category selection (main view)
  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 pt-32 pb-8">
      <h1 className="text-xl sm:text-2xl font-semibold mb-6 text-center sm:text-left">Challenge Categories</h1>
      
      {categories.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">No categories available yet.</p>
          <p className="text-muted-foreground text-sm mt-2">
            Categories will appear here once they are created by the admin.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {categories.map((category) => {
            const categoryTasks = tasks.filter(task => task.categoryId === category.id)
            const basicTasks = categoryTasks.filter(task => task.subcategory === "basic")
            const advancedTasks = categoryTasks.filter(task => task.subcategory === "advanced")
            
            return (
              <Card 
                key={category.id}
                className="border-primary/20 hover:border-primary/40 transition-colors cursor-pointer shadow-lg hover:shadow-xl overflow-hidden"
                onClick={() => handleCategoryClick(category)}
              >
                <div className="aspect-video relative">
                  <img
                    src={category.photo}
                    alt={category.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg sm:text-xl line-clamp-2">{category.name}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-muted-foreground mb-4 line-clamp-3 break-words text-sm sm:text-base">{category.description}</p>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-sm">
                    <div className="flex gap-2 flex-wrap">
                      <Badge variant="outline" className="border-blue-200 text-blue-800 text-xs">
                        {basicTasks.length} Basic
                      </Badge>
                      <Badge variant="outline" className="border-yellow-200 text-yellow-800 text-xs">
                        {advancedTasks.length} Advanced
                      </Badge>
                    </div>
                    <span className="text-muted-foreground text-xs sm:text-sm">
                      {categoryTasks.length} Total
                    </span>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </section>
  )
}