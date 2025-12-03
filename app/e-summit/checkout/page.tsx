"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

export default function ESummitCheckoutPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)
  const [passType, setPassType] = useState<string | null>(null)
  const [passInfo, setPassInfo] = useState<{ name: string; price: number } | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    senderName: ""
  })
  const [promoCode, setPromoCode] = useState("")
  const [appliedPromoCode, setAppliedPromoCode] = useState<string | null>(null)
  const [discount, setDiscount] = useState(0)
  const [validatingPromo, setValidatingPromo] = useState(false)
  const [processingPayment, setProcessingPayment] = useState(false)

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
    const pass = searchParams.get("pass")
    if (pass && PASS_TYPES[pass]) {
      setPassType(pass)
      // Load the current price for this pass type
      loadPassPrice(pass)
    } else {
      router.push("/e-summit")
    }
  }, [searchParams, router])

  const loadPassPrice = async (passType: string) => {
    try {
      const res = await fetch("/api/e-summit/pass-prices")
      const data = await res.json()
      
      if (data.ok) {
        const price = data.prices[passType] || 0
        setPassInfo({
          name: PASS_TYPES[passType],
          price: price
        })
      } else {
        // Fallback to default prices if API fails
        const defaultPrices: Record<string, number> = {
          "venture-vault": 2999,
          "premium-pass": 1199,
          "roundtable": 1999,
          "booth": 6000,
          "access-pass": 499,
          "general": 1199,
          "team": 2999,
          "premium": 1199,
          "shark-tank": 3999,
          "expo": 8000
        }
        
        setPassInfo({
          name: PASS_TYPES[passType],
          price: defaultPrices[passType] || 0
        })
      }
    } catch (error) {
      console.error("Error loading pass price:", error)
      // Fallback to default prices if API fails
      const defaultPrices: Record<string, number> = {
        "venture-vault": 2999,
        "premium-pass": 1199,
        "roundtable": 1999,
        "booth": 6000,
        "access-pass": 499,
        "general": 1199,
        "team": 2999,
        "premium": 1199,
        "shark-tank": 3999,
        "expo": 8000
      }
      
      setPassInfo({
        name: PASS_TYPES[passType],
        price: defaultPrices[passType] || 0
      })
    } finally {
      setLoading(false)
    }
  }

  const validatePromoCode = async () => {
    if (!promoCode.trim() || !passInfo) return

    setValidatingPromo(true)
    try {
      // Simulate promo code validation
      // In a real implementation, this would call an API
      if (promoCode.toLowerCase() === "save10") {
        const discountAmount = passInfo.price * 0.10
        setDiscount(discountAmount)
        setAppliedPromoCode(promoCode.toUpperCase())
        toast({
          title: "Promo Code Applied",
          description: `10% discount applied! You saved ₹${discountAmount.toFixed(2)}`,
        })
      } else {
        toast({
          title: "Invalid Promo Code",
          description: "Please check your promo code and try again.",
          variant: "destructive",
        })
        setAppliedPromoCode(null)
        setDiscount(0)
      }
    } catch (error) {
      console.error("Error validating promo code:", error)
      toast({
        title: "Error",
        description: "Failed to validate promo code. Please try again.",
        variant: "destructive",
      })
    } finally {
      setValidatingPromo(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleBuyNow = async () => {
    // Validate form data
    if (!formData.name || !formData.email || !formData.phone || !formData.senderName) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      })
      return
    }

    // Simple phone validation (10 digits)
    const phoneRegex = /^\d{10}$/
    if (!phoneRegex.test(formData.phone)) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid 10-digit phone number.",
        variant: "destructive",
      })
      return
    }

    setProcessingPayment(true)
    try {
      // Log the data being sent
      console.log("Sending payment data:", {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        senderName: formData.senderName,
        passType: passType,
        passName: passInfo?.name,
        amount: passInfo ? Math.max(0, passInfo.price - discount) : 0,
        promoCode: appliedPromoCode || undefined
      });

      // Call the e-summit payment initiation API
      const response = await fetch("/api/e-summit/payments/initiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          senderName: formData.senderName,
          passType: passType,
          passName: passInfo?.name,
          amount: passInfo ? Math.max(0, passInfo.price - discount) : 0,
          promoCode: appliedPromoCode || undefined
        }),
      })

      console.log("Payment API response status:", response.status);
      console.log("Payment API response headers:", [...response.headers.entries()]);

      const data = await response.json()
      console.log("Payment API response data:", data);

      if (data.ok && data.paymentUrl) {
        // Redirect to PhonePe payment page
        console.log("Redirecting to PhonePe payment page:", data.paymentUrl);
        window.location.href = data.paymentUrl
      } else {
        const errorMessage = data.message || "Failed to initiate payment. Please try again."
        console.error("Payment initiation failed:", {
          status: response.status,
          errorMessage,
          fullResponse: data,
        })
        toast({
          title: "Payment Failed",
          description: errorMessage,
          variant: "destructive",
        })
        setProcessingPayment(false)
      }
    } catch (error) {
      console.error("Payment initiation error:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Something went wrong. Please try again.",
        variant: "destructive",
      })
      setProcessingPayment(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    )
  }

  if (!passType || !passInfo) {
    return null
  }

  const originalPrice = passInfo.price
  const finalAmount = Math.max(0, originalPrice - discount)

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-[#144449] mb-8">E-Summit Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Pass Details and Form */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Pass Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-white rounded-lg border">
                  <div>
                    <h3 className="text-lg font-semibold text-[#144449]">{passInfo.name}</h3>
                    <p className="text-sm text-gray-600">E-Summit 2025 Pass</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-[#144449]">₹{originalPrice.toFixed(2)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* User Information Form */}
            <Card>
              <CardHeader>
                <CardTitle>User Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Enter 10-digit phone number"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="senderName">Name of Person Sending Amount *</Label>
                    <Input
                      id="senderName"
                      name="senderName"
                      value={formData.senderName}
                      onChange={handleInputChange}
                      placeholder="Enter sender's name"
                      required
                    />
                  </div>
                </div>
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-yellow-700">
                        <strong>Note:</strong> Pass will be sent via email within 24-48 hours. Please ensure all details are correct.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Promo Code Section */}
            <Card>
              <CardHeader>
                <CardTitle>Promo Code</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    disabled={!!appliedPromoCode || validatingPromo}
                    className="flex-1"
                  />
                  {!appliedPromoCode ? (
                    <Button
                      onClick={validatePromoCode}
                      disabled={!promoCode.trim() || validatingPromo}
                      className="bg-[#BF9B30] hover:bg-[#BF9B30]/90"
                    >
                      {validatingPromo ? "Applying..." : "Apply"}
                    </Button>
                  ) : (
                    <Button
                      onClick={() => {
                        setAppliedPromoCode(null)
                        setDiscount(0)
                        setPromoCode("")
                      }}
                      variant="outline"
                    >
                      Remove
                    </Button>
                  )}
                </div>
                {appliedPromoCode && (
                  <p className="text-sm text-green-600 mt-2">
                    Promo code <strong>{appliedPromoCode}</strong> applied! You saved ₹{discount.toFixed(2)}
                  </p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Pass:</span>
                    <span className="font-medium">{passInfo.name}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Price:</span>
                    <span className="font-medium">₹{originalPrice.toFixed(2)}</span>
                  </div>
                  {appliedPromoCode && (
                    <>
                      <div className="flex justify-between text-sm text-green-600">
                        <span>Discount ({appliedPromoCode}):</span>
                        <span>-₹{discount.toFixed(2)}</span>
                      </div>
                    </>
                  )}
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total:</span>
                      <span className="text-[#144449]">₹{finalAmount.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handleBuyNow}
                  disabled={processingPayment}
                  className="w-full bg-gradient-to-r from-[#144449] to-[#BF9B30] hover:from-[#144449]/90 hover:to-[#BF9B30]/90 text-white font-bold py-6 text-lg"
                >
                  {processingPayment ? "Processing..." : "PROCEED TO PAY"}
                </Button>

                <p className="text-xs text-gray-500 text-center">
                  You will be redirected to PhonePe for secure payment
                </p>

                <div className="pt-4 border-t">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Payment Methods</h4>
                  <div className="flex items-center justify-center space-x-4">
                    <div className="flex items-center">
                      <span className="text-lg">💳</span>
                      <span className="ml-1 text-xs">Credit/Debit Card</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-lg">📱</span>
                      <span className="ml-1 text-xs">UPI</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-lg">💰</span>
                      <span className="ml-1 text-xs">Net Banking</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}