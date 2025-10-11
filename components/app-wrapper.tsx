"use client"
import { useState, useEffect } from "react"
import LogoAnimation from "./logo-animation"

interface AppWrapperProps {
  children: React.ReactNode
}

export default function AppWrapper({ children }: AppWrapperProps) {
  const [showAnimation, setShowAnimation] = useState(true)
  const [hasAnimated, setHasAnimated] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    console.log("AppWrapper mounted, starting animation...")
    setIsClient(true)
    
    // Always show animation on page load
    setShowAnimation(true)
  }, [])

  const handleAnimationComplete = () => {
    console.log("Animation completed, showing main app...")
    setShowAnimation(false)
    setHasAnimated(true)
  }

  // Show loading state during hydration
  if (!isClient) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      {showAnimation && <LogoAnimation onAnimationComplete={handleAnimationComplete} />}
      {hasAnimated && children}
    </>
  )
}
