"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ESummitPage() {
  const [passPrices, setPassPrices] = useState<Record<string, number>>({})

  // Define pass types and their display names
  const PASS_TYPES: Record<string, string> = {
    "venture-vault": "Venture Vault Pass",
    "premium-pass": "Premium Pass",
    "roundtable": "Roundtable Pass",
    "booth": "Expo Booth Pass",
    "access-pass": "Access Pass",
    "general": "General Pass",
    "team": "Team Pass",
    "premium": "Premium Access Pass",
    "shark-tank": "Shark Tank Registration",
    "expo": "Expo Booth Booking"
  }

  useEffect(() => {
    loadPassPrices()
  }, [])

  const loadPassPrices = async () => {
    try {
      const res = await fetch("/api/e-summit/pass-prices")
      const data = await res.json()
      
      if (data.ok) {
        setPassPrices(data.prices)
      }
    } catch (error) {
      console.error("Error loading pass prices:", error)
    }
  }

  // Helper function to get price for a pass type
  const getPrice = (passType: string): number => {
    return passPrices[passType] || 0
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] text-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight text-display text-white animate-fade-in-up">
              Ignite. Innovate. Inspire.
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-8 leading-relaxed max-w-3xl mx-auto animate-fade-in-up-delay">
              The Ultimate Entrepreneurship Summit for India's Next Gen.
            </p>
            <p className="text-base sm:text-lg md:text-xl text-white/80 mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in-up-delay-2">
              <strong>Two days</strong> of high-stakes pitching, intense learning, and real-world networking. Connect with
              investors, learn from CEOs, and validate your business idea in the heart of Indore.
            </p>
            
            <div className="mb-8 text-center animate-fade-in-up-delay-3">
              <div className="inline-block bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-6">
                <div className="flex flex-wrap justify-center gap-4 md:gap-8">
                  <div className="flex items-center">
                    <span className="text-2xl mr-2">🗓️</span>
                    <span className="text-sm sm:text-base">Dates: 19th & 20th December</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-2xl mr-2">🏢</span>
                    <span className="text-sm sm:text-base">Venue: Indore</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-2xl mr-2">⏰</span>
                    <span className="text-sm sm:text-base">Early Bird Pricing Ends: 13th December</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mb-8 animate-fade-in-up-delay-4">
              <Button className="bg-[var(--accent)] text-black hover:bg-[var(--accent)]/90 font-bold text-base sm:text-lg px-6 sm:px-8 py-3 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl w-full sm:w-auto">
                GRAB YOUR EARLY BIRD PASS
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-[var(--primary)] font-semibold text-base sm:text-lg px-6 sm:px-8 py-3 w-full sm:w-auto transition-all duration-300 hover:scale-105 !bg-transparent !border-white !text-white hover:!bg-white hover:!text-[var(--primary)] shadow-lg hover:shadow-xl">
                VIEW EVENT LINEUP
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Overview */}
      <section className="py-16 sm:py-20 bg-[var(--background)]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 animate-fade-in-up">
            <h2 className="text-2xl sm:text-3xl md:text-4xl text-[var(--primary)] mb-4 text-heading font-bold">What is Launchpad E-Summit?</h2>
            <p className="text-lg text-[var(--text-secondary)] max-w-3xl mx-auto mb-6">
              This isn't just another college event. It is a full-scale operational ecosystem designed to
              bridge the gap between "textbook theory" and "business reality."
            </p>
            <div className="w-20 h-1 bg-[var(--secondary)] mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-[var(--border)] hover:border-[var(--secondary)] transform hover:-translate-y-2 transition-all duration-300">
              <div className="w-12 h-12 bg-[var(--secondary)] rounded-xl flex items-center justify-center mb-4 mx-auto">
                <span className="text-black text-xl">🚀</span>
              </div>
              <h3 className="text-xl font-semibold text-[var(--primary)] mb-3 text-center">For Aspiring Founders</h3>
              <p className="text-[var(--text-primary)] text-center">
                Validate your idea, find a co-founder, and learn 3–5 practical frameworks you can apply next week.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg border border-[var(--border)] hover:border-[var(--secondary)] transform hover:-translate-y-2 transition-all duration-300">
              <div className="w-12 h-12 bg-[var(--primary)] rounded-xl flex items-center justify-center mb-4 mx-auto">
                <span className="text-white text-xl">🏢</span>
              </div>
              <h3 className="text-xl font-semibold text-[var(--primary)] mb-3 text-center">For Early-Stage Startups</h3>
              <p className="text-[var(--text-primary)] text-center">
                Pitch to "Super Judges" in the Venture Vault and showcase your product to 100+ attendees at the Expo.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg border border-[var(--border)] hover:border-[var(--secondary)] transform hover:-translate-y-2 transition-all duration-300">
              <div className="w-12 h-12 bg-[var(--secondary)] rounded-xl flex items-center justify-center mb-4 mx-auto">
                <span className="text-black text-xl">🎓</span>
              </div>
              <h3 className="text-xl font-semibold text-[var(--primary)] mb-3 text-center">For Students</h3>
              <p className="text-[var(--text-primary)] text-center">
                Walk away with real tactical skills—from fundraising to hiring your first team.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Highlights */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 animate-fade-in-up">
            <h2 className="text-2xl sm:text-3xl md:text-4xl text-[var(--primary)] mb-4 text-heading font-bold">Key Highlights</h2>
            <div className="w-20 h-1 bg-[var(--secondary)] mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-[var(--border)] hover:shadow-xl transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] rounded-full flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
                <span className="text-white text-2xl">🦈</span>
              </div>
              <h3 className="text-xl font-semibold text-[var(--primary)] mb-3 text-center">Venture Vault</h3>
              <p className="text-[var(--text-primary)] text-center mb-4">
                A Shark-Tank-style arena with real investors and mentorship sprints.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg border border-[var(--border)] hover:shadow-xl transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-br from-[var(--secondary)] to-[var(--primary)] rounded-full flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
                <span className="text-white text-2xl">🎤</span>
              </div>
              <h3 className="text-xl font-semibold text-[var(--primary)] mb-3 text-center">Founders Roundtable</h3>
              <p className="text-[var(--text-primary)] text-center mb-4">
                "Inside the Founder's Mind"—candid, off-the-record stories of failure and success.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg border border-[var(--border)] hover:shadow-xl transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] rounded-full flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
                <span className="text-white text-2xl">🎪</span>
              </div>
              <h3 className="text-xl font-semibold text-[var(--primary)] mb-3 text-center">Startup Expo</h3>
              <p className="text-[var(--text-primary)] text-center mb-4">
                The "Innovation Market" featuring 100+ startups, demo stages, and investor alleys.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg border border-[var(--border)] hover:shadow-xl transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-br from-[var(--secondary)] to-[var(--primary)] rounded-full flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
                <span className="text-white text-2xl">🏆</span>
              </div>
              <h3 className="text-xl font-semibold text-[var(--primary)] mb-3 text-center">Entrepreneur Olympics</h3>
              <p className="text-[var(--text-primary)] text-center mb-4">
                Gamified business challenges—from "Logo Redesign Races" to "Meme Marketing Battles."
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg border border-[var(--border)] hover:shadow-xl transition-all duration-300 group md:col-span-2 lg:col-span-1 lg:col-start-2">
              <div className="w-16 h-16 bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] rounded-full flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
                <span className="text-white text-2xl">🎉</span>
              </div>
              <h3 className="text-xl font-semibold text-[var(--primary)] mb-3 text-center">The Experience</h3>
              <p className="text-[var(--text-primary)] text-center mb-4">
                Stand-up comedy, live DJ, and networking dinners to unwind and connect.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Final Home CTA */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] text-white relative">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl mb-4 text-heading animate-fade-in-up">Early Bird Ends December 13th.</h2>
          <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-2xl mx-auto animate-fade-in-up-delay">
            Don't let your idea sit in a notebook. Bring it to the Launchpad.
          </p>
          <Button className="bg-[var(--accent)] text-black hover:bg-[var(--accent)]/90 font-bold text-base sm:text-lg px-8 py-4 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl animate-fade-in-up-delay-2">
            GET MY TICKET NOW
          </Button>
        </div>
      </section>

      {/* Page Intro */}
      <section className="py-8 sm:py-10 bg-[var(--background)]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6 sm:mb-8 animate-fade-in-up">
            <h2 className="text-2xl sm:text-3xl md:text-4xl text-[var(--primary)] mb-4 text-heading font-bold">Bridging the Gap Between Theory and Execution.</h2>
            <p className="text-lg text-[var(--text-secondary)] max-w-3xl mx-auto mb-4">
              The Launchpad E-Summit is designed to bring together entrepreneurs, innovators, and
              experts for a series of keynotes, workshops, competitions, and networking opportunities. We
              move beyond "motivational speeches" to give you a founder's real journey—wins, failures,
              and tradeoffs.
            </p>
            <div className="w-20 h-1 bg-[var(--secondary)] mx-auto"></div>
          </div>
        </div>
      </section>
      {/* Events Section */}
      <section className="py-4 sm:py-6 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 animate-fade-in-up">
            <h2 className="text-2xl sm:text-3xl md:text-4xl text-[var(--primary)] mb-4 text-heading font-bold">Events</h2>
            <div className="w-20 h-1 bg-[var(--secondary)] mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* The Venture Vault */}
            <div className="bg-white border border-[var(--border)] rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
              <div className="bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white p-5">
                <h3 className="text-xl font-bold mb-1">The Venture Vault</h3>
                <p className="text-sm">Shark Tank Style Pitch</p>
              </div>
              <div className="p-5 flex-grow flex flex-col">
                <div className="mb-3 flex-grow">
                  <h4 className="text-[var(--primary)] font-semibold text-base mb-2">What is it?</h4>
                  <p className="text-[var(--text-primary)] text-sm mb-3">
                    This is a competition where you stand on a stage and present your business idea to a panel of "Super Judges" (successful founders) and investors.
                  </p>
                  
                  <h4 className="text-[var(--primary)] font-semibold text-base mb-2">How is it different?</h4>
                  <p className="text-[var(--text-primary)] text-sm mb-3">
                    It's not just a 5-minute pitch. If you qualify, you get assigned a mentor who helps you fix your business plan before the final round.
                  </p>
                  
                  <h4 className="text-[var(--primary)] font-semibold text-base mb-2">Who is this for?</h4>
                  <p className="text-[var(--text-primary)] text-sm mb-3">
                    Teams of 1–4 students who have a solid idea or a working product.
                  </p>
                  
                  <h4 className="text-[var(--primary)] font-semibold text-base mb-2">What can you win?</h4>
                  <p className="text-[var(--text-primary)] text-sm mb-3">
                    You could get seed grants (money for your startup), incubation support (office space and help), or even investment offers.
                  </p>
                  
                  <h4 className="text-[var(--primary)] font-semibold text-base mb-2">Simple Rule</h4>
                  <p className="text-[var(--text-primary)] text-sm">
                    To move to the next round, you need approval from the investors.
                  </p>
                </div>
                <div className="mt-auto">
                  <span className="text-sm text-[var(--text-secondary)]">Teams of 1–4 students</span>
                </div>
              </div>
            </div>
          
          {/* The Startup Expo */}
          <div className="bg-white border border-[var(--border)] rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
            <div className="bg-gradient-to-r from-[var(--secondary)] to-[var(--primary)] text-white p-5">
              <h3 className="text-xl font-bold mb-1">The Startup Expo</h3>
              <p className="text-sm">Set Up Your Own Shop</p>
            </div>
            <div className="p-5 flex-grow flex flex-col">
              <div className="mb-3 flex-grow">
                <h4 className="text-[var(--primary)] font-semibold text-base mb-2">What is it?</h4>
                <p className="text-[var(--text-primary)] text-sm mb-3">
                  A large exhibition hall where startups set up small stalls (booths).
                </p>
                
                <h4 className="text-[var(--primary)] font-semibold text-base mb-2">What do you do there?</h4>
                <p className="text-[var(--text-primary)] text-sm mb-3">
                  You stand at your booth, show your product to people walking by, and try to get them interested.
                </p>
                
                <h4 className="text-[var(--primary)] font-semibold text-base mb-2">Why pay for a booth?</h4>
                <ul className="text-[var(--text-primary)] text-sm mb-3 ml-5">
                  <li className="list-disc mb-2">Get Customers: Hundreds of people will see your product.</li>
                  <li className="list-disc mb-2">Get Feedback: Find out immediately if people like what you are selling.</li>
                  <li className="list-disc">Find Investors: Investors often walk through the expo looking for interesting new teams.</li>
                </ul>
                
                <h4 className="text-[var(--primary)] font-semibold text-base mb-2">Booth Details</h4>
                <p className="text-[var(--text-primary)] text-sm">
                  You get a standard space with a table and chairs.
                </p>
              </div>
              <div className="mt-auto">
                <span className="text-sm text-[var(--text-secondary)]">Standard booth setup</span>
              </div>
            </div>
          </div>
          
          {/* Founders Roundtable */}
          <div className="bg-white border border-[var(--border)] rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
            <div className="bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white p-5">
              <h3 className="text-xl font-bold mb-1">Founders Roundtable</h3>
              <p className="text-sm">Real Talk with CEOs</p>
            </div>
            <div className="p-5 flex-grow flex flex-col">
              <div className="mb-3 flex-grow">
                <h4 className="text-[var(--primary)] font-semibold text-base mb-2">What is it?</h4>
                <p className="text-[var(--text-primary)] text-sm mb-3">
                  A closed-door discussion with successful founders.
                </p>
                
                <h4 className="text-[var(--primary)] font-semibold text-base mb-2">What happens?</h4>
                <p className="text-[var(--text-primary)] text-sm mb-3">
                  Instead of a polite speech, they share the "hard truths." They talk about their biggest failures, how they handle stress, and the mistakes they made when hiring people.
                </p>
                
                <h4 className="text-[var(--primary)] font-semibold text-base mb-2">Why attend?</h4>
                <p className="text-[var(--text-primary)] text-sm">
                  To hear the secrets that usually don't get shared in public interviews.
                </p>
              </div>
              <div className="mt-auto">
                <span className="text-sm text-[var(--text-secondary)]">Intimate setting</span>
              </div>
            </div>
          </div>
          

          
          {/* Workshops */}
          <div className="bg-white border border-[var(--border)] rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
            <div className="bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white p-5">
              <h3 className="text-xl font-bold mb-1">Panel Discussion</h3>
              <p className="text-sm">Classrooms That Teach Real Skills</p>
            </div>
            <div className="p-5 flex-grow flex flex-col">
              <div className="mb-3 flex-grow">
                <h4 className="text-[var(--primary)] font-semibold text-base mb-2">Option A: Fundraising</h4>
                <p className="text-[var(--text-primary)] text-sm mb-3">
                  Learn how to ask investors for money. We teach you how to prepare your "pitch deck" (presentation) and what to say in meetings.
                </p>
                
                <h4 className="text-[var(--primary)] font-semibold text-base mb-2">Option B: Marketing & Branding</h4>
                <p className="text-[var(--text-primary)] text-sm">
                  Learn how to make people recognize your brand and how to find customers online.
                </p>
              </div>
              <div className="mt-auto">
                <span className="text-sm text-[var(--text-secondary)]">Two specialized tracks</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      </section>

      {/* Final Summary: What You Get In One Glance */}
      <div className="py-8 sm:py-12"></div>
      <section className="py-16 sm:py-20 bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] text-white relative">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl text-white mb-4 text-heading animate-fade-in-up">FINAL SUMMARY: What You Get In One Glance</h2>
            <div className="w-20 h-1 bg-[var(--accent)] mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
            <div className="bg-white/10 p-6 sm:p-8 rounded-xl border border-white/20 backdrop-blur-sm">
              <div className="flex items-start mb-4">
                <span className="text-2xl mr-3">🤝</span>
                <div>
                  <h3 className="text-xl text-[var(--accent)] text-subheading mb-2">Real Connections</h3>
                  <p className="text-white/90">
                    Meet people who can hire you, fund you, or mentor you.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 p-6 sm:p-8 rounded-xl border border-white/20 backdrop-blur-sm">
              <div className="flex items-start mb-4">
                <span className="text-2xl mr-3">📚</span>
                <div>
                  <h3 className="text-xl text-[var(--accent)] text-subheading mb-2">Practical Learning</h3>
                  <p className="text-white/90">
                    Go home with skills in marketing and finance, not just theory.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 p-6 sm:p-8 rounded-xl border border-white/20 backdrop-blur-sm">
              <div className="flex items-start mb-4">
                <span className="text-2xl mr-3">📜</span>
                <div>
                  <h3 className="text-xl text-[var(--accent)] text-subheading mb-2">Certificate</h3>
                  <p className="text-white/90">
                    A valuable addition to your resume (for Premium Pass holders).
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 p-6 sm:p-8 rounded-xl border border-white/20 backdrop-blur-sm">
              <div className="flex items-start mb-4">
                <span className="text-2xl mr-3">🎉</span>
                <div>
                  <h3 className="text-xl text-[var(--accent)] text-subheading mb-2">Entertainment</h3>
                  <p className="text-white/90">
                    Comedy, Music, and Dinner to relax after a hard day of work.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 p-6 sm:p-8 rounded-xl border border-white/20 backdrop-blur-sm md:col-span-2 lg:col-span-1 lg:col-start-2">
              <div className="flex items-start mb-4">
                <span className="text-2xl mr-3">🚀</span>
                <div>
                  <h3 className="text-xl text-[var(--accent)] text-subheading mb-2">Opportunity</h3>
                  <p className="text-white/90">
                    The chance to win prizes and grants for your idea.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-16 sm:mt-20">
            <h3 className="text-xl sm:text-2xl text-[var(--accent)] mb-6 text-subheading animate-fade-in-up">Ready to Launch?</h3>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto animate-fade-in-up-delay">
              Secure your spot before prices go up on December 13th!
            </p>
            
            <Button className="bg-[var(--accent)] text-black hover:bg-[var(--accent)]/90 font-bold text-base sm:text-lg px-8 py-4 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl animate-fade-in-up-delay-2">
              ENROLL NOW
            </Button>
          </div>
        </div>
      </section>

      {/* Pricing & Packages (Netflix-Style) */}
      <section className="py-16 sm:py-20 bg-[var(--background)]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl text-[var(--primary)] mb-4 text-heading animate-fade-in-up font-bold">PRICING & PACKAGES</h2>
            <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto mb-6">
              Choose the plan that fits you. Prices increase after December 13th!
            </p>
            <div className="w-20 h-1 bg-[var(--secondary)] mx-auto"></div>
          </div>
          
          {/* For Individual Students */}
          <div className="mb-16">
            <h3 className="text-xl font-semibold text-[var(--primary)] mb-6 text-center">For Individual Students (Attendees)</h3>
            
            <div className="grid grid-cols-1 gap-8 justify-items-center">
              {/* Premium Pass */}
              <div className="bg-white rounded-xl shadow-lg border-2 border-[var(--primary)] overflow-hidden hover:shadow-xl transition-all duration-300 relative">
                <div className="absolute top-0 right-0 bg-[var(--accent)] text-black text-xs font-bold px-4 py-1 rounded-bl-lg">
                  MOST POPULAR
                </div>
                <div className="p-6 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white text-center">
                  <h3 className="text-xl mb-2 text-subheading text-white animate-fade-in-up">GENERAL PASS<br /><span className="text-sm font-normal">(The Full Experience)</span></h3>
                  <div className="flex justify-center items-baseline mt-4 mb-2">
                    <span className="text-3xl font-bold mr-2 animate-fade-in-up text-white">₹1199</span>
                  </div>
                </div>
                <div className="p-6">
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-center">
                      <span className="text-[var(--primary)] mr-2">✅</span>
                      <span><strong>Keynotes & Panels:</strong> Yes, full access.</span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-[var(--primary)] mr-2">✅</span>
                      <span><strong>Startup Expo:</strong> Walk-in Entry: See all the stalls.</span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-[var(--primary)] mr-2">✅</span>
                      <span><strong>Shark Tank:</strong> Audience Seat: Watch the pitches live.</span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-[var(--primary)] mr-2">✅</span>
                      <span><strong>Competitions:</strong> Play One Game: Join Case Study, Treasure Hunt, etc.</span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-[var(--primary)] mr-2">✅</span>
                      <span><strong>Workshops:</strong> Attend One Class: Fundraising or Marketing.</span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-[var(--primary)] mr-2">✅</span>
                      <span><strong>Certificate:</strong> Get Certified: Official participation certificate.</span>
                    </li>
                  </ul>
                  <p className="text-sm text-gray-500 mb-4"><strong>Best For:</strong> Serious learning & fun.</p>
                  <Button 
                    className="w-full bg-gradient-to-r from-[var(--accent)] to-[var(--primary)] hover:from-[var(--accent)] hover:to-[var(--primary)] text-black font-bold py-3 transition-all duration-300"
                    onClick={() => window.location.href = '/e-summit/checkout?pass=premium'}
                  >
                    BUY GENERAL PASS
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          {/* For Teams & Startups */}
          <div>
            <h3 className="text-xl font-semibold text-[var(--primary)] mb-6 text-center">For Teams & Startups (Participants)</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Shark Tank Team Pass */}
              <div className="bg-white rounded-xl shadow-lg border border-[var(--border)] overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className="p-6 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white text-center">
                  <h3 className="text-xl mb-2 text-subheading text-white animate-fade-in-up">🚀 SHARK TANK TEAM PASS<br /><span className="text-sm font-normal">(Venture Vault)</span></h3>
                  <p className="text-sm mb-3">If you want to pitch your idea to investors on stage.</p>
                  <div className="flex justify-center items-baseline mt-2 mb-2">
                    <span className="text-2xl font-bold mr-2 animate-fade-in-up text-white">₹2,999</span>
                    <span className="text-sm opacity-90 animate-fade-in-up text-white">per team</span>
                  </div>
                  <div className="text-sm opacity-90 mb-2 animate-fade-in-up text-white">Early Bird (First 20 teams only!)</div>
                  <div className="text-sm opacity-90 mb-2 animate-fade-in-up text-white">Regular: ₹3,999 per team</div>
                </div>
                <div className="p-6">
                  <h4 className="font-semibold text-[var(--primary)] mb-2">Includes:</h4>
                  <ul className="space-y-2 mb-4 text-sm">
                    <li className="flex items-start">
                      <span className="text-[var(--primary)] mr-2 mt-1">•</span>
                      <span>Your opportunity to pitch live, secure investors and gain exposure.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[var(--primary)] mr-2 mt-1">•</span>
                      <span>Chance to secure funding, mentorship or incubation support.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[var(--primary)] mr-2 mt-1">•</span>
                      <span>Direct, actionable feedback from our Super Judges on your idea.</span>
                    </li>
                  </ul>
                  <p className="text-sm text-gray-600 mb-4">Who: For a team of 1–4 people.</p>
                  <Button 
                    className="w-full bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] hover:from-[var(--primary)] hover:to-[var(--secondary)] text-white font-semibold py-3 transition-all duration-300"
                    onClick={() => window.location.href = '/e-summit/checkout?pass=shark-tank'}
                  >
                    REGISTER MY TEAM
                  </Button>
                </div>
              </div>
              
              {/* Startup Expo Booth */}
              <div className="bg-white rounded-xl shadow-lg border border-[var(--border)] overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className="p-6 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white text-center">
                  <h3 className="text-xl mb-2 text-subheading text-white animate-fade-in-up">🎪 STARTUP EXPO BOOTH</h3>
                  <p className="text-sm mb-3">If you want to set up a stall to show your product.</p>
                  <div className="flex flex-col items-center mt-2 mb-2">
                    <div className="mb-1">
                      <span className="text-lg font-bold mr-2 animate-fade-in-up text-white">Standard:</span>
                      <span className="text-xl font-bold animate-fade-in-up text-white">₹6,000</span>
                    </div>
                    <div>
                      <span className="text-lg font-bold mr-2 animate-fade-in-up text-white">Premium:</span>
                      <span className="text-xl font-bold animate-fade-in-up text-white">₹8,000</span>
                    </div>
                  </div>
                  <p className="text-sm opacity-90 animate-fade-in-up text-white">High visibility spot</p>
                </div>
                <div className="p-6">
                  <h4 className="font-semibold text-[var(--primary)] mb-2">Includes:</h4>
                  <ul className="space-y-2 mb-2 text-sm">
                    <li className="font-semibold text-[var(--primary)]">We provide:</li>
                    <li className="flex items-start ml-4">
                      <span className="text-[var(--primary)] mr-2 mt-1">•</span>
                      <span>a physical booth setup (table+ 2 chairs),</span>
                    </li>
                    <li className="flex items-start ml-4">
                      <span className="text-[var(--primary)] mr-2 mt-1">•</span>
                      <span>Power Socket and wifi</span>
                    </li>
                    <li className="flex items-start ml-4">
                      <span className="text-[var(--primary)] mr-2 mt-1">•</span>
                      <span>2 Exhibitor Passes.</span>
                    </li>
                    <li className="font-semibold text-[var(--primary)] mt-2">What you get in return:</li>
                    <li className="flex items-start ml-4">
                      <span className="text-[var(--primary)] mr-2 mt-1">•</span>
                      <span>a platform to demonstrate your idea/product,</span>
                    </li>
                    <li className="flex items-start ml-4">
                      <span className="text-[var(--primary)] mr-2 mt-1">•</span>
                      <span>Exposure to investors, founders, and students</span>
                    </li>
                    <li className="flex items-start ml-4">
                      <span className="text-[var(--primary)] mr-2 mt-1">•</span>
                      <span>Potential to meet your co-founder or early customers</span>
                    </li>
                  </ul>
                  <p className="text-sm text-gray-600 mb-4">Who: For startups who want customers.</p>
                  <Button 
                    className="w-full bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] hover:from-[var(--primary)] hover:to-[var(--secondary)] text-white font-semibold py-3 transition-all duration-300"
                    onClick={() => window.location.href = '/e-summit/checkout?pass=expo'}
                  >
                    BOOK A BOOTH
                  </Button>
                </div>
              </div>
              
              {/* Founders Roundtable Access */}
              <div className="bg-white rounded-xl shadow-lg border border-[var(--border)] overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className="p-6 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white text-center">
                  <h3 className="text-xl mb-2 text-subheading text-white animate-fade-in-up">🧠 FOUNDERS ROUNDTABLE ACCESS</h3>
                  <p className="text-sm mb-3">If your team wants to sit in the closed-door session with CEOs.</p>
                  <div className="flex justify-center items-baseline mt-2 mb-2">
                    <span className="text-2xl font-bold mr-2 animate-fade-in-up text-white">₹1,999</span>
                    <span className="text-sm opacity-90 animate-fade-in-up text-white">per team</span>
                  </div>
                  <div className="text-sm opacity-90 mb-2 animate-fade-in-up text-white">Early Bird</div>
                  <div className="text-sm opacity-90 mb-2 animate-fade-in-up text-white">Regular: ₹2,999 per team</div>
                </div>
                <div className="p-6">
                  <h4 className="font-semibold text-[var(--primary)] mb-2">Includes:</h4>
                  <ul className="space-y-2 mb-6 text-sm">
                    <li className="flex items-start">
                      <span className="text-[var(--primary)] mr-2 mt-1">•</span>
                      <span>Entry to an exclusive, closed-door session with real founders.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[var(--primary)] mr-2 mt-1">•</span>
                      <span>A space to ask the hard questions and get the real answers you won't hear on stage.</span>
                    </li>
                  </ul>
                  <Button 
                    className="w-full bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] hover:from-[var(--primary)] hover:to-[var(--secondary)] text-white font-semibold py-3 transition-all duration-300"
                    onClick={() => window.location.href = '/e-summit/checkout?pass=roundtable'}
                  >
                    GET ROUNDTABLE ACCESS
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What You Will Walk Away With */}
      <section className="py-16 sm:py-20 bg-[var(--background)]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 animate-fade-in-up">
            <h2 className="text-2xl sm:text-3xl md:text-4xl text-[var(--primary)] mb-4 text-heading font-bold">What You Will Walk Away With (Outcomes)</h2>
            <div className="w-20 h-1 bg-[var(--secondary)] mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-[var(--border)] hover:shadow-xl transition-all duration-300">
              <div className="flex items-start mb-4">
                <span className="text-2xl mr-3">📚</span>
                <div>
                  <h3 className="text-xl font-semibold text-[var(--primary)] mb-2">Real Frameworks</h3>
                  <p className="text-[var(--text-primary)]">
                    Learn "How to hire your first 5 people" or "What investors actually ask."
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg border border-[var(--border)] hover:shadow-xl transition-all duration-300">
              <div className="flex items-start mb-4">
                <span className="text-2xl mr-3">👥</span>
                <div>
                  <h3 className="text-xl font-semibold text-[var(--primary)] mb-2">A Co-Founder</h3>
                  <p className="text-[var(--text-primary)]">
                    Use our unique "Co-Founder Match-Up" to find someone with complementary skills.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg border border-[var(--border)] hover:shadow-xl transition-all duration-300">
              <div className="flex items-start mb-4">
                <span className="text-2xl mr-3">👨‍🏫</span>
                <div>
                  <h3 className="text-xl font-semibold text-[var(--primary)] mb-2">Micro-Mentoring</h3>
                  <p className="text-[var(--text-primary)]">
                    Opportunities for 1:1 chats with speakers and industry experts.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg border border-[var(--border)] hover:shadow-xl transition-all duration-300">
              <div className="flex items-start mb-4">
                <span className="text-2xl mr-3">💰</span>
                <div>
                  <h3 className="text-xl font-semibold text-[var(--primary)] mb-2">Investor Access</h3>
                  <p className="text-[var(--text-primary)]">
                    Exposure to angel investors and "Super Judges" in the Venture Vault.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}