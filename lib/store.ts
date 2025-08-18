import { create } from "zustand"
import axios from "axios"
import Cookies from "js-cookie"

interface Currency {
  code: string
  coin: string
  network: string
  name: string
  logo: string
  color: string
  recv: number
  send: number
}

interface SwapState {
  // UI State
  sellAmount: string
  receiveAmount: string
  showAdditionalInfo: boolean
  activeLink: string
  swapStep: "swap" | "quote" | "pending" | "wallet"

  // Swap Data
  swapData: any
  currencies: Currency[]
  sellCurrency: Currency | null
  receiveCurrency: Currency | null
  quote: any
  walletAddress: string

  // Loading States
  isSwapping: boolean
  isLoadingCurrencies: boolean
  isLoadingQuote: boolean

  error: string | null

  // Actions
  setSellAmount: (amount: string) => void
  setReceiveAmount: (amount: string) => void
  setShowAdditionalInfo: (show: boolean) => void
  setActiveLink: (link: string) => void
  setSwapStep: (step: "swap" | "quote" | "pending" | "wallet") => void
  setSwapData: (data: any) => void
  setSellCurrency: (currency: Currency | null) => void
  setReceiveCurrency: (currency: Currency | null) => void
  setWalletAddress: (address: string) => void
  setError: (error: string | null) => void

  // API Actions
  fetchCurrencies: () => Promise<void>
  fetchQuote: () => Promise<void>
  showQuote: (swapPrepData: any) => void
  initiateSwap: () => Promise<void>
  backToSwap: () => void
  proceedWithWallet: (walletAddress: string) => Promise<void>
}

export const useSwapStore = create<SwapState>((set, get) => ({
  // Initial State
  sellAmount: "0.0025",
  receiveAmount: "",
  showAdditionalInfo: false,
  activeLink: "Swap",
  swapStep: "swap",
  swapData: null,
  currencies: [],
  sellCurrency: null,
  receiveCurrency: null,
  quote: null,
  walletAddress: "",
  isSwapping: false,
  isLoadingCurrencies: false,
  isLoadingQuote: false,
  error: null,

  // Basic Setters
  setSellAmount: (amount) => set({ sellAmount: amount }),
  setReceiveAmount: (amount) => set({ receiveAmount: amount }),
  setShowAdditionalInfo: (show) => set({ showAdditionalInfo: show }),
  setActiveLink: (link) => set({ activeLink: link }),
  setSwapStep: (step) => set({ swapStep: step }),
  setSwapData: (data) => set({ swapData: data }),
  setSellCurrency: (currency) => set({ sellCurrency: currency }),
  setReceiveCurrency: (currency) => set({ receiveCurrency: currency }),
  setWalletAddress: (address) => set({ walletAddress: address }),
  setError: (error) => set({ error }),

  // API Actions
  fetchCurrencies: async () => {
    const api = process.env.NEXT_PUBLIC_PROD_API
    const token = Cookies.get("token")

    if (!api || !token) {
      console.error("Missing API endpoint or token")
      return
    }

    set({ isLoadingCurrencies: true })

    try {
      const response = await axios.get(`${api}/api/fixfloat/trade/currencies`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      if (response.data.code === 0) {
        const currencies = response.data.data as Currency[]
        set({ currencies })

        // Set default currencies
        if (currencies.length > 1) {
          const btc = currencies.find((c) => c.coin === "BTC")
          const eth = currencies.find((c) => c.coin === "ETH")

          set({
            sellCurrency: btc || currencies[0],
            receiveCurrency:
              eth || currencies.find((c) => c.coin !== (btc?.coin || currencies[0].coin)) || currencies[1],
          })
        }
      }
    } catch (error) {
      console.error("Failed to fetch currencies:", error)
    } finally {
      set({ isLoadingCurrencies: false })
    }
  },

  fetchQuote: async () => {
    const { sellCurrency, receiveCurrency, sellAmount } = get()
    const api = process.env.NEXT_PUBLIC_PROD_API
    const token = Cookies.get("token")

    if (!api || !token || !sellCurrency || !receiveCurrency || !sellAmount) return

    set({ isLoadingQuote: true })

    try {
      const response = await axios.post(
        `${api}/api/fixfloat/trade/rate`,
        {
          fromCcy: sellCurrency.code,
          toCcy: receiveCurrency.code,
          amount: Number.parseFloat(sellAmount),
          direction: "from",
          type: "float",
        },
        { headers: { Authorization: `Bearer ${token}` } },
      )

      if (response.data.code === 0) {
        set({
          quote: response.data.data,
          receiveAmount: response.data.data.to.amount.toString(),
        })
      }
    } catch (error) {
      console.error("Failed to fetch quote:", error)
    } finally {
      set({ isLoadingQuote: false })
    }
  },

  showQuote: (swapPrepData) => {
    set({
      swapData: swapPrepData,
      swapStep: "quote",
    })
  },

  initiateSwap: async () => {
    const { swapData, walletAddress } = get()

    if (!swapData || !walletAddress) {
      console.error("Missing swap data or wallet address")
      set({ error: "Missing swap data or wallet address" })
      return
    }

    if (!walletAddress.trim()) {
      set({ error: "Wallet address cannot be empty" })
      return
    }

    set({ isSwapping: true, error: null })

    try {
      const api = process.env.NEXT_PUBLIC_PROD_API
      const token = Cookies.get("token")
      const response = await axios.post(
        `${api}/api/fixfloat/trade/create-order`,
        {
          ...swapData,
          toAddress: walletAddress,
        },
        {
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        },
      )

      const swapResponseData = response.data
      console.log("Swap API response:", swapResponseData)

      if (swapResponseData.code === 0) {
        // Store the complete response data including data.id in cookies
        Cookies.set("swapResponseData", JSON.stringify(swapResponseData), { expires: 1 / 24 })

        set({
          swapData: swapResponseData,
          swapStep: "pending",
          error: null,
        })
      } else {
        const errorMessage = swapResponseData.msg || "Invalid wallet address or swap parameters"
        set({ error: errorMessage })
        console.error("Swap API error:", swapResponseData)
      }
    } catch (error) {
      console.error("Swap failed:", error)
      const errorMessage = error instanceof Error ? error.message : "Swap failed. Please try again."
      set({ error: errorMessage })
    } finally {
      set({ isSwapping: false })
    }
  },

  backToSwap: () => {
    set({
      swapStep: "swap",
      swapData: null,
      walletAddress: "",
      error: null,
    })
    Cookies.remove("swapResponseData")
  },

  proceedWithWallet: async (walletAddress) => {
    console.log("Proceeding with wallet address:", walletAddress)
    set({ walletAddress })
  },
}))

// Initialize store with saved data
if (typeof window !== "undefined") {
  const savedSwapData = Cookies.get("swapResponseData")
  if (savedSwapData) {
    try {
      const parsedData = JSON.parse(savedSwapData)
      if (parsedData.code === 0) {
        useSwapStore.setState({
          swapData: parsedData,
          swapStep: "pending",
        })
      } else {
        Cookies.remove("swapResponseData")
      }
    } catch (error) {
      console.error("Failed to parse saved swap data:", error)
      Cookies.remove("swapResponseData")
    }
  }
}
