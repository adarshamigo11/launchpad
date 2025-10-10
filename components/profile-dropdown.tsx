"use client"
import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { useApp } from "@/components/state/auth-context"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ProfileDropdownProps {
  className?: string
  isMobile?: boolean
}

export function ProfileDropdown({ className, isMobile = false }: ProfileDropdownProps) {
  const { currentUser, logout } = useApp()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleLogout = () => {
    logout()
    router.push("/")
    setIsOpen(false)
  }

  const handleProfileClick = () => {
    router.push("/profile")
    setIsOpen(false)
  }

  if (!currentUser) return null

  // Debug: Log current user data
  console.log('ProfileDropdown - Current user profile photo:', currentUser.profilePhoto)

  return (
    <div className={cn("relative", className)} ref={dropdownRef}>
      {/* Profile Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-3 text-black dark:text-white hover:text-black/80 dark:hover:text-white/80 transition-colors",
          isMobile ? "w-full justify-start" : ""
        )}
      >
        <div className="flex items-center gap-3">
          {/* User Avatar */}
          <div className="w-8 h-8 rounded-full overflow-hidden bg-black/10 dark:bg-white/20 flex items-center justify-center">
            {currentUser.profilePhoto && currentUser.profilePhoto !== "/placeholder-user.jpg" ? (
              <Image
                src={currentUser.profilePhoto}
                alt={`${currentUser.name}'s profile`}
                width={32}
                height={32}
                className="w-full h-full object-cover"
                unoptimized
              />
            ) : (
              <span className="text-sm font-medium text-black dark:text-white">
                {currentUser.name.charAt(0).toUpperCase()}
              </span>
            )}
          </div>
          
          {/* User Info */}
          <div className="text-left">
            <div className="text-sm font-medium">{currentUser.name}</div>
            <div className="text-xs text-black/70 dark:text-white/70">{currentUser.email}</div>
          </div>
          
          {/* Dropdown Arrow */}
          <svg 
            className={cn(
              "w-4 h-4 transition-transform",
              isOpen ? "rotate-180" : ""
            )} 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className={cn(
          "absolute right-0 mt-2 w-72 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 z-50",
          isMobile ? "relative mt-0 w-full" : ""
        )}>
          {/* Header */}
          <div className="px-4 py-4 border-b border-gray-200 dark:border-gray-700">
            <div className="font-semibold text-gray-900 dark:text-white text-base">{currentUser.name}</div>
            <div className="text-sm text-gray-500 dark:text-gray-300 mt-1">{currentUser.email}</div>
            <div className="text-xs text-primary dark:text-primary font-medium mt-2 bg-primary/10 dark:bg-primary/20 px-2 py-1 rounded-md inline-block">
              ID: {currentUser.uniqueId}
            </div>
          </div>
          
          {/* Menu Items */}
          <div className="py-2">
            <button
              onClick={handleProfileClick}
              className="w-full px-4 py-3 text-left text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-3 transition-colors"
            >
              <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Profile
            </button>
            
            <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
            
            <button
              onClick={handleLogout}
              className="w-full px-4 py-3 text-left text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-3 transition-colors"
            >
              <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
