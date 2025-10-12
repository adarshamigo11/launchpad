"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useApp } from "@/components/state/auth-context"

export default function RealWorldExperiencePage() {
  const { currentUser } = useApp()

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#007BFF] to-[#FFC107] py-20 sm:py-24 md:py-32 lg:py-40 min-h-[60vh] flex items-center">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-6 sm:mb-8">
            <span className="text-white text-3xl sm:text-4xl">📈</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-6 sm:mb-8">Real-World Experience</h1>
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/90 max-w-4xl mx-auto leading-relaxed px-2">
            Learn through actual sales, client handling, and business operations that prepare you for real entrepreneurial challenges.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 sm:py-20 md:py-24 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              At Launchpad, we don't believe in learning through theory alone — we believe in learning by doing. Our platform is built to give every participant the real-world experience of running a business, selling services, and building lasting client relationships.
            </p>
            
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              From day one, you step into the shoes of an entrepreneur. You'll choose your niche, pitch to real clients, close deals, and deliver quality work using Launchpad's ready-to-sell services— all while being guided by expert mentors who ensure you're learning the right way.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              This isn't a simulation — it's your first real taste of the business world. Every challenge you take, every sale you close, and every project you deliver contributes to your personal and professional growth.
            </p>

            <h2 className="text-3xl font-bold text-[#007BFF] mb-6">What Makes It Real</h2>
            
            <ul className="space-y-4 mb-8">
              <li className="flex items-start">
                <span className="text-[#FFC107] text-xl mr-3">•</span>
                <span className="text-lg text-gray-700">Work on actual client projects that teach you how to deliver value under real market conditions.</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#FFC107] text-xl mr-3">•</span>
                <span className="text-lg text-gray-700">Collaborate with peers and mentors just like in a professional startup environment.</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#FFC107] text-xl mr-3">•</span>
                <span className="text-lg text-gray-700">Develop key entrepreneurial skills — communication, sales, problem-solving, time management, and leadership.</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#FFC107] text-xl mr-3">•</span>
                <span className="text-lg text-gray-700">Experience business challenges firsthand, from negotiation to execution.</span>
              </li>
            </ul>

            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Through this hands-on learning approach, Launchpad ensures that participants don't just understand business concepts — they live them.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              By the end of your journey, you'll have the confidence, mindset, and experience needed to take your next big step — whether that's launching your own agency, scaling your startup, or building your personal brand.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              At Launchpad, every experience is real, every challenge is meaningful, and every win brings you closer to becoming a true entrepreneur.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-8 font-semibold text-[#007BFF]">
              Because the best classroom for entrepreneurship is the real world.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#007BFF]">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready for Real Experience?</h2>
          <p className="text-xl text-white/90 mb-8">
            Step into the real world of entrepreneurship with Launchpad.
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
