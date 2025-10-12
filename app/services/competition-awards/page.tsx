"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useApp } from "@/components/state/auth-context"

export default function CompetitionAwardsPage() {
  const { currentUser } = useApp()

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#007BFF] to-[#FFC107] py-20 sm:py-24 md:py-32 lg:py-40 min-h-[60vh] flex items-center">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-6 sm:mb-8">
            <span className="text-white text-3xl sm:text-4xl">🏆</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-6 sm:mb-8">Competition & Awards</h1>
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/90 max-w-4xl mx-auto leading-relaxed px-2">
            Compete with peers and get recognized for achievements including highest turnover, best branding, and more at the Award Night.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 sm:py-20 md:py-24 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              At Launchpad, we believe the best learning happens when ambition meets action. That's why our Competitions & Awards are designed to bring out the true entrepreneur in you.
            </p>
            
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Throughout the program, participants take part in exciting real-world challenges that test creativity, strategy, and execution. Each competition simulates real market scenarios — helping you apply what you've learnt, think on your feet, and gain recognition for your efforts.
            </p>

            <h2 className="text-3xl font-bold text-[#007BFF] mb-6">The Competitive Edge</h2>
            
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Each stage of the competition hones a key entrepreneurial skill — from idea validation and service delivery to marketing and client acquisition. As you move forward, you'll learn not just to build and sell, but also to track your success through performance-based challenges and live leaderboards.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              These competitions don't just test your knowledge — they prepare you for the entrepreneurial world outside, where every idea, pitch, and execution counts.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              At Launchpad, every win, every milestone, and every effort is celebrated — because success feels even better when it's earned.
            </p>

            <h2 className="text-3xl font-bold text-[#007BFF] mb-6">The Final Showdown</h2>
            
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              The journey at Launchpad reaches its peak with The Final Showdown — a grand stage where the top-performing participants showcase their ventures before some of the most respected names in business: successful entrepreneurs, industry experts, and influential mentors.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              This is your moment to shine — to display your growth, creativity, and business acumen in front of the very people who define success in the real world.
            </p>

            <h3 className="text-2xl font-bold text-[#007BFF] mb-4">Why It Matters</h3>
            
            <div className="space-y-6 mb-8">
              <div>
                <h4 className="text-xl font-semibold text-[#007BFF] mb-2">Gain Recognition:</h4>
                <p className="text-lg text-gray-700">Compete for prestigious awards that celebrate your entrepreneurial talent and innovation.</p>
              </div>
              
              <div>
                <h4 className="text-xl font-semibold text-[#007BFF] mb-2">Meet the Masters:</h4>
                <p className="text-lg text-gray-700">Engage directly with leading entrepreneurs, investors, and business leaders who can open doors to exciting collaborations and future opportunities.</p>
              </div>
              
              <div>
                <h4 className="text-xl font-semibold text-[#007BFF] mb-2">Build Confidence:</h4>
                <p className="text-lg text-gray-700">Experience the thrill of pitching your idea and executing under real-world pressure — just like in the actual startup world.</p>
              </div>
              
              <div>
                <h4 className="text-xl font-semibold text-[#007BFF] mb-2">Career Growth:</h4>
                <p className="text-lg text-gray-700">Winners and top performers earn extended mentorship, brand partnerships, and exclusive visibility across Launchpad's growing network.</p>
              </div>
            </div>

            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              At Launchpad, every challenge is a chance to learn, and every competition is a step towards becoming the entrepreneur you're meant to be. Because entrepreneurship isn't just about ideas — it's about execution, excellence, and the courage to compete.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#007BFF]">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Compete?</h2>
          <p className="text-xl text-white/90 mb-8">
            Join our competitions and showcase your entrepreneurial skills.
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
