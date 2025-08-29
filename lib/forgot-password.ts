import { create } from "zustand"
import { persist } from "zustand/middleware"
import axios from "axios"
import Cookies from "js-cookie"

interface PasswordResetState {
  // Step management
  currentStep: "email" | "otp" | "password"

  // Form data
  email: string
  otp: string
  newPassword: string
  confirmPassword: string

  // Loading states
  isLoading: boolean

  // Error handling
  error: string | null

  // Success states
  emailSent: boolean
  otpVerified: boolean
  passwordReset: boolean
}

interface PasswordResetActions {
  // Step navigation
  setStep: (step: PasswordResetState["currentStep"]) => void
  nextStep: () => void
  previousStep: () => void

  // Form updates
  setEmail: (email: string) => void
  setOtp: (otp: string) => void
  setNewPassword: (password: string) => void
  setConfirmPassword: (password: string) => void

  // API actions
  sendOtp: () => Promise<void>
  verifyOtp: () => Promise<void>
  resetPassword: () => Promise<void>

  // Utility
  setError: (error: string | null) => void
  resetState: () => void
}

type PasswordResetStore = PasswordResetState & PasswordResetActions

const initialState: PasswordResetState = {
  currentStep: "email",
  email: "",
  otp: "",
  newPassword: "",
  confirmPassword: "",
  isLoading: false,
  error: null,
  emailSent: false,
  otpVerified: false,
  passwordReset: false,
}

export const usePasswordResetStore = create<PasswordResetStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      // Step navigation
      setStep: (step) => set({ currentStep: step }),

      nextStep: () => {
        const { currentStep } = get()
        if (currentStep === "email") set({ currentStep: "otp" })
        else if (currentStep === "otp") set({ currentStep: "password" })
      },

      previousStep: () => {
        const { currentStep } = get()
        if (currentStep === "otp") set({ currentStep: "email" })
        else if (currentStep === "password") set({ currentStep: "otp" })
      },

      // Form updates
      setEmail: (email) => set({ email, error: null }),
      setOtp: (otp) => set({ otp, error: null }),
      setNewPassword: (newPassword) => set({ newPassword, error: null }),
      setConfirmPassword: (confirmPassword) => set({ confirmPassword, error: null }),

      // API actions
      sendOtp: async () => {
        const { email } = get()

        if (!email) {
          set({ error: "Please enter your email address" })
          return
        }

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
          set({ error: "Please enter a valid email address" })
          return
        }

        set({ isLoading: true, error: null })

        try {
          const token = Cookies.get("token");
          const api_url = process.env.NEXT_PUBLIC_PROD_API
          const response = await axios.post(
            `${api_url}/api/auth/request-otp`,
            { email },
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            },
          )

          if (response.data.status === "success") {
            set({
              emailSent: true,
              currentStep: "otp",
              isLoading: false,
            })
          } else {
            set({
              error: response.data.message || "Failed to send OTP",
              isLoading: false,
            })
          }
        } catch (error: any) {
          set({
            error: error.response?.data?.message || "Failed to send OTP. Please try again.",
            isLoading: false,
          })
        }
      },

      verifyOtp: async () => {
        const { email, otp } = get()

        if (!otp || otp.length !== 6) {
          set({ error: "Please enter a valid 6-digit OTP" })
          return
        }

        set({ isLoading: true, error: null })

        try {
          const token = Cookies.get("token");
          const api_url = process.env.NEXT_PUBLIC_PROD_API
          const response = await axios.post(
            `${api_url}/api/auth/verify-otp`,
            { email, otp },
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            },
          )

          if (response.data.status === "success") {
            set({
              otpVerified: true,
              currentStep: "password",
              isLoading: false,
            })
          } else {
            set({
              error: response.data.message || "Invalid OTP",
              isLoading: false,
            })
          }
        } catch (error: any) {
          set({
            error: error.response?.data?.message || "Invalid OTP. Please try again.",
            isLoading: false,
          })
        }
      },

      resetPassword: async () => {
        const { email, otp, newPassword, confirmPassword } = get()

        if (!newPassword || newPassword.length < 8) {
          set({ error: "Password must be at least 8 characters long" })
          return
        }

        if (newPassword !== confirmPassword) {
          set({ error: "Passwords do not match" })
          return
        }

        set({ isLoading: true, error: null })

        try {
          const token = Cookies.get("token");
          const api_url = process.env.NEXT_PUBLIC_PROD_API
          const response = await axios.post(
            `${api_url}/api/auth/reset-password`,
            { email, otp, newPassword },
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            },
          )

          if (response.data.status === "success") {
            set({
              passwordReset: true,
              isLoading: false,
            })
          } else {
            set({
              error: response.data.message || "Failed to reset password",
              isLoading: false,
            })
          }
        } catch (error: any) {
          set({
            error: error.response?.data?.message || "Failed to reset password. Please try again.",
            isLoading: false,
          })
        }
      },

      // Utility
      setError: (error) => set({ error }),

      resetState: () => set(initialState),
    }),
    {
      name: "password-reset-storage",
      partialize: (state) => ({
        currentStep: state.currentStep,
        email: state.email,
        emailSent: state.emailSent,
        otpVerified: state.otpVerified,
      }),
    },
  ),
)
