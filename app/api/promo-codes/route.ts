import { NextRequest, NextResponse } from "next/server"
import { getDb } from "@/lib/mongodb"
import { ObjectId } from "mongodb"
import type { PromoCodeDoc } from "@/lib/models"

// GET - List all promo codes (admin only)
export async function GET(req: NextRequest) {
  try {
    const db = await getDb()
    const promoCodesCollection = db.collection<PromoCodeDoc>("promoCodes")

    const promoCodes = await promoCodesCollection.find({}).sort({ createdAt: -1 }).toArray()

    const formattedCodes = promoCodes.map((code) => ({
      id: code._id?.toString(),
      code: code.code,
      description: code.description,
      discountType: code.discountType,
      discountValue: code.discountValue,
      minAmount: code.minAmount,
      maxDiscount: code.maxDiscount,
      validFrom: code.validFrom.getTime(),
      validUntil: code.validUntil.getTime(),
      usageLimit: code.usageLimit,
      usedCount: code.usedCount,
      isActive: code.isActive,
    }))

    return NextResponse.json({ ok: true, promoCodes: formattedCodes })
  } catch (error) {
    console.error("[Launchpad] Get promo codes error:", error)
    return NextResponse.json({ ok: false, message: "Internal server error" }, { status: 500 })
  }
}

// POST - Create new promo code (admin only)
export async function POST(req: NextRequest) {
  try {
    const {
      code,
      description,
      discountType,
      discountValue,
      minAmount,
      maxDiscount,
      validFrom,
      validUntil,
      usageLimit,
    } = await req.json()

    if (!code || !description || !discountType || discountValue === undefined) {
      return NextResponse.json({ ok: false, message: "Missing required fields" }, { status: 400 })
    }

    const db = await getDb()
    const promoCodesCollection = db.collection<PromoCodeDoc>("promoCodes")

    // Check if code already exists
    const existing = await promoCodesCollection.findOne({
      code: { $regex: new RegExp(`^${code}$`, "i") },
    })

    if (existing) {
      return NextResponse.json({ ok: false, message: "Promo code already exists" }, { status: 400 })
    }

    const promoCodeDoc: PromoCodeDoc = {
      code: code.toUpperCase(),
      description,
      discountType,
      discountValue,
      minAmount: minAmount || undefined,
      maxDiscount: maxDiscount || undefined,
      validFrom: new Date(validFrom),
      validUntil: new Date(validUntil),
      usageLimit: usageLimit || undefined,
      usedCount: 0,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await promoCodesCollection.insertOne(promoCodeDoc)

    return NextResponse.json({
      ok: true,
      promoCode: {
        id: result.insertedId.toString(),
        ...promoCodeDoc,
      },
    })
  } catch (error) {
    console.error("[Launchpad] Create promo code error:", error)
    return NextResponse.json({ ok: false, message: "Internal server error" }, { status: 500 })
  }
}

// PUT - Update promo code (admin only)
export async function PUT(req: NextRequest) {
  try {
    const {
      id,
      code,
      description,
      discountType,
      discountValue,
      minAmount,
      maxDiscount,
      validFrom,
      validUntil,
      usageLimit,
      isActive,
    } = await req.json()

    if (!id) {
      return NextResponse.json({ ok: false, message: "Promo code ID is required" }, { status: 400 })
    }

    const db = await getDb()
    const promoCodesCollection = db.collection<PromoCodeDoc>("promoCodes")

    const updateData: any = {
      updatedAt: new Date(),
    }

    if (description !== undefined) updateData.description = description
    if (discountType !== undefined) updateData.discountType = discountType
    if (discountValue !== undefined) updateData.discountValue = discountValue
    if (minAmount !== undefined) updateData.minAmount = minAmount || undefined
    if (maxDiscount !== undefined) updateData.maxDiscount = maxDiscount || undefined
    if (validFrom !== undefined) updateData.validFrom = new Date(validFrom)
    if (validUntil !== undefined) updateData.validUntil = new Date(validUntil)
    if (usageLimit !== undefined) updateData.usageLimit = usageLimit || undefined
    if (isActive !== undefined) updateData.isActive = isActive

    // If code is being updated, check for duplicates
    if (code !== undefined) {
      const existing = await promoCodesCollection.findOne({
        code: { $regex: new RegExp(`^${code}$`, "i") },
        _id: { $ne: new ObjectId(id) },
      })

      if (existing) {
        return NextResponse.json({ ok: false, message: "Promo code already exists" }, { status: 400 })
      }

      updateData.code = code.toUpperCase()
    }

    await promoCodesCollection.updateOne({ _id: new ObjectId(id) }, { $set: updateData })

    return NextResponse.json({ ok: true, message: "Promo code updated successfully" })
  } catch (error) {
    console.error("[Launchpad] Update promo code error:", error)
    return NextResponse.json({ ok: false, message: "Internal server error" }, { status: 500 })
  }
}

// DELETE - Delete promo code (admin only)
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ ok: false, message: "Promo code ID is required" }, { status: 400 })
    }

    const db = await getDb()
    const promoCodesCollection = db.collection<PromoCodeDoc>("promoCodes")

    await promoCodesCollection.deleteOne({ _id: new ObjectId(id) })

    return NextResponse.json({ ok: true, message: "Promo code deleted successfully" })
  } catch (error) {
    console.error("[Launchpad] Delete promo code error:", error)
    return NextResponse.json({ ok: false, message: "Internal server error" }, { status: 500 })
  }
}

