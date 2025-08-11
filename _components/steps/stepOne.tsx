"use client"

import { useState } from "react"
import axios from "axios"
import { toast } from "sonner"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import { Button } from "@/src/components/ui/button"

export default function StepOne({ data, onNext, onChange }: any) {
  const [errors, setErrors] = useState({ fullName: "", email: "" })
  const [sending, setSending] = useState(false)

  const validate = () => {
    const errs = {
      fullName: data.fullName ? "" : "Full name is required",
      email: /\S+@\S+\.\S+/.test(data.email) ? "" : "Valid email is required",
    }
    setErrors(errs)
    return !errs.fullName && !errs.email
  }

  const handleNext = async () => {
    if (!validate()) return

    try {
      setSending(true)

      // Using the mock API route for sending OTP
      const res = await axios.post("/api/send-otp", {
        email: data.email,
      })

      if (res.data.success) {
        toast.success("OTP sent successfully!")
        onNext() // Advance to the next step
      } else {
        throw new Error(res.data.error || "OTP send failed")
      }
    } catch (err: any) {
      toast.error(`Failed to send OTP: ${err.message || err.response?.data?.message || "Unknown error"}`)
      console.error("Failed to send OTP:", err)
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="space-y-4">
      <h1 className="text-[1.2rem] font-semibold text-center py-5">
        Sign in to <span className="font-crimson italic text-[1.8rem]">Gidswap</span>
      </h1>
      <h2 className="text-lg font-bold mb-4">Your Info</h2>

      <div className="space-y-2">
  
        <Input
          id="fullName"
          type="text"
          placeholder="Full Name"
          value={data.fullName}
          onChange={(e) => onChange({ fullName: e.target.value })}
        />
        {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
      </div>

      <div className="space-y-2">
      
        <Input
          id="email"
          type="email"
          placeholder="Email"
          value={data.email}
          onChange={(e) => onChange({ email: e.target.value })}
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
      </div>

      <Button onClick={handleNext} disabled={sending} className="futuristic-button w-full mt-4 dark:bg-blue-500/90 dark:text-blue-50">
        {sending ? "Sending OTP..." : "Next"}
      </Button>
    </div>
  )
}
