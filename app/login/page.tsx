"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../lib/firebase"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    if (!isClient) {
      setError("Client-side rendering is not ready yet.")
      return
    }
    try {
      if (!auth) {
        throw new Error("Firebase auth is not initialized")
      }
      await signInWithEmailAndPassword(auth, email, password)
      router.push("/")
    } catch (error) {
      console.error("Login error:", error)
      setError("Failed to log in. Please check your credentials and try again.")
    }
  }

  if (!isClient) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">התחברות</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Input
                type="email"
                placeholder="אימייל"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <Input
                type="password"
                placeholder="סיסמה"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button type="submit" className="w-full">
              התחבר
            </Button>
          </form>
          <div className="mt-4 text-center">
            <Link href="/register" className="text-blue-500 hover:underline">
              אין לך חשבון? הירשם כאן
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

