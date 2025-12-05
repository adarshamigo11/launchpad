import { NextRequest, NextResponse } from "next/server"
import { getDb } from "@/lib/mongodb"

// Define the pass types and their default prices
const DEFAULT_PASS_PRICES = {
  "venture-vault": 2999,
  "premium-pass": 1199,
  "roundtable": 1999,
  "booth": 6000,
  "access-pass": 499,
  "general": 1199,
  "team": 2999,
  "premium": 1199,
  "shark-tank": 3999,
  "expo": 8000,
  "expo-standard": 6000,
  "expo-premium": 8000
}

export async function GET(req: NextRequest) {
  try {
    const db = await getDb()
    const passPricesCollection = db.collection("eSummitPassPrices")
    
    // Get all pass prices from database
    const prices = await passPricesCollection.find({}).toArray()
    
    // Convert to a map for easier access
    const priceMap: Record<string, number> = {}
    prices.forEach((price: any) => {
      priceMap[price.passType] = price.amount
    })
    
    // Fill in default prices for any missing pass types
    const result: Record<string, number> = { ...DEFAULT_PASS_PRICES }
    Object.keys(priceMap).forEach(key => {
      result[key] = priceMap[key]
    })
    
    return NextResponse.json({ ok: true, prices: result })
  } catch (error) {
    console.error("[E-Summit] Error fetching pass prices:", error)
    return NextResponse.json(
      { ok: false, message: "Failed to fetch pass prices" }, 
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    const { passType, amount } = await req.json()
    
    // Validate input
    if (!passType || amount === undefined || amount < 0) {
      return NextResponse.json(
        { ok: false, message: "Invalid pass type or amount" }, 
        { status: 400 }
      )
    }
    
    // Validate that passType is one of our known types
    const validPassTypes = [
      "venture-vault", "premium-pass", "roundtable", "booth", "access-pass",
      "general", "team", "premium", "shark-tank", "expo", "expo-standard", "expo-premium"
    ];
    
    if (!validPassTypes.includes(passType)) {
      return NextResponse.json(
        { ok: false, message: "Invalid pass type" }, 
        { status: 400 }
      )
    }
    
    const db = await getDb()
    const passPricesCollection = db.collection("eSummitPassPrices")
    
    // Update or insert the pass price
    await passPricesCollection.updateOne(
      { passType },
      { 
        $set: { 
          passType, 
          amount, 
          updatedAt: new Date() 
        } 
      },
      { upsert: true }
    )
    
    return NextResponse.json({ ok: true, message: "Pass price updated successfully" })
  } catch (error) {
    console.error("[E-Summit] Error updating pass price:", error)
    return NextResponse.json(
      { ok: false, message: "Failed to update pass price" }, 
      { status: 500 }
    )
  }
}