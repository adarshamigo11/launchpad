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
  const [passPrices, setPassPrices] = useState<Record<string, number>>({})
  const [editingPrice, setEditingPrice] = useState<string | null>(null)
  const [newPrice, setNewPrice] = useState<number>(0)

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
      loadPassPrices()
    }
  }, [currentUser, isAdmin, router])

  const loadPayments = async () => {
    try {
      const res = await fetch("/api/e-summit/payments")
      const data = await res.json()
      
      if (data.ok) {
        setPayments(data.payments)
      } else {
        console.error("Error loading payments:", data.message)
      }
    } catch (error) {
      console.error("Error loading payments:", error)
    } finally {
      setLoading(false)
    }
  }

  const loadPassPrices = async () => {
    try {
      const res = await fetch("/api/e-summit/pass-prices")
      const data = await res.json()
      
      if (data.ok) {
        setPassPrices(data.prices)
      } else {
        console.error("Error loading pass prices:", data.message)
      }
    } catch (error) {
      console.error("Error loading pass prices:", error)
    }
  }

  const startEditingPrice = (passType: string, currentPrice: number) => {
    setEditingPrice(passType)
    setNewPrice(currentPrice)
  }

  const savePrice = async (passType: string) => {
    try {
      const res = await fetch("/api/e-summit/pass-prices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passType, amount: newPrice })
      })
      
      const data = await res.json()
      
      if (data.ok) {
        // Update local state
        setPassPrices(prev => ({
          ...prev,
          [passType]: newPrice
        }))
        
        // Reset editing state
        setEditingPrice(null)
        setNewPrice(0)
        
        toast({
          title: "Success",
          description: "Pass price updated successfully"
        })
      } else {
        toast({
          title: "Error",
          description: data.message || "Failed to update pass price",
          variant: "destructive"
        })
      }
    } catch (error) {
      console.error("Error updating pass price:", error)
      toast({
        title: "Error",
        description: "Failed to update pass price",
        variant: "destructive"
      })
    }
  }

  const cancelEditing = () => {
    setEditingPrice(null)
    setNewPrice(0)
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
          <Button onClick={loadPassPrices} variant="outline">Refresh Prices</Button>
        </div>
      </div>
      
      {/* Pass Price Management */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Pass Prices</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(PASS_TYPES).map(([passType, displayName]) => (
              <div key={passType} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium">{displayName}</h3>
                  {editingPrice === passType ? (
                    <div className="flex gap-1">
                      <Button size="sm" onClick={() => savePrice(passType)}>Save</Button>
                      <Button size="sm" variant="outline" onClick={cancelEditing}>Cancel</Button>
                    </div>
                  ) : (
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => startEditingPrice(passType, passPrices[passType] || 0)}
                    >
                      Edit
                    </Button>
                  )}
                </div>
                <div className="mt-2">
                  {editingPrice === passType ? (
                    <div className="flex items-center gap-2">
                      <Label htmlFor={`price-${passType}`} className="text-sm">₹</Label>
                      <Input
                        id={`price-${passType}`}
                        type="number"
                        min="0"
                        step="1"
                        value={newPrice}
                        onChange={(e) => setNewPrice(Number(e.target.value))}
                        className="w-full"
                      />
                    </div>
                  ) : (
                    <p className="text-lg font-bold text-[#144449]">
                      ₹{(passPrices[passType] || 0).toFixed(2)}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* Payment Submissions */}
      <Card>
        <CardHeader>
          <CardTitle>E-Summit Submissions</CardTitle>
        </CardHeader>
        <CardContent>
          {payments.length === 0 ? (
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