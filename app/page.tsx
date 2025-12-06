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
      <section className="relative pt-32 pb-32 md:pt-40 md:pb-40 overflow-hidden min-h-screen flex items-center bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] animate-background-shift">
        {/* Background Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-20 animate-pulse-slow"
        >
          <source src="/workvideo.mp4" type="video/mp4" />
        </video>
        
        {/* Content */}
        <div className="relative z-20 w-full h-full flex items-center justify-center">
          <div className="text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in-up">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-4 sm:mb-6 text-display animate-text-bounce">
              <span className="inline-block animate-text-pop-in" style={{ animationDelay: '0.3s' }}>
                <span className="text-[var(--crisp)] drop-shadow-lg animate-text-glow" style={{ animationDelay: '0.1s' }}>LAUNCH</span>
                <span className="animate-text-glow animate-text-gradient bg-gradient-to-r from-[var(--gold)] to-[var(--crisp)]" style={{ animationDelay: '0.2s' }}>PAD</span>
              </span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-3 sm:mb-4 font-medium animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              Aim for Innovation, Win with Execution
            </p>
            <p className="text-sm sm:text-base md:text-lg text-white/80 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-2 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
              A platform that supports aspiring solopreneurs, youth, and startups in building their own agencies and brands. 
              Through mentorship, ready-to-sell services, and healthy competition, transform your ambition into sustainable businesses.
            </p>
            {!currentUser && (
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 animate-fade-in-up" style={{ animationDelay: '1s' }}>
                <Link href="/login" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto bg-[var(--secondary)] text-black hover:bg-[var(--secondary)]/90 font-bold text-base sm:text-lg px-6 sm:px-8 py-3 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl animate-text-pop-in" style={{ animationDelay: '1.2s' }}>
                    Start Your Journey
                  </Button>
                </Link>
                <Link href="/about" className="w-full sm:w-auto">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-[var(--primary)] font-semibold text-base sm:text-lg px-6 sm:px-8 py-3 transition-all duration-300 hover:scale-105 !bg-transparent !border-white !text-white hover:!bg-white hover:!text-[var(--primary)] shadow-lg hover:shadow-xl animate-text-pop-in" style={{ animationDelay: '1.4s' }}>
                    Learn More
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* What is Launchpad Section */}
      <section className="pt-16 sm:pt-20 md:pt-24 pb-12 sm:pb-16 bg-[var(--surface)]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
            <div className="order-2 lg:order-1 animate-slide-in-left">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[var(--primary)] mb-4 sm:mb-6 text-center lg:text-left text-heading">What is Launchpad?</h2>
              <p className="text-base sm:text-lg text-[var(--text-primary)] leading-relaxed text-center lg:text-left mb-6">
                Launchpad is a platform that supports aspiring solopreneurs, youth, and startups in building their own agencies and brands. 
                It provides mentorship, ready-to-sell services, and a community to learn and grow. Through real-world sales and healthy competition, 
                participants gain recognition and transform their ambition into sustainable businesses.
              </p>
              <div className="flex justify-center lg:justify-start">
                <Link href="/about">
                  <Button className="bg-[var(--secondary)] text-black hover:bg-[var(--secondary)]/90 font-semibold px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg">
                    Discover Our Mission
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end order-1 lg:order-2 animate-slide-in-right">
              <div className="relative">
                <img 
                  src="/logo.png" 
                  alt="Launchpad Platform" 
                  className="relative w-full max-w-xs sm:max-w-sm md:max-w-md h-auto rounded-2xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* What We Offer Section */}
      <section className="py-16 sm:py-20 md:py-24 bg-[var(--surface)]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 animate-fade-in-up">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center text-[var(--primary)] mb-4 text-heading">What We Offer</h2>
            <p className="text-lg text-[var(--text-secondary)] max-w-3xl mx-auto">
              Comprehensive support to transform your entrepreneurial dreams into reality
            </p>
            <div className="w-20 h-1 bg-[var(--secondary)] mx-auto mt-6"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out cursor-pointer group border border-[var(--border)] hover:border-[var(--secondary)] transform hover:-translate-y-2">
              <div className="w-12 h-12 bg-[var(--secondary)] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 mx-auto">
                <span className="text-black text-xl group-hover:scale-110 transition-transform duration-300">👥</span>
              </div>
              <h3 className="text-xl text-[var(--primary)] mb-3 text-center group-hover:text-[var(--primary)]/90 transition-colors duration-300 text-subheading">Expert Mentorship</h3>
              <p className="text-base text-[var(--text-primary)] mb-5 text-center">
                Industry experts guide you throughout the competition, advising on what to do and what to avoid, helping you make informed decisions.
              </p>
              <Link href="/services/expert-mentorship">
                <Button className="w-full bg-[var(--primary)] text-white hover:bg-[var(--primary)]/90 font-medium group-hover:shadow-lg transition-all duration-300 rounded-lg py-2.5">
                  Learn More
                </Button>
              </Link>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out cursor-pointer group border border-[var(--border)] hover:border-[var(--secondary)] transform hover:-translate-y-2">
              <div className="w-12 h-12 bg-[var(--secondary)] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 mx-auto">
                <span className="text-black text-xl group-hover:scale-110 transition-transform duration-300">💼</span>
              </div>
              <h3 className="text-xl font-semibold text-[var(--primary)] mb-3 text-center group-hover:text-[var(--primary)]/90 transition-colors duration-300">Ready-to-Sell Services</h3>
              <p className="text-base text-[var(--text-primary)] mb-5 text-center">
                Access curated services that you can immediately start selling to build your agency and generate revenue from day one.
              </p>
              <Link href="/services/ready-to-sell-services">
                <Button className="w-full bg-[var(--primary)] text-white hover:bg-[var(--primary)]/90 font-medium group-hover:shadow-lg transition-all duration-300 rounded-lg py-2.5">
                  Learn More
                </Button>
              </Link>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out cursor-pointer group border border-[var(--border)] hover:border-[var(--secondary)] transform hover:-translate-y-2">
              <div className="w-12 h-12 bg-[var(--primary)] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 mx-auto">
                <span className="text-white text-xl group-hover:scale-110 transition-transform duration-300">🏆</span>
              </div>
              <h3 className="text-xl font-semibold text-[var(--primary)] mb-3 text-center group-hover:text-[var(--primary)]/90 transition-colors duration-300">Competition & Awards</h3>
              <p className="text-base text-[var(--text-primary)] mb-5 text-center">
                Compete with peers and get recognized for achievements including highest turnover, best branding, and more at the Award Night.
              </p>
              <Link href="/services/competition-awards">
                <Button className="w-full bg-[var(--primary)] text-white hover:bg-[var(--primary)]/90 font-medium group-hover:shadow-lg transition-all duration-300 rounded-lg py-2.5">
                  Learn More
                </Button>
              </Link>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out cursor-pointer group border border-[var(--border)] hover:border-[var(--secondary)] transform hover:-translate-y-2">
              <div className="w-12 h-12 bg-[var(--secondary)] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 mx-auto">
                <span className="text-black text-xl group-hover:scale-110 transition-transform duration-300">📈</span>
              </div>
              <h3 className="text-xl font-semibold text-[var(--primary)] mb-3 text-center group-hover:text-[var(--primary)]/90 transition-colors duration-300">Real-World Experience</h3>
              <p className="text-base text-[var(--text-primary)] mb-5 text-center">
                Learn through actual sales, client handling, and business operations that prepare you for real entrepreneurial challenges.
              </p>
              <Link href="/services/real-world-experience">
                <Button className="w-full bg-[var(--primary)] text-white hover:bg-[var(--primary)]/90 font-medium group-hover:shadow-lg transition-all duration-300 rounded-lg py-2.5">
                  Learn More
                </Button>
              </Link>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out cursor-pointer group border border-[var(--border)] hover:border-[var(--secondary)] transform hover:-translate-y-2">
              <div className="w-12 h-12 bg-[var(--primary)] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 mx-auto">
                <span className="text-white text-xl group-hover:scale-110 transition-transform duration-300">🤝</span>
              </div>
              <h3 className="text-xl font-semibold text-[var(--primary)] mb-3 text-center group-hover:text-[var(--primary)]/90 transition-colors duration-300">Supportive Community</h3>
              <p className="text-base text-[var(--text-primary)] mb-5 text-center">
                Connect with like-minded individuals, share experiences, and build lasting relationships with fellow entrepreneurs.
              </p>
              <Link href="/services/supportive-community">
                <Button className="w-full bg-[var(--primary)] text-white hover:bg-[var(--primary)]/90 font-medium group-hover:shadow-lg transition-all duration-300 rounded-lg py-2.5">
                  Learn More
                </Button>
              </Link>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out cursor-pointer group border border-[var(--border)] hover:border-[var(--secondary)] transform hover:-translate-y-2">
              <div className="w-12 h-12 bg-[var(--secondary)] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 mx-auto">
                <span className="text-black text-xl group-hover:scale-110 transition-transform duration-300">🎓</span>
              </div>
              <h3 className="text-xl font-semibold text-[var(--primary)] mb-3 text-center group-hover:text-[var(--primary)]/90 transition-colors duration-300">Structured Learning</h3>
              <p className="text-base text-[var(--text-primary)] mb-5 text-center">
                Follow a structured 3-month program with clear milestones, challenges, and evaluation criteria for steady progress.
              </p>
              <Link href="/services/structured-learning">
                <Button className="w-full bg-[var(--primary)] text-white hover:bg-[var(--primary)]/90 font-medium group-hover:shadow-lg transition-all duration-300 rounded-lg py-2.5">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Entrepreneurship Summit Section */}
      <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-br from-[var(--primary)] to-[var(--dark-teal)] text-white relative">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12 sm:mb-16 animate-fade-in-up">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 sm:mb-6 text-display">
              <span className="text-white">BE THE FIRST TO </span>
              <span className="text-[var(--gold)]">BREAK THE MOLD.</span>
            </h2>
            <h3 className="text-xl sm:text-2xl md:text-3xl mb-6 sm:mb-8 max-w-4xl mx-auto text-subheading">
              The Inaugural Entrepreneurship Summit. 2 Days. 3 Tracks. Infinite Possibilities.
            </h3>
            <p className="text-base sm:text-lg md:text-xl text-white mb-8 sm:mb-12 max-w-4xl mx-auto leading-relaxed">
              History isn't watched. It's written. Join the first-ever cohort of Launchpad to ditch the lectures for live simulations. 
              Pitch to investors, negotiate deals, and build your network before you graduate.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mb-12 sm:mb-16">
              <Link href="/e-summit">
                <Button className="bg-[var(--secondary)] text-black hover:bg-[var(--secondary)]/90 font-bold text-base sm:text-lg px-6 sm:px-8 py-3 w-full sm:w-auto transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
                  GET ACCESS PASS
                </Button>
              </Link>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-[var(--primary)] font-semibold text-base sm:text-lg px-6 sm:px-8 py-3 w-full sm:w-auto transition-all duration-300 hover:scale-105 !bg-transparent !border-white !text-white hover:!bg-white hover:!text-[var(--primary)] shadow-lg hover:shadow-xl">
                VIEW THE TRAILER
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-white/10 backdrop-blur-sm p-6 sm:p-8 rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 group transform hover:-translate-y-2 hover:shadow-2xl">
              <div className="w-16 h-16 bg-[var(--secondary)] rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 mx-auto shadow-lg">
                <span className="text-black text-2xl font-bold">🚀</span>
              </div>
              <h3 className="text-2xl text-center mb-3 text-[var(--gold)] text-subheading">Venture Vault</h3>
              <p className="text-white/90 text-center mb-4">Shark Tank for the next Unicorn.</p>
              <Button className="w-full bg-white/20 text-white hover:bg-white/30 border border-white/30 text-sm py-2 rounded-lg transition-all duration-300">
                Learn More
              </Button>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm p-6 sm:p-8 rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 group transform hover:-translate-y-2 hover:shadow-2xl">
              <div className="w-16 h-16 bg-[var(--secondary)] rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 mx-auto shadow-lg">
                <span className="text-black text-2xl font-bold">🎮</span>
              </div>
              <h3 className="text-2xl font-bold text-center mb-3 text-[var(--gold)]">Entrepreneur Olympics</h3>
              <p className="text-white/90 text-center mb-4">Business Gamified.</p>
              <Button className="w-full bg-white/20 text-white hover:bg-white/30 border border-white/30 text-sm py-2 rounded-lg transition-all duration-300">
                Learn More
              </Button>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm p-6 sm:p-8 rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 group transform hover:-translate-y-2 hover:shadow-2xl">
              <div className="w-16 h-16 bg-[var(--secondary)] rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 mx-auto shadow-lg">
                <span className="text-black text-2xl font-bold">🏪</span>
              </div>
              <h3 className="text-2xl font-bold text-center mb-3 text-[var(--gold)]">Startup Expo</h3>
              <p className="text-white/90 text-center mb-4">The Innovation Market.</p>
              <Button className="w-full bg-white/20 text-white hover:bg-white/30 border border-white/30 text-sm py-2 rounded-lg transition-all duration-300">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Competition Timeline */}
      <section className="py-16 bg-[var(--background)]">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-center text-[var(--primary)] mb-4 text-heading">3-Month Challenge</h2>
            <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
              A structured program to transform your entrepreneurial journey
            </p>
            <div className="w-20 h-1 bg-[var(--secondary)] mx-auto mt-6"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div 
              ref={leftRef}
              className={`transition-all duration-1000 ease-out ${
                isLeftVisible 
                  ? 'opacity-100 translate-x-0' 
                  : 'opacity-0 -translate-x-12'
              }`}
            >
              <h3 className="text-2xl font-semibold text-[var(--primary)] mb-4">Competition Duration</h3>
              <p className="text-[var(--text-primary)] mb-6 leading-relaxed">
                Launchpad is a 3-month-long challenge designed to help aspiring entrepreneurs take their first step into entrepreneurship, 
                sell curated services, and start building their own agency or brand.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[var(--secondary)] rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-black font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[var(--text-primary)]">Registration & Basic Tasks</h4>
                    <p className="text-sm text-[var(--text-secondary)]">Kickstart your journey with foundational challenges</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[var(--secondary)] rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-black font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[var(--text-primary)]">Mentorship & Advanced Challenges</h4>
                    <p className="text-sm text-[var(--text-secondary)]">Deep dive with expert guidance and complex tasks</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[var(--secondary)] rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-black font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[var(--text-primary)]">Awards & Recognition</h4>
                    <p className="text-sm text-[var(--text-secondary)]">Celebrate achievements and network with peers</p>
                  </div>
                </div>
              </div>
            </div>
            <div 
              ref={rightRef}
              className={`bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] p-8 rounded-xl text-white transition-all duration-1000 ease-out shadow-xl ${
                isRightVisible 
                  ? 'opacity-100 translate-x-0' 
                  : 'opacity-0 translate-x-12'
              }`}
            >
              <div className="flex items-center mb-4">
                <div className="w-3 h-3 bg-white rounded-full mr-2 animate-pulse"></div>
                <span className="text-sm font-semibold uppercase tracking-wider">Limited Time Offer</span>
              </div>
              <p className="text-3xl font-bold mb-2">Registration closing soon</p>
              <p className="text-white/90 mb-6">
                Early registration may provide bonus points or early access to mentorship.
              </p>
              {!currentUser && (
                <Link href="/login">
                  <Button className="bg-white text-[var(--primary)] hover:bg-gray-100 font-semibold !bg-white !text-[var(--primary)] hover:!bg-gray-100 w-full py-3 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg">
                    Register Now
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Launchpad Award Night Section */}
      <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-br from-[var(--surface)] via-white to-[var(--light-grey)] relative">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-8 sm:mb-12 animate-fade-in-up">
            <div className="inline-block mb-4 sm:mb-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#0a2529] rounded-full flex items-center justify-center mx-auto shadow-lg">
                <span className="text-white text-2xl sm:text-3xl">🏆</span>
              </div>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center text-[#0a2529] mb-4 sm:mb-6 text-display">Launchpad Award Night</h2>
            <p className="text-lg sm:text-xl text-center text-[var(--text-primary)] mb-8 sm:mb-12 max-w-4xl mx-auto">
              Top performers will be recognized during the Launchpad Award Night, with awards for:
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out cursor-pointer group relative overflow-hidden border border-[var(--border)] transform hover:-translate-y-2">
              
              
              <div className="w-20 h-20 bg-gradient-to-br from-[var(--secondary)] to-[var(--light-gold)] rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg group-hover:shadow-xl">
                <span className="text-black text-3xl font-bold group-hover:scale-110 transition-transform duration-300">💰</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-[var(--primary)] mb-3 sm:mb-4 group-hover:text-[var(--primary)]/90 transition-colors duration-300 text-center">Highest Turnover</h3>
              <p className="text-[var(--text-primary)] text-sm sm:text-base group-hover:text-[var(--text-secondary)] transition-colors duration-300 text-center">
                Best revenue performance
              </p>
              
              
            </div>
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out cursor-pointer group relative overflow-hidden border border-[var(--border)] transform hover:-translate-y-2">
              
              
              <div className="w-20 h-20 bg-gradient-to-br from-[var(--primary)] to-[var(--dark-blue)] rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg group-hover:shadow-xl">
                <span className="text-white text-3xl font-bold group-hover:scale-110 transition-transform duration-300">🎨</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-[var(--primary)] mb-3 sm:mb-4 group-hover:text-[var(--primary)]/90 transition-colors duration-300 text-center">Best Branding</h3>
              <p className="text-[var(--text-primary)] text-sm sm:text-base group-hover:text-[var(--text-secondary)] transition-colors duration-300 text-center">
                Most creative brand identity
              </p>
              
              {/* Award badge effect */}
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-[var(--primary)] to-[var(--dark-blue)] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white text-xs">★</span>
              </div>
            </div>
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out cursor-pointer group relative overflow-hidden border border-[var(--border)] transform hover:-translate-y-2">
              
              
              <div className="w-20 h-20 bg-gradient-to-br from-[var(--secondary)] to-[var(--light-gold)] rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg group-hover:shadow-xl">
                <span className="text-black text-3xl font-bold group-hover:scale-110 transition-transform duration-300">⭐</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-[var(--primary)] mb-3 sm:mb-4 group-hover:text-[var(--primary)]/90 transition-colors duration-300 text-center">Rising Star</h3>
              <p className="text-[var(--text-primary)] text-sm sm:text-base group-hover:text-[var(--text-secondary)] transition-colors duration-300 text-center">
                Most promising newcomer
              </p>
              
              
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[var(--primary)] relative">
        <div className="mx-auto max-w-4xl px-4 text-center relative z-10">
          <h2 className="text-3xl font-bold text-white mb-4 animate-fade-in-up text-heading">Ready to Launch Your Business?</h2>
          <p className="text-xl text-white/90 mb-8 animate-fade-in-up-delay">
            Join thousands of aspiring entrepreneurs who are building their dreams with Launchpad.
          </p>
          {!currentUser && (
            <Link href="/login">
              <Button size="lg" className="bg-[var(--secondary)] text-black hover:bg-[var(--secondary)]/90 font-bold text-lg px-8 py-3 !bg-[var(--secondary)] !text-black hover:!bg-[var(--secondary)]/90 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl animate-fade-in-up-delay-2">
                Get Started Today
              </Button>
            </Link>
          )}
        </div>
      </section>
    </div>
  )
}
