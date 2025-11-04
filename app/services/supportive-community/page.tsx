"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useApp } from "@/components/state/auth-context"

export default function SupportiveCommunityPage() {
  const { currentUser } = useApp()

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#144449] to-[#BF9B30] py-20 sm:py-24 md:py-32 lg:py-40 min-h-[60vh] flex items-center">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-6 sm:mb-8">
            <span className="text-white text-3xl sm:text-4xl">🤝</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-6 sm:mb-8">Supportive Community</h1>
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/90 max-w-4xl mx-auto leading-relaxed px-2">
            Connect with like-minded individuals, share experiences, and build lasting relationships with fellow entrepreneurs.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 sm:py-20 md:py-24 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Entrepreneurship is not meant to be a lonely journey — it grows stronger with collaboration, shared learning, and mutual support. At Launchpad, we've built a Supportive Community where aspiring entrepreneurs, students, and young professionals come together to learn, grow, and succeed collectively.
            </p>
            
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Our community is the core of Launchpad — a space where ideas flow freely, challenges are faced together, and achievements are celebrated as one. You'll be surrounded by like-minded peers, experienced mentors, and industry experts who guide, motivate, and inspire you throughout your journey.
            </p>

            <h2 className="text-3xl font-bold text-[#144449] mb-6">What Makes Our Community Unique</h2>
            
            <div className="space-y-6 mb-8">
              <div>
                <h3 className="text-xl font-semibold text-[#144449] mb-2">Collaborative Learning:</h3>
                <p className="text-lg text-gray-700">Engage with driven individuals who push you to think bigger and perform better.</p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-[#144449] mb-2">Peer Interaction:</h3>
                <p className="text-lg text-gray-700">Discuss ideas, share experiences, and find practical solutions through active communication.</p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-[#144449] mb-2">Networking & Growth:</h3>
                <p className="text-lg text-gray-700">Build genuine connections with mentors, entrepreneurs, and professionals from diverse fields.</p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-[#144449] mb-2">Culture of Encouragement:</h3>
                <p className="text-lg text-gray-700">Be part of a network that celebrates innovation, consistency, and progress.</p>
              </div>
            </div>

            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              At Launchpad, you're never alone in your entrepreneurial journey. Our community ensures that whenever you need guidance, motivation, or support, someone is always there to help you move ahead.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Together, we learn, build, and grow — turning dreams into ideas, and ideas into reality.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-8 font-semibold text-[#144449]">
              Because at Launchpad, you don't just join a platform — you become part of a family that believes in your potential.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#144449]">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Join Our Community?</h2>
          <p className="text-xl text-white/90 mb-8">
            Connect with like-minded entrepreneurs and build lasting relationships.
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
