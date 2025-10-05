"use client"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useApp } from "@/components/state/auth-context"
import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@/lib/utils"

export function Navbar() {
  const { currentUser, isAdmin, logout } = useApp()
  const pathname = usePathname()
  const router = useRouter()

  const leftLinks =
    currentUser && isAdmin
      ? [
          { href: "/admin/tasks", label: "Tasks" },
          { href: "/admin/submissions", label: "Submissions" },
          { href: "/admin/messages", label: "Messages" },
        ]
      : currentUser
        ? [
            { href: "/tasks", label: "Tasks" },
            { href: "/profile", label: "Profile" },
            { href: "/leaderboard", label: "Leaderboard" },
          ]
        : [
            { href: "/", label: "Home" },
            { href: "/about", label: "About" },
            { href: "/challenges", label: "Challenges" },
            { href: "/contact", label: "Contact" },
          ]

  return (
    <header className="absolute top-0 left-0 right-0 z-30 bg-transparent">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-4 sm:pt-6">
        <div className="bg-black/20 dark:bg-black/20 backdrop-blur-md rounded-2xl border border-white/20 dark:border-white/20 shadow-lg">
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
                    "text-white dark:text-white text-base font-medium transition-colors hover:text-[#FFC107] relative group",
                    pathname === link.href && "text-[#FFC107]"
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
                className="text-white dark:text-white hover:text-white/80 hover:bg-white/10"
                onClick={() => {
                  // Simple mobile menu toggle - you can enhance this with a proper mobile menu
                  const mobileMenu = document.getElementById('mobile-menu')
                  if (mobileMenu) {
                    mobileMenu.classList.toggle('hidden')
                  }
                }}
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </Button>
            </div>
            
            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex items-center gap-4">
              {currentUser && <ThemeToggle />}
              {currentUser ? (
                <div className="flex items-center gap-3">
                  <span className="text-white dark:text-white text-sm font-medium bg-white/20 dark:bg-white/20 px-3 py-1 rounded-lg">
                    {currentUser.uniqueId}
                  </span>
                  <Button
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-black bg-transparent rounded-lg px-4 sm:px-6 py-2 sm:py-3 font-medium text-base"
                    onClick={() => {
                      logout()
                      router.push("/")
                    }}
                  >
                    Logout
                  </Button>
                </div>
              ) : (
                <Link href="/login">
                  <Button 
                    variant="outline" 
                    className="border-white text-white hover:bg-white hover:text-black bg-transparent rounded-lg px-6 sm:px-8 py-2 sm:py-3 font-medium uppercase tracking-wide text-base"
                  >
                    Login
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
