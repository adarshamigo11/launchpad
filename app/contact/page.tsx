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

  const scrollToContactForm = () => {
    const contactForm = document.getElementById('contact-form')
    if (contactForm) {
      contactForm.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] py-20 sm:py-24 md:py-32 lg:py-40 min-h-[60vh] flex items-center relative">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-white mb-6 sm:mb-8 animate-fade-in-up text-display">Contact Us</h1>
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/90 max-w-4xl mx-auto mb-6 sm:mb-8 leading-relaxed px-2 animate-fade-in-up-delay">
            Have questions about Launchpad? Need support with your challenges? We're here to help you succeed on your entrepreneurial journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 animate-fade-in-up-delay-2">
            <Button 
              size="lg" 
              className="w-full sm:w-auto bg-white text-[var(--primary)] hover:bg-gray-100 font-bold text-base sm:text-lg px-6 sm:px-8 py-3 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
              onClick={scrollToContactForm}
            >
              Contact Support
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-[var(--primary)] font-semibold text-base sm:text-lg px-6 sm:px-8 py-3 !bg-transparent !border-white !text-white hover:!bg-white hover:!text-[var(--primary)] transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
              View FAQ
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact-form" className="py-16 sm:py-20 md:py-24 bg-[var(--surface)]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 animate-fade-in-up">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[var(--primary)] mb-4 sm:mb-6 text-heading">Send Us a Message</h2>
            <p className="text-base sm:text-lg md:text-xl text-[var(--text-primary)] max-w-3xl mx-auto px-2 mb-6">
              Fill out the form below and our team will get back to you within 24 hours. We're here to support your entrepreneurial journey.
            </p>
            <div className="w-20 h-1 bg-[var(--secondary)] mx-auto"></div>
          </div>

          <Card className="shadow-xl border border-[var(--border)] bg-white rounded-xl overflow-hidden animate-fade-in-up-delay">
            <CardHeader className="bg-gradient-to-r from-[var(--primary)] to-[var(--primary)]/80 text-white py-6">
              <CardTitle className="text-lg sm:text-xl lg:text-2xl text-center text-subheading">Contact Us</CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 lg:p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-base sm:text-lg font-semibold text-[var(--text-primary)]">
                      Full Name *
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="h-10 sm:h-12 text-base sm:text-lg border border-[var(--border)] focus:border-[var(--primary)] focus:ring-[var(--primary)] bg-white !bg-white rounded-lg transition-all duration-300"
                      placeholder="Enter your full name"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="mobile" className="text-base sm:text-lg font-semibold text-[var(--text-primary)]">
                      Mobile Number *
                    </Label>
                    <Input
                      id="mobile"
                      name="mobile"
                      type="tel"
                      required
                      value={formData.mobile}
                      onChange={handleInputChange}
                      className="h-10 sm:h-12 text-base sm:text-lg border border-[var(--border)] focus:border-[var(--primary)] focus:ring-[var(--primary)] bg-white !bg-white rounded-lg transition-all duration-300"
                      placeholder="Enter your mobile number"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-base sm:text-lg font-semibold text-[var(--text-primary)]">
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="h-10 sm:h-12 text-base sm:text-lg border border-[var(--border)] focus:border-[var(--primary)] focus:ring-[var(--primary)] bg-white !bg-white rounded-lg transition-all duration-300"
                    placeholder="Enter your email address"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-base sm:text-lg font-semibold text-[var(--text-primary)]">
                    Message *
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleInputChange}
                    className="min-h-24 sm:min-h-32 text-base sm:text-lg border border-[var(--border)] focus:border-[var(--primary)] focus:ring-[var(--primary)] resize-none bg-white !bg-white rounded-lg transition-all duration-300"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                <div className="text-center pt-3 sm:pt-4">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] hover:from-[var(--primary)]/90 hover:to-[var(--secondary)]/90 text-white font-bold text-base sm:text-lg px-8 sm:px-12 py-3 sm:py-4 h-12 sm:h-14 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 !bg-gradient-to-r !from-[var(--primary)] !to-[var(--secondary)] hover:!from-[var(--primary)]/90 hover:!to-[var(--secondary)]/90 !text-white"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <a 
              href="mailto:launchpad.xpert@gmail.com?subject=Inquiry from Launchpad Website&body=Hello, I would like to get in touch regarding..."
              className="block animate-fade-in-up"
            >
              <Card className="text-center p-4 sm:p-6 border border-[var(--border)] hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer bg-white rounded-xl">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-[var(--primary)] to-[var(--primary)]/80 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-5 shadow-lg">
                  <span className="text-white text-2xl sm:text-3xl">📧</span>
                </div>
                <h3 className="text-xl sm:text-2xl text-[var(--primary)] mb-2 text-subheading">Email Us</h3>
                <p className="text-base sm:text-lg text-[var(--text-primary)] mb-1">launchpad.xpert@gmail.com</p>
                <p className="text-sm text-[var(--text-secondary)]">Click to send email</p>
              </Card>
            </a>

            <a 
              href="tel:+919039654155"
              className="block animate-fade-in-up-delay"
            >
              <Card className="text-center p-4 sm:p-6 border border-[var(--border)] hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer bg-white rounded-xl">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-[var(--secondary)] to-[var(--secondary)]/80 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-5 shadow-lg">
                  <span className="text-black text-2xl sm:text-3xl">📱</span>
                </div>
                <h3 className="text-xl sm:text-2xl text-[var(--secondary)] mb-2 text-subheading">Call Us</h3>
                <p className="text-base sm:text-lg text-[var(--text-primary)] mb-1">+91 9039654155</p>
                <p className="text-sm text-[var(--text-secondary)]">Click to call</p>
              </Card>
            </a>
          </div>
        </div>
    </section>
    </div>
  )
}