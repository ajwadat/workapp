import "./globals.css"
import { Inter } from "next/font/google"
import { AppProvider } from "./context/AppContext"
import { AuthProvider } from "./context/AuthContext"
import type React from "react" // Added import for React

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "מערכת ניהול עובדים",
  description: "מערכת לניהול עובדים ופגישות",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="he" dir="rtl">
      <body className={inter.className}>
        <AuthProvider>
          <AppProvider>{children}</AppProvider>
        </AuthProvider>
      </body>
    </html>
  )
}

