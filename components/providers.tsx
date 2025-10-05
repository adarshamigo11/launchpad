"use client"
import { AuthProvider } from "@/components/state/auth-context"
import { ThemeProvider } from "@/components/theme-provider"
import type React from "react"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
    >
      <AuthProvider>{children}</AuthProvider>
    </ThemeProvider>
  )
}
