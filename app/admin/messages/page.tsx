"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/components/state/auth-context"
import { useRouter } from "next/navigation"
import type { Message } from "@/lib/models"

export default function AdminMessagesPage() {
  const { currentUser, isAdmin } = useAuth()
  const router = useRouter()
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<"all" | "unread" | "read" | "replied">("all")

  useEffect(() => {
    if (!currentUser || !isAdmin) {
      router.push("/login")
      return
    }
    fetchMessages()
  }, [currentUser, isAdmin, router])

  const fetchMessages = async () => {
    try {
      const response = await fetch("/api/messages")
      const result = await response.json()
      
      if (result.ok) {
        setMessages(result.messages)
      } else {
        console.error("Failed to fetch messages:", result.message)
      }
    } catch (error) {
      console.error("Error fetching messages:", error)
    } finally {
      setLoading(false)
    }
  }

  const updateMessageStatus = async (messageId: string, newStatus: "unread" | "read" | "replied") => {
    try {
      const response = await fetch("/api/messages", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messageId,
          status: newStatus,
        }),
      })

      const result = await response.json()
      
      if (result.ok) {
        setMessages(prev => 
          prev.map(msg => 
            msg.id === messageId ? { ...msg, status: newStatus } : msg
          )
        )
      } else {
        console.error("Failed to update message status:", result.message)
      }
    } catch (error) {
      console.error("Error updating message status:", error)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "unread":
        return <Badge className="bg-red-500 text-white">Unread</Badge>
      case "read":
        return <Badge className="bg-blue-500 text-white">Read</Badge>
      case "replied":
        return <Badge className="bg-green-500 text-white">Replied</Badge>
      default:
        return <Badge className="bg-gray-500 text-white">{status}</Badge>
    }
  }

  const filteredMessages = messages.filter(message => {
    if (filter === "all") return true
    return message.status === filter
  })

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#007BFF] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading messages...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#007BFF] mb-2">Messages Dashboard</h1>
          <p className="text-gray-600">Manage and respond to customer inquiries</p>
        </div>

        {/* Filter and Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-[#007BFF] to-[#007BFF]/80 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80">Total Messages</p>
                  <p className="text-3xl font-bold">{messages.length}</p>
                </div>
                <span className="text-4xl">📧</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80">Unread</p>
                  <p className="text-3xl font-bold">
                    {messages.filter(m => m.status === "unread").length}
                  </p>
                </div>
                <span className="text-4xl">🔴</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80">Read</p>
                  <p className="text-3xl font-bold">
                    {messages.filter(m => m.status === "read").length}
                  </p>
                </div>
                <span className="text-4xl">🔵</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80">Replied</p>
                  <p className="text-3xl font-bold">
                    {messages.filter(m => m.status === "replied").length}
                  </p>
                </div>
                <span className="text-4xl">✅</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filter Dropdown */}
        <div className="mb-6">
          <Select value={filter} onValueChange={(value: any) => setFilter(value)}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter messages" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Messages</SelectItem>
              <SelectItem value="unread">Unread</SelectItem>
              <SelectItem value="read">Read</SelectItem>
              <SelectItem value="replied">Replied</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Messages List */}
        <div className="space-y-6">
          {filteredMessages.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <div className="text-6xl mb-4">📭</div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No messages found</h3>
                <p className="text-gray-500">
                  {filter === "all" 
                    ? "No messages have been received yet." 
                    : `No ${filter} messages found.`
                  }
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredMessages.map((message) => (
              <Card key={message.id} className={`shadow-lg ${message.status === "unread" ? "border-l-4 border-l-red-500" : ""}`}>
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-[#007BFF]">{message.name}</h3>
                        {getStatusBadge(message.status)}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>📧 {message.email}</span>
                        <span>📱 {message.mobile}</span>
                        <span>🕒 {formatDate(message.createdAt)}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {message.status === "unread" && (
                        <Button
                          size="sm"
                          onClick={() => updateMessageStatus(message.id, "read")}
                          className="bg-blue-500 hover:bg-blue-600"
                        >
                          Mark as Read
                        </Button>
                      )}
                      {message.status !== "replied" && (
                        <Button
                          size="sm"
                          onClick={() => updateMessageStatus(message.id, "replied")}
                          className="bg-green-500 hover:bg-green-600"
                        >
                          Mark as Replied
                        </Button>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-700 mb-2">Message:</h4>
                    <p className="text-gray-600 whitespace-pre-wrap">{message.message}</p>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
