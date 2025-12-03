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
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 bg-gradient-to-br from-[#144449] to-[#0a2a2d] text-white overflow-hidden">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight text-display text-white animate-fade-in-up">
              Launchpad E-Summit 2025: <span className="text-[#BF9B30]">The Blueprint for Your Empire.</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-8 leading-relaxed max-w-3xl mx-auto animate-fade-in-up-delay">
              This is not a conference where you sit in the back and take notes. This is a 2-day simulation
              of the high-stakes business world. Whether you are a student with a rough idea, a founder
              with a prototype, or a creator looking to scale, Launchpad provides the specific frameworks,
              funding, and network you need to survive the next 5 years of the economy.
            </p>
          </div>
        </div>
      </section>

      {/* Track 1: The Venture Vault */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="inline-block mb-4">
                <span className="text-4xl">🏛️</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl text-[#144449] mb-4 text-heading animate-fade-in-up">TRACK 1: THE VENTURE VAULT</h2>
              <h3 className="text-xl sm:text-2xl text-[#BF9B30] mb-6 text-subheading animate-fade-in-up-delay">Shark Tank</h3>
              
              <h4 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">The Concept:</h4>
              <p className="text-gray-600 mb-6 leading-relaxed animate-fade-in-up-delay-2">
                Unlike standard pitch competitions, Venture Vault is designed to mirror the real investment
                lifecycle. It is a multi-stage battleground where ideas are validated, refined, and potentially
                funded by "Super Judges" (successful founders) and "Normal Judges" (active angel
                investors).
              </p>
              
              <h4 className="text-lg sm:text-xl text-[#144449] mb-3 text-subheading">The Process:</h4>
              <ol className="list-decimal pl-5 space-y-3 text-gray-600 mb-6 animate-fade-in-up-delay-2">
                <li>
                  <strong>The Filter:</strong> Teams submit a 6-slide deck and a 2-minute video. Only the top 20 make the cut.
                </li>
                <li>
                  <strong>The Mentorship Sprint:</strong> Shortlisted teams don't just pitch; they get assigned a
                  specific Judge-Mentor for a focused sprint on business modeling and Go-To-Market strategy.
                </li>
                <li>
                  <strong>The Finale:</strong> A 5–8 minute structured pitch followed by a grueling Q&A.
                  Advancement requires approval from all Normal Judges or both Super Judges.
                </li>
              </ol>
              
              <h4 className="text-lg sm:text-xl text-[#144449] mb-3 text-subheading">What You Win:</h4>
              <ul className="list-disc pl-5 space-y-2 text-gray-600 mb-8 animate-fade-in-up-delay-2">
                <li>Seed Grants & Incubation Slots</li>
                <li>Critical feedback on Unit Economics and Scalability</li>
                <li>Direct access to the "Investor Showcase"</li>
              </ul>
              
              <p className="text-[#144449] font-semibold mb-6 text-body-semibold animate-fade-in-up-delay-2">
                Who It's For: Early-stage startups (1–4 members) with a prototype or MVP.
              </p>
              
              <Button className="bg-[#BF9B30] text-black hover:bg-[#BF9B30]/90 font-bold text-base sm:text-lg px-6 sm:px-8 py-3 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl" onClick={() => window.location.href = '/e-summit/checkout?pass=venture-vault'}>
                APPLY FOR VENTURE VAULT - ₹{getPrice("venture-vault")}
              </Button>
            </div>
            <div className="order-1 lg:order-2 flex justify-center">
              <div className="bg-gradient-to-br from-[#144449] to-[#BF9B30] p-8 sm:p-12 rounded-2xl shadow-2xl w-full max-w-md">
                <div className="text-center text-white">
                  <div className="text-6xl mb-4">🏛️</div>
                  <h3 className="text-2xl mb-2 text-subheading text-[#144449] animate-fade-in-up">THE VENTURE VAULT</h3>
                  <p className="text-lg mb-4 animate-fade-in-up-delay">Shark Tank</p>
                  <div className="border-t border-white/30 pt-4 mt-4">
                    <p className="text-sm">The Ultimate Pitch Arena</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Track 2: Entrepreneur Olympics */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div className="order-1 lg:order-1 flex justify-center">
              <div className="bg-gradient-to-br from-[#BF9B30] to-[#144449] p-8 sm:p-12 rounded-2xl shadow-2xl w-full max-w-md">
                <div className="text-center text-white">
                  <div className="text-6xl mb-4">🏅</div>
                  <h3 className="text-2xl mb-2 text-subheading text-[#144449] animate-fade-in-up">ENTREPRENEUR OLYMPICS</h3>
                  <p className="text-lg mb-4 animate-fade-in-up-delay">Business is a Sport</p>
                  <div className="border-t border-white/30 pt-4 mt-4">
                    <p className="text-sm">Come Play</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-2 lg:order-2">
              <div className="inline-block mb-4">
                <span className="text-4xl">🏅</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl text-[#144449] mb-4 text-heading animate-fade-in-up">TRACK 2: ENTREPRENEUR OLYMPICS</h2>
              <h3 className="text-xl sm:text-2xl text-[#BF9B30] mb-6 text-subheading">Business is a Sport. Come Play.</h3>
              
              <h4 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">The Concept:</h4>
              <p className="text-gray-600 mb-6 leading-relaxed animate-fade-in-up-delay-2">
                A high-energy, gamified series of micro-events designed to test your rapid decision-making,
                creativity, and negotiation skills under extreme time pressure. You don't need a business
                plan to win here—you need street smarts.
              </p>
              
              <h4 className="text-lg sm:text-xl text-[#144449] mb-3 text-subheading">The Games:</h4>
              <ul className="space-y-4 text-gray-600 mb-8 animate-fade-in-up-delay-2">
                <li className="flex items-start">
                  <span className="text-2xl mr-3">🎨</span>
                  <div>
                    <strong>Meme Marketing Battle:</strong> You have 15 minutes to create a viral campaign
                    concept and 3 social mockups. Test your understanding of virality and audience insight.
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-2xl mr-3">🤝</span>
                  <div>
                    <strong>Negotiate Like a CEO:</strong> A 10-minute roleplay where you must close a partnership
                    or supplier deal against a tough opponent. Learn BATNA and win-win framing.
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-2xl mr-3">📦</span>
                  <div>
                    <strong>Product Packaging Challenge:</strong> Design physical packaging for a product using
                    limited materials. Prove you understand cost constraints and the "unboxing experience".
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-2xl mr-3">✏️</span>
                  <div>
                    <strong>Logo Redesign Race:</strong> Rebrand a giant in 10 minutes. Speed meets visual
                    communication.
                  </div>
                </li>
              </ul>
              
              <p className="text-[#144449] font-semibold mb-6 text-body-semibold animate-fade-in-up-delay-2">
                Who It's For: Creative students, marketing enthusiasts, and anyone who thinks faster than they talk.
              </p>
              
              <Button className="bg-[#144449] text-white hover:bg-[#144449]/90 font-bold text-base sm:text-lg px-6 sm:px-8 py-3 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl" onClick={() => window.location.href = '/e-summit/checkout?pass=premium-pass'}>
                GET PREMIUM PASS TO COMPETE - ₹{getPrice("premium-pass")}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Track 3: Founders Roundtable */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="inline-block mb-4">
                <span className="text-4xl">🎙️</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl text-[#144449] mb-4 text-heading animate-fade-in-up">TRACK 3: FOUNDERS ROUNDTABLE</h2>
              <h3 className="text-xl sm:text-2xl text-[#BF9B30] mb-6 text-subheading">Inside the Founder's Mind: Unfiltered.</h3>
              
              <h4 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">The Concept:</h4>
              <p className="text-gray-600 mb-6 leading-relaxed animate-fade-in-up-delay-2">
                We are banning PR-friendly success stories. This session focuses on the "War Stories"—the
                failures, the mental breakdowns, and the hard pivots that actually defined the founders'
                journeys.
              </p>
              
              <h4 className="text-lg sm:text-xl text-[#144449] mb-3 text-subheading">The Topics:</h4>
              <ul className="space-y-4 text-gray-600 mb-8 animate-fade-in-up-delay-2">
                <li className="flex items-start">
                  <span className="text-2xl mr-3">👥</span>
                  <div>
                    <strong>Hiring Realities:</strong> How to hire your first 5 employees and when to fire them.
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-2xl mr-3">💰</span>
                  <div>
                    <strong>Fundraising Truths:</strong> What investors actually ask when the doors are closed.
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-2xl mr-3">🌪️</span>
                  <div>
                    <strong>Crisis Management:</strong> Surviving downturns, cash flow crunches, and competitor attacks.
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-2xl mr-3">🧠</span>
                  <div>
                    <strong>Mental Resilience:</strong> Concrete routines for handling pressure and burnout.
                  </div>
                </li>
              </ul>
              
              <h4 className="text-lg sm:text-xl text-[#144449] mb-3 text-subheading">Format:</h4>
              <p className="text-gray-600 mb-6">
                A candid panel discussion followed by a "Rapid Fire" tactical tip round.
              </p>
              
              <Button className="bg-[#BF9B30] text-black hover:bg-[#BF9B30]/90 font-bold text-base sm:text-lg px-6 sm:px-8 py-3 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl" onClick={() => window.location.href = '/e-summit/checkout?pass=roundtable'}>
                VIEW SPEAKER LINEUP - ₹{getPrice("roundtable")}
              </Button>
            </div>
            <div className="order-1 lg:order-2 flex justify-center">
              <div className="bg-gradient-to-br from-[#144449] to-[#BF9B30] p-8 sm:p-12 rounded-2xl shadow-2xl w-full max-w-md">
                <div className="text-center text-white">
                  <div className="text-6xl mb-4">🎙️</div>
                  <h3 className="text-2xl mb-2 text-subheading text-[#144449] animate-fade-in-up">FOUNDERS ROUNDTABLE</h3>
                  <p className="text-lg mb-4 animate-fade-in-up-delay">Inside the Founder's Mind</p>
                  <div className="border-t border-white/30 pt-4 mt-4">
                    <p className="text-sm">Unfiltered</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Track 4: Startup Expo */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div className="order-1 lg:order-1 flex justify-center">
              <div className="bg-gradient-to-br from-[#BF9B30] to-[#144449] p-8 sm:p-12 rounded-2xl shadow-2xl w-full max-w-md">
                <div className="text-center text-white">
                  <div className="text-6xl mb-4">🚀</div>
                  <h3 className="text-2xl mb-2 text-subheading text-[#144449] animate-fade-in-up">STARTUP EXPO</h3>
                  <p className="text-lg mb-4 animate-fade-in-up-delay">The Innovation Market</p>
                  <div className="border-t border-white/30 pt-4 mt-4">
                    <p className="text-sm">100+ Startups</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-2 lg:order-2">
              <div className="inline-block mb-4">
                <span className="text-4xl">🚀</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl text-[#144449] mb-4 text-heading animate-fade-in-up">TRACK 4: STARTUP EXPO</h2>
              <h3 className="text-xl sm:text-2xl text-[#BF9B30] mb-6 text-subheading">The Innovation Market.</h3>
              
              <h4 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">The Concept:</h4>
              <p className="text-gray-600 mb-6 leading-relaxed animate-fade-in-up-delay-2">
                A bustling marketplace featuring 100+ startups organized by vertical (Deep Tech, FinTech,
                EdTech, Consumer). This is your chance to demo your product to 2,000+ attendees,
                recruit talent, and catch the eye of roving investors.
              </p>
              
              <h4 className="text-lg sm:text-xl text-[#144449] mb-3 text-subheading">The Zones:</h4>
              <ul className="space-y-4 text-gray-600 mb-8">
                <li className="flex items-start">
                  <span className="text-2xl mr-3">🎤</span>
                  <div>
                    <strong>Demo Stage:</strong> Book a slot for an 8-minute lightning demo to broadcast your
                    innovation to the floor.
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-2xl mr-3">💼</span>
                  <div>
                    <strong>Investor Alley:</strong> A dedicated zone for pre-booked, private 20-minute meetings with
                    potential backers.
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-2xl mr-3">👥</span>
                  <div>
                    <strong>Talent Zone:</strong> A live "Recruitment Board" where you can post roles and interview
                    students on the spot.
                  </div>
                </li>
              </ul>
              
              <h4 className="text-lg sm:text-xl text-[#144449] mb-3 text-subheading">Booth Specs:</h4>
              <p className="text-gray-600 mb-6">
                3x2m Standard Booth with power and Wi-Fi access.
              </p>
              
              <Button className="bg-[#144449] text-white hover:bg-[#144449]/90 font-bold text-base sm:text-lg px-6 sm:px-8 py-3 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl" onClick={() => window.location.href = '/e-summit/checkout?pass=booth'}>
                BOOK YOUR BOOTH - ₹{getPrice("booth")}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Track 5: Workshops & Masterclasses */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="inline-block mb-4">
                <span className="text-4xl">🧠</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl text-[#144449] mb-4 text-heading animate-fade-in-up">TRACK 5: WORKSHOPS & MASTERCLASSES</h2>
              <h3 className="text-xl sm:text-2xl text-[#BF9B30] mb-6 text-subheading">Tactical Skill Acquisition.</h3>
              
              <h4 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">The Concept:</h4>
              <p className="text-gray-600 mb-6 leading-relaxed animate-fade-in-up-delay-2">
                Walk away with 3–5 practical frameworks you can apply immediately. These aren't lectures;
                they are "How-To" manuals delivered by experts.
              </p>
              
              <h4 className="text-lg sm:text-xl text-[#144449] mb-3 text-subheading">Sessions Available:</h4>
              <ul className="space-y-4 text-gray-600 mb-8 animate-fade-in-up-delay-2">
                <li className="flex items-start">
                  <span className="text-2xl mr-3">💰</span>
                  <div>
                    <strong>Fundraising & Investment:</strong> How to build a pitch deck, approach VCs, and
                    understand term sheets.
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-2xl mr-3">📢</span>
                  <div>
                    <strong>Marketing & Branding:</strong> Strategies for digital positioning, customer acquisition cost
                    (CAC), and brand identity.
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-2xl mr-3">🌍</span>
                  <div>
                    <strong>Impact Catalysts (Social Innovation):</strong> A special track for mission-driven projects
                    focused on theory of change and impact measurement.
                  </div>
                </li>
              </ul>
              
              <Button className="bg-[#BF9B30] text-black hover:bg-[#BF9B30]/90 font-bold text-base sm:text-lg px-6 sm:px-8 py-3 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl" onClick={() => window.location.href = '/e-summit/checkout?pass=access-pass'}>
                GET ACCESS PASS - ₹{getPrice("access-pass")}
              </Button>
            </div>
            <div className="order-1 lg:order-2 flex justify-center">
              <div className="bg-gradient-to-br from-[#144449] to-[#BF9B30] p-8 sm:p-12 rounded-2xl shadow-2xl w-full max-w-md">
                <div className="text-center text-white">
                  <div className="text-6xl mb-4">🧠</div>
                  <h3 className="text-2xl mb-2 text-subheading text-[#144449] animate-fade-in-up">WORKSHOPS & MASTERCLASSES</h3>
                  <p className="text-lg mb-4 animate-fade-in-up-delay">Tactical Skill Acquisition</p>
                  <div className="border-t border-white/30 pt-4 mt-4">
                    <p className="text-sm">Practical Frameworks</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Attend Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-[#144449] to-[#0a2a2d] text-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl text-[#144496] mb-4 text-heading animate-fade-in-up">⚡ WHY ATTEND? (The Value Stack)</h2>
            <div className="w-20 h-1 bg-[#BF9B30] mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
            <div className="bg-white/10 p-6 sm:p-8 rounded-xl border border-white/20">
              <div className="flex items-start mb-4">
                <span className="text-2xl mr-3">👨‍🏫</span>
                <h3 className="text-xl text-[#144496] text-subheading animate-fade-in-up-delay">Mentorship, Not Just Judgement</h3>
              </div>
              <p className="text-white/90 animate-fade-in-up-delay-2">
                Unlike other events, our judges act as mentors first. You get feedback, not just a score.
              </p>
            </div>
            
            <div className="bg-white/10 p-6 sm:p-8 rounded-xl border border-white/20">
              <div className="flex items-start mb-4">
                <span className="text-2xl mr-3">🤝</span>
                <h3 className="text-xl text-[#144496] text-subheading animate-fade-in-up-delay">Network with the 1%</h3>
              </div>
              <p className="text-white/90 animate-fade-in-up-delay-2">
                Rub shoulders with "Super Judges" (Founders/CEOs) and "Normal Judges" (Angel Investors) in a structured environment.
              </p>
            </div>
            
            <div className="bg-white/10 p-6 sm:p-8 rounded-xl border border-white/20">
              <div className="flex items-start mb-4">
                <span className="text-2xl mr-3">📜</span>
                <h3 className="text-xl text-[#144496] text-subheading animate-fade-in-up-delay">Certificate of Recognition</h3>
              </div>
              <p className="text-white/90 animate-fade-in-up-delay-2">
                All participants receive a digital certificate officially recognizing their involvement in the E-Summit.
              </p>
            </div>
            
            <div className="bg-white/10 p-6 sm:p-8 rounded-xl border border-white/20">
              <div className="flex items-start mb-4">
                <span className="text-2xl mr-3">🎒</span>
                <h3 className="text-xl text-[#144496] text-subheading animate-fade-in-up-delay">The "Starter Pack"</h3>
              </div>
              <p className="text-white/90 animate-fade-in-up-delay-2">
                Walk away with a PDF of hiring templates, fundraising checklists, and resource guides shared by our speakers.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-16 sm:mt-20">
            <h3 className="text-xl sm:text-2xl text-[#144496] mb-6 text-subheading animate-fade-in-up">Ready to Launch?</h3>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto animate-fade-in-up-delay">
              Most tracks have limited capacity. Secure your spot before the cohort fills up.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 justify-center items-center">
              <div className="text-center">
                <Button className="bg-[#BF9B30] text-black hover:bg-[#BF9B30]/90 font-bold text-base sm:text-lg px-6 sm:px-8 py-3 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl w-full sm:w-auto" onClick={() => window.location.href = '/e-summit/checkout?pass=general'}>
                  GET GENERAL PASS - ₹{getPrice("general")}
                </Button>
                <p className="text-sm text-white/80 mt-2">Individual Access</p>
              </div>
              
              <div className="text-center">
                <Button className="bg-gradient-to-r from-[#BF9B30] to-[#144449] text-white hover:from-[#BF9B30]/90 hover:to-[#144449]/90 font-bold text-base sm:text-lg px-6 sm:px-8 py-3 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl w-full sm:w-auto" onClick={() => window.location.href = '/e-summit/checkout?pass=team'}>
                  REGISTER TEAM - ₹{getPrice("team")}
                </Button>
                <p className="text-sm text-white/80 mt-2">Team of 4</p>
              </div>
            </div>
            
            <div className="mt-8 inline-flex items-center bg-red-500/20 px-4 py-2 animate-pulse">
              <span className="text-red-300 font-semibold">⚠️ Urgency:</span>
              <span className="ml-2 text-white">Selling Fast - 80% Sold</span>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl text-[#144496] mb-4 text-heading animate-fade-in-up">PRICING PLANS</h2>
            <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto mb-6">
              Choose the perfect plan to unlock your entrepreneurial potential
            </p>
            <div className="w-20 h-1 bg-[var(--secondary)] mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* General Pass */}
            <div className="bg-white rounded-xl shadow-lg border border-[#144496] overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in-up">
              <div className="p-6 bg-gradient-to-r from-[#144496] to-white text-white text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-white">👤</span>
                </div>
                <h3 className="text-xl mb-2 text-subheading text-white animate-fade-in-up">GENERAL PASS</h3>
                <p className="text-sm opacity-90 mb-4 animate-fade-in-up-delay text-white">Perfect for students</p>
                <div className="text-3xl font-bold mb-2 animate-fade-in-up-delay text-white">₹{getPrice("general")}</div>
                <p className="text-sm opacity-90 animate-fade-in-up-delay text-white">Early Bird Price</p>
              </div>
              <div className="p-6">
                <ul className="space-y-3 mb-6 animate-fade-in-up-delay-2">
                  <li className="flex items-center">
                    <span className="text-[#144496] mr-2">✓</span>
                    <span>Panel Access</span>
                  </li>
                  <li className="flex items-center text-gray-400">
                    <span className="mr-2">✗</span>
                    <span>Shark Tank Participation</span>
                  </li>
                  <li className="flex items-center text-gray-400">
                    <span className="mr-2">✗</span>
                    <span>Competitions Entry</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-[#144496] mr-2">✓</span>
                    <span>Expo Entry Only</span>
                  </li>
                  <li className="flex items-center text-gray-400">
                    <span className="mr-2">✗</span>
                    <span>Premium Workshops</span>
                  </li>
                </ul>
                <Button 
                  className="w-full bg-gradient-to-r from-[#144496] to-white hover:from-[#144496] hover:to-white text-white font-semibold py-3 transition-all duration-300 border border-[#144496]"
                  onClick={() => window.location.href = '/e-summit/checkout?pass=general'}
                >
                  Get Basic Pass
                </Button>
              </div>
            </div>
            
            {/* Premium Pass */}
            <div className="bg-white rounded-xl shadow-lg border-2 border-[#144496] overflow-hidden hover:shadow-xl transition-all duration-300 relative transform hover:-translate-y-2 animate-fade-in-up-delay">
              <div className="absolute top-0 right-0 bg-[#144496] text-white text-xs font-bold px-4 py-1 rounded-bl-lg animate-pulse-slow">
                MOST POPULAR
              </div>
              <div className="p-6 bg-gradient-to-r from-[#144496] to-white text-white text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-white">👑</span>
                </div>
                <h3 className="text-xl mb-2 text-subheading text-white animate-fade-in-up">PREMIUM PASS</h3>
                <p className="text-sm opacity-90 mb-4 animate-fade-in-up-delay text-white">For serious aspirants</p>
                <div className="text-3xl font-bold mb-2 animate-fade-in-up-delay text-white">₹{getPrice("premium")}</div>
                <p className="text-sm opacity-90 animate-fade-in-up-delay text-white">Early Bird Price</p>
              </div>
              <div className="p-6">
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center">
                    <span className="text-[#144496] mr-2">✓</span>
                    <span>Full Panel Access</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-[#144496] mr-2">✓</span>
                    <span>Shark Tank Audience Access</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-[#144496] mr-2">✓</span>
                    <span>1 Competition Entry</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-[#144496] mr-2">✓</span>
                    <span>Expo Entry Only</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-[#144496] mr-2">✓</span>
                    <span>1 Premium Workshop</span>
                  </li>
                </ul>
                <Button 
                  className="w-full bg-gradient-to-r from-[#144496] to-white hover:from-[#144496] hover:to-white text-white font-semibold py-3 transition-all duration-300 border border-[#144496]"
                  onClick={() => window.location.href = '/e-summit/checkout?pass=premium'}
                >
                  GET PREMIUM ACCESS
                </Button>
              </div>
            </div>
            
            {/* Roundtable Pass */}
            <div className="bg-white rounded-xl shadow-lg border border-[#144496] overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in-up">
              <div className="p-6 bg-gradient-to-r from-[#144496] to-white text-white text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/30">
                  <span className="text-2xl text-white">🎙️</span>
                </div>
                <h3 className="text-xl mb-2 text-subheading text-white animate-fade-in-up">ROUNDTABLE</h3>
                <p className="text-sm opacity-90 mb-4 animate-fade-in-up-delay text-white">Founder Experience</p>
                <div className="text-3xl font-bold mb-2 animate-fade-in-up-delay text-white">₹{getPrice("roundtable")}</div>
                <p className="text-sm opacity-90 animate-fade-in-up-delay text-white">Early Bird Price</p>
              </div>
              <div className="p-6">
                <ul className="space-y-3 mb-6 animate-fade-in-up-delay-2">
                  <li className="flex items-center">
                    <span className="text-[#144496] mr-2">✓</span>
                    <span>Full Access to All Sessions</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-[#144496] mr-2">✓</span>
                    <span>Shark Tank Audience Access</span>
                  </li>
                  <li className="flex items-center text-gray-400">
                    <span className="mr-2">✗</span>
                    <span>Competitions Entry</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-[#144496] mr-2">✓</span>
                    <span>Peer Experience Exchange</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-[#144496] mr-2">✓</span>
                    <span>Entry Only to Expo</span>
                  </li>
                </ul>
                <Button 
                  className="w-full bg-gradient-to-r from-[#144496] to-white hover:from-[#144496] hover:to-white text-white font-semibold py-3 transition-all duration-300 border border-[#144496]"
                  onClick={() => window.location.href = '/e-summit/checkout?pass=roundtable'}
                >
                  Join Roundtable
                </Button>
              </div>
            </div>
            
            {/* Shark Tank Pass */}
            <div className="bg-white rounded-xl shadow-lg border border-blue-500 overflow-hidden hover:shadow-xl transition-all duration-300 md:col-span-2 lg:col-span-1 lg:col-start-2 transform hover:-translate-y-2 animate-fade-in-up-delay">
              <div className="p-6 bg-gradient-to-r from-blue-600 to-blue-400 text-white text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-white">🦈</span>
                </div>
                <h3 className="text-xl mb-2 text-subheading text-white animate-fade-in-up">SHARK TANK</h3>
                <p className="text-sm opacity-90 mb-4 animate-fade-in-up-delay text-white">Startup Team</p>
                <div className="text-3xl font-bold mb-2 animate-fade-in-up-delay text-white">₹{getPrice("shark-tank")}</div>
                <p className="text-sm opacity-90 animate-fade-in-up-delay text-white">Early Bird Price</p>
              </div>
              <div className="p-6">
                <ul className="space-y-3 mb-6 animate-fade-in-up-delay-2">
                  <li className="flex items-center">
                    <span className="text-[#144496] mr-2">✓</span>
                    <span>Full Access to All Sessions</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-[#144496] mr-2">✓</span>
                    <span>Participant in Shark Tank</span>
                  </li>
                  <li className="flex items-center text-gray-400">
                    <span className="mr-2">✗</span>
                    <span>Competitions Entry</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-[#144496] mr-2">✓</span>
                    <span>Entry Only to Expo</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-[#144496] mr-2">✓</span>
                    <span>1-on-1 Mentorship</span>
                  </li>
                </ul>
                <Button 
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white font-semibold py-3 transition-all duration-300 border border-blue-500"
                  onClick={() => window.location.href = '/e-summit/checkout?pass=shark-tank'}
                >
                  Register Startup
                </Button>
              </div>
            </div>
            
            {/* Expo Booth Pass */}
            <div className="bg-white rounded-xl shadow-lg border border-blue-500 overflow-hidden hover:shadow-xl transition-all duration-300 md:col-span-2 lg:col-span-3 transform hover:-translate-y-2 animate-fade-in-up">
              <div className="p-6 bg-gradient-to-r from-blue-600 to-blue-400 text-white text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-white">🎪</span>
                </div>
                <h3 className="text-xl mb-2 text-subheading text-white animate-fade-in-up">STARTUP EXPO</h3>
                <p className="text-sm opacity-90 mb-4 animate-fade-in-up-delay text-white">Exhibitor</p>
                <div className="text-3xl font-bold mb-2 animate-fade-in-up-delay text-white">₹{getPrice("expo")}</div>
                <p className="text-sm opacity-90 animate-fade-in-up-delay text-white">Early Bird Price</p>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold text-lg mb-3 text-[#144496] text-subheading animate-fade-in-up-delay">What's Included:</h4>
                    <ul className="space-y-2 animate-fade-in-up-delay-2">
                      <li className="flex items-center">
                        <span className="text-[#144496] mr-2">✓</span>
                        <span>3x2m Booth Space</span>
                      </li>
                      <li className="flex items-center">
                        <span className="text-[#144496] mr-2">✓</span>
                        <span>Power & Wi-Fi Access</span>
                      </li>
                      <li className="flex items-center">
                        <span className="text-[#144496] mr-2">✓</span>
                        <span>Shark Tank Audience Access</span>
                      </li>
                      <li className="flex items-center">
                        <span className="text-[#144496] mr-2">✓</span>
                        <span>Investor Alley Access</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-3 text-[#144496] text-subheading animate-fade-in-up-delay">Additional Benefits:</h4>
                    <ul className="space-y-2 animate-fade-in-up-delay-2">
                      <li className="flex items-center">
                        <span className="text-[#144496] mr-2">✓</span>
                        <span>Promotional Materials Display</span>
                      </li>
                      <li className="flex items-center">
                        <span className="text-[#144496] mr-2">✓</span>
                        <span>Demo Stage Booking</span>
                      </li>
                      <li className="flex items-center">
                        <span className="text-[#144496] mr-2">✓</span>
                        <span>Networking Opportunities</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <Button 
                  className="w-full mt-6 bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white font-semibold py-3 transition-all duration-300 border border-blue-500"
                  onClick={() => window.location.href = '/e-summit/checkout?pass=expo'}
                >
                  Book Booth
                </Button>
              </div>
            </div>
          </div>
          
          <div className="mt-8 text-center text-sm text-gray-600 animate-fade-in-up">
            <p>* Regular prices are 20% higher than early bird prices</p>
            <p className="mt-2">All passes include certificate of recognition and digital resources</p>
          </div>
        </div>
      </section>
    </div>
  )
}