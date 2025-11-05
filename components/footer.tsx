"use client"
import Link from "next/link"
import { useApp } from "@/components/state/auth-context"

export function Footer() {
  const { currentUser, isAdmin } = useApp()

  // All public quicklinks
  const publicLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/tasks", label: "Challenges" },
    { href: "/resources", label: "Resources" },
    { href: "/leaderboard", label: "Leaderboard" },
    { href: "/contact", label: "Contact" },
  ]

  // Admin quicklinks
  const adminLinks = [
    { href: "/admin/tasks", label: "Admin Tasks" },
    { href: "/admin/categories", label: "Categories" },
    { href: "/admin/submissions", label: "Submissions" },
    { href: "/admin/messages", label: "Messages" },
  ]

  // Payment quicklinks
  const paymentLinks = [
    { href: "/terms-and-conditions", label: "Terms and Conditions" },
    { href: "/privacy-policy", label: "Privacy Policy" },
    { href: "/refund-policy", label: "Refund Policy" },
  ]

  // Combine all links for display
  const allLinks = isAdmin ? [...publicLinks, ...adminLinks] : publicLinks

  return (
    <footer className="bg-white dark:bg-black border-t border-black/20 dark:border-white/20 mt-auto">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12 sm:py-16">
        <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-16 lg:gap-20 mb-10">
          {/* Brand Section */}
          <div className="flex flex-col items-center text-center">
            <img 
              src="/logo.png" 
              alt="Launchpad Logo" 
              className="h-48 w-auto mb-1"
            />
            <h3 className="text-black dark:text-white font-bold text-xl mb-1">Launchpad</h3>
            <p className="text-black/70 dark:text-white/70 text-sm max-w-xs">
              Aim for Innovation, Win with Execution
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col items-center">
            <h3 className="text-black dark:text-white font-bold text-lg mb-4 self-start">Quick Links</h3>
            <nav className="flex flex-col items-start gap-3">
              {allLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-black/70 dark:text-white/70 hover:text-[#BF9B30] dark:hover:text-[#BF9B30] transition-colors text-sm font-medium whitespace-nowrap"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Payments Links */}
          <div className="flex flex-col items-center">
            <h3 className="text-black dark:text-white font-bold text-lg mb-4 self-start">Payments</h3>
            <nav className="flex flex-col items-start gap-3">
              {paymentLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-black/70 dark:text-white/70 hover:text-[#BF9B30] dark:hover:text-[#BF9B30] transition-colors text-sm font-medium whitespace-nowrap"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-black/20 dark:border-white/20 pt-8">
          <p className="text-center text-black/60 dark:text-white/60 text-sm">
            © {new Date().getFullYear()} Launchpad. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

