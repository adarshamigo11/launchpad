"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useApp } from "@/components/state/auth-context"
import { useEffect, useRef, useState } from "react"

export default function HomePage() {
  const { currentUser } = useApp()
  const [isLeftVisible, setIsLeftVisible] = useState(false)
  const [isRightVisible, setIsRightVisible] = useState(false)
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === leftRef.current && entry.isIntersecting) {
            setIsLeftVisible(true)
          }
          if (entry.target === rightRef.current && entry.isIntersecting) {
            setIsRightVisible(true)
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    )

    if (leftRef.current) {
      observer.observe(leftRef.current)
    }
    if (rightRef.current) {
      observer.observe(rightRef.current)
    }

    return () => {
      if (leftRef.current) {
        observer.unobserve(leftRef.current)
      }
      if (rightRef.current) {
        observer.unobserve(rightRef.current)
      }
    }
  }, [])

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-32 md:pt-40 md:pb-40 overflow-hidden min-h-screen flex items-center">
        {/* Background Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src="/workvideo.mp4" type="video/mp4" />
        </video>
        
        {/* Black Gradient Overlay */}
        <div className="absolute inset-0 bg-black/80 z-10"></div>
        
        {/* Content */}
        <div className="relative z-20 w-full h-full flex items-center justify-center">
          <div className="text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-6">
              <span className="text-[#007BFF]">LAUNCH</span><span className="text-[#FFC107]">PAD</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-3 sm:mb-4 font-medium">
              Aim for Innovation, Win with Execution
            </p>
            <p className="text-sm sm:text-base md:text-lg text-white/80 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-2">
              A platform that supports aspiring solopreneurs, youth, and startups in building their own agencies and brands. 
              Through mentorship, ready-to-sell services, and healthy competition, transform your ambition into sustainable businesses.
            </p>
            {!currentUser && (
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
                <Link href="/login" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto bg-[#FFC107] text-black hover:bg-[#FFC107]/90 font-bold text-base sm:text-lg px-6 sm:px-8 py-3">
                    Start Your Journey
                  </Button>
                </Link>
                <Link href="/about" className="w-full sm:w-auto">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-[#007BFF] font-semibold text-base sm:text-lg px-6 sm:px-8 py-3 !bg-transparent !border-white !text-white hover:!bg-white hover:!text-[#007BFF]">
                    Learn More
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* What is Launchpad Section */}
      <section className="pt-16 sm:pt-20 md:pt-24 pb-12 sm:pb-16 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
            <div className="order-2 lg:order-1 animate-slide-in-left">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#007BFF] mb-4 sm:mb-6 text-center lg:text-left">What is Launchpad?</h2>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed text-center lg:text-left">
                Launchpad is a platform that supports aspiring solopreneurs, youth, and startups in building their own agencies and brands. 
                It provides mentorship, ready-to-sell services, and a community to learn and grow. Through real-world sales and healthy competition, 
                participants gain recognition and transform their ambition into sustainable businesses.
              </p>
            </div>
            <div className="flex justify-center lg:justify-end order-1 lg:order-2 animate-slide-in-right">
              <img 
                src="/logo.png" 
                alt="Launchpad Platform" 
                className="w-full max-w-xs sm:max-w-sm md:max-w-md h-auto rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>


      {/* What We Offer Section */}
      <section className="py-16 sm:py-20 md:py-24 bg-gray-50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center text-[#007BFF] mb-8 sm:mb-12">What We Offer</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer group">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#FFC107] rounded-lg flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                <span className="text-black text-lg sm:text-xl group-hover:scale-110 transition-transform duration-300">👥</span>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-[#007BFF] mb-2 sm:mb-3 group-hover:text-[#007BFF]/90 transition-colors duration-300">Expert Mentorship</h3>
              <p className="text-sm sm:text-base text-gray-600 mb-4 group-hover:text-gray-700 transition-colors duration-300">
                Industry experts guide you throughout the competition, advising on what to do and what to avoid, helping you make informed decisions.
              </p>
              <Link href="/services/expert-mentorship">
                <Button className="w-full bg-[#007BFF] text-white hover:bg-[#007BFF]/90 text-sm font-medium group-hover:shadow-lg transition-all duration-300">
                  Learn More
                </Button>
              </Link>
            </div>
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer group">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#FFC107] rounded-lg flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                <span className="text-black text-lg sm:text-xl group-hover:scale-110 transition-transform duration-300">💼</span>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-[#007BFF] mb-2 sm:mb-3 group-hover:text-[#007BFF]/90 transition-colors duration-300">Ready-to-Sell Services</h3>
              <p className="text-sm sm:text-base text-gray-600 mb-4 group-hover:text-gray-700 transition-colors duration-300">
                Access curated services that you can immediately start selling to build your agency and generate revenue from day one.
              </p>
              <Link href="/services/ready-to-sell-services">
                <Button className="w-full bg-[#007BFF] text-white hover:bg-[#007BFF]/90 text-sm font-medium group-hover:shadow-lg transition-all duration-300">
                  Learn More
                </Button>
              </Link>
            </div>
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer group">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#007BFF] rounded-lg flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                <span className="text-white text-lg sm:text-xl group-hover:scale-110 transition-transform duration-300">🏆</span>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-[#007BFF] mb-2 sm:mb-3 group-hover:text-[#007BFF]/90 transition-colors duration-300">Competition & Awards</h3>
              <p className="text-sm sm:text-base text-gray-600 mb-4 group-hover:text-gray-700 transition-colors duration-300">
                Compete with peers and get recognized for achievements including highest turnover, best branding, and more at the Award Night.
              </p>
              <Link href="/services/competition-awards">
                <Button className="w-full bg-[#007BFF] text-white hover:bg-[#007BFF]/90 text-sm font-medium group-hover:shadow-lg transition-all duration-300">
                  Learn More
                </Button>
              </Link>
            </div>
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer group">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#FFC107] rounded-lg flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                <span className="text-black text-lg sm:text-xl group-hover:scale-110 transition-transform duration-300">📈</span>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-[#007BFF] mb-2 sm:mb-3 group-hover:text-[#007BFF]/90 transition-colors duration-300">Real-World Experience</h3>
              <p className="text-sm sm:text-base text-gray-600 mb-4 group-hover:text-gray-700 transition-colors duration-300">
                Learn through actual sales, client handling, and business operations that prepare you for real entrepreneurial challenges.
              </p>
              <Link href="/services/real-world-experience">
                <Button className="w-full bg-[#007BFF] text-white hover:bg-[#007BFF]/90 text-sm font-medium group-hover:shadow-lg transition-all duration-300">
                  Learn More
                </Button>
              </Link>
            </div>
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer group">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#007BFF] rounded-lg flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                <span className="text-white text-lg sm:text-xl group-hover:scale-110 transition-transform duration-300">🤝</span>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-[#007BFF] mb-2 sm:mb-3 group-hover:text-[#007BFF]/90 transition-colors duration-300">Supportive Community</h3>
              <p className="text-sm sm:text-base text-gray-600 mb-4 group-hover:text-gray-700 transition-colors duration-300">
                Connect with like-minded individuals, share experiences, and build lasting relationships with fellow entrepreneurs.
              </p>
              <Link href="/services/supportive-community">
                <Button className="w-full bg-[#007BFF] text-white hover:bg-[#007BFF]/90 text-sm font-medium group-hover:shadow-lg transition-all duration-300">
                  Learn More
                </Button>
              </Link>
            </div>
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer group">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#FFC107] rounded-lg flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                <span className="text-black text-lg sm:text-xl group-hover:scale-110 transition-transform duration-300">🎓</span>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-[#007BFF] mb-2 sm:mb-3 group-hover:text-[#007BFF]/90 transition-colors duration-300">Structured Learning</h3>
              <p className="text-sm sm:text-base text-gray-600 mb-4 group-hover:text-gray-700 transition-colors duration-300">
                Follow a structured 3-month program with clear milestones, challenges, and evaluation criteria for steady progress.
              </p>
              <Link href="/services/structured-learning">
                <Button className="w-full bg-[#007BFF] text-white hover:bg-[#007BFF]/90 text-sm font-medium group-hover:shadow-lg transition-all duration-300">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Competition Timeline */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-6xl font-bold text-center text-[#007BFF] mb-12">3-Month Challenge</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div 
              ref={leftRef}
              className={`transition-all duration-1000 ease-out ${
                isLeftVisible 
                  ? 'opacity-100 translate-x-0' 
                  : 'opacity-0 -translate-x-12'
              }`}
            >
              <h3 className="text-2xl font-semibold text-[#007BFF] mb-4">Competition Duration</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Launchpad is a 3-month-long challenge designed to help aspiring entrepreneurs take their first step into entrepreneurship, 
                sell curated services, and start building their own agency or brand.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#FFC107] rounded-full flex items-center justify-center">
                    <span className="text-black font-bold">1</span>
                  </div>
                  <span className="text-gray-700">Registration & Basic Tasks</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#FFC107] rounded-full flex items-center justify-center">
                    <span className="text-black font-bold">2</span>
                  </div>
                  <span className="text-gray-700">Mentorship & Advanced Challenges</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#FFC107] rounded-full flex items-center justify-center">
                    <span className="text-black font-bold">3</span>
                  </div>
                  <span className="text-gray-700">Awards & Recognition</span>
                </div>
              </div>
            </div>
            <div 
              ref={rightRef}
              className={`bg-gradient-to-br from-[#007BFF] to-[#FFC107] p-8 rounded-lg text-white transition-all duration-1000 ease-out ${
                isRightVisible 
                  ? 'opacity-100 translate-x-0' 
                  : 'opacity-0 translate-x-12'
              }`}
            >
              <p className="text-3xl font-bold mb-2">Registration closing soon</p>
              <p className="text-white/90 mb-6">
                Early registration may provide bonus points or early access to mentorship.
              </p>
              {!currentUser && (
                <Link href="/login">
                  <Button className="bg-white text-[#007BFF] hover:bg-gray-100 font-semibold !bg-white !text-[#007BFF] hover:!bg-gray-100">
                    Register Now
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Launchpad Award Night Section */}
      <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#FFC107]/5 rounded-full blur-2xl"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-[#007BFF]/5 rounded-full blur-2xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gradient-to-r from-[#FFC107]/3 to-[#007BFF]/3 rounded-full blur-3xl"></div>
        </div>
        
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-8 sm:mb-12">
            <div className="inline-block mb-4 sm:mb-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-[#FFC107] to-[#007BFF] rounded-full flex items-center justify-center mx-auto animate-pulse">
                <span className="text-white text-2xl sm:text-3xl">🏆</span>
              </div>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center bg-gradient-to-r from-[#007BFF] to-[#FFC107] bg-clip-text text-transparent mb-4 sm:mb-6">Launchpad Award Night</h2>
            <p className="text-lg sm:text-xl text-center text-gray-600 mb-8 sm:mb-12 max-w-4xl mx-auto">
              Top performers will be recognized during the Launchpad Award Night, with awards for:
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer group relative overflow-hidden">
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
              
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-[#FFC107] to-[#FFA000] rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg group-hover:shadow-xl">
                <span className="text-black text-2xl sm:text-3xl font-bold group-hover:scale-110 transition-transform duration-300">💰</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-[#007BFF] mb-3 sm:mb-4 group-hover:text-[#007BFF]/90 transition-colors duration-300 text-center">Highest Turnover</h3>
              <p className="text-gray-600 text-sm sm:text-base group-hover:text-gray-700 transition-colors duration-300 text-center">
                Best revenue performance
              </p>
              
              {/* Award badge effect */}
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-[#FFC107] to-[#FFA000] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white text-xs">★</span>
              </div>
            </div>
            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer group relative overflow-hidden">
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
              
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-[#007BFF] to-[#0056CC] rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg group-hover:shadow-xl">
                <span className="text-white text-2xl sm:text-3xl font-bold group-hover:scale-110 transition-transform duration-300">🎨</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-[#007BFF] mb-3 sm:mb-4 group-hover:text-[#007BFF]/90 transition-colors duration-300 text-center">Best Branding</h3>
              <p className="text-gray-600 text-sm sm:text-base group-hover:text-gray-700 transition-colors duration-300 text-center">
                Most creative brand identity
              </p>
              
              {/* Award badge effect */}
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-[#007BFF] to-[#0056CC] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white text-xs">★</span>
              </div>
            </div>
            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer group relative overflow-hidden">
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
              
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-[#FFC107] to-[#FFA000] rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg group-hover:shadow-xl">
                <span className="text-black text-2xl sm:text-3xl font-bold group-hover:scale-110 transition-transform duration-300">⭐</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-[#007BFF] mb-3 sm:mb-4 group-hover:text-[#007BFF]/90 transition-colors duration-300 text-center">Rising Star</h3>
              <p className="text-gray-600 text-sm sm:text-base group-hover:text-gray-700 transition-colors duration-300 text-center">
                Most promising newcomer
              </p>
              
              {/* Award badge effect */}
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-[#FFC107] to-[#FFA000] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white text-xs">★</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#007BFF]">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Launch Your Business?</h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of aspiring entrepreneurs who are building their dreams with Launchpad.
          </p>
          {!currentUser && (
            <Link href="/login">
              <Button size="lg" className="bg-[#FFC107] text-black hover:bg-[#FFC107]/90 font-bold text-lg px-8 py-3 !bg-[#FFC107] !text-black hover:!bg-[#FFC107]/90">
                Get Started Today
              </Button>
            </Link>
          )}
        </div>
      </section>
    </div>
  )
}
