"use client"
import { useEffect } from "react"
import Image from "next/image"

interface LogoAnimationProps {
  onAnimationComplete?: () => void
}

export default function LogoAnimation({ onAnimationComplete }: LogoAnimationProps) {
  useEffect(() => {
    console.log("LogoAnimation mounted, starting 3-second animation...")
    
    // Complete animation after 3 seconds
    const completeTimer = setTimeout(() => {
      console.log("Animation completed, calling onAnimationComplete...")
      onAnimationComplete?.()
    }, 3000)

    return () => {
      clearTimeout(completeTimer)
    }
  }, [onAnimationComplete])

  console.log("LogoAnimation rendering...")

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <div
        className="animate-logo-fade-in"
        style={{
          animation: "logoFadeIn 3s ease-in-out forwards"
        }}
      >
        <Image
          src="/logo.png"
          alt="Launchpad Logo"
          width={400}
          height={400}
          className="object-contain drop-shadow-lg"
          priority
        />
      </div>
    </div>
  )
}
