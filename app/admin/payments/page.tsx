"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useApp } from "@/components/state/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import type { PromoCode } from "@/lib/models"

export default function AdminPaymentsPage() {
  const { currentUser, isAdmin } = useApp()
  const router = useRouter()
  const { toast } = useToast()
  const [promoCodes, setPromoCodes] = useState<PromoCode[]>([])
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingPromoCode, setEditingPromoCode] = useState<PromoCode | null>(null)
  const [formData, setFormData] = useState({
    code: "",
    description: "",
    discountType: "percentage" as "percentage" | "fixed",
    discountValue: 0,
    minAmount: "",
    maxDiscount: "",
    validFrom: "",
    validUntil: "",
    usageLimit: "",
    isActive: true,
  })

  useEffect(() => {
    if (!currentUser) router.push("/login")
    if (currentUser && !isAdmin) router.push("/tasks")
  }, [currentUser, isAdmin, router])

  useEffect(() => {
    if (currentUser && isAdmin) {
      loadPromoCodes()
    }
  }, [currentUser, isAdmin])

  const loadPromoCodes = async () => {
    try {
      const res = await fetch("/api/promo-codes")
      const data = await res.json()
      if (data.ok) {
        setPromoCodes(data.promoCodes)
      }
    } catch (error) {
      console.error("Error loading promo codes:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const payload = {
        ...formData,
        minAmount: formData.minAmount ? parseFloat(formData.minAmount) : undefined,
        maxDiscount: formData.maxDiscount ? parseFloat(formData.maxDiscount) : undefined,
        usageLimit: formData.usageLimit ? parseInt(formData.usageLimit) : undefined,
        validFrom: formData.validFrom || new Date().toISOString(),
        validUntil: formData.validUntil || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      }

      if (editingPromoCode) {
        // Update
        const res = await fetch("/api/promo-codes", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingPromoCode.id, ...payload }),
        })

        const data = await res.json()
        if (data.ok) {
          toast({ title: "Success", description: "Promo code updated successfully" })
          setIsDialogOpen(false)
          resetForm()
          loadPromoCodes()
        } else {
          toast({ title: "Error", description: data.message || "Failed to update promo code", variant: "destructive" })
        }
      } else {
        // Create
        const res = await fetch("/api/promo-codes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })

        const data = await res.json()
        if (data.ok) {
          toast({ title: "Success", description: "Promo code created successfully" })
          setIsDialogOpen(false)
          resetForm()
          loadPromoCodes()
        } else {
          toast({ title: "Error", description: data.message || "Failed to create promo code", variant: "destructive" })
        }
      }
    } catch (error) {
      console.error("Error saving promo code:", error)
      toast({ title: "Error", description: "Something went wrong", variant: "destructive" })
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
      validFrom: new Date(promoCode.validFrom).toISOString().slice(0, 16),
      validUntil: new Date(promoCode.validUntil).toISOString().slice(0, 16),
      usageLimit: promoCode.usageLimit?.toString() || "",
      isActive: promoCode.isActive,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this promo code?")) return

    try {
      const res = await fetch(`/api/promo-codes?id=${id}`, { method: "DELETE" })
      const data = await res.json()

      if (data.ok) {
        toast({ title: "Success", description: "Promo code deleted successfully" })
        loadPromoCodes()
      } else {
        toast({ title: "Error", description: data.message || "Failed to delete promo code", variant: "destructive" })
      }
    } catch (error) {
      console.error("Error deleting promo code:", error)
      toast({ title: "Error", description: "Something went wrong", variant: "destructive" })
    }
  }

  const resetForm = () => {
    setFormData({
      code: "",
      description: "",
      discountType: "percentage",
      discountValue: 0,
      minAmount: "",
      maxDiscount: "",
      validFrom: "",
      validUntil: "",
      usageLimit: "",
      isActive: true,
    })
    setEditingPromoCode(null)
  }

  if (!currentUser || !isAdmin) return null

  if (loading) {
    return (
      <section className="mx-auto max-w-5xl px-4 pt-32 pb-8">
        <p className="text-muted-foreground">Loading promo codes...</p>
      </section>
    )
  }

  return (
    <section className="mx-auto max-w-5xl px-4 pt-32 pb-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Promo Codes & Vouchers</h1>
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open)
          if (!open) resetForm()
        }}>
          <DialogTrigger asChild>
            <Button onClick={() => resetForm()}>Create New Promo Code</Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingPromoCode ? "Edit Promo Code" : "Create New Promo Code"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="code">Promo Code *</Label>
                <Input
                  id="code"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                  placeholder="e.g., SAVE20"
                  required
                  disabled={!!editingPromoCode}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Input
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="e.g., Save 20% on all purchases"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="discountType">Discount Type *</Label>
                  <Select
                    value={formData.discountType}
                    onValueChange={(value: "percentage" | "fixed") =>
                      setFormData({ ...formData, discountType: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="percentage">Percentage</SelectItem>
                      <SelectItem value="fixed">Fixed Amount</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="discountValue">
                    Discount Value * ({formData.discountType === "percentage" ? "%" : "₹"})
                  </Label>
                  <Input
                    id="discountValue"
                    type="number"
                    min="0"
                    max={formData.discountType === "percentage" ? "100" : undefined}
                    step="0.01"
                    value={formData.discountValue}
                    onChange={(e) => setFormData({ ...formData, discountValue: parseFloat(e.target.value) || 0 })}
                    required
                  />
                </div>
              </div>

              {formData.discountType === "percentage" && (
                <div className="space-y-2">
                  <Label htmlFor="maxDiscount">Maximum Discount (₹) - Optional</Label>
                  <Input
                    id="maxDiscount"
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.maxDiscount}
                    onChange={(e) => setFormData({ ...formData, maxDiscount: e.target.value })}
                    placeholder="e.g., 500"
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="minAmount">Minimum Purchase Amount (₹) - Optional</Label>
                <Input
                  id="minAmount"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.minAmount}
                  onChange={(e) => setFormData({ ...formData, minAmount: e.target.value })}
                  placeholder="e.g., 1000"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="validFrom">Valid From *</Label>
                  <Input
                    id="validFrom"
                    type="datetime-local"
                    value={formData.validFrom}
                    onChange={(e) => setFormData({ ...formData, validFrom: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="validUntil">Valid Until *</Label>
                  <Input
                    id="validUntil"
                    type="datetime-local"
                    value={formData.validUntil}
                    onChange={(e) => setFormData({ ...formData, validUntil: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="usageLimit">Usage Limit - Optional</Label>
                <Input
                  id="usageLimit"
                  type="number"
                  min="1"
                  value={formData.usageLimit}
                  onChange={(e) => setFormData({ ...formData, usageLimit: e.target.value })}
                  placeholder="e.g., 100 (leave empty for unlimited)"
                />
              </div>

              {editingPromoCode && (
                <div className="space-y-2">
                  <Label htmlFor="isActive">Active</Label>
                  <Select
                    value={formData.isActive ? "true" : "false"}
                    onValueChange={(value) => setFormData({ ...formData, isActive: value === "true" })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="true">Active</SelectItem>
                      <SelectItem value="false">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">{editingPromoCode ? "Update" : "Create"}</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {promoCodes.map((promoCode) => (
          <Card key={promoCode.id} className={!promoCode.isActive ? "opacity-60" : ""}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{promoCode.code}</CardTitle>
                {!promoCode.isActive && <span className="text-xs bg-gray-200 px-2 py-1 rounded">Inactive</span>}
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm text-gray-600">{promoCode.description}</p>
              <div className="text-sm">
                <p>
                  <strong>Discount:</strong>{" "}
                  {promoCode.discountType === "percentage"
                    ? `${promoCode.discountValue}%`
                    : `₹${promoCode.discountValue}`}
                </p>
                {promoCode.minAmount && (
                  <p>
                    <strong>Min Amount:</strong> ₹{promoCode.minAmount}
                  </p>
                )}
                {promoCode.usageLimit && (
                  <p>
                    <strong>Usage:</strong> {promoCode.usedCount}/{promoCode.usageLimit}
                  </p>
                )}
                <p className="text-xs text-gray-500">
                  Valid: {new Date(promoCode.validFrom).toLocaleDateString()} -{" "}
                  {new Date(promoCode.validUntil).toLocaleDateString()}
                </p>
              </div>
              <div className="flex gap-2 pt-2">
                <Button size="sm" variant="outline" onClick={() => handleEdit(promoCode)}>
                  Edit
                </Button>
                <Button size="sm" variant="destructive" onClick={() => handleDelete(promoCode.id)}>
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {promoCodes.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <p>No promo codes created yet.</p>
          <p className="text-sm mt-2">Click "Create New Promo Code" to get started.</p>
        </div>
      )}
    </section>
  )
}

