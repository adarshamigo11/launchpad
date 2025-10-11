"use client"
import { useEffect } from "react"

export default function DirectTestPage() {
  useEffect(() => {
    // Add direct DOM event listeners
    const handleBasicClick = () => {
      console.log("Direct Basic click!")
      alert("Basic card clicked!")
    }
    
    const handleAdvancedClick = () => {
      console.log("Direct Advanced click!")
      alert("Advanced card clicked!")
    }
    
    // Wait for DOM to be ready
    setTimeout(() => {
      const basicCard = document.getElementById('basic-card')
      const advancedCard = document.getElementById('advanced-card')
      
      if (basicCard) {
        basicCard.addEventListener('click', handleBasicClick)
        console.log("Basic card event listener added")
      } else {
        console.log("Basic card not found")
      }
      
      if (advancedCard) {
        advancedCard.addEventListener('click', handleAdvancedClick)
        console.log("Advanced card event listener added")
      } else {
        console.log("Advanced card not found")
      }
    }, 100)
    
    return () => {
      // Cleanup
      const basicCard = document.getElementById('basic-card')
      const advancedCard = document.getElementById('advanced-card')
      
      if (basicCard) {
        basicCard.removeEventListener('click', handleBasicClick)
      }
      if (advancedCard) {
        advancedCard.removeEventListener('click', handleAdvancedClick)
      }
    }
  }, [])

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Direct DOM Test</h1>
      
      <div className="mb-4 p-4 bg-yellow-100 rounded">
        <strong>This test uses direct DOM event listeners instead of React onClick</strong>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div 
          id="basic-card"
          className="p-6 border-2 border-blue-500 rounded-lg cursor-pointer hover:bg-blue-50"
        >
          <h2 className="text-xl font-bold text-blue-600">Basic Card (Direct DOM)</h2>
          <p>This uses direct DOM event listener</p>
          <p className="text-sm text-gray-600">Should show alert when clicked</p>
        </div>
        
        <div 
          id="advanced-card"
          className="p-6 border-2 border-green-500 rounded-lg cursor-pointer hover:bg-green-50"
        >
          <h2 className="text-xl font-bold text-green-600">Advanced Card (Direct DOM)</h2>
          <p>This uses direct DOM event listener</p>
          <p className="text-sm text-gray-600">Should show alert when clicked</p>
        </div>
      </div>
      
      <div className="mt-6 p-4 bg-blue-100 rounded">
        <h3 className="font-semibold">Instructions:</h3>
        <ol className="list-decimal list-inside mt-2">
          <li>Open browser console (F12 → Console tab)</li>
          <li>Look for "Basic card event listener added" and "Advanced card event listener added"</li>
          <li>Click the cards - you should see alerts and console logs</li>
          <li>If this works, the issue is with React state management</li>
        </ol>
      </div>
    </div>
  )
}
