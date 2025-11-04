"use client"
import { useState } from "react"
import type React from "react"

import { useRouter } from "next/navigation"
import Link from "next/link"
import { useApp } from "@/components/state/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginPage() {
  const { login, signup } = useApp()
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [tab, setTab] = useState<"login" | "signup">("login")
  const [loading, setLoading] = useState(false)

  const validatePassword = (password: string) => {
    const hasUpperCase = /[A-Z]/.test(password)
    const hasLowerCase = /[a-z]/.test(password)
    const hasNumbers = /\d/.test(password)
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)
    const isLongEnough = password.length >= 8

    return {
      isValid: hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar && isLongEnough,
      hasUpperCase,
      hasLowerCase,
      hasNumbers,
      hasSpecialChar,
      isLongEnough
    }
  }

  const onLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const res = await login(email.trim(), password)
    setLoading(false)
    if (!res.ok) {
      setError(res.message || "Login failed")
      return
    }
    if (email === "admin@admin.com") router.push("/admin/tasks")
    else router.push("/tasks")
  }

  const onSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    // Validate password
    const passwordValidation = validatePassword(password)
    if (!passwordValidation.isValid) {
      setError("Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character")
      setLoading(false)
      return
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match")
      setLoading(false)
      return
    }

    // Validate phone number
    if (!phone.trim()) {
      setError("Phone number is required")
      setLoading(false)
      return
    }

    const res = await signup(email.trim(), password, name.trim(), phone.trim())
    setLoading(false)
    if (!res.ok) {
      setError(res.message || "Signup failed")
      return
    }
    // Auto-login after signup
    const loginRes = await login(email.trim(), password)
    if (loginRes.ok) {
      router.push("/tasks")
    }
  }

  return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#144449]/3 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#BF9B30]/3 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-[#144449]/2 to-[#BF9B30]/2 rounded-full blur-3xl"></div>
          </div>
          
          <section className="mx-auto max-w-md px-4 sm:px-6 py-8 sm:py-12 w-full relative z-10">
            <div className="backdrop-blur-md bg-white/80 rounded-2xl border border-white/20 p-6 sm:p-8 shadow-2xl">
          {/* Logo/Icon */}
          <div className="text-center mb-4 sm:mb-6">
            <img 
              src="/logo.png" 
              alt="Launchpad Logo" 
              className="h-48 sm:h-56 md:h-64 w-auto mx-auto mb-1 sm:mb-2"
            />
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
              {tab === "login" ? "Sign in to Launchpad" : "Join Launchpad"}
            </h1>
            <p className="text-gray-600 text-xs sm:text-sm px-2">
              {tab === "login" 
                ? "Welcome back! Sign in to continue your entrepreneurial journey." 
                : "Start your entrepreneurial journey and build your dream business."
              }
            </p>
          </div>
          
          {/* Tab Navigation */}
          <div className="flex gap-1 mb-6 sm:mb-8 bg-gray-100 p-1 rounded-lg">
          <button
              className={`flex-1 px-3 sm:px-4 py-2 rounded-md text-xs sm:text-sm font-semibold transition-all duration-200 ${
                tab === "login" 
                  ? "bg-white text-[#144449] shadow-sm" 
                  : "text-gray-600 hover:text-[#144449]"
              }`}
              onClick={() => setTab("login")}
            >
              Sign In
            </button>
            <button
              className={`flex-1 px-3 sm:px-4 py-2 rounded-md text-xs sm:text-sm font-semibold transition-all duration-200 ${
                tab === "signup" 
                  ? "bg-white text-[#BF9B30] shadow-sm" 
                  : "text-gray-600 hover:text-[#BF9B30]"
              }`}
              onClick={() => setTab("signup")}
            >
              Sign Up
            </button>
        </div>

        {tab === "login" ? (
          <form onSubmit={onLogin} className="space-y-4 sm:space-y-6">
            <div className="space-y-3 sm:space-y-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-400">✉</span>
                </div>
                <Input
                  id="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-10 sm:h-12 bg-white !bg-white border-gray-200 focus:border-[#144449] focus:ring-[#144449] rounded-xl text-black text-sm sm:text-base"
                  required
                />
            </div>
              
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-400">🔒</span>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 h-10 sm:h-12 bg-white !bg-white border-gray-200 focus:border-[#144449] focus:ring-[#144449] rounded-xl text-black text-sm sm:text-base"
                  required
                />
              </div>
            </div>
            
            
            {error && <p className="text-xs sm:text-sm text-red-600 text-center">{error}</p>}
            
            <Button 
              type="submit" 
              className="w-full h-10 sm:h-12 bg-gradient-to-r from-[#144449] to-[#144449]/90 text-white hover:from-[#144449]/90 hover:to-[#144449]/80 font-semibold rounded-xl shadow-lg text-sm sm:text-base" 
              disabled={loading}
            >
              {loading ? "Signing in..." : "Login"}
            </Button>
            
            <div className="text-center">
              <Link 
                href="/forgot-password" 
                className="text-xs sm:text-sm text-[#144449] hover:text-[#144449]/80 font-medium"
              >
                Forgot your password?
              </Link>
            </div>
          </form>
        ) : (
          <form onSubmit={onSignup} className="space-y-4 sm:space-y-6">
            <div className="space-y-3 sm:space-y-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-400">👤</span>
                </div>
                <Input
                  id="signup-name"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10 h-10 sm:h-12 bg-white !bg-white border-gray-200 focus:border-[#BF9B30] focus:ring-[#BF9B30] rounded-xl text-black text-sm sm:text-base"
                  required
                />
            </div>
              
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-400">✉</span>
                </div>
                <Input
                  id="signup-email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-10 sm:h-12 bg-white !bg-white border-gray-200 focus:border-[#BF9B30] focus:ring-[#BF9B30] rounded-xl text-black text-sm sm:text-base"
                  required
                />
            </div>
              
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-400">📱</span>
                </div>
                <Input
                  id="signup-phone"
                  type="tel"
                  placeholder="Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="pl-10 h-10 sm:h-12 bg-white !bg-white border-gray-200 focus:border-[#BF9B30] focus:ring-[#BF9B30] rounded-xl text-black text-sm sm:text-base"
                  required
                />
            </div>
              
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-400">🔒</span>
                </div>
                <Input
                  id="signup-password"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 h-10 sm:h-12 bg-white !bg-white border-gray-200 focus:border-[#BF9B30] focus:ring-[#BF9B30] rounded-xl text-black text-sm sm:text-base"
                  required
                />
              </div>
              
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-400">🔒</span>
                </div>
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pl-10 h-10 sm:h-12 bg-white !bg-white border-gray-200 focus:border-[#BF9B30] focus:ring-[#BF9B30] rounded-xl text-black text-sm sm:text-base"
                  required
                />
              </div>
            </div>
            
                {/* Password Requirements */}
                {password && (
                  <div className="bg-gray-50 p-2 sm:p-3 rounded-lg">
                    <p className="text-xs text-gray-600 mb-2">Password requirements:</p>
                    <div className="space-y-1">
                      <div className={`flex items-center text-xs ${password.length >= 8 ? 'text-green-600' : 'text-gray-500'}`}>
                        <span className="mr-1 sm:mr-2">{password.length >= 8 ? '✓' : '○'}</span>
                        At least 8 characters
                      </div>
                      <div className={`flex items-center text-xs ${/[A-Z]/.test(password) ? 'text-green-600' : 'text-gray-500'}`}>
                        <span className="mr-1 sm:mr-2">{/[A-Z]/.test(password) ? '✓' : '○'}</span>
                        One uppercase letter
                      </div>
                      <div className={`flex items-center text-xs ${/[a-z]/.test(password) ? 'text-green-600' : 'text-gray-500'}`}>
                        <span className="mr-1 sm:mr-2">{/[a-z]/.test(password) ? '✓' : '○'}</span>
                        One lowercase letter
                      </div>
                      <div className={`flex items-center text-xs ${/\d/.test(password) ? 'text-green-600' : 'text-gray-500'}`}>
                        <span className="mr-1 sm:mr-2">{/\d/.test(password) ? '✓' : '○'}</span>
                        One number
                      </div>
                      <div className={`flex items-center text-xs ${/[!@#$%^&*(),.?":{}|<>]/.test(password) ? 'text-green-600' : 'text-gray-500'}`}>
                        <span className="mr-1 sm:mr-2">{/[!@#$%^&*(),.?":{}|<>]/.test(password) ? '✓' : '○'}</span>
                        One special character
                      </div>
                    </div>
                  </div>
                )}
            
            {error && <p className="text-xs sm:text-sm text-red-600 text-center">{error}</p>}
            
            <Button 
              type="submit" 
              className="w-full h-10 sm:h-12 bg-gradient-to-r from-[#BF9B30] to-[#BF9B30]/90 text-white hover:from-[#BF9B30]/90 hover:to-[#BF9B30]/80 font-semibold rounded-xl shadow-lg text-sm sm:text-base" 
              disabled={loading}
            >
              {loading ? "Creating account..." : "Sign Up"}
            </Button>
          </form>
        )}
      </div>
    </section>
    </div>
  )
}
