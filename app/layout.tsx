import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import type { Metadata } from "next"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "Free Unblocked HTML5 Games | Play Fun Games Online",
    template: "%s | Free Unblocked HTML5 Games",
  },
  description:
    "Discover and play the best free, unblocked HTML5 games. Enjoy fun games directly in your browser with no downloads required.",
  keywords: "free games, unblocked games, fun games, html5 games, online games, browser games",
  creator: "FreeGamesHub",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://yourdomain.com",
    siteName: "FreeGamesHub",
    title: "Free Unblocked HTML5 Games | Play Fun Games Online",
    description:
      "Discover and play the best free, unblocked HTML5 games. Enjoy fun games directly in your browser with no downloads required.",
    images: [
      {
        url: "https://yourdomain.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "FreeGamesHub - Free Unblocked HTML5 Games",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Unblocked HTML5 Games | Play Fun Games Online",
    description:
      "Discover and play the best free, unblocked HTML5 games. Enjoy fun games directly in your browser with no downloads required.",
    images: ["https://yourdomain.com/twitter-image.jpg"],
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light">
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}


import './globals.css'