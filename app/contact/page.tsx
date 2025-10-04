"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    message: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (result.ok) {
        toast({
          title: "Message Sent Successfully!",
          description: "Your message has been submitted and we will get back to you within 24 hours.",
          duration: 5000,
        })
        
        // Reset form
        setFormData({
          name: "",
          mobile: "",
          email: "",
          message: ""
        })
      } else {
        toast({
          title: "Error",
          description: result.message || "Failed to send message. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#007BFF] to-[#FFC107] py-32 md:py-40 min-h-[60vh] flex items-center">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-8">Get In Touch</h1>
          <p className="text-2xl md:text-3xl text-white/90 max-w-4xl mx-auto mb-8 leading-relaxed">
            Have questions about Launchpad? Need support with your challenges? We're here to help you succeed on your entrepreneurial journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-[#007BFF] hover:bg-gray-100 font-bold text-lg px-8 py-3">
              Contact Support
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-[#007BFF] font-semibold text-lg px-8 py-3">
              View FAQ
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-24 bg-gray-50">
        <div className="mx-auto max-w-4xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-6xl font-bold text-[#007BFF] mb-6">Send Us a Message</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Fill out the form below and our team will get back to you within 24 hours. We're here to support your entrepreneurial journey.
            </p>
          </div>

          <Card className="shadow-2xl border-2 border-[#007BFF]/20 bg-white">
            <CardHeader className="bg-gradient-to-r from-[#007BFF] to-[#007BFF]/80 text-white">
              <CardTitle className="text-2xl text-center">Contact Form</CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-lg font-semibold text-gray-700">
                      Full Name *
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="h-12 text-lg border-2 border-gray-300 focus:border-[#007BFF] focus:ring-[#007BFF] bg-white !bg-white"
                      placeholder="Enter your full name"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="mobile" className="text-lg font-semibold text-gray-700">
                      Mobile Number *
                    </Label>
                    <Input
                      id="mobile"
                      name="mobile"
                      type="tel"
                      required
                      value={formData.mobile}
                      onChange={handleInputChange}
                      className="h-12 text-lg border-2 border-gray-300 focus:border-[#007BFF] focus:ring-[#007BFF] bg-white !bg-white"
                      placeholder="Enter your mobile number"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-lg font-semibold text-gray-700">
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="h-12 text-lg border-2 border-gray-300 focus:border-[#007BFF] focus:ring-[#007BFF] bg-white !bg-white"
                    placeholder="Enter your email address"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-lg font-semibold text-gray-700">
                    Message *
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleInputChange}
                    className="min-h-32 text-lg border-2 border-gray-300 focus:border-[#007BFF] focus:ring-[#007BFF] resize-none bg-white !bg-white"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                <div className="text-center pt-4">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-gradient-to-r from-[#007BFF] to-[#FFC107] hover:from-[#007BFF]/90 hover:to-[#FFC107]/90 text-white font-bold text-lg px-12 py-4 h-14 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="text-center p-6 border-2 border-[#007BFF]/20 hover:shadow-lg transition-shadow bg-white">
              <div className="w-16 h-16 bg-gradient-to-br from-[#007BFF] to-[#007BFF]/80 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">📧</span>
              </div>
              <h3 className="text-xl font-bold text-[#007BFF] mb-2">Email Us</h3>
              <p className="text-gray-600">Launchpad.xpert@gmail.com</p>
            </Card>

            <Card className="text-center p-6 border-2 border-[#FFC107]/20 hover:shadow-lg transition-shadow bg-white">
              <div className="w-16 h-16 bg-gradient-to-br from-[#FFC107] to-[#FFC107]/80 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-black text-2xl">📱</span>
              </div>
              <h3 className="text-xl font-bold text-[#FFC107] mb-2">Call Us</h3>
              <p className="text-gray-600">+1 (555) 123-4567</p>
            </Card>
          </div>
        </div>
    </section>
    </div>
  )
}