"use client"
import { useEffect, useState } from "react"
import { useApp, type Task, type Category } from "@/components/state/auth-context"

export default function DebugTasksPage() {
  const { currentUser, fetchTasks, fetchCategories } = useApp()
  const [tasks, setTasks] = useState<Task[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (currentUser && currentUser.email !== "admin@admin.com") {
      console.log("Debug: Loading tasks and categories...")
      Promise.all([fetchTasks(), fetchCategories()])
        .then(([tasksData, categoriesData]) => {
          console.log("Debug: Loaded data:", { tasksData, categoriesData })
          setTasks(tasksData)
          setCategories(categoriesData)
          setLoading(false)
        })
        .catch(error => {
          console.error("Debug: Error loading data:", error)
          setError(error.message)
          setLoading(false)
        })
    }
  }, [currentUser, fetchTasks, fetchCategories])

  if (!currentUser || currentUser.email === "admin@admin.com") {
    return <div>Please login as a regular user to access this debug page.</div>
  }

  if (loading) {
    return <div>Loading debug information...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Debug Tasks Page</h1>
      
      <div className="grid gap-6">
        <div className="p-4 border rounded">
          <h2 className="text-lg font-semibold mb-2">Summary</h2>
          <p>Categories: {categories.length}</p>
          <p>Tasks: {tasks.length}</p>
        </div>

        <div className="p-4 border rounded">
          <h2 className="text-lg font-semibold mb-2">Categories</h2>
          {categories.length === 0 ? (
            <p className="text-red-500">No categories found!</p>
          ) : (
            <ul>
              {categories.map((category) => (
                <li key={category.id} className="mb-2">
                  <strong>{category.name}</strong> (ID: {category.id})
                  <br />
                  <span className="text-sm text-gray-600">{category.description}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="p-4 border rounded">
          <h2 className="text-lg font-semibold mb-2">Tasks</h2>
          {tasks.length === 0 ? (
            <p className="text-red-500">No tasks found!</p>
          ) : (
            <ul>
              {tasks.map((task) => (
                <li key={task.id} className="mb-2">
                  <strong>{task.challengeName}</strong>
                  <br />
                  <span className="text-sm text-gray-600">
                    Category ID: {task.categoryId || 'None'} | 
                    Subcategory: {task.subcategory || 'None'} | 
                    Points: {task.points}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="p-4 border rounded">
          <h2 className="text-lg font-semibold mb-2">Task-Category Mapping</h2>
          {categories.map((category) => {
            const categoryTasks = tasks.filter(task => task.categoryId === category.id)
            const basicTasks = categoryTasks.filter(task => task.subcategory === "basic")
            const advancedTasks = categoryTasks.filter(task => task.subcategory === "advanced")
            
            return (
              <div key={category.id} className="mb-4 p-3 bg-gray-50 rounded">
                <h3 className="font-semibold">{category.name}</h3>
                <p>Total tasks: {categoryTasks.length}</p>
                <p>Basic tasks: {basicTasks.length}</p>
                <p>Advanced tasks: {advancedTasks.length}</p>
                
                {basicTasks.length > 0 && (
                  <div className="mt-2">
                    <strong>Basic Tasks:</strong>
                    <ul className="ml-4">
                      {basicTasks.map(task => (
                        <li key={task.id}>- {task.challengeName}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {advancedTasks.length > 0 && (
                  <div className="mt-2">
                    <strong>Advanced Tasks:</strong>
                    <ul className="ml-4">
                      {advancedTasks.map(task => (
                        <li key={task.id}>- {task.challengeName}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
