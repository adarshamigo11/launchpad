import { NextRequest, NextResponse } from "next/server"
import { getDb } from "@/lib/mongodb"
import type { PromoCodeDoc } from "@/lib/models"

export async function POST(req: NextRequest) {
  try {
    const { code, amount } = await req.json()

    if (!code || !amount) {
      return NextResponse.json({ ok: false, message: "Code and amount are required" }, { status: 400 })
    }

    const db = await getDb()
    const promoCodesCollection = db.collection<PromoCodeDoc>("promoCodes")

    // Find promo code (case insensitive)
    const promoCode = await promoCodesCollection.findOne({
      code: { $regex: new RegExp(`^${code}$`, "i") },
      isActive: true,
    })

    if (!promoCode) {
      return NextResponse.json({ ok: false, message: "Invalid promo code" }, { status: 404 })
    }

    // Check validity dates
    const now = new Date()
    if (now < promoCode.validFrom || now > promoCode.validUntil) {
      return NextResponse.json({ ok: false, message: "Promo code has expired" }, { status: 400 })
    }

    // Check minimum amount
    if (promoCode.minAmount && amount < promoCode.minAmount) {
      return NextResponse.json(
        { ok: false, message: `Minimum purchase amount of ₹${promoCode.minAmount} required` },
        { status: 400 }
      )
    }

    // Check usage limit
    if (promoCode.usageLimit && promoCode.usedCount >= promoCode.usageLimit) {
      return NextResponse.json({ ok: false, message: "Promo code has reached its usage limit" }, { status: 400 })
    }

    // Calculate discount
    let discount = 0
    if (promoCode.discountType === "percentage") {
      discount = (amount * promoCode.discountValue) / 100
      if (promoCode.maxDiscount) {
        discount = Math.min(discount, promoCode.maxDiscount)
      }
    } else {
      discount = promoCode.discountValue
    }

    // Ensure discount doesn't exceed amount
    discount = Math.min(discount, amount)
    const finalAmount = Math.max(0, amount - discount)

    return NextResponse.json({
      ok: true,
      promoCode: {
        id: promoCode._id?.toString(),
        code: promoCode.code,
        description: promoCode.description,
        discountType: promoCode.discountType,
        discountValue: promoCode.discountValue,
      },
      discount: Math.round(discount * 100) / 100, // Round to 2 decimal places
      finalAmount: Math.round(finalAmount * 100) / 100,
    })
  } catch (error) {
    console.error("[Launchpad] Validate promo code error:", error)
    return NextResponse.json({ ok: false, message: "Internal server error" }, { status: 500 })
  }
}

