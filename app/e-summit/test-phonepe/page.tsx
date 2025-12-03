"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

export default function TestPhonePePage() {
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const testPhonePe = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/e-summit/payments/initiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Test User",
          email: "test@example.com",
          phone: "9876543210",
          senderName: "Test Sender",
          passType: "general",
          passName: "General Pass",
          amount: 100, // ₹100
        }),
      })

      const data = await response.json()
      setResult(data)
      console.log("Test result:", data)
    } catch (error) {
      console.error("Test error:", error)
      setResult({ error: error instanceof Error ? error.message : "Unknown error" })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-[#144449] mb-8">PhonePe Integration Test</h1>
        
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Test PhonePe Payment</h2>
          <p className="text-gray-600 mb-4">
            This test will attempt to initiate a ₹100 payment through PhonePe to verify the integration.
          </p>
          
          <Button 
            onClick={testPhonePe} 
            disabled={loading}
            className="bg-[#144449] hover:bg-[#144449]/90 text-white font-bold py-2 px-4 rounded"
          >
            {loading ? "Testing..." : "Test PhonePe Integration"}
          </Button>
        </div>
        
        {result && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Test Result</h2>
            
            <div className="overflow-x-auto">
              <pre className="bg-gray-100 p-4 rounded text-sm">
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
            
            {result.ok && result.paymentUrl && (
              <div className="mt-4">
                <p className="text-green-600 font-medium mb-2">Payment initiated successfully!</p>
                <Button 
                  onClick={() => window.open(result.paymentUrl, "_blank")}
                  className="bg-[#BF9B30] hover:bg-[#BF9B30]/90 text-black font-bold py-2 px-4 rounded"
                >
                  Open Payment Page
                </Button>
              </div>
            )}
            
            {result.error && (
              <div className="mt-4">
                <p className="text-red-600 font-medium">Error occurred:</p>
                <p className="text-red-500">{result.error}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}