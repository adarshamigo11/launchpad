"use client"
import { useState, useEffect } from "react"
import LogoAnimation from "@/components/logo-animation"

export default function ForceAnimationPage() {
  const [showAnimation, setShowAnimation] = useState(true)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    // Clear session storage to force animation
    sessionStorage.removeItem('logo-animation-shown')
    console.log("Session storage cleared, animation should show")
  }, [])

  const handleAnimationComplete = () => {
    console.log("Animation completed!")
    setShowAnimation(false)
    setHasAnimated(true)
  }

  return (
    <div>
      {showAnimation && <LogoAnimation onAnimationComplete={handleAnimationComplete} />}
      {hasAnimated && (
        <div className="p-8">
          <h1 className="text-2xl font-bold mb-6">Animation Test Complete</h1>
          <div className="p-4 bg-green-100 rounded">
            <p className="text-green-800">✅ Animation has completed successfully!</p>
            <p className="text-sm text-green-600 mt-2">
              If you saw the logo slide in from the left, the animation is working correctly.
            </p>
          </div>
          <div className="mt-4">
            <button 
              onClick={() => {
                setShowAnimation(true)
                setHasAnimated(false)
              }}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Test Animation Again
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
