"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useApp, type Category } from "@/components/state/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

export default function CheckoutPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { currentUser } = useApp()
  const { toast } = useToast()
  const [category, setCategory] = useState<Category | null>(null)
  const [loading, setLoading] = useState(true)
  const [promoCode, setPromoCode] = useState("")
  const [appliedPromoCode, setAppliedPromoCode] = useState<string | null>(null)
  const [discount, setDiscount] = useState(0)
  const [validatingPromo, setValidatingPromo] = useState(false)
  const [processingPayment, setProcessingPayment] = useState(false)

  const categoryId = searchParams.get("categoryId")

  useEffect(() => {
    if (!currentUser) {
      router.push("/login")
      return
    }

    if (!categoryId) {
      router.push("/tasks")
      return
    }

    loadCategory()
  }, [categoryId, currentUser, router])

  const loadCategory = async () => {
    try {
      const res = await fetch(`/api/categories/${categoryId}`)
      const data = await res.json()

      if (data.ok && data.category) {
        setCategory(data.category)
      } else {
        toast({
          title: "Error",
          description: "Category not found",
          variant: "destructive",
        })
        router.push("/tasks")
      }
    } catch (error) {
      console.error("Error loading category:", error)
      toast({
        title: "Error",
        description: "Failed to load category",
        variant: "destructive",
      })
      router.push("/tasks")
    } finally {
      setLoading(false)
    }
  }

  const validatePromoCode = async () => {
    if (!promoCode.trim() || !category) return

    setValidatingPromo(true)
    try {
      const res = await fetch("/api/promo-codes/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: promoCode.trim(),
          amount: category.price,
        }),
      })

      const data = await res.json()

      if (data.ok) {
        setAppliedPromoCode(data.promoCode.code)
        setDiscount(data.discount)
        toast({
          title: "Promo Code Applied",
          description: `${data.promoCode.description} - ₹${data.discount.toFixed(2)} discount applied!`,
        })
      } else {
        toast({
          title: "Invalid Promo Code",
          description: data.message || "Please check your promo code and try again.",
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

  const handleBuyNow = async () => {
    if (!category || !currentUser) {
      toast({
        title: "Error",
        description: "Missing category or user information. Please refresh the page.",
        variant: "destructive",
      })
      return
    }

    setProcessingPayment(true)
    try {
      console.log("Initiating payment:", {
        userId: currentUser.id,
        categoryId: category.id,
        amount: category.price,
      })

      const res = await fetch("/api/payments/initiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: currentUser.id,
          userEmail: currentUser.email,
          categoryId: category.id,
          promoCode: appliedPromoCode || undefined,
        }),
      })

      const data = await res.json()
      console.log("Payment initiation response:", data)
      console.log("Response status:", res.status)
      console.log("Response ok:", res.ok)

      if (data.ok && data.paymentUrl) {
        console.log("Redirecting to PhonePe:", data.paymentUrl)
        // Redirect to PhonePe payment page
        window.location.href = data.paymentUrl
      } else if (data.ok && data.hasAccess) {
        // Free category, access granted
        toast({
          title: "Access Granted",
          description: "You now have access to this category.",
        })
        router.push("/tasks")
      } else {
        const errorMessage = data.message || "Failed to initiate payment. Please try again."
        console.error("Payment initiation failed:", {
          status: res.status,
          errorMessage,
          fullResponse: data,
        })
        toast({
          title: "Payment Failed",
          description: errorMessage,
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Payment initiation error:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
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

  if (!category) {
    return null
  }

  const originalPrice = category.price
  const finalAmount = Math.max(0, originalPrice - discount)

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-[#144449] mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Category Details */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Category Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="aspect-video relative rounded-lg overflow-hidden">
                  <img
                    src={category.photo}
                    alt={category.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-[#144449] mb-2">{category.name}</h2>
                  <p className="text-gray-600">{category.description}</p>
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

            {/* Policy Links */}
            <Card>
              <CardHeader>
                <CardTitle>Important Information</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  By proceeding with the purchase, you agree to our terms and conditions. Please review our policies:
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/terms-and-conditions"
                    className="text-sm text-[#BF9B30] hover:underline"
                    target="_blank"
                  >
                    Terms and Conditions
                  </Link>
                  <Link
                    href="/privacy-policy"
                    className="text-sm text-[#BF9B30] hover:underline"
                    target="_blank"
                  >
                    Privacy Policy
                  </Link>
                  <Link
                    href="/refund-policy"
                    className="text-sm text-[#BF9B30] hover:underline"
                    target="_blank"
                  >
                    Refund Policy
                  </Link>
                </div>
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
                    <span className="text-gray-600">Category:</span>
                    <span className="font-medium">{category.name}</span>
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
                  {processingPayment ? "Processing..." : "BUY NOW"}
                </Button>

                <p className="text-xs text-gray-500 text-center">
                  You will be redirected to PhonePe for secure payment
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

