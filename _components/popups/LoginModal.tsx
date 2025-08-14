"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/store/Authstore"
import { loginUser } from "@/lib/api"
import { setCookie } from "@/lib/cookies"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import ResuablePop from "./resuablepop"

export function LoginModal() {
  const router = useRouter()
  const { isLoginModalOpen, setLoginModalOpen, setAuthStatus, setToken } = useAuthStore()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false) // ⬅️ loading state

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true) // ⬅️ start loading

    try {
      const response = await loginUser({ email, password })
      const { token } = response

      // Store token (3-day expiry)
      setCookie("token", token, { expires: 3 })

      // Ensure regstatus is true on successful login
      setCookie("regstatus", "true", { expires: 365 * 10 })

      setToken(token)
      setAuthStatus(true)
      setLoginModalOpen(false)
      router.push("/dashboard")
    } catch (err) {
      setError("Login failed. Please check your credentials.")
      console.error(err)
    } finally {
      setLoading(false) // ⬅️ stop loading regardless of success/failure
    }
  }

  return (
    <ResuablePop open={isLoginModalOpen} onClose={() => setLoginModalOpen(false)}>
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-center">Sign In</h2>
        
        <form onSubmit={handleLogin} className="space-y-7">
          <div className="space-y-2">
            <Input
              id="email"
              type="email"
              placeholder="me@example.com"
              required
              value={email}
              className="p-2 md:p-5"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-5">
            <Input
              id="password"
              type="password"
              required
              value={password}
              className="p-2 md:p-5"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button
            type="submit"
            disabled={loading}
            className="futuristic-button dark:bg-blue-700 dark:text-blue-50 w-full"
          >
            {loading ? "Signing in..." : "Sign In"}
          </Button>
          <p className="text-center text-gray-400">
            secured by <span className="font-crimson italic font-semibold">Gidswap</span>
          </p>
        </form>
      </div>
    </ResuablePop>
  )
}
