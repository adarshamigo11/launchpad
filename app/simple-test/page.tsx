"use client"
import { useState } from "react"

export default function SimpleTestPage() {
  const [clicked, setClicked] = useState("Nothing clicked yet")

  const handleClick = (type: string) => {
    console.log(`${type} clicked!`)
    setClicked(`${type} was clicked at ${new Date().toLocaleTimeString()}`)
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Simple Click Test</h1>
      
      <div className="mb-4 p-4 bg-gray-100 rounded">
        <strong>Status:</strong> {clicked}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div 
          className="p-6 border-2 border-blue-500 rounded-lg cursor-pointer hover:bg-blue-50"
          onClick={() => handleClick("Basic Card")}
        >
          <h2 className="text-xl font-bold text-blue-600">Basic Card</h2>
          <p>Click me to test basic functionality</p>
        </div>
        
        <div 
          className="p-6 border-2 border-green-500 rounded-lg cursor-pointer hover:bg-green-50"
          onClick={() => handleClick("Advanced Card")}
        >
          <h2 className="text-xl font-bold text-green-600">Advanced Card</h2>
          <p>Click me to test advanced functionality</p>
        </div>
      </div>
      
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Test Buttons:</h3>
        <button 
          onClick={() => handleClick("Basic Button")}
          className="px-4 py-2 bg-blue-500 text-white rounded mr-2"
        >
          Basic Button
        </button>
        <button 
          onClick={() => handleClick("Advanced Button")}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Advanced Button
        </button>
      </div>
      
      <div className="mt-6 p-4 bg-yellow-100 rounded">
        <h3 className="font-semibold">Instructions:</h3>
        <ol className="list-decimal list-inside mt-2">
          <li>Open browser console (F12 → Console tab)</li>
          <li>Try clicking the cards above</li>
          <li>Try clicking the buttons</li>
          <li>Check if you see console logs and status updates</li>
        </ol>
      </div>
    </div>
  )
}
