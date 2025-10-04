import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function ChallengesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#007BFF] to-[#FFC107] py-32 md:py-40 min-h-[60vh] flex items-center">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-8">Launchpad Challenges</h1>
          <p className="text-2xl md:text-3xl text-white/90 max-w-4xl mx-auto mb-8 leading-relaxed">
            Choose your path to entrepreneurship. Start with BASIC challenges or jump into ADVANCED challenges if you're ready for the next level.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="#basic-challenges">
              <Button size="lg" className="bg-white text-[#007BFF] hover:bg-gray-100 font-bold text-lg px-8 py-3">
                View BASIC Challenges
              </Button>
            </Link>
            <Link href="#advanced-challenges">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-[#007BFF] font-semibold text-lg px-8 py-3">
                View ADVANCED Challenges
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Challenge Overview */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-6xl font-bold text-[#007BFF] mb-6">Choose Your Challenge Level</h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Launchpad offers two distinct challenge tracks designed to meet you where you are in your entrepreneurial journey. 
              Whether you're just starting out or ready to scale, we have the right challenges for you.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            <Card className="border-2 border-[#007BFF] shadow-lg bg-white">
              <CardHeader className="bg-gradient-to-r from-[#007BFF] to-[#007BFF]/80 text-white">
                <CardTitle className="text-2xl flex items-center gap-3">
                  <Badge className="bg-white text-[#007BFF] font-bold">BASIC</Badge>
                  <span>For Beginners</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-gray-600 mb-4">
                  Perfect for first-time participants or individuals who are just starting their entrepreneurial journey.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#007BFF] rounded-full"></span>
                    Foundation building tasks
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#007BFF] rounded-full"></span>
                    Step-by-step guidance
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#007BFF] rounded-full"></span>
                    Basic service setup
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#007BFF] rounded-full"></span>
                    Mentorship allocation
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 border-[#FFC107] shadow-lg bg-white">
              <CardHeader className="bg-gradient-to-r from-[#FFC107] to-[#FFC107]/80 text-black">
                <CardTitle className="text-2xl flex items-center gap-3">
                  <Badge className="bg-black text-[#FFC107] font-bold">ADVANCED</Badge>
                  <span>For Experienced</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-gray-600 mb-4">
                  For participants who have previously completed BASIC challenges or have prior experience in drop servicing or agency setup.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#FFC107] rounded-full"></span>
                    Complex business strategies
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#FFC107] rounded-full"></span>
                    Advanced service scaling
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#FFC107] rounded-full"></span>
                    Team building challenges
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#FFC107] rounded-full"></span>
                    High-stakes competition
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* BASIC Challenges */}
      <section id="basic-challenges" className="py-16 bg-gray-50">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-6xl font-bold text-[#007BFF] mb-4">BASIC Challenges</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Start your entrepreneurial journey with these foundational challenges designed to build your skills and confidence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Link href="/login">
              <Card className="group bg-gradient-to-br from-white to-gray-50 border-2 border-transparent hover:border-[#007BFF]/20 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer hover:scale-105 transform h-full flex flex-col">
                <CardHeader className="pb-4 flex-shrink-0">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#007BFF] to-[#007BFF]/80 rounded-xl flex items-center justify-center">
                      <span className="text-white font-bold text-lg">1</span>
                    </div>
                    <div className="flex-1">
                      <Badge className="bg-[#007BFF]/10 text-[#007BFF] border-[#007BFF]/20 mb-2">BASIC</Badge>
                    </div>
                  </div>
                  <CardTitle className="text-[#007BFF] text-lg font-bold leading-tight group-hover:text-[#007BFF]/80 transition-colors">
                    The Agency Niche Blueprint Challenge
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0 flex-grow flex flex-col">
                  <p className="text-gray-600 leading-relaxed mb-4 flex-grow">
                    Helps you choose a focused niche and 1–3 core services so your positioning is strong and clients see your value clearly.
                  </p>
                  <div className="flex items-center text-[#007BFF] font-semibold text-sm group-hover:text-[#007BFF]/80 transition-colors mt-auto">
                    <span>Start Challenge</span>
                    <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/login">
              <Card className="group bg-gradient-to-br from-white to-gray-50 border-2 border-transparent hover:border-[#007BFF]/20 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer hover:scale-105 transform h-full flex flex-col">
                <CardHeader className="pb-4 flex-shrink-0">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#007BFF] to-[#007BFF]/80 rounded-xl flex items-center justify-center">
                      <span className="text-white font-bold text-lg">2</span>
                    </div>
                    <div className="flex-1">
                      <Badge className="bg-[#007BFF]/10 text-[#007BFF] border-[#007BFF]/20 mb-2">BASIC</Badge>
                    </div>
                  </div>
                  <CardTitle className="text-[#007BFF] text-lg font-bold leading-tight group-hover:text-[#007BFF]/80 transition-colors">
                    Validate Demand Challenge
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0 flex-grow flex flex-col">
                  <p className="text-gray-600 leading-relaxed mb-4 flex-grow">
                    Guides you to test your niche by talking to potential customers, researching competitors, and running small validation experiments.
                  </p>
                  <div className="flex items-center text-[#007BFF] font-semibold text-sm group-hover:text-[#007BFF]/80 transition-colors mt-auto">
                    <span>Start Challenge</span>
                    <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/login">
              <Card className="group bg-gradient-to-br from-white to-gray-50 border-2 border-transparent hover:border-[#007BFF]/20 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer hover:scale-105 transform h-full flex flex-col">
                <CardHeader className="pb-4 flex-shrink-0">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#007BFF] to-[#007BFF]/80 rounded-xl flex items-center justify-center">
                      <span className="text-white font-bold text-lg">3</span>
                    </div>
                    <div className="flex-1">
                      <Badge className="bg-[#007BFF]/10 text-[#007BFF] border-[#007BFF]/20 mb-2">BASIC</Badge>
                    </div>
                  </div>
                  <CardTitle className="text-[#007BFF] text-lg font-bold leading-tight group-hover:text-[#007BFF]/80 transition-colors">
                    One-Page Business Plan Challenge
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0 flex-grow flex flex-col">
                  <p className="text-gray-600 leading-relaxed mb-4 flex-grow">
                    Simplifies business planning into one page covering customers, services, pricing, and growth targets.
                  </p>
                  <div className="flex items-center text-[#007BFF] font-semibold text-sm group-hover:text-[#007BFF]/80 transition-colors mt-auto">
                    <span>Start Challenge</span>
                    <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/login">
              <Card className="group bg-gradient-to-br from-white to-gray-50 border-2 border-transparent hover:border-[#007BFF]/20 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer hover:scale-105 transform h-full flex flex-col">
                <CardHeader className="pb-4 flex-shrink-0">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#007BFF] to-[#007BFF]/80 rounded-xl flex items-center justify-center">
                      <span className="text-white font-bold text-lg">4</span>
                    </div>
                    <div className="flex-1">
                      <Badge className="bg-[#007BFF]/10 text-[#007BFF] border-[#007BFF]/20 mb-2">BASIC</Badge>
                    </div>
                  </div>
                  <CardTitle className="text-[#007BFF] text-lg font-bold leading-tight group-hover:text-[#007BFF]/80 transition-colors">
                    Company Name & Legal Setup Challenge
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0 flex-grow flex flex-col">
                  <p className="text-gray-600 leading-relaxed mb-4 flex-grow">
                    Helps you choose a strong business name, register it legally, and secure your online presence.
                  </p>
                  <div className="flex items-center text-[#007BFF] font-semibold text-sm group-hover:text-[#007BFF]/80 transition-colors mt-auto">
                    <span>Start Challenge</span>
                    <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/login">
              <Card className="group bg-gradient-to-br from-white to-gray-50 border-2 border-transparent hover:border-[#007BFF]/20 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer hover:scale-105 transform h-full flex flex-col">
                <CardHeader className="pb-4 flex-shrink-0">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#007BFF] to-[#007BFF]/80 rounded-xl flex items-center justify-center">
                      <span className="text-white font-bold text-lg">5</span>
                    </div>
                    <div className="flex-1">
                      <Badge className="bg-[#007BFF]/10 text-[#007BFF] border-[#007BFF]/20 mb-2">BASIC</Badge>
                    </div>
                  </div>
                  <CardTitle className="text-[#007BFF] text-lg font-bold leading-tight group-hover:text-[#007BFF]/80 transition-colors">
                    Business Bank & Accounting Setup Challenge
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0 flex-grow flex flex-col">
                  <p className="text-gray-600 leading-relaxed mb-4 flex-grow">
                    Gets your finances organized with a business bank account, invoicing tools, and a simple bookkeeping system.
                  </p>
                  <div className="flex items-center text-[#007BFF] font-semibold text-sm group-hover:text-[#007BFF]/80 transition-colors mt-auto">
                    <span>Start Challenge</span>
                    <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/login">
              <Card className="group bg-gradient-to-br from-white to-gray-50 border-2 border-transparent hover:border-[#007BFF]/20 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer hover:scale-105 transform h-full flex flex-col">
                <CardHeader className="pb-4 flex-shrink-0">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#007BFF] to-[#007BFF]/80 rounded-xl flex items-center justify-center">
                      <span className="text-white font-bold text-lg">6</span>
                    </div>
                    <div className="flex-1">
                      <Badge className="bg-[#007BFF]/10 text-[#007BFF] border-[#007BFF]/20 mb-2">BASIC</Badge>
                    </div>
                  </div>
                  <CardTitle className="text-[#007BFF] text-lg font-bold leading-tight group-hover:text-[#007BFF]/80 transition-colors">
                    Pricing & Packages Challenge
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0 flex-grow flex flex-col">
                  <p className="text-gray-600 leading-relaxed mb-4 flex-grow">
                    Guides you to create 2–3 clear service tiers (Starter, Growth, Premium) and a retainer/day-rate option.
                  </p>
                  <div className="flex items-center text-[#007BFF] font-semibold text-sm group-hover:text-[#007BFF]/80 transition-colors mt-auto">
                    <span>Start Challenge</span>
                    <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* ADVANCED Challenges */}
      <section id="advanced-challenges" className="py-16 bg-gray-50">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-6xl font-bold text-[#FFC107] mb-4">ADVANCED Challenges</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Take your business to the next level with these advanced challenges designed for experienced entrepreneurs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Link href="/login">
              <Card className="group bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-transparent hover:border-[#FFC107]/20 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer hover:scale-105 transform h-full flex flex-col">
                <CardHeader className="pb-4 flex-shrink-0">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#FFC107] to-[#FFC107]/80 rounded-xl flex items-center justify-center">
                      <span className="text-black font-bold text-lg">1</span>
                    </div>
                    <div className="flex-1">
                      <Badge className="bg-[#FFC107]/10 text-[#FFC107] border-[#FFC107]/20 mb-2">ADVANCED</Badge>
                    </div>
                  </div>
                  <CardTitle className="text-[#FFC107] text-lg font-bold leading-tight group-hover:text-[#FFC107]/80 transition-colors">
                    Week 1 Challenge
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0 flex-grow flex flex-col">
                  <div className="space-y-2 text-gray-600 text-sm flex-grow">
                    <p>• Use 2 different services in 7 days</p>
                    <p>• Make 2 transactions this week (any amount)</p>
                    <p>• Refer 1 client who spends ₹5,000+</p>
                    <p>• Total spend crosses ₹10,000</p>
                  </div>
                  <div className="flex items-center text-[#FFC107] font-semibold text-sm mt-4 group-hover:text-[#FFC107]/80 transition-colors mt-auto">
                    <span>Start Challenge</span>
                    <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/login">
              <Card className="group bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-transparent hover:border-[#FFC107]/20 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer hover:scale-105 transform h-full flex flex-col">
                <CardHeader className="pb-4 flex-shrink-0">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#FFC107] to-[#FFC107]/80 rounded-xl flex items-center justify-center">
                      <span className="text-black font-bold text-lg">2</span>
                    </div>
                    <div className="flex-1">
                      <Badge className="bg-[#FFC107]/10 text-[#FFC107] border-[#FFC107]/20 mb-2">ADVANCED</Badge>
                    </div>
                  </div>
                  <CardTitle className="text-[#FFC107] text-lg font-bold leading-tight group-hover:text-[#FFC107]/80 transition-colors">
                    Week 2 Challenge
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0 flex-grow flex flex-col">
                  <div className="space-y-2 text-gray-600 text-sm flex-grow">
                    <p>• Place a single order worth ₹10,000+</p>
                    <p>• Reorder any service used last week</p>
                    <p>• Order 5+ content pieces (blogs/posts/videos)</p>
                    <p>• Bring 1 new client (₹10,000+)</p>
                    <p>• Total spend reaches ₹20,000</p>
                  </div>
                  <div className="flex items-center text-[#FFC107] font-semibold text-sm mt-4 group-hover:text-[#FFC107]/80 transition-colors mt-auto">
                    <span>Start Challenge</span>
                    <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/login">
              <Card className="group bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-transparent hover:border-[#FFC107]/20 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer hover:scale-105 transform h-full flex flex-col">
                <CardHeader className="pb-4 flex-shrink-0">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#FFC107] to-[#FFC107]/80 rounded-xl flex items-center justify-center">
                      <span className="text-black font-bold text-lg">3</span>
                    </div>
                    <div className="flex-1">
                      <Badge className="bg-[#FFC107]/10 text-[#FFC107] border-[#FFC107]/20 mb-2">ADVANCED</Badge>
                    </div>
                  </div>
                  <CardTitle className="text-[#FFC107] text-lg font-bold leading-tight group-hover:text-[#FFC107]/80 transition-colors">
                    Week 3 Challenge
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0 flex-grow flex flex-col">
                  <div className="space-y-2 text-gray-600 text-sm flex-grow">
                    <p>• Use 3 different services this week</p>
                    <p>• Complete 3 transactions in 7 days</p>
                    <p>• Place a bundle order worth ₹20,000+</p>
                    <p>• Submit feedback/testimonial after spending ₹10,000+</p>
                    <p>• Total spend reaches ₹30,000</p>
                  </div>
                  <div className="flex items-center text-[#FFC107] font-semibold text-sm mt-4 group-hover:text-[#FFC107]/80 transition-colors mt-auto">
                    <span>Start Challenge</span>
                    <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/login">
              <Card className="group bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-transparent hover:border-[#FFC107]/20 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer hover:scale-105 transform h-full flex flex-col">
                <CardHeader className="pb-4 flex-shrink-0">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#FFC107] to-[#FFC107]/80 rounded-xl flex items-center justify-center">
                      <span className="text-black font-bold text-lg">4</span>
                    </div>
                    <div className="flex-1">
                      <Badge className="bg-[#FFC107]/10 text-[#FFC107] border-[#FFC107]/20 mb-2">ADVANCED</Badge>
                    </div>
                  </div>
                  <CardTitle className="text-[#FFC107] text-lg font-bold leading-tight group-hover:text-[#FFC107]/80 transition-colors">
                    Week 4 Challenge
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0 flex-grow flex flex-col">
                  <div className="space-y-2 text-gray-600 text-sm flex-grow">
                    <p>• Place a project worth ₹25,000+</p>
                    <p>• Make 4 transactions this week</p>
                    <p>• Order 10+ deliverables (posts/videos/blogs)</p>
                    <p>• Refer 2 clients (₹10,000+ each)</p>
                    <p>• Total spend crosses ₹50,000</p>
                  </div>
                  <div className="flex items-center text-[#FFC107] font-semibold text-sm mt-4 group-hover:text-[#FFC107]/80 transition-colors mt-auto">
                    <span>Start Challenge</span>
                    <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/login">
              <Card className="group bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-transparent hover:border-[#FFC107]/20 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer hover:scale-105 transform h-full flex flex-col">
                <CardHeader className="pb-4 flex-shrink-0">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#FFC107] to-[#FFC107]/80 rounded-xl flex items-center justify-center">
                      <span className="text-black font-bold text-lg">5</span>
                    </div>
                    <div className="flex-1">
                      <Badge className="bg-[#FFC107]/10 text-[#FFC107] border-[#FFC107]/20 mb-2">ADVANCED</Badge>
                    </div>
                  </div>
                  <CardTitle className="text-[#FFC107] text-lg font-bold leading-tight group-hover:text-[#FFC107]/80 transition-colors">
                    Week 5 Challenge
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0 flex-grow flex flex-col">
                  <div className="space-y-2 text-gray-600 text-sm flex-grow">
                    <p>• Place 2 orders worth ₹15,000+ each</p>
                    <p>• Use 4 different services this week</p>
                    <p>• Refer 1 client (₹15,000+)</p>
                    <p>• Make 5 transactions in 7 days</p>
                    <p>• Total spend reaches ₹75,000</p>
                  </div>
                  <div className="flex items-center text-[#FFC107] font-semibold text-sm mt-4 group-hover:text-[#FFC107]/80 transition-colors mt-auto">
                    <span>Start Challenge</span>
                    <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/login">
              <Card className="group bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-transparent hover:border-[#FFC107]/20 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer hover:scale-105 transform h-full flex flex-col">
                <CardHeader className="pb-4 flex-shrink-0">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#FFC107] to-[#FFC107]/80 rounded-xl flex items-center justify-center">
                      <span className="text-black font-bold text-lg">6</span>
                    </div>
                    <div className="flex-1">
                      <Badge className="bg-[#FFC107]/10 text-[#FFC107] border-[#FFC107]/20 mb-2">ADVANCED</Badge>
                    </div>
                  </div>
                  <CardTitle className="text-[#FFC107] text-lg font-bold leading-tight group-hover:text-[#FFC107]/80 transition-colors">
                    Week 6 Challenge
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0 flex-grow flex flex-col">
                  <div className="space-y-2 text-gray-600 text-sm flex-grow">
                    <p>• Place a project worth ₹30,000+</p>
                    <p>• Complete 3 repeat orders (any service)</p>
                    <p>• Build a bundle order worth ₹40,000+</p>
                    <p>• Use 5 unique services overall by this week</p>
                    <p>• Total spend reaches ₹1,00,000</p>
                  </div>
                  <div className="flex items-center text-[#FFC107] font-semibold text-sm mt-4 group-hover:text-[#FFC107]/80 transition-colors mt-auto">
                    <span>Start Challenge</span>
                    <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Evaluation & Awards */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-6xl font-bold text-[#007BFF] mb-6">Evaluation & Awards</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Participants will be evaluated based on multiple criteria, with top performers receiving recognition and awards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="text-center p-6 bg-white rounded-lg shadow-lg">
              <div className="w-16 h-16 bg-[#007BFF] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">💰</span>
              </div>
              <h3 className="text-lg font-semibold text-[#007BFF] mb-2">Sales Generated</h3>
              <p className="text-gray-600 text-sm">Revenue and sales performance</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-lg">
              <div className="w-16 h-16 bg-[#FFC107] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-black text-2xl">🎨</span>
              </div>
              <h3 className="text-lg font-semibold text-[#007BFF] mb-2">Creativity</h3>
              <p className="text-gray-600 text-sm">Innovation and creative solutions</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-lg">
              <div className="w-16 h-16 bg-[#007BFF] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">🤝</span>
              </div>
              <h3 className="text-lg font-semibold text-[#007BFF] mb-2">Client Handling</h3>
              <p className="text-gray-600 text-sm">Customer service excellence</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-lg">
              <div className="w-16 h-16 bg-[#FFC107] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-black text-2xl">📈</span>
              </div>
              <h3 className="text-lg font-semibold text-[#007BFF] mb-2">Overall Performance</h3>
              <p className="text-gray-600 text-sm">Comprehensive business growth</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-[#007BFF] to-[#FFC107] p-8 rounded-lg text-white text-center">
            <h3 className="text-6xl font-bold mb-4">Launchpad Award Night</h3>
            <p className="text-lg mb-6">
              Top performers will be recognized during the Launchpad Award Night, with awards for:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white/20 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Highest Turnover</h4>
                <p className="text-sm">Best revenue performance</p>
              </div>
              <div className="bg-white/20 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Best Branding</h4>
                <p className="text-sm">Most creative brand identity</p>
              </div>
              <div className="bg-white/20 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Rising Star</h4>
                <p className="text-sm">Most promising newcomer</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#007BFF]">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Take on the Challenge?</h2>
          <p className="text-xl text-white/90 mb-8">
            Choose your challenge level and start building your entrepreneurial empire today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login">
              <Button size="lg" className="bg-[#FFC107] text-black hover:bg-[#FFC107]/90 font-bold text-lg px-8 py-3">
                Register for BASIC
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-[#007BFF] font-semibold text-lg px-8 py-3">
                Register for ADVANCED
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
