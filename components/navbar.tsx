"use client"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useApp } from "@/components/state/auth-context"
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
      <div className="mx-auto max-w-6xl px-6 pt-6">
        <div className="bg-black/20 backdrop-blur-md rounded-2xl border border-white/20 shadow-lg">
          <div className="h-16 flex items-center justify-between px-6">
            <Link href="/" className="flex items-center">
              <img 
                src="/logo.png" 
                alt="Launchpad Logo" 
                className="h-16 w-auto"
              />
            </Link>
            
            <nav className="flex items-center gap-6">
              {leftLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-white text-sm font-medium transition-colors hover:text-[#FFC107] relative group",
                    pathname === link.href && "text-[#FFC107]"
                  )}
                >
                  {link.label}
                  {link.label === "About" || link.label === "Challenges" ? (
                    <span className="ml-1 text-xs">▼</span>
                  ) : null}
                </Link>
              ))}
              
              {currentUser ? (
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-black bg-transparent rounded-lg px-4 py-2 font-medium"
                  onClick={() => {
                    logout()
                    router.push("/")
                  }}
                >
                  Logout
                </Button>
              ) : (
                <Link href="/login">
                  <Button 
                    variant="outline" 
                    className="border-white text-white hover:bg-white hover:text-black bg-transparent rounded-lg px-6 py-2 font-medium uppercase tracking-wide"
                  >
                    Login
                  </Button>
                </Link>
              )}
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}
