import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HomePage() {
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
          </div>
        </div>
      </section>

      {/* What is Launchpad Section */}
      <section className="pt-16 sm:pt-20 md:pt-24 pb-12 sm:pb-16 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#007BFF] mb-4 sm:mb-6 text-center lg:text-left">What is Launchpad?</h2>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed text-center lg:text-left">
                Launchpad is a platform that supports aspiring solopreneurs, youth, and startups in building their own agencies and brands. 
                It provides mentorship, ready-to-sell services, and a community to learn and grow. Through real-world sales and healthy competition, 
                participants gain recognition and transform their ambition into sustainable businesses.
              </p>
            </div>
            <div className="flex justify-center lg:justify-end order-1 lg:order-2">
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
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#FFC107] rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                <span className="text-black text-lg sm:text-xl">👥</span>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-[#007BFF] mb-2 sm:mb-3">Expert Mentorship</h3>
              <p className="text-sm sm:text-base text-gray-600">
                Industry experts guide you throughout the competition, advising on what to do and what to avoid, helping you make informed decisions.
              </p>
            </div>
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#FFC107] rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                <span className="text-black text-lg sm:text-xl">💼</span>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-[#007BFF] mb-2 sm:mb-3">Ready-to-Sell Services</h3>
              <p className="text-sm sm:text-base text-gray-600">
                Access curated services that you can immediately start selling to build your agency and generate revenue from day one.
              </p>
            </div>
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#007BFF] rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                <span className="text-white text-lg sm:text-xl">🏆</span>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-[#007BFF] mb-2 sm:mb-3">Competition & Awards</h3>
              <p className="text-sm sm:text-base text-gray-600">
                Compete with peers and get recognized for achievements including highest turnover, best branding, and more at the Award Night.
              </p>
            </div>
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#FFC107] rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                <span className="text-black text-lg sm:text-xl">📈</span>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-[#007BFF] mb-2 sm:mb-3">Real-World Experience</h3>
              <p className="text-sm sm:text-base text-gray-600">
                Learn through actual sales, client handling, and business operations that prepare you for real entrepreneurial challenges.
              </p>
            </div>
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#007BFF] rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                <span className="text-white text-lg sm:text-xl">🤝</span>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-[#007BFF] mb-2 sm:mb-3">Supportive Community</h3>
              <p className="text-sm sm:text-base text-gray-600">
                Connect with like-minded individuals, share experiences, and build lasting relationships with fellow entrepreneurs.
              </p>
            </div>
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#FFC107] rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                <span className="text-black text-lg sm:text-xl">🎓</span>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-[#007BFF] mb-2 sm:mb-3">Structured Learning</h3>
              <p className="text-sm sm:text-base text-gray-600">
                Follow a structured 3-month program with clear milestones, challenges, and evaluation criteria for steady progress.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Competition Timeline */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-6xl font-bold text-center text-[#007BFF] mb-12">3-Month Challenge</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
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
            <div className="bg-gradient-to-br from-[#007BFF] to-[#FFC107] p-8 rounded-lg text-white">
              
              <p className="text-3xl font-bold mb-2">Registration closing soon</p>
              <p className="text-white/90 mb-6">
                Early registration may provide bonus points or early access to mentorship.
              </p>
              <Link href="/login">
                <Button className="bg-white text-[#007BFF] hover:bg-gray-100 font-semibold !bg-white !text-[#007BFF] hover:!bg-gray-100">
                  Register Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Launchpad Award Night Section */}
      <section className="py-16 sm:py-20 md:py-24 bg-gray-50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center text-[#007BFF] mb-8 sm:mb-12">Launchpad Award Night</h2>
          <p className="text-lg sm:text-xl text-center text-gray-600 mb-8 sm:mb-12 max-w-4xl mx-auto">
            Top performers will be recognized during the Launchpad Award Night, with awards for:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#FFC107] rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <span className="text-black text-2xl sm:text-3xl font-bold">💰</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-[#007BFF] mb-3 sm:mb-4">Highest Turnover</h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Best revenue performance
              </p>
            </div>
            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#007BFF] rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <span className="text-white text-2xl sm:text-3xl font-bold">🎨</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-[#007BFF] mb-3 sm:mb-4">Best Branding</h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Most creative brand identity
              </p>
            </div>
            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#FFC107] rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <span className="text-black text-2xl sm:text-3xl font-bold">⭐</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-[#007BFF] mb-3 sm:mb-4">Rising Star</h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Most promising newcomer
              </p>
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
          <Link href="/login">
            <Button size="lg" className="bg-[#FFC107] text-black hover:bg-[#FFC107]/90 font-bold text-lg px-8 py-3 !bg-[#FFC107] !text-black hover:!bg-[#FFC107]/90">
              Get Started Today
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
