"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useApp } from "@/components/state/auth-context"

export default function StructuredLearningPage() {
  const { currentUser } = useApp()

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#007BFF] to-[#FFC107] py-20 sm:py-24 md:py-32 lg:py-40 min-h-[60vh] flex items-center">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-6 sm:mb-8">
            <span className="text-white text-3xl sm:text-4xl">🎓</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-6 sm:mb-8">Structured Learning</h1>
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/90 max-w-4xl mx-auto leading-relaxed px-2">
            Follow a structured 3-month program with clear milestones, challenges, and evaluation criteria for steady progress.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 sm:py-20 md:py-24 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              At Launchpad, we believe that entrepreneurship can be learned — but only when the learning is structured, practical, and guided by real experience. Our Structured Learning Approach ensures that every participant develops the right skills, mindset, and discipline to succeed in the business world.
            </p>
            
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              The programme is thoughtfully designed to take you step-by-step — from understanding business fundamentals to building and managing your own venture. Each stage focuses on hands-on learning, supported by expert mentorship, real-world projects, and continuous feedback.
            </p>

            <h2 className="text-3xl font-bold text-[#007BFF] mb-6">How Our Structured Learning Works</h2>
            
            <div className="space-y-6 mb-8">
              <div>
                <h3 className="text-xl font-semibold text-[#007BFF] mb-2">Practical Application:</h3>
                <p className="text-lg text-gray-700">Apply every concept in real-world scenarios through ready-to-sell services and live challenges.</p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-[#007BFF] mb-2">Guided Mentorship:</h3>
                <p className="text-lg text-gray-700">Receive constant guidance from industry mentors who help you refine your approach and stay on track.</p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-[#007BFF] mb-2">Performance Tracking:</h3>
                <p className="text-lg text-gray-700">Monitor your growth through regular evaluations, leaderboards, and milestones.</p>
              </div>
            </div>

            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Our structure is not about exams or grades — it's about growth, learning, and action. By combining education with execution, Launchpad ensures that participants not only understand entrepreneurship but also experience what it truly takes to build and run a business.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              With Launchpad's Structured Learning, you gain more than just knowledge — you gain clarity, confidence, and the capability to execute your ideas effectively.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-8 font-semibold text-[#007BFF]">
              Because learning is most powerful when it's structured for success.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#007BFF]">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready for Structured Learning?</h2>
          <p className="text-xl text-white/90 mb-8">
            Join our structured program and develop the skills to succeed in entrepreneurship.
          </p>
          {!currentUser && (
            <Link href="/login">
              <Button size="lg" className="bg-[#FFC107] text-black hover:bg-[#FFC107]/90 font-bold text-lg px-8 py-3 !bg-[#FFC107] !text-black hover:!bg-[#FFC107]/90">
                Get Started
              </Button>
            </Link>
          )}
        </div>
      </section>
    </div>
  )
}
