"use client"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default function TestFlowPage() {
  const [currentView, setCurrentView] = useState<"categories" | "subcategories" | "tasks">("categories")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedSubcategory, setSelectedSubcategory] = useState<"basic" | "advanced" | "">("")

  const testCategories = [
    {
      id: "web-dev",
      name: "Web Development",
      description: "Learn web development skills and build amazing websites",
      photo: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=500&h=300&fit=crop"
    },
    {
      id: "mobile-dev",
      name: "Mobile Development", 
      description: "Create mobile apps for iOS and Android platforms",
      photo: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=500&h=300&fit=crop"
    }
  ]

  const testTasks = [
    {
      id: "task-1",
      name: "Build a Portfolio Website",
      description: "Create a beautiful personal portfolio website",
      category: "web-dev",
      subcategory: "basic",
      points: 50
    },
    {
      id: "task-2", 
      name: "Create a Todo App",
      description: "Build a functional todo application",
      category: "web-dev",
      subcategory: "basic",
      points: 75
    },
    {
      id: "task-3",
      name: "Full-Stack E-commerce",
      description: "Build a complete e-commerce platform",
      category: "web-dev", 
      subcategory: "advanced",
      points: 200
    },
    {
      id: "task-4",
      name: "React Native App",
      description: "Create a cross-platform mobile app",
      category: "mobile-dev",
      subcategory: "basic", 
      points: 100
    }
  ]

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId)
    setCurrentView("subcategories")
  }

  const handleSubcategoryClick = (subcategory: "basic" | "advanced") => {
    setSelectedSubcategory(subcategory)
    setCurrentView("tasks")
  }

  const handleBackToCategories = () => {
    setCurrentView("categories")
    setSelectedCategory("")
    setSelectedSubcategory("")
  }

  const handleBackToSubcategories = () => {
    setCurrentView("subcategories")
    setSelectedSubcategory("")
  }

  const getCurrentCategory = () => {
    return testCategories.find(cat => cat.id === selectedCategory)
  }

  const getCategoryTasks = () => {
    return testTasks.filter(task => task.category === selectedCategory)
  }

  const getSubcategoryTasks = () => {
    return getCategoryTasks().filter(task => task.subcategory === selectedSubcategory)
  }

  // Show tasks
  if (currentView === "tasks") {
    const tasks = getSubcategoryTasks()
    const category = getCurrentCategory()
    const subcategoryName = selectedSubcategory === "basic" ? "Basic" : "Advanced"
    
    return (
      <div className="p-8">
        <div className="flex items-center gap-4 mb-6">
          <Button 
            variant="outline" 
            onClick={handleBackToSubcategories}
            className="flex items-center gap-2"
          >
            ← Back to {category?.name}
          </Button>
          <h1 className="text-2xl font-semibold">
            {category?.name} - {subcategoryName} Challenges
          </h1>
        </div>
        
        {tasks.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No {subcategoryName.toLowerCase()} challenges available.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tasks.map((task) => (
              <Card key={task.id} className="border-primary/40 hover:border-primary transition-colors shadow-lg hover:shadow-xl">
                <CardHeader>
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-lg font-semibold">{task.name}</CardTitle>
                    <Badge 
                      variant={task.subcategory === "basic" ? "default" : "secondary"}
                      className={task.subcategory === "basic" ? "bg-blue-100 text-blue-800" : "bg-yellow-100 text-yellow-800"}
                    >
                      {task.subcategory}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">{task.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-primary">{task.points} pts</span>
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    )
  }

  // Show subcategories
  if (currentView === "subcategories") {
    const category = getCurrentCategory()
    const categoryTasks = getCategoryTasks()
    const basicTasks = categoryTasks.filter(task => task.subcategory === "basic")
    const advancedTasks = categoryTasks.filter(task => task.subcategory === "advanced")
    
    return (
      <div className="p-8">
        <div className="flex items-center gap-4 mb-6">
          <Button 
            variant="outline" 
            onClick={handleBackToCategories}
            className="flex items-center gap-2"
          >
            ← Back to Categories
          </Button>
          <h1 className="text-2xl font-semibold">{category?.name}</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                Perfect for beginners starting their journey in {category?.name.toLowerCase()}.
              </p>
              <Badge variant="outline" className="border-blue-200 text-blue-800">
                {basicTasks.length} Challenges
              </Badge>
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
                For experienced users ready to take on complex {category?.name.toLowerCase()} challenges.
              </p>
              <Badge variant="outline" className="border-yellow-200 text-yellow-800">
                {advancedTasks.length} Challenges
              </Badge>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Show categories (main view)
  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold mb-6">Challenge Categories</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testCategories.map((category) => {
          const categoryTasks = testTasks.filter(task => task.category === category.id)
          const basicTasks = categoryTasks.filter(task => task.subcategory === "basic")
          const advancedTasks = categoryTasks.filter(task => task.subcategory === "advanced")
          
          return (
            <Card 
              key={category.id}
              className="border-primary/20 hover:border-primary/40 transition-colors cursor-pointer shadow-lg hover:shadow-xl overflow-hidden"
              onClick={() => handleCategoryClick(category.id)}
            >
              <div className="aspect-video relative">
                <img
                  src={category.photo}
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-xl">{category.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4 line-clamp-3">{category.description}</p>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex gap-2">
                    <Badge variant="outline" className="border-blue-200 text-blue-800">
                      {basicTasks.length} Basic
                    </Badge>
                    <Badge variant="outline" className="border-yellow-200 text-yellow-800">
                      {advancedTasks.length} Advanced
                    </Badge>
                  </div>
                  <span className="text-muted-foreground">
                    {categoryTasks.length} Total
                  </span>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
