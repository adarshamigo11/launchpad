"use client"
import { useEffect, useState } from "react"
import { useApp, type Task, type Category } from "@/components/state/auth-context"

export default function DebugAdminPage() {
  const { currentUser, fetchTasks, fetchCategories, createCategory, publishTask } = useApp()
  const [tasks, setTasks] = useState<Task[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [testResults, setTestResults] = useState<string[]>([])

  const addTestResult = (result: string) => {
    setTestResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${result}`])
  }

  useEffect(() => {
    if (currentUser && currentUser.email === "admin@admin.com") {
      loadData()
    } else {
      setError("Please login as admin to access this debug page")
      setLoading(false)
    }
  }, [currentUser])

  const loadData = async () => {
    try {
      addTestResult("Loading tasks and categories...")
      const [tasksData, categoriesData] = await Promise.all([fetchTasks(), fetchCategories()])
      setTasks(tasksData)
      setCategories(categoriesData)
      addTestResult(`Loaded ${tasksData.length} tasks and ${categoriesData.length} categories`)
      setLoading(false)
    } catch (error) {
      addTestResult(`Error loading data: ${error}`)
      setError(error as string)
      setLoading(false)
    }
  }

  const testCreateCategory = async () => {
    try {
      addTestResult("Creating test category...")
      const testCategory = {
        name: "Test Category " + Date.now(),
        description: "This is a test category created for debugging",
        photo: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=500&h=300&fit=crop",
        status: "active" as const
      }
      
      await createCategory(testCategory)
      addTestResult("Test category created successfully")
      await loadData() // Reload data
    } catch (error) {
      addTestResult(`Error creating category: ${error}`)
    }
  }

  const testCreateTask = async () => {
    try {
      if (categories.length === 0) {
        addTestResult("No categories available. Create a category first.")
        return
      }

      addTestResult("Creating test task...")
      const testTask = {
        challengeName: "Test Task " + Date.now(),
        description: "This is a test task created for debugging",
        guidelines: "Complete this test task",
        submissionGuidelines: "Submit your solution",
        points: 50,
        lastDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
        categoryId: categories[0].id,
        subcategory: "basic" as const
      }
      
      const result = await publishTask(testTask)
      addTestResult(`Test task created: ${result.ok ? 'Success' : 'Failed'}`)
      if (!result.ok) {
        addTestResult(`Error: ${result.message}`)
      }
      await loadData() // Reload data
    } catch (error) {
      addTestResult(`Error creating task: ${error}`)
    }
  }

  const testDatabaseConnection = async () => {
    try {
      addTestResult("Testing database connection...")
      const response = await fetch("/api/test-db")
      const data = await response.json()
      addTestResult(`Database test: ${data.ok ? 'Connected' : 'Failed'}`)
      if (data.message) {
        addTestResult(`DB Message: ${data.message}`)
      }
    } catch (error) {
      addTestResult(`Database connection error: ${error}`)
    }
  }

  if (!currentUser || currentUser.email !== "admin@admin.com") {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Admin Debug Page</h1>
        <p className="text-red-500">Please login as admin to access this page.</p>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Admin Debug Page</h1>
        <p>Loading debug information...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Admin Debug Page</h1>
        <p className="text-red-500">Error: {error}</p>
      </div>
    )
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Admin Debug Page</h1>
      
      <div className="grid gap-6">
        {/* Test Controls */}
        <div className="p-4 border rounded">
          <h2 className="text-lg font-semibold mb-4">Test Controls</h2>
          <div className="flex gap-2 flex-wrap">
            <button 
              onClick={testDatabaseConnection}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Test Database Connection
            </button>
            <button 
              onClick={testCreateCategory}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Create Test Category
            </button>
            <button 
              onClick={testCreateTask}
              className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
            >
              Create Test Task
            </button>
            <button 
              onClick={loadData}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Reload Data
            </button>
          </div>
        </div>

        {/* Test Results */}
        <div className="p-4 border rounded">
          <h2 className="text-lg font-semibold mb-4">Test Results</h2>
          <div className="bg-gray-100 p-3 rounded max-h-40 overflow-y-auto">
            {testResults.length === 0 ? (
              <p className="text-gray-500">No test results yet. Run some tests above.</p>
            ) : (
              testResults.map((result, index) => (
                <div key={index} className="text-sm font-mono">{result}</div>
              ))
            )}
          </div>
        </div>

        {/* Current Data Summary */}
        <div className="p-4 border rounded">
          <h2 className="text-lg font-semibold mb-4">Current Data Summary</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold">Categories ({categories.length})</h3>
              {categories.length === 0 ? (
                <p className="text-red-500">No categories found!</p>
              ) : (
                <ul className="text-sm">
                  {categories.map(cat => (
                    <li key={cat.id}>• {cat.name} (ID: {cat.id})</li>
                  ))}
                </ul>
              )}
            </div>
            <div>
              <h3 className="font-semibold">Tasks ({tasks.length})</h3>
              {tasks.length === 0 ? (
                <p className="text-red-500">No tasks found!</p>
              ) : (
                <ul className="text-sm">
                  {tasks.map(task => (
                    <li key={task.id}>
                      • {task.challengeName} 
                      <br />
                      <span className="text-gray-600">
                        Category: {task.categoryId || 'None'} | 
                        Subcategory: {task.subcategory || 'None'}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        {/* Task-Category Mapping */}
        <div className="p-4 border rounded">
          <h2 className="text-lg font-semibold mb-4">Task-Category Mapping</h2>
          {categories.length === 0 ? (
            <p className="text-red-500">No categories to map tasks to!</p>
          ) : (
            <div className="space-y-4">
              {categories.map(category => {
                const categoryTasks = tasks.filter(task => task.categoryId === category.id)
                const basicTasks = categoryTasks.filter(task => task.subcategory === "basic")
                const advancedTasks = categoryTasks.filter(task => task.subcategory === "advanced")
                
                return (
                  <div key={category.id} className="p-3 bg-gray-50 rounded">
                    <h3 className="font-semibold">{category.name}</h3>
                    <p className="text-sm text-gray-600">
                      Total: {categoryTasks.length} | 
                      Basic: {basicTasks.length} | 
                      Advanced: {advancedTasks.length}
                    </p>
                    
                    {categoryTasks.length > 0 && (
                      <div className="mt-2">
                        <details>
                          <summary className="cursor-pointer text-sm font-medium">View Tasks</summary>
                          <ul className="mt-1 ml-4 text-sm">
                            {categoryTasks.map(task => (
                              <li key={task.id}>
                                • {task.challengeName} ({task.subcategory})
                              </li>
                            ))}
                          </ul>
                        </details>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
