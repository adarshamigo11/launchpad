"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useApp } from "@/components/state/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Trash2, Edit, Plus } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"

type PromoCode = {
  id: string
  code: string
  description: string
  discountType: "percentage" | "fixed"
  discountValue: number
  minAmount?: number
  maxDiscount?: number
  validFrom: number
  validUntil: number
  usageLimit?: number
  usedCount: number
  isActive: boolean
}

export default function AdminPromoCodesPage() {
  const { currentUser, isAdmin } = useApp()
  const router = useRouter()
  const { toast } = useToast()
  const [promoCodes, setPromoCodes] = useState<PromoCode[]>([])
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingPromoCode, setEditingPromoCode] = useState<PromoCode | null>(null)
  
  // Form state
  const [formData, setFormData] = useState({
    code: "",
    description: "",
    discountType: "percentage" as "percentage" | "fixed",
    discountValue: 10,
    minAmount: "",
    maxDiscount: "",
    validFrom: new Date().toISOString().split('T')[0],
    validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 days from now
    usageLimit: "",
    isActive: true
  })

  useEffect(() => {
    if (!currentUser) {
      router.push("/login")
      return
    }
    
    if (!isAdmin) {
      router.push("/")
      return
    }
    
    loadPromoCodes()
  }, [currentUser, isAdmin, router])

  const loadPromoCodes = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/promo-codes")
      const data = await response.json()
      
      if (data.ok) {
        setPromoCodes(data.promoCodes)
      } else {
        toast({
          title: "Error",
          description: data.message || "Failed to load promo codes",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error loading promo codes:", error)
      toast({
        title: "Error",
        description: "Failed to load promo codes",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked
    
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const payload = {
        ...formData,
        minAmount: formData.minAmount ? Number(formData.minAmount) : undefined,
        maxDiscount: formData.maxDiscount ? Number(formData.maxDiscount) : undefined,
        usageLimit: formData.usageLimit ? Number(formData.usageLimit) : undefined,
        validFrom: new Date(formData.validFrom).toISOString(),
        validUntil: new Date(formData.validUntil).toISOString(),
      }
      
      const url = editingPromoCode ? `/api/promo-codes?id=${editingPromoCode.id}` : "/api/promo-codes"
      const method = editingPromoCode ? "PUT" : "POST"
      
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      
      const data = await response.json()
      
      if (data.ok) {
        toast({
          title: editingPromoCode ? "Promo Code Updated" : "Promo Code Created",
          description: editingPromoCode ? "Promo code updated successfully" : "Promo code created successfully",
        })
        
        setIsDialogOpen(false)
        setEditingPromoCode(null)
        resetForm()
        loadPromoCodes()
      } else {
        toast({
          title: "Error",
          description: data.message || "Failed to save promo code",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error saving promo code:", error)
      toast({
        title: "Error",
        description: "Failed to save promo code",
        variant: "destructive",
      })
    }
  }

  const handleEdit = (promoCode: PromoCode) => {
    setEditingPromoCode(promoCode)
    setFormData({
      code: promoCode.code,
      description: promoCode.description,
      discountType: promoCode.discountType,
      discountValue: promoCode.discountValue,
      minAmount: promoCode.minAmount?.toString() || "",
      maxDiscount: promoCode.maxDiscount?.toString() || "",
      validFrom: new Date(promoCode.validFrom).toISOString().split('T')[0],
      validUntil: new Date(promoCode.validUntil).toISOString().split('T')[0],
      usageLimit: promoCode.usageLimit?.toString() || "",
      isActive: promoCode.isActive
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this promo code?")) return
    
    try {
      const response = await fetch(`/api/promo-codes?id=${id}`, {
        method: "DELETE",
      })
      
      const data = await response.json()
      
      if (data.ok) {
        toast({
          title: "Promo Code Deleted",
          description: "Promo code deleted successfully",
        })
        loadPromoCodes()
      } else {
        toast({
          title: "Error",
          description: data.message || "Failed to delete promo code",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error deleting promo code:", error)
      toast({
        title: "Error",
        description: "Failed to delete promo code",
        variant: "destructive",
      })
    }
  }

  const resetForm = () => {
    setFormData({
      code: "",
      description: "",
      discountType: "percentage",
      discountValue: 10,
      minAmount: "",
      maxDiscount: "",
      validFrom: new Date().toISOString().split('T')[0],
      validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      usageLimit: "",
      isActive: true
    })
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
    setEditingPromoCode(null)
    resetForm()
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
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Promo Codes</h1>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => {
                setEditingPromoCode(null)
                resetForm()
              }}>
                <Plus className="mr-2 h-4 w-4" />
                Add Promo Code
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>{editingPromoCode ? "Edit Promo Code" : "Create Promo Code"}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="code">Code *</Label>
                  <Input
                    id="code"
                    name="code"
                    value={formData.code}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., SAVE20"
                  />
                </div>
                
                <div>
                  <Label htmlFor="description">Description *</Label>
                  <Input
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., 20% off on all passes"
                  />
                </div>
                
                <div>
                  <Label htmlFor="discountType">Discount Type *</Label>
                  <select
                    id="discountType"
                    name="discountType"
                    value={formData.discountType}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="percentage">Percentage</option>
                    <option value="fixed">Fixed Amount</option>
                  </select>
                </div>
                
                <div>
                  <Label htmlFor="discountValue">
                    {formData.discountType === "percentage" ? "Discount Percentage (%)" : "Discount Amount (₹)"} *
                  </Label>
                  <Input
                    id="discountValue"
                    name="discountValue"
                    type="number"
                    min="0"
                    value={formData.discountValue}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="minAmount">Minimum Amount (₹)</Label>
                  <Input
                    id="minAmount"
                    name="minAmount"
                    type="number"
                    min="0"
                    value={formData.minAmount}
                    onChange={handleInputChange}
                    placeholder="e.g., 1000"
                  />
                </div>
                
                {formData.discountType === "percentage" && (
                  <div>
                    <Label htmlFor="maxDiscount">Maximum Discount (₹)</Label>
                    <Input
                      id="maxDiscount"
                      name="maxDiscount"
                      type="number"
                      min="0"
                      value={formData.maxDiscount}
                      onChange={handleInputChange}
                      placeholder="e.g., 500"
                    />
                  </div>
                )}
                
                <div>
                  <Label htmlFor="validFrom">Valid From *</Label>
                  <Input
                    id="validFrom"
                    name="validFrom"
                    type="date"
                    value={formData.validFrom}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="validUntil">Valid Until *</Label>
                  <Input
                    id="validUntil"
                    name="validUntil"
                    type="date"
                    value={formData.validUntil}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="usageLimit">Usage Limit</Label>
                  <Input
                    id="usageLimit"
                    name="usageLimit"
                    type="number"
                    min="0"
                    value={formData.usageLimit}
                    onChange={handleInputChange}
                    placeholder="e.g., 100"
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="isActive">Active</Label>
                  <Switch
                    id="isActive"
                    name="isActive"
                    checked={formData.isActive}
                    onCheckedChange={(checked) => 
                      setFormData(prev => ({ ...prev, isActive: checked }))
                    }
                  />
                </div>
                
                <div className="flex justify-end gap-2 pt-4">
                  <Button type="button" variant="outline" onClick={handleCloseDialog}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    {editingPromoCode ? "Update" : "Create"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>All Promo Codes</CardTitle>
          </CardHeader>
          <CardContent>
            {promoCodes.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">
                No promo codes found. Create your first promo code to get started.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Code</th>
                      <th className="text-left py-3 px-4">Description</th>
                      <th className="text-left py-3 px-4">Discount</th>
                      <th className="text-left py-3 px-4">Validity</th>
                      <th className="text-left py-3 px-4">Usage</th>
                      <th className="text-left py-3 px-4">Status</th>
                      <th className="text-right py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {promoCodes.map((promoCode) => (
                      <tr key={promoCode.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4 font-mono font-medium">{promoCode.code}</td>
                        <td className="py-3 px-4">{promoCode.description}</td>
                        <td className="py-3 px-4">
                          {promoCode.discountType === "percentage" 
                            ? `${promoCode.discountValue}%` 
                            : `₹${promoCode.discountValue}`}
                          {promoCode.maxDiscount && (
                            <span className="block text-sm text-muted-foreground">
                              Max: ₹{promoCode.maxDiscount}
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          <div className="text-sm">
                            <div>From: {new Date(promoCode.validFrom).toLocaleDateString()}</div>
                            <div>To: {new Date(promoCode.validUntil).toLocaleDateString()}</div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          {promoCode.usageLimit ? (
                            <span>{promoCode.usedCount} / {promoCode.usageLimit}</span>
                          ) : (
                            <span>{promoCode.usedCount} uses</span>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            promoCode.isActive 
                              ? "bg-green-100 text-green-800" 
                              : "bg-red-100 text-red-800"
                          }`}>
                            {promoCode.isActive ? "Active" : "Inactive"}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEdit(promoCode)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDelete(promoCode.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}