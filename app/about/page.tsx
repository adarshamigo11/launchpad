"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useApp } from "@/components/state/auth-context"

export default function AboutPage() {
  const { currentUser } = useApp()
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] py-20 sm:py-24 md:py-32 lg:py-40 min-h-[60vh] flex items-center relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-60 h-60 bg-[var(--secondary)]/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-[var(--secondary)]/10 rounded-full blur-3xl animate-pulse"></div>
        </div>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-white mb-6 sm:mb-8 animate-fade-in-up text-display">About Launchpad</h1>
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/90 max-w-4xl mx-auto leading-relaxed px-2 animate-fade-in-up-delay">
            Empowering the next generation of entrepreneurs through mentorship, competition and real-world experience.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 sm:py-20 md:py-24 bg-[var(--background)]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
            <div className="order-2 lg:order-1 animate-slide-in-left">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[var(--primary)] mb-4 sm:mb-6 text-center lg:text-left text-heading">Our Mission</h2>
              <p className="text-base sm:text-lg text-[var(--text-primary)] leading-relaxed mb-4 sm:mb-6 text-center lg:text-left">
                Our mission is to build a supportive ecosystem where ambitious individuals can learn, compete, and thrive—helping them take the first step into entrepreneurship, transform ideas into ventures, and turn effort into sustainable growth.
              </p>
              <p className="text-base sm:text-lg text-[var(--text-primary)] leading-relaxed text-center lg:text-left">
                We believe that every aspiring entrepreneur deserves access to quality mentorship, practical tools, and a community that supports their journey from idea to successful business.
              </p>
            </div>
            <div className="bg-gradient-to-br from-[var(--primary)]/10 to-[var(--secondary)]/10 p-6 sm:p-8 rounded-xl shadow-lg border border-[var(--border)] order-1 lg:order-2 animate-slide-in-right transform hover:-translate-y-2 transition-all duration-300">
              <div className="text-center">
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-[var(--primary)] rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-5 shadow-lg">
                  <span className="text-white text-3xl sm:text-4xl">🚀</span>
                </div>
                <h3 className="text-xl sm:text-2xl text-[var(--primary)] mb-3 text-subheading">Mission-Driven</h3>
                <p className="text-base sm:text-lg text-[var(--text-primary)]">
                  Every feature and program is designed to support your entrepreneurial journey.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-16 sm:py-20 md:py-24 relative bg-cover bg-center bg-no-repeat" style={{backgroundImage: 'url(/vision.jpg)'}}>
        {/* Black Gradient Overlay */}
        <div className="absolute inset-0 bg-black/80"></div>
        
        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-6 sm:p-8 rounded-xl shadow-lg order-2 lg:order-1 animate-slide-in-left transform hover:-translate-y-2 transition-all duration-300">
              <div className="text-center">
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-[var(--secondary)] rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-5 shadow-lg">
                  <span className="text-black text-3xl sm:text-4xl">🚀</span>
                </div>
                <h3 className="text-xl sm:text-2xl text-white mb-3 text-subheading">Vision-Focused</h3>
                <p className="text-white/90 text-base sm:text-lg">
                  Building the foundation for sustainable business growth and success.
                </p>
              </div>
            </div>
            <div className="order-1 lg:order-2 animate-slide-in-right">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white mb-4 sm:mb-6 text-center lg:text-left text-heading">Our Vision</h2>
              <p className="text-base sm:text-lg text-white/90 leading-relaxed mb-4 sm:mb-6 text-center lg:text-left">
                Created to empower aspiring entrepreneurs to take their first step into business, Launchpad helps transform ideas into ventures and build a strong foundation for sustainable growth.
              </p>
              <p className="text-base sm:text-lg text-white/90 leading-relaxed text-center lg:text-left">
                We envision a world where every ambitious individual has the tools, knowledge, and support network needed to turn their entrepreneurial dreams into reality, powering the next generation of successful businesses.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What is Launchpad Section */}
      <section className="py-16 sm:py-20 md:py-24 bg-[var(--background)]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 animate-fade-in-up">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[var(--primary)] mb-4 sm:mb-6 text-heading">What is Launchpad?</h2>
            <p className="text-base sm:text-lg text-[var(--text-primary)] max-w-4xl mx-auto leading-relaxed px-2 mb-6">
              Launchpad is a platform that supports aspiring solopreneurs, youth, and startups in building their own agencies and brands. 
              It provides mentorship, ready-to-sell services, and a community to learn and grow. Through real-world sales and healthy competition, 
              participants gain recognition and transform their ambition into sustainable businesses.
            </p>
            <div className="w-20 h-1 bg-[var(--secondary)] mx-auto"></div>
          </div>
        </div>
      </section>


      {/* Code of Conduct */}
      <section className="py-24 bg-[var(--background)]">
        <div className="mx-auto max-w-4xl px-4">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-center text-[var(--primary)] mb-4">Guidelines</h2>
            <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
              Important rules and regulations for participating in Launchpad
            </p>
            <div className="w-20 h-1 bg-[var(--secondary)] mx-auto mt-6"></div>
          </div>
          <div className="bg-[var(--surface)] p-8 rounded-xl shadow-lg border border-[var(--border)]">
            <div>
              <h3 className="text-2xl font-bold text-[var(--primary)] mb-6">Competition Guidelines</h3>
              <div className="space-y-6 text-[var(--text-primary)]">
                <div className="p-4 rounded-lg bg-white border border-[var(--border)]">
                  <h4 className="font-semibold text-[var(--primary)] mb-3 text-lg">Registration</h4>
                  <ul className="space-y-2 text-[var(--text-primary)] list-disc pl-5">
                    <li><strong>Individual Registration:</strong> Participants can register individually to take part in the competition and work on their own agency or brand.</li>
                    <li><strong>Group Registration:</strong> Teams can also participate in a group, with a maximum of 3 members allowed per team. Group members will collaborate to complete challenges and build their agency together.</li>
                  </ul>
                </div>

                <div className="p-4 rounded-lg bg-white border border-[var(--border)]">
                  <h4 className="font-semibold text-[var(--primary)] mb-3 text-lg">Competition Structure</h4>
                  <ul className="space-y-2 text-[var(--text-primary)] list-disc pl-5">
                    <li>Launchpad is a three-month-long competition designed to help participants build, manage, and scale their own agencies or personal brands through real-world business challenges.</li>
                    <li>Participants who do not already have an established agency must first complete the Basic Challenges, which are specifically designed to help newcomers establish their foundation.</li>
                    <li>The Basic Challenges will help participants create and formalise their agency setup, while completing weekly Advanced Challenges will earn points that contribute towards the leaderboard rankings.</li>
                  </ul>
                </div>

                <div className="p-4 rounded-lg bg-white border border-[var(--border)]">
                  <h4 className="font-semibold text-[var(--primary)] mb-3 text-lg">Requirements</h4>
                  <ul className="space-y-2 text-[var(--text-primary)] list-disc pl-5">
                    <li>The minimum age limit for participation is 15 years.</li>
                    <li>The completion of any service and its corresponding transaction during the competition will be considered valid only when the contestant uses the resources provided on the Launchpad platform itself.</li>
                  </ul>
                </div>

                <div className="p-4 rounded-lg bg-white border border-[var(--border)]">
                  <h4 className="font-semibold text-[var(--primary)] mb-3 text-lg">Deadlines and Duration</h4>
                  <ul className="space-y-2 text-[var(--text-primary)] list-disc pl-5">
                    <li>All deadlines are mandatory and must be strictly followed by every participant and team.</li>
                    <li>The competition duration will be three months from the official start date.</li>
                  </ul>
                </div>

                <div className="p-4 rounded-lg bg-white border border-[var(--border)]">
                  <h4 className="font-semibold text-[var(--primary)] mb-3 text-lg">Awards</h4>
                  <ul className="space-y-2 text-[var(--text-primary)] list-disc pl-5">
                    <li>The Best Branding Category Award will be presented to the agency that demonstrates outstanding creativity, consistency, and effectiveness in its branding throughout the competition.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[var(--primary)] relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-60 h-60 bg-[var(--secondary)]/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-[var(--secondary)]/10 rounded-full blur-3xl animate-pulse"></div>
        </div>
        <div className="mx-auto max-w-4xl px-4 text-center relative z-10">
          <h2 className="text-3xl font-bold text-white mb-4 animate-fade-in-up">Ready to Join Launchpad?</h2>
          <p className="text-xl text-white/90 mb-8 animate-fade-in-up-delay">
            Take the first step towards building your entrepreneurial dream.
          </p>
          {!currentUser && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up-delay-2">
              <Link href="/login">
                <Button size="lg" className="bg-[var(--secondary)] text-black hover:bg-[var(--secondary)]/90 font-bold text-lg px-8 py-3 !bg-[var(--secondary)] !text-black hover:!bg-[var(--secondary)]/90 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
                  Register Now
                </Button>
              </Link>
            </div>
          )}
        </div>
    </section>
    </div>
  )
}
