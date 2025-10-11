"use client"
import { useState } from "react"
import LogoAnimation from "@/components/logo-animation"

export default function TestAnimationPage() {
  const [showAnimation, setShowAnimation] = useState(false)

  const triggerAnimation = () => {
    setShowAnimation(true)
  }

  const handleAnimationComplete = () => {
    setShowAnimation(false)
    console.log("Animation completed!")
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Animation Test Page</h1>
      
      <div className="space-y-4">
        <button 
          onClick={triggerAnimation}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Trigger Logo Animation
        </button>
        
        <div className="p-4 bg-gray-100 rounded">
          <h2 className="font-semibold mb-2">Instructions:</h2>
          <ol className="list-decimal list-inside space-y-1">
            <li>Click the button above to trigger the animation</li>
            <li>You should see the logo slide in from the left</li>
            <li>Animation should last 2 seconds</li>
            <li>Check browser console for "Animation completed!" message</li>
          </ol>
        </div>
        
        <div className="p-4 bg-yellow-100 rounded">
          <h2 className="font-semibold mb-2">Debug Info:</h2>
          <p>Show Animation: {showAnimation ? "Yes" : "No"}</p>
        </div>
      </div>
      
      {showAnimation && (
        <LogoAnimation onAnimationComplete={handleAnimationComplete} />
      )}
    </div>
  )
}
