"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useApp } from "@/components/state/auth-context"

export default function AboutPage() {
  const { currentUser } = useApp()
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#007BFF] to-[#FFC107] py-20 sm:py-24 md:py-32 lg:py-40 min-h-[60vh] flex items-center">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-6 sm:mb-8">About Launchpad</h1>
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/90 max-w-4xl mx-auto leading-relaxed px-2">
            Empowering the next generation of entrepreneurs through mentorship, competition, and real-world experience.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 sm:py-20 md:py-24 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#007BFF] mb-4 sm:mb-6 text-center lg:text-left">Our Mission</h2>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-4 sm:mb-6 text-center lg:text-left">
                Our mission is to build a supportive ecosystem where ambitious individuals can learn, compete, and thrive—helping them take the first step into entrepreneurship, transform ideas into ventures, and turn effort into sustainable growth.
              </p>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed text-center lg:text-left">
                We believe that every aspiring entrepreneur deserves access to quality mentorship, practical tools, and a community that supports their journey from idea to successful business.
              </p>
            </div>
            <div className="bg-gradient-to-br from-[#007BFF]/10 to-[#FFC107]/10 p-6 sm:p-8 rounded-lg order-1 lg:order-2">
              <div className="text-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#007BFF] rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <span className="text-white text-2xl sm:text-3xl">🚀</span>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-[#007BFF] mb-2">Mission-Driven</h3>
                <p className="text-sm sm:text-base text-gray-600">
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
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-6 sm:p-8 rounded-lg order-2 lg:order-1">
              <div className="text-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#FFC107] rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <span className="text-black text-2xl sm:text-3xl">🚀</span>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">Vision-Focused</h3>
                <p className="text-white/90 text-sm sm:text-base">
                  Building the foundation for sustainable business growth and success.
                </p>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 text-center lg:text-left">Our Vision</h2>
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
      <section className="py-16 sm:py-20 md:py-24 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#007BFF] mb-4 sm:mb-6">What is Launchpad?</h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed px-2">
              Launchpad is a platform that supports aspiring solopreneurs, youth, and startups in building their own agencies and brands. 
              It provides mentorship, ready-to-sell services, and a community to learn and grow. Through real-world sales and healthy competition, 
              participants gain recognition and transform their ambition into sustainable businesses.
            </p>
          </div>
        </div>
      </section>


      {/* Code of Conduct */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="text-6xl font-bold text-center text-[#007BFF] mb-8">Guidelines</h2>
          <div className="bg-gray-50 p-8 rounded-lg">
            <div>
              <h3 className="text-2xl font-bold text-[#007BFF] mb-4">Competition Guidelines</h3>
              <div className="space-y-4 text-gray-700">
                <div>
                  <h4 className="font-semibold text-[#007BFF] mb-2">Registration</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• <strong>Individual Registration:</strong> Participants can register individually to take part in the competition and work on their own agency or brand.</li>
                    <li>• <strong>Group Registration:</strong> Teams can also participate in a group, with a maximum of 3 members allowed per team. Group members will collaborate to complete challenges and build their agency together.</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-[#007BFF] mb-2">Competition Structure</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Launchpad is a three-month-long competition designed to help participants build, manage, and scale their own agencies or personal brands through real-world business challenges.</li>
                    <li>• Participants who do not already have an established agency must first complete the Basic Challenges, which are specifically designed to help newcomers establish their foundation.</li>
                    <li>• The Basic Challenges will help participants create and formalise their agency setup, while completing weekly Advanced Challenges will earn points that contribute towards the leaderboard rankings.</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-[#007BFF] mb-2">Requirements</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• The minimum age limit for participation is 15 years.</li>
                    <li>• The completion of any service and its corresponding transaction during the competition will be considered valid only when the contestant uses the resources provided on the Launchpad platform itself.</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-[#007BFF] mb-2">Deadlines and Duration</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• All deadlines are mandatory and must be strictly followed by every participant and team.</li>
                    <li>• The competition duration will be three months from the official start date.</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-[#007BFF] mb-2">Awards</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• The Best Branding Category Award will be presented to the agency that demonstrates outstanding creativity, consistency, and effectiveness in its branding throughout the competition.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[#007BFF]">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Join Launchpad?</h2>
          <p className="text-xl text-white/90 mb-8">
            Take the first step towards building your entrepreneurial dream.
          </p>
          {!currentUser && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/login">
                <Button size="lg" className="bg-[#FFC107] text-black hover:bg-[#FFC107]/90 font-bold text-lg px-8 py-3 !bg-[#FFC107] !text-black hover:!bg-[#FFC107]/90">
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
