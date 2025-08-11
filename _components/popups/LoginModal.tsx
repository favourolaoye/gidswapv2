"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/store/Authstore"
import { loginUser } from "@/lib/api"
import { setCookie } from "@/lib/cookies"

import { Button } from "@/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import ResuablePop from "./resuablepop"

export function LoginModal() {
  const router = useRouter()
  const { isLoginModalOpen, setLoginModalOpen, setAuthStatus, setToken } = useAuthStore()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    try {
      const response = await loginUser({ email, password })
      const { token } = response

      // Store token (3-day expiry)
      setCookie("token", token, { expires: 3 })

      // Ensure regstatus is true on successful login
      setCookie("regstatus", "true", { expires: 365 * 10 }) // Long expiry

      setToken(token)
      setAuthStatus(true)
      setLoginModalOpen(false)
      router.push("/dashboard")
    } catch (err) {
      setError("Login failed. Please check your credentials.")
      console.error(err)
    }
  }

  return (
    <ResuablePop open={isLoginModalOpen} onClose={() => setLoginModalOpen(false)}>
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-center">Sign In</h2>
        <p className="text-sm text-muted-foreground text-center">Enter your credentials to access the dashboard.</p>
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button type="submit" className="w-full">
            Sign In
          </Button>
        </form>
      </div>
    </ResuablePop>
  )
}
