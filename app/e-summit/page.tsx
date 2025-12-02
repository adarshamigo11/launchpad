"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ESummitPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 bg-gradient-to-br from-[#144449] to-[#0a2a2d] text-white overflow-hidden">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Launchpad E-Summit 2025: <span className="text-[#BF9B30]">The Blueprint for Your Empire.</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
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
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#144449] mb-4">TRACK 1: THE VENTURE VAULT</h2>
              <h3 className="text-xl sm:text-2xl font-semibold text-[#BF9B30] mb-6">Shark Tank</h3>
              
              <h4 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">The Concept:</h4>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Unlike standard pitch competitions, Venture Vault is designed to mirror the real investment
                lifecycle. It is a multi-stage battleground where ideas are validated, refined, and potentially
                funded by "Super Judges" (successful founders) and "Normal Judges" (active angel
                investors).
              </p>
              
              <h4 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">The Process:</h4>
              <ol className="list-decimal pl-5 space-y-3 text-gray-600 mb-6">
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
              
              <h4 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">What You Win:</h4>
              <ul className="list-disc pl-5 space-y-2 text-gray-600 mb-8">
                <li>Seed Grants & Incubation Slots</li>
                <li>Critical feedback on Unit Economics and Scalability</li>
                <li>Direct access to the "Investor Showcase"</li>
              </ul>
              
              <p className="text-gray-700 font-semibold mb-6">
                Who It's For: Early-stage startups (1–4 members) with a prototype or MVP.
              </p>
              
              <Button className="bg-[#BF9B30] text-black hover:bg-[#BF9B30]/90 font-bold text-base sm:text-lg px-6 sm:px-8 py-3 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
                APPLY FOR VENTURE VAULT
              </Button>
            </div>
            <div className="order-1 lg:order-2 flex justify-center">
              <div className="bg-gradient-to-br from-[#144449] to-[#BF9B30] p-8 sm:p-12 rounded-2xl shadow-2xl w-full max-w-md">
                <div className="text-center text-white">
                  <div className="text-6xl mb-4">🏛️</div>
                  <h3 className="text-2xl font-bold mb-2">THE VENTURE VAULT</h3>
                  <p className="text-lg mb-4">Shark Tank</p>
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
                  <h3 className="text-2xl font-bold mb-2">ENTREPRENEUR OLYMPICS</h3>
                  <p className="text-lg mb-4">Business is a Sport</p>
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
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#144449] mb-4">TRACK 2: ENTREPRENEUR OLYMPICS</h2>
              <h3 className="text-xl sm:text-2xl font-semibold text-[#BF9B30] mb-6">Business is a Sport. Come Play.</h3>
              
              <h4 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">The Concept:</h4>
              <p className="text-gray-600 mb-6 leading-relaxed">
                A high-energy, gamified series of micro-events designed to test your rapid decision-making,
                creativity, and negotiation skills under extreme time pressure. You don't need a business
                plan to win here—you need street smarts.
              </p>
              
              <h4 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">The Games:</h4>
              <ul className="space-y-4 text-gray-600 mb-8">
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
              
              <p className="text-gray-700 font-semibold mb-6">
                Who It's For: Creative students, marketing enthusiasts, and anyone who thinks faster than they talk.
              </p>
              
              <Button className="bg-[#144449] text-white hover:bg-[#144449]/90 font-bold text-base sm:text-lg px-6 sm:px-8 py-3 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
                GET PREMIUM PASS TO COMPETE
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
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#144449] mb-4">TRACK 3: FOUNDERS ROUNDTABLE</h2>
              <h3 className="text-xl sm:text-2xl font-semibold text-[#BF9B30] mb-6">Inside the Founder's Mind: Unfiltered.</h3>
              
              <h4 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">The Concept:</h4>
              <p className="text-gray-600 mb-6 leading-relaxed">
                We are banning PR-friendly success stories. This session focuses on the "War Stories"—the
                failures, the mental breakdowns, and the hard pivots that actually defined the founders'
                journeys.
              </p>
              
              <h4 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">The Topics:</h4>
              <ul className="space-y-4 text-gray-600 mb-8">
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
              
              <h4 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">Format:</h4>
              <p className="text-gray-600 mb-6">
                A candid panel discussion followed by a "Rapid Fire" tactical tip round.
              </p>
              
              <Button className="bg-[#BF9B30] text-black hover:bg-[#BF9B30]/90 font-bold text-base sm:text-lg px-6 sm:px-8 py-3 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
                VIEW SPEAKER LINEUP
              </Button>
            </div>
            <div className="order-1 lg:order-2 flex justify-center">
              <div className="bg-gradient-to-br from-[#144449] to-[#BF9B30] p-8 sm:p-12 rounded-2xl shadow-2xl w-full max-w-md">
                <div className="text-center text-white">
                  <div className="text-6xl mb-4">🎙️</div>
                  <h3 className="text-2xl font-bold mb-2">FOUNDERS ROUNDTABLE</h3>
                  <p className="text-lg mb-4">Inside the Founder's Mind</p>
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
                  <h3 className="text-2xl font-bold mb-2">STARTUP EXPO</h3>
                  <p className="text-lg mb-4">The Innovation Market</p>
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
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#144449] mb-4">TRACK 4: STARTUP EXPO</h2>
              <h3 className="text-xl sm:text-2xl font-semibold text-[#BF9B30] mb-6">The Innovation Market.</h3>
              
              <h4 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">The Concept:</h4>
              <p className="text-gray-600 mb-6 leading-relaxed">
                A bustling marketplace featuring 100+ startups organized by vertical (Deep Tech, FinTech,
                EdTech, Consumer). This is your chance to demo your product to 2,000+ attendees,
                recruit talent, and catch the eye of roving investors.
              </p>
              
              <h4 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">The Zones:</h4>
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
              
              <h4 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">Booth Specs:</h4>
              <p className="text-gray-600 mb-6">
                3x2m Standard Booth with power and Wi-Fi access.
              </p>
              
              <Button className="bg-[#144449] text-white hover:bg-[#144449]/90 font-bold text-base sm:text-lg px-6 sm:px-8 py-3 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
                BOOK YOUR BOOTH
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
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#144449] mb-4">TRACK 5: WORKSHOPS & MASTERCLASSES</h2>
              <h3 className="text-xl sm:text-2xl font-semibold text-[#BF9B30] mb-6">Tactical Skill Acquisition.</h3>
              
              <h4 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">The Concept:</h4>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Walk away with 3–5 practical frameworks you can apply immediately. These aren't lectures;
                they are "How-To" manuals delivered by experts.
              </p>
              
              <h4 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">Sessions Available:</h4>
              <ul className="space-y-4 text-gray-600 mb-8">
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
              
              <Button className="bg-[#BF9B30] text-black hover:bg-[#BF9B30]/90 font-bold text-base sm:text-lg px-6 sm:px-8 py-3 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
                GET ACCESS PASS
              </Button>
            </div>
            <div className="order-1 lg:order-2 flex justify-center">
              <div className="bg-gradient-to-br from-[#144449] to-[#BF9B30] p-8 sm:p-12 rounded-2xl shadow-2xl w-full max-w-md">
                <div className="text-center text-white">
                  <div className="text-6xl mb-4">🧠</div>
                  <h3 className="text-2xl font-bold mb-2">WORKSHOPS & MASTERCLASSES</h3>
                  <p className="text-lg mb-4">Tactical Skill Acquisition</p>
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
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">⚡ WHY ATTEND? (The Value Stack)</h2>
            <div className="w-20 h-1 bg-[#BF9B30] mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
            <div className="bg-white/10 p-6 sm:p-8 rounded-xl border border-white/20">
              <div className="flex items-start mb-4">
                <span className="text-2xl mr-3">👨‍🏫</span>
                <h3 className="text-xl font-semibold">Mentorship, Not Just Judgement</h3>
              </div>
              <p className="text-white/90">
                Unlike other events, our judges act as mentors first. You get feedback, not just a score.
              </p>
            </div>
            
            <div className="bg-white/10 p-6 sm:p-8 rounded-xl border border-white/20">
              <div className="flex items-start mb-4">
                <span className="text-2xl mr-3">🤝</span>
                <h3 className="text-xl font-semibold">Network with the 1%</h3>
              </div>
              <p className="text-white/90">
                Rub shoulders with "Super Judges" (Founders/CEOs) and "Normal Judges" (Angel Investors) in a structured environment.
              </p>
            </div>
            
            <div className="bg-white/10 p-6 sm:p-8 rounded-xl border border-white/20">
              <div className="flex items-start mb-4">
                <span className="text-2xl mr-3">📜</span>
                <h3 className="text-xl font-semibold">Certificate of Recognition</h3>
              </div>
              <p className="text-white/90">
                All participants receive a digital certificate officially recognizing their involvement in the E-Summit.
              </p>
            </div>
            
            <div className="bg-white/10 p-6 sm:p-8 rounded-xl border border-white/20">
              <div className="flex items-start mb-4">
                <span className="text-2xl mr-3">🎒</span>
                <h3 className="text-xl font-semibold">The "Starter Pack"</h3>
              </div>
              <p className="text-white/90">
                Walk away with a PDF of hiring templates, fundraising checklists, and resource guides shared by our speakers.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-16 sm:mt-20">
            <h3 className="text-xl sm:text-2xl font-bold mb-6">Ready to Launch?</h3>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Most tracks have limited capacity. Secure your spot before the cohort fills up.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 justify-center items-center">
              <div className="text-center">
                <Button className="bg-[#BF9B30] text-black hover:bg-[#BF9B30]/90 font-bold text-base sm:text-lg px-6 sm:px-8 py-3 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl w-full sm:w-auto">
                  GET PREMIUM PASS - ₹1,199
                </Button>
                <p className="text-sm text-white/80 mt-2">Individual Access</p>
              </div>
              
              <div className="text-center">
                <Button className="bg-gradient-to-r from-[#BF9B30] to-[#144449] text-white hover:from-[#BF9B30]/90 hover:to-[#144449]/90 font-bold text-base sm:text-lg px-6 sm:px-8 py-3 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl w-full sm:w-auto">
                  REGISTER TEAM - ₹2,999
                </Button>
                <p className="text-sm text-white/80 mt-2">Team of 4</p>
              </div>
            </div>
            
            <div className="mt-8 inline-flex items-center bg-red-500/20 px-4 py-2">
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
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#144449] mb-4">PRICING SECTION</h2>
            <div className="w-20 h-1 bg-[#BF9B30] mx-auto"></div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-200 text-sm sm:text-base">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-200 p-3 text-left font-semibold">Feature</th>
                  <th className="border border-gray-200 p-3 text-center font-semibold">
                    <div className="flex flex-col items-center">
                      <span>GENERA</span>
                      <span>L PASS</span>
                      <span className="text-xs text-gray-500">(Student)</span>
                      <div className="mt-2 w-8 h-8 bg-gray-300 flex items-center justify-center">
                        <span className="text-lg">👤</span>
                      </div>
                      <Button className="mt-2 bg-gray-300 text-gray-800 hover:bg-gray-400 font-semibold text-sm px-3 py-1 border border-gray-400">
                        Get Basic Pass
                      </Button>
                    </div>
                  </th>
                  <th className="border border-gray-200 p-3 text-center font-semibold">
                    <div className="flex flex-col items-center">
                      <span>PREMIU</span>
                      <span>M PASS</span>
                      <span className="text-xs text-gray-500">(Student Hero)</span>
                      <div className="mt-2 w-8 h-8 bg-[#BF9B30] flex items-center justify-center">
                        <span className="text-lg">👑</span>
                      </div>
                      <Button className="mt-2 bg-[#BF9B30] text-black hover:bg-[#BF9B30]/90 font-semibold text-sm px-3 py-1">
                        GET PREMIUM ACCESS
                      </Button>
                    </div>
                  </th>
                  <th className="border border-gray-200 p-3 text-center font-semibold">
                    <div className="flex flex-col items-center">
                      <span>ROUNDTABL</span>
                      <span>E</span>
                      <span className="text-xs text-gray-500">(Founder Experience)</span>
                      <div className="mt-2 w-8 h-8 bg-blue-100 flex items-center justify-center border border-blue-300">
                        <span className="text-lg">🎙️</span>
                      </div>
                      <Button className="mt-2 bg-white text-blue-600 hover:bg-blue-50 font-semibold text-sm px-3 py-1 border border-blue-300">
                        Join Roundtable
                      </Button>
                    </div>
                  </th>
                  <th className="border border-gray-200 p-3 text-center font-semibold">
                    <div className="flex flex-col items-center">
                      <span>SHARK</span>
                      <span>TANK</span>
                      <span className="text-xs text-gray-500">(Startup Team)</span>
                      <div className="mt-2 w-8 h-8 bg-blue-600 flex items-center justify-center">
                        <span className="text-lg text-white">🦈</span>
                      </div>
                      <Button className="mt-2 bg-blue-600 text-white hover:bg-blue-700 font-semibold text-sm px-3 py-1">
                        Register Startup
                      </Button>
                    </div>
                  </th>
                  <th className="border border-gray-200 p-3 text-center font-semibold">
                    <div className="flex flex-col items-center">
                      <span>STARTU</span>
                      <span>P EXPO</span>
                      <span className="text-xs text-gray-500">(Exhibitor)</span>
                      <div className="mt-2 w-8 h-8 bg-blue-600 flex items-center justify-center">
                        <span className="text-lg text-white">🎪</span>
                      </div>
                      <Button className="mt-2 bg-blue-600 text-white hover:bg-blue-700 font-semibold text-sm px-3 py-1">
                        Book Booth
                      </Button>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-200 p-3 font-semibold">Early Bird Price</td>
                  <td className="border border-gray-200 p-3 text-center">₹499</td>
                  <td className="border border-gray-200 p-3 text-center">₹999</td>
                  <td className="border border-gray-200 p-3 text-center">₹1,999<br/><span className="text-xs">(Team)</span></td>
                  <td className="border border-gray-200 p-3 text-center">₹2,999<br/><span className="text-xs">(Team)</span></td>
                  <td className="border border-gray-200 p-3 text-center">₹6,000 /<br/>₹8,000</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-200 p-3 font-semibold">Regular Price</td>
                  <td className="border border-gray-200 p-3 text-center">₹799</td>
                  <td className="border border-gray-200 p-3 text-center">₹1,199</td>
                  <td className="border border-gray-200 p-3 text-center">₹2,999</td>
                  <td className="border border-gray-200 p-3 text-center">₹3,999</td>
                  <td className="border border-gray-200 p-3 text-center">Standard /<br/>Premium Booth</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 p-3 font-semibold">Who is it for?</td>
                  <td className="border border-gray-200 p-3 text-center">Attendees</td>
                  <td className="border border-gray-200 p-3 text-center">Serious Aspirants</td>
                  <td className="border border-gray-200 p-3 text-center">Founder Networking</td>
                  <td className="border border-gray-200 p-3 text-center">Early-Stage Startups</td>
                  <td className="border border-gray-200 p-3 text-center">Brands & Exhibitors</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-200 p-3 font-semibold">Speaker Sessions</td>
                  <td className="border border-gray-200 p-3 text-center">Panel Access</td>
                  <td className="border border-gray-200 p-3 text-center">Full Panel Access</td>
                  <td className="border border-gray-200 p-3 text-center">Full Access</td>
                  <td className="border border-gray-200 p-3 text-center">Full Access</td>
                  <td className="border border-gray-200 p-3 text-center">Shark Tank</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 p-3 font-semibold">Shark Tank</td>
                  <td className="border border-gray-200 p-3 text-center">❌</td>
                  <td className="border border-gray-200 p-3 text-center">✅ Audience Access</td>
                  <td className="border border-gray-200 p-3 text-center">✅ Audience Access</td>
                  <td className="border border-gray-200 p-3 text-center">✅ Participant (Pitch)</td>
                  <td className="border border-gray-200 p-3 text-center">✅ Audience Access</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-200 p-3 font-semibold">Competitions</td>
                  <td className="border border-gray-200 p-3 text-center">❌</td>
                  <td className="border border-gray-200 p-3 text-center">✅ 1 Entry<br/><span className="text-xs">Free (Any Event)</span></td>
                  <td className="border border-gray-200 p-3 text-center">❌</td>
                  <td className="border border-gray-200 p-3 text-center">❌</td>
                  <td className="border border-gray-200 p-3 text-center">❌</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 p-3 font-semibold">Expo Access</td>
                  <td className="border border-gray-200 p-3 text-center">Entry Only</td>
                  <td className="border border-gray-200 p-3 text-center">Entry Only</td>
                  <td className="border border-gray-200 p-3 text-center">Entry Only</td>
                  <td className="border border-gray-200 p-3 text-center">Entry Only</td>
                  <td className="border border-gray-200 p-3 text-center">✅ Own Booth<br/><span className="text-xs">(3x2m)</span></td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-200 p-3 font-semibold">Learning</td>
                  <td className="border border-gray-200 p-3 text-center">❌</td>
                  <td className="border border-gray-200 p-3 text-center">✅ 1 Premium Workshop</td>
                  <td className="border border-gray-200 p-3 text-center">Peer Experience Exchange</td>
                  <td className="border border-gray-200 p-3 text-center">✅ 1-on-1 Mentorship</td>
                  <td className="border border-gray-200 p-3 text-center">Investor Alley Access</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 p-3 font-semibold">Team Size</td>
                  <td className="border border-gray-200 p-3 text-center">Individual</td>
                  <td className="border border-gray-200 p-3 text-center">Individual</td>
                  <td className="border border-gray-200 p-3 text-center">Per Team</td>
                  <td className="border border-gray-200 p-3 text-center">4 Members</td>
                  <td className="border border-gray-200 p-3 text-center">Exhibitor Pass</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  )
}