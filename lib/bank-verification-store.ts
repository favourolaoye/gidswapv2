import { create } from "zustand"
import axios from "axios"
import Cookies from "js-cookie"

interface Bank {
  name: string
  code: string
  slug: string
}

interface BankVerificationState {
  banks: Bank[]
  selectedBank: Bank | null
  accountNumber: string
  accountName: string | null
  isLoadingBanks: boolean
  isVerifying: boolean
  isVerified: boolean
  error: string | null

  // Actions
  fetchBanks: () => Promise<void>
  setSelectedBank: (bank: Bank) => void
  setAccountNumber: (number: string) => void
  verifyAccount: () => Promise<void>
  reset: () => void
}

export const useBankVerificationStore = create<BankVerificationState>((set, get) => ({
  banks: [],
  selectedBank: null,
  accountNumber: "",
  accountName: null,
  isLoadingBanks: false,
  isVerifying: false,
  isVerified: false,
  error: null,

  fetchBanks: async () => {
    set({ isLoadingBanks: true, error: null })
    try {
      const authtoken = Cookies.get("token")
      const api_url = process.env.NEXT_PUBLIC_PROD_API
      const response = await axios.get(`${api_url}/api/payCrest/trade/supportedBanks/NGN`, {
        headers: { Authorization: `Bearer ${authtoken}`},
      })

      if (response.data && response.data.data) {
        set({ banks: response.data.data, isLoadingBanks: false })
      } else {
        // Fallback mock data
        set({
          banks: [
            { name: "Access Bank", code: "ABNGNGLA", slug: "access-bank" },
            { name: "GTBank", code: "GTBINGLA", slug: "gtbank" },
            { name: "First Bank", code: "FBNINGLA", slug: "first-bank" },
            { name: "UBA", code: "UBANGLA", slug: "uba" },
            { name: "Zenith Bank", code: "ZENIGLA", slug: "zenith-bank" },
          ],
          isLoadingBanks: false,
        })
      }
    } catch (error) {
      console.error("Error fetching banks:", error)
      // Use fallback data on error
      set({
        banks: [
          { name: "Access Bank", code: "ABNGNGLA", slug: "access-bank" },
          { name: "GTBank", code: "GTBINGLA", slug: "gtbank" },
          { name: "First Bank", code: "FBNINGLA", slug: "first-bank" },
          { name: "UBA", code: "UBANGLA", slug: "uba" },
          { name: "Zenith Bank", code: "ZENIGLA", slug: "zenith-bank" },
        ],
        isLoadingBanks: false,
        error: "Failed to fetch banks, using fallback data",
      })
    }
  },

  setSelectedBank: (bank) => {
    set({ selectedBank: bank, accountName: null, isVerified: false, error: null })
  },

  setAccountNumber: (number) => {
    // Only allow digits and limit to 10 characters
    const cleanNumber = number.replace(/\D/g, "").slice(0, 10)
    set({ accountNumber: cleanNumber, accountName: null, isVerified: false, error: null })

    // Auto-verify when 10 digits are entered
    if (cleanNumber.length === 10 && get().selectedBank) {
      get().verifyAccount()
    }
  },

  verifyAccount: async () => {
    const { selectedBank, accountNumber } = get()
    if (!selectedBank || accountNumber.length !== 10) return

    set({ isVerifying: true, error: null })
    try {
      const auttoken = Cookies.get("token");
      const api_url = process.env.NEXT_PUBLIC_PROD_API
      const response = await axios.post(
        `${api_url}/api/payCrest/trade/verifyAccount`,
        {
          institution: selectedBank.code,
          accountIdentifier: accountNumber,
        },
        {
          headers: {Authorization: `Bearer ${auttoken}`},
        },
      )

      if (response.data && response.data.status === "success") {
        set({
          accountName: response.data.data,
          isVerified: true,
          isVerifying: false,
        })
      } else {
        set({
          error: "Account verification failed",
          isVerifying: false,
        })
      }
    } catch (error) {
      console.error("Error verifying account:", error)
      set({
        error: "Failed to verify account. Please try again.",
        isVerifying: false,
      })
    }
  },

  reset: () => {
    set({
      selectedBank: null,
      accountNumber: "",
      accountName: null,
      isVerifying: false,
      isVerified: false,
      error: null,
    })
  },
}))
