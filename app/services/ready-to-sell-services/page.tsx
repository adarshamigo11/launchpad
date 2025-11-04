"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useApp } from "@/components/state/auth-context"

export default function ReadyToSellServicesPage() {
  const { currentUser } = useApp()

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#144449] to-[#BF9B30] py-20 sm:py-24 md:py-32 lg:py-40 min-h-[60vh] flex items-center">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-6 sm:mb-8">
            <span className="text-white text-3xl sm:text-4xl">💼</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-6 sm:mb-8">Ready-to-Sell Services</h1>
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/90 max-w-4xl mx-auto leading-relaxed px-2">
            Access curated services that you can immediately start selling to build your agency and generate revenue from day one.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 sm:py-20 md:py-24 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Starting a business from scratch can be overwhelming — from finding clients to figuring out what to sell. That's why at Launchpad, we make your journey simpler with our Ready-to-Sell Services — giving you a strong head start in your entrepreneurial path.
            </p>
            
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              We provide a curated range of pre-built, high-demand digital services — including social media marketing, graphic design, content creation, web development, branding, and more — all ready for you to offer directly to clients.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Each service comes professionally structured, priced, and packaged — so you can focus on what really matters: learning, selling, and growing. No need to stress over technical setups or product building — just plug in your creativity, connect with clients, and start earning.
            </p>

            <h2 className="text-3xl font-bold text-[#144449] mb-6">What You Get</h2>
            
            <ul className="space-y-4 mb-8">
              <li className="flex items-start">
                <span className="text-[#BF9B30] text-xl mr-3">•</span>
                <span className="text-lg text-gray-700">Ready-made service templates you can easily customise and deploy.</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#BF9B30] text-xl mr-3">•</span>
                <span className="text-lg text-gray-700">Step-by-step guidance on sales and delivery to help you work like a pro.</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#BF9B30] text-xl mr-3">•</span>
                <span className="text-lg text-gray-700">Access to marketing resources, case studies, and toolkits to boost your confidence.</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#BF9B30] text-xl mr-3">•</span>
                <span className="text-lg text-gray-700">Continuous mentor support to refine your approach and scale your results.</span>
              </li>
            </ul>

            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Our Ready-to-Sell Services are designed for everyone — students, freelancers, and budding entrepreneurs — empowering you to start earning from day one. It's your bridge between learning and real-world experience, ensuring that your hard work leads to visible results.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              At Launchpad, we don't just teach business — we equip you to do business. Because with the right tools and mentorship, innovation doesn't stay an idea — it becomes your success story.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#144449]">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Selling?</h2>
          <p className="text-xl text-white/90 mb-8">
            Access our ready-to-sell services and start generating revenue from day one.
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
