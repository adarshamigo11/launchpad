"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TestPaymentPage() {
  const router = useRouter()
  const [testResult, setTestResult] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const testPhonePeIntegration = async () => {
    setLoading(true)
    setTestResult(null)
    
    try {
      console.log("Testing PhonePe integration...")
      
      // Test the payment initiation with minimal data
      const testData = {
        name: "Test User",
        email: "test@example.com",
        phone: "9876543210",
        senderName: "Test Sender",
        passType: "general",
        passName: "Test Pass",
        amount: 100, // ₹100
        promoCode: null
      }
      
      console.log("Sending test data:", testData)
      
      const response = await fetch("/api/e-summit/payments/initiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(testData),
      })
      
      console.log("Test response status:", response.status)
      const data = await response.json()
      console.log("Test response data:", data)
      
      if (data.ok && data.paymentUrl) {
        setTestResult(`SUCCESS: Payment URL generated - ${data.paymentUrl.substring(0, 50)}...`)
      } else {
        setTestResult(`FAILED: ${data.message || 'Unknown error'}`)
      }
    } catch (error: any) {
      console.error("Test error:", error)
      setTestResult(`ERROR: ${error.message || 'Unknown error'}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-[#144449] mb-8">PhonePe Integration Test</h1>
        
        <Card>
          <CardHeader>
            <CardTitle>Test Payment Integration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600">
              This page tests the PhonePe payment integration with minimal data to verify 
              that the payment gateway is properly configured.
            </p>
            
            <Button 
              onClick={testPhonePeIntegration} 
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#144449] to-[#BF9B30] hover:from-[#144449]/90 hover:to-[#BF9B30]/90 text-white font-bold py-6 text-lg"
            >
              {loading ? "Testing..." : "Test PhonePe Integration"}
            </Button>
            
            {testResult && (
              <div className={`p-4 rounded-lg ${testResult.startsWith('SUCCESS') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                <h3 className="font-bold mb-2">Test Result:</h3>
                <p className="whitespace-pre-wrap">{testResult}</p>
              </div>
            )}
            
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    <strong>Note:</strong> Check the browser console for detailed logs after running the test.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}