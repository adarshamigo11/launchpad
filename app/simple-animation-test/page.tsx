"use client"
import { useState } from "react"

export default function SimpleAnimationTestPage() {
  const [showAnimation, setShowAnimation] = useState(true)

  const handleAnimationComplete = () => {
    console.log("Simple animation completed!")
    setShowAnimation(false)
  }

  return (
    <div>
      {showAnimation ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
          <div
            className="animate-logo-fade-in"
            style={{
              animation: "logoFadeIn 3s ease-in-out forwards"
            }}
          >
            <img
              src="/logo.png"
              alt="Launchpad Logo"
              width={400}
              height={400}
              className="object-contain drop-shadow-lg"
            />
          </div>
          
          {/* Auto-complete after 2 seconds */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
                setTimeout(() => {
                  console.log("Animation completed!");
                  window.location.reload();
                }, 3000);
              `
            }}
          />
        </div>
      ) : (
        <div className="p-8">
          <h1 className="text-2xl font-bold mb-6">Animation Test Complete</h1>
          <div className="p-4 bg-green-100 rounded">
            <p className="text-green-800">✅ Animation has completed successfully!</p>
            <p className="text-sm text-green-600 mt-2">
              The logo should have faded in from 0% to 100% opacity over 3 seconds.
            </p>
          </div>
          <div className="mt-4">
            <button 
              onClick={() => setShowAnimation(true)}
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
