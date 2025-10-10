"use client"
import Image from "next/image"
import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { useApp } from "@/components/state/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ProfilePage() {
  const { currentUser, refreshUser } = useApp()
  const router = useRouter()
  const [isUploading, setIsUploading] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!currentUser) router.push("/login")
    if (currentUser?.email === "admin@admin.com") router.push("/admin/tasks")
  }, [currentUser, router])

  if (!currentUser || currentUser.email === "admin@admin.com") return null


  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file')
        return
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB')
        return
      }

      // Create preview URL
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
    }
  }

  const handleUpload = async () => {
    const file = fileInputRef.current?.files?.[0]
    if (!file) return

    setIsUploading(true)
    try {
      const formData = new FormData()
      formData.append('profilePhoto', file)
      formData.append('userEmail', currentUser.email)

      const response = await fetch('/api/users/profile-photo', {
        method: 'POST',
        body: formData,
      })

      const result = await response.json()
      
      if (result.ok) {
        // Refresh user data to get updated profile photo
        await refreshUser()
        setPreviewUrl(null)
        if (fileInputRef.current) {
          fileInputRef.current.value = ''
        }
        alert('Profile photo updated successfully!')
      } else {
        alert(result.message || 'Failed to update profile photo')
      }
    } catch (error) {
      console.error('Error uploading photo:', error)
      alert('Failed to update profile photo. Please try again.')
    } finally {
      setIsUploading(false)
    }
  }

  const handleCancel = () => {
    setPreviewUrl(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <section className="mx-auto max-w-xl px-4 pt-32 pb-12 grid gap-6">
      {/* Profile Header */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <Image
            src={previewUrl || currentUser.profilePhoto || "/placeholder-user.jpg"}
            alt="Profile photo"
            width={80}
            height={80}
            className="rounded-full"
          />
          <div className="absolute inset-0 rounded-full bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
            <span className="text-white text-xs font-medium">Change</span>
          </div>
        </div>
        <div>
          <h1 className="text-2xl font-semibold">{currentUser.name}</h1>
          <p className="text-muted-foreground">{currentUser.email}</p>
          <p className="text-sm font-medium text-primary bg-primary/10 px-2 py-1 rounded-md inline-block mt-1">
            {currentUser.uniqueId}
          </p>
        </div>
      </div>

      {/* Profile Photo Update Card */}
      <Card>
        <CardHeader>
          <CardTitle>Update Profile Photo</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
            <Button
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              className="w-full"
            >
              Choose Photo
            </Button>
            <p className="text-xs text-muted-foreground mt-2">
              Supported formats: JPG, PNG, GIF. Max size: 5MB
            </p>
          </div>

          {previewUrl && (
            <div className="space-y-3">
              <div className="text-sm font-medium">Preview:</div>
              <div className="flex items-center gap-4">
                <Image
                  src={previewUrl}
                  alt="Preview"
                  width={60}
                  height={60}
                  className="rounded-full"
                />
                <div className="flex gap-2">
                  <Button
                    onClick={handleUpload}
                    disabled={isUploading}
                    size="sm"
                  >
                    {isUploading ? "Uploading..." : "Upload"}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleCancel}
                    size="sm"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Points Card */}
      <Card>
        <CardContent className="p-4">
          <p className="text-sm">
            Total Points: <span className="text-primary font-medium">{currentUser.points}</span>
          </p>
        </CardContent>
      </Card>
    </section>
  )
}
