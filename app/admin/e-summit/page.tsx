"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useApp } from "@/components/state/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import PromoCodesSection from "./components/promo-codes-section"

type ESummitPayment = {
  id: string
  name: string
  email: string
  phone: string
  senderName: string
  passType: string
  passName: string
  amount: number
  promoCode: string | null
  transactionId: string
  status: "pending" | "success" | "failed"
  createdAt: number
}

// Define pass types and their display names
const PASS_TYPES = {
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

export default function AdminESummitPage() {
  const { currentUser, isAdmin } = useApp()
  const router = useRouter()
  const { toast } = useToast()
  const [payments, setPayments] = useState<ESummitPayment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!currentUser) {
      router.push("/login")
      return
    }
    
    if (!isAdmin) {
      router.push("/")
      return
    }
    
    loadPayments()
  }, [currentUser, isAdmin, router])

  const loadPayments = async () => {
    try {
      const res = await fetch("/api/e-summit/payments")
      const data = await res.json()
      
      if (data.ok) {
        // Sort payments by date (newest first)
        const sortedPayments = data.payments.sort((a: ESummitPayment, b: ESummitPayment) => 
          b.createdAt - a.createdAt
        )
        setPayments(sortedPayments)
      }
    } catch (error) {
      console.error("Error loading payments:", error)
      toast({
        title: "Error",
        description: "Failed to load payments",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">E-Summit Admin Dashboard</h1>
        
        {/* Payments Section */}
        <section>
          <Card>
            <CardHeader>
              <CardTitle>E-Summit Payments</CardTitle>
            </CardHeader>
            <CardContent>
              {payments.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">
                  No payments found.
                </p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {payments.map((payment) => (
                    <Card key={payment.id} className="overflow-hidden">
                      <div className={`p-4 ${
                        payment.status === "success" 
                          ? "bg-green-50 border-green-200" 
                          : payment.status === "failed" 
                            ? "bg-red-50 border-red-200" 
                            : "bg-yellow-50 border-yellow-200"
                      } border-b`}>
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-lg">{payment.name}</h3>
                            <p className="text-sm text-gray-600">{payment.email}</p>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            payment.status === "success" 
                              ? "bg-green-100 text-green-800" 
                              : payment.status === "failed" 
                                ? "bg-red-100 text-red-800" 
                                : "bg-yellow-100 text-yellow-800"
                          }`}>
                            {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                          </span>
                        </div>
                      </div>
                      <CardContent className="pt-4">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">Pass:</span>
                            <span className="text-sm font-medium">{PASS_TYPES[payment.passType as keyof typeof PASS_TYPES] || payment.passName}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">Amount:</span>
                            <span className="text-sm font-medium">₹{payment.amount.toFixed(2)}</span>
                          </div>
                          {payment.promoCode && (
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-500">Promo Code:</span>
                              <span className="text-sm font-medium">{payment.promoCode}</span>
                            </div>
                          )}
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">Transaction ID:</span>
                            <span className="text-sm font-medium text-xs">{payment.transactionId}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">Date:</span>
                            <span className="text-sm font-medium">
                              {new Date(payment.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </section>

        {/* Promo Codes Section */}
        <PromoCodesSection />
      </div>
    </div>
  )
}