"use client"
import { useState, useEffect } from "react"

export default function TestTasksPage() {
  const [selectedCategory, setSelectedCategory] = useState<any>(null)
  const [selectedSubcategory, setSelectedSubcategory] = useState<"basic" | "advanced" | null>(null)
  
  // Debug state changes
  useEffect(() => {
    console.log("State changed:", {
      selectedCategory: selectedCategory?.name,
      selectedSubcategory
    })
  }, [selectedCategory, selectedSubcategory])

  const testCategory = {
    id: "test-category",
    name: "Test Category",
    description: "This is a test category"
  }

  const testTasks = [
    {
      id: "task-1",
      challengeName: "Test Basic Task",
      description: "This is a basic test task",
      subcategory: "basic",
      points: 50
    },
    {
      id: "task-2", 
      challengeName: "Test Advanced Task",
      description: "This is an advanced test task",
      subcategory: "advanced",
      points: 100
    }
  ]

  const handleCategoryClick = () => {
    console.log("Category clicked")
    setSelectedCategory(testCategory)
  }

  const handleSubcategoryClick = (subcategory: "basic" | "advanced") => {
    console.log(`${subcategory} subcategory clicked`)
    console.log("Setting selectedSubcategory to:", subcategory)
    setSelectedSubcategory(subcategory)
    console.log("State should be updated now")
  }

  const handleBack = () => {
    setSelectedSubcategory(null)
  }

  const handleBackToCategories = () => {
    setSelectedCategory(null)
    setSelectedSubcategory(null)
  }

  // Show subcategory tasks
  if (selectedSubcategory) {
    console.log("Rendering subcategory tasks view:", selectedSubcategory)
    const subcategoryTasks = testTasks.filter(task => task.subcategory === selectedSubcategory)
    const subcategoryName = selectedSubcategory === "basic" ? "Basic" : "Advanced"
    
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Test Tasks - {subcategoryName}</h1>
        <button 
          onClick={handleBack}
          className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          ← Back to {selectedCategory.name}
        </button>
        
        <div className="mb-4 p-3 bg-yellow-100 rounded">
          <strong>Debug:</strong> Found {subcategoryTasks.length} {subcategoryName.toLowerCase()} tasks
        </div>
        
        {subcategoryTasks.length === 0 ? (
          <p>No {subcategoryName.toLowerCase()} tasks found.</p>
        ) : (
          <div className="grid gap-4">
            {subcategoryTasks.map(task => (
              <div key={task.id} className="p-4 border rounded">
                <h3 className="font-semibold">{task.challengeName}</h3>
                <p>{task.description}</p>
                <p>Points: {task.points}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }

  // Show subcategory selection
  if (selectedCategory) {
    console.log("Rendering subcategory selection view")
    const basicTasks = testTasks.filter(task => task.subcategory === "basic")
    const advancedTasks = testTasks.filter(task => task.subcategory === "advanced")
    
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Test Tasks - {selectedCategory.name}</h1>
        <button 
          onClick={handleBackToCategories}
          className="mb-4 px-4 py-2 bg-gray-500 text-white rounded"
        >
          ← Back to Categories
        </button>
        
        <div className="mb-4 p-3 bg-yellow-100 rounded">
          <strong>Debug Info:</strong> Category: {selectedCategory?.name || 'None'}, Subcategory: {selectedSubcategory || 'None'}
        </div>
        
        <div className="mb-4 p-3 bg-yellow-100 rounded">
          <strong>Test Buttons:</strong>
          <button 
            onClick={() => handleSubcategoryClick("basic")}
            className="ml-2 px-3 py-1 bg-blue-500 text-white rounded text-sm"
          >
            Test Basic Click
          </button>
          <button 
            onClick={() => handleSubcategoryClick("advanced")}
            className="ml-2 px-3 py-1 bg-yellow-500 text-white rounded text-sm"
          >
            Test Advanced Click
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div 
            className="p-6 border-2 border-blue-200 rounded-lg cursor-pointer hover:border-blue-400"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              console.log("Basic card clicked - event:", e)
              handleSubcategoryClick("basic")
            }}
            onMouseDown={() => console.log("Basic card mouse down")}
            onMouseUp={() => console.log("Basic card mouse up")}
          >
            <h2 className="text-xl font-semibold text-blue-800">Basic Tasks</h2>
            <p>{basicTasks.length} tasks available</p>
            <p className="text-sm text-gray-600 mt-2">Click to view basic tasks</p>
          </div>
          
          <div 
            className="p-6 border-2 border-yellow-200 rounded-lg cursor-pointer hover:border-yellow-400"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              console.log("Advanced card clicked - event:", e)
              handleSubcategoryClick("advanced")
            }}
            onMouseDown={() => console.log("Advanced card mouse down")}
            onMouseUp={() => console.log("Advanced card mouse up")}
          >
            <h2 className="text-xl font-semibold text-yellow-800">Advanced Tasks</h2>
            <p>{advancedTasks.length} tasks available</p>
            <p className="text-sm text-gray-600 mt-2">Click to view advanced tasks</p>
          </div>
        </div>
      </div>
    )
  }

  // Show category selection
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Test Tasks - Category Selection</h1>
      
      <div className="mb-4 p-3 bg-green-100 rounded">
        <strong>Debug Info:</strong> Category: {selectedCategory?.name || 'None'}, Subcategory: {selectedSubcategory || 'None'}
      </div>
      
      <div className="mb-4 p-3 bg-green-100 rounded">
        <strong>Debug:</strong> This is a simplified test version to check if the click functionality works.
      </div>
      
      <div 
        className="p-6 border-2 border-green-200 rounded-lg cursor-pointer hover:border-green-400"
        onClick={handleCategoryClick}
      >
        <h2 className="text-xl font-semibold text-green-800">{testCategory.name}</h2>
        <p>{testCategory.description}</p>
        <p className="text-sm text-gray-600 mt-2">Click to select this category</p>
      </div>
    </div>
  )
}
