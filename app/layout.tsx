import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { AuthProvider } from "@/components/state/auth-context"
import { ThemeProvider } from "@/components/theme-provider"
import { Navbar } from "@/components/navbar"
import { Toaster } from "@/components/ui/toaster"
import AppWrapper from "@/components/app-wrapper"
import AnimatedElements from "@/components/animated-elements"
import { Suspense } from "react"

export const metadata: Metadata = {
  metadataBase: new URL('https://launchpad-platform.vercel.app'),
  title: "Launchpad - Aim for Innovation, Win with Execution",
  description: "A platform that supports aspiring solopreneurs, youth, and startups in building their own agencies and brands. Through mentorship, ready-to-sell services, and healthy competition, transform your ambition into sustainable businesses.",
  keywords: "entrepreneurship, startup, mentorship, business, competition, solopreneur, agency, brand building",
  authors: [{ name: "Launchpad Team" }],
  openGraph: {
    title: "Launchpad - Aim for Innovation, Win with Execution",
    description: "A platform that supports aspiring solopreneurs, youth, and startups in building their own agencies and brands.",
    type: "website",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Launchpad Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Launchpad - Aim for Innovation, Win with Execution",
    description: "A platform that supports aspiring solopreneurs, youth, and startups in building their own agencies and brands.",
    images: ["/logo.png"],
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          forcedTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <AuthProvider>
            <AppWrapper>
              <Suspense fallback={<div>Loading...</div>}>
                <Navbar />
                <main className="min-h-[calc(100dvh-64px)] relative">
                  {children}
                  <AnimatedElements />
                </main>
              </Suspense>
            </AppWrapper>
          </AuthProvider>
        </ThemeProvider>
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}
