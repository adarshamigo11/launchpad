"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useApp } from "@/components/state/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

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
    
    if (currentUser && !isAdmin) {
      router.push("/tasks")
      return
    }
    
    if (currentUser && isAdmin) {
      loadPayments()
    }
  }, [currentUser, isAdmin, router])

  const loadPayments = async () => {
    try {
      setLoading(true)
      const res = await fetch("/api/e-summit/payments")
      const data = await res.json()
      
      if (data.ok) {
        setPayments(data.payments)
        console.log("[Admin] Loaded payments:", data.payments.length)
      } else {
        console.error("Error loading payments:", data.message, data.error)
      }
    } catch (error) {
      console.error("Error loading payments:", error)
    } finally {
      setLoading(false)
    }
  }

  if (!currentUser || !isAdmin) return null

  if (loading) {
    return (
      <section className="mx-auto max-w-6xl px-4 pt-32 pb-8">
        <p className="text-muted-foreground">Loading e-summit submissions...</p>
      </section>
    )
  }

  return (
    <section className="mx-auto max-w-6xl px-4 pt-32 pb-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">E-Summit Management</h1>
        <div className="flex gap-2">
          <Button onClick={loadPayments}>Refresh Payments</Button>
        </div>
      </div>
      
      {/* Payment Submissions */}
      <Card>
        <CardHeader>
          <CardTitle>E-Summit Submissions</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-muted-foreground">Loading submissions...</p>
          ) : payments.length === 0 ? (
            <p className="text-muted-foreground">No e-summit submissions yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {payments.map((payment) => (
                <Card key={payment.id} className="overflow-hidden">
                  <CardHeader className="bg-gray-50">
                    <CardTitle className="text-lg flex items-center justify-between">
                      <span>{payment.passName}</span>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        payment.status === "success" 
                          ? "bg-green-100 text-green-800" 
                          : payment.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}>
                        {payment.status}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Name:</span>
                        <span className="text-sm font-medium">{payment.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Email:</span>
                        <span className="text-sm font-medium">{payment.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Phone:</span>
                        <span className="text-sm font-medium">{payment.phone}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Sender:</span>
                        <span className="text-sm font-medium">{payment.senderName}</span>
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
  )
}