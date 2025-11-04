"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useApp } from "@/components/state/auth-context"

export default function ExpertMentorshipPage() {
  const { currentUser } = useApp()

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#144449] to-[#BF9B30] py-20 sm:py-24 md:py-32 lg:py-40 min-h-[60vh] flex items-center">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-6 sm:mb-8">
            <span className="text-white text-3xl sm:text-4xl">👥</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-6 sm:mb-8">Expert Mentorship</h1>
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/90 max-w-4xl mx-auto leading-relaxed px-2">
            Industry experts guide you throughout the competition, advising on what to do and what to avoid, helping you make informed decisions.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 sm:py-20 md:py-24 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              At Launchpad, we understand that entrepreneurship isn't just about having a great idea — it's about having the right guidance, strategy, and execution. That's exactly where our Expert Mentorship Program comes in.
            </p>
            
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              We connect you with seasoned industry experts, successful entrepreneurs, and business leaders who've been there and done that. These mentors become your personal growth partners — helping you refine your ideas, design strong business models, and build strategies that actually work in the real market.
            </p>

            <h2 className="text-3xl font-bold text-[#144449] mb-6">Through one-on-one mentorship, interactive group learning, and real-world challenges, you'll gain:</h2>
            
            <ul className="space-y-4 mb-8">
              <li className="flex items-start">
                <span className="text-[#BF9B30] text-xl mr-3">•</span>
                <span className="text-lg text-gray-700">Hands-on insights into branding, marketing, and business operations.</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#BF9B30] text-xl mr-3">•</span>
                <span className="text-lg text-gray-700">Personalised guidance to overcome roadblocks and fast-track your growth.</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#BF9B30] text-xl mr-3">•</span>
                <span className="text-lg text-gray-700">Strategic direction to convert your ideas into profitable ventures.</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#BF9B30] text-xl mr-3">•</span>
                <span className="text-lg text-gray-700">Networking opportunities with mentors, industry professionals, and like-minded peers.</span>
              </li>
            </ul>

            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Our mentors don't just guide — they empower you to think, act, and grow like an entrepreneur. Every session is designed to sharpen your skills, boost your confidence, and prepare you to take on real-world business challenges.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              With Launchpad's expert mentorship, you're not just learning entrepreneurship — you're living it. Together, we aim for innovation, act with purpose, and win through execution — building a new generation of confident and impactful entrepreneurs.
            </p>
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="py-16 bg-[#144449]">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Expert Guidance?</h2>
          <p className="text-xl text-white/90 mb-8">
            Join Launchpad and connect with industry experts who will guide your entrepreneurial journey.
          </p>
          {!currentUser && (
            <Link href="/login">
              <Button size="lg" className="bg-[#BF9B30] text-black hover:bg-[#BF9B30]/90 font-bold text-lg px-8 py-3 !bg-[#BF9B30] !text-black hover:!bg-[#BF9B30]/90">
                Get Started
              </Button>
            </Link>
          )}
        </div>
      </section>
    </div>
  )
}
