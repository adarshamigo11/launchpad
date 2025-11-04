"use client"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useApp } from "@/components/state/auth-context"
import { ProfileDropdown } from "@/components/profile-dropdown"
import { cn } from "@/lib/utils"

export function Navbar() {
  const { currentUser, isAdmin, logout } = useApp()
  const pathname = usePathname()
  const router = useRouter()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const leftLinks =
    currentUser && isAdmin
      ? [
          { href: "/admin/tasks", label: "Tasks" },
          { href: "/admin/categories", label: "Categories" },
          { href: "/admin/submissions", label: "Submissions" },
          { href: "/admin/messages", label: "Messages" },
          { href: "/leaderboard", label: "Leaderboard" },
        ]
      : currentUser
        ? [
            { href: "/", label: "Home" },
            { href: "/about", label: "About" },
            { href: "/tasks", label: "Challenges" },
            { href: "/resources", label: "Resources" },
            { href: "/leaderboard", label: "Leaderboard" },
            { href: "/contact", label: "Contact" },
          ]
        : [
            { href: "/", label: "Home" },
            { href: "/about", label: "About" },
            { href: "/contact", label: "Contact" },
          ]

  return (
    <header className="absolute top-0 left-0 right-0 z-30 bg-transparent">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-4 sm:pt-6">
        <div className="bg-white/90 dark:bg-black/20 backdrop-blur-md rounded-2xl border border-black/20 dark:border-white/20 shadow-lg">
          <div className="h-16 sm:h-20 flex items-center justify-between px-6 sm:px-8">
            <Link href="/" className="flex items-center">
              <img 
                src="/logo.png" 
                alt="Launchpad Logo" 
                className="h-12 sm:h-16 md:h-20 w-auto"
              />
            </Link>
            
            <nav className="hidden md:flex items-center gap-6 lg:gap-8">
              {leftLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-black dark:text-white text-base font-medium transition-colors hover:text-[#BF9B30] relative group",
                    pathname === link.href && "text-[#BF9B30]"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            
            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                className="text-black dark:text-white hover:text-black/80 dark:hover:text-white/80 hover:bg-black/10 dark:hover:bg-white/10"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </Button>
            </div>
            
            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex items-center gap-4">
              {currentUser ? (
                <ProfileDropdown />
              ) : (
                <Link href="/login">
                  <Button 
                    variant="outline" 
                    className="border-black dark:border-white text-black dark:text-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black bg-transparent rounded-lg px-6 sm:px-8 py-2 sm:py-3 font-medium uppercase tracking-wide text-base"
                  >
                    Login
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-2 bg-white/90 dark:bg-black/20 backdrop-blur-md rounded-2xl border border-black/20 dark:border-white/20 shadow-lg">
            <div className="px-6 py-4 space-y-4">
              {/* Navigation Links */}
              <nav className="space-y-3">
                {leftLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "block text-black dark:text-white text-base font-medium transition-colors hover:text-[#BF9B30] py-2",
                      pathname === link.href && "text-[#BF9B30]"
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              
              {/* Mobile Auth Section */}
              <div className="pt-4 border-t border-black/20 dark:border-white/20">
                {currentUser && (
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-black dark:text-white text-sm font-medium bg-black/10 dark:bg-white/20 px-3 py-1 rounded-lg">
                      {currentUser.uniqueId}
                    </span>
                  </div>
                )}
                
                {currentUser ? (
                  <ProfileDropdown isMobile={true} />
                ) : (
                  <Link href="/login" className="block" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button 
                      variant="outline" 
                      className="w-full border-black dark:border-white text-black dark:text-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black bg-transparent rounded-lg py-2"
                    >
                      Login
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
