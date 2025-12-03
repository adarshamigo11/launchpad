"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

export default function TestDatabasePage() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const fetchData = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/e-summit/payments/test-db")
      const result = await res.json()
      setData(result)
      console.log("Database test result:", result)
    } catch (error) {
      console.error("Error fetching data:", error)
      setData({ error: error instanceof Error ? error.message : "Unknown error" })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-[#144449] mb-8">E-Summit Database Test</h1>
        
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Database Content</h2>
            <Button 
              onClick={fetchData} 
              disabled={loading}
              className="bg-[#144449] hover:bg-[#144449]/90 text-white"
            >
              {loading ? "Refreshing..." : "Refresh Data"}
            </Button>
          </div>
          
          {data ? (
            <div className="overflow-x-auto">
              <pre className="bg-gray-100 p-4 rounded text-sm max-h-96 overflow-y-auto">
                {JSON.stringify(data, null, 2)}
              </pre>
            </div>
          ) : (
            <p className="text-gray-500">Loading data...</p>
          )}
        </div>
      </div>
    </div>
  )
}