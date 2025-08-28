import { create } from "zustand"
import axios from "axios"
import Cookies from "js-cookie"

export interface Token {
  symbol: string
  contractAddress: string
  decimals: number
  baseCurrency: string
  network: string
  logo: string
}

export interface FiatCurrency {
  name: string
  code: string
  symbol: string
  shortName: string
  decimals: number
  marketRate: number
}

export interface Quote {
  rate: number
  total: number
  tokenSymbol: string
  currencyCode: string
}

export interface OrderRecipient {
  institution: string
  accountIdentifier: string
  accountName: string
  memo: string
  currency: string
  metadata?: Record<string, any>
}

export interface OrderData {
  amount: number
  token: string
  rate: number
  network: string
  recipient: OrderRecipient
  reference: string
  returnAddress: string
}

export interface PaymentOrder {
  id: string
  reference: string
  amount: string
  token: string
  network: string
  receiveAddress: string
  senderFee: string
  transactionFee: string
  validUntil: string
}

interface CryptoFiatState {
  // Tokens and currencies
  tokens: Token[]
  currencies: FiatCurrency[]
  isLoadingTokens: boolean
  isLoadingCurrencies: boolean

  // Selected values
  selectedToken: Token | null
  selectedCurrency: FiatCurrency | null

  // Amounts
  tokenAmount: string
  fiatAmount: string

  // Quote
  quote: Quote | null
  isLoadingQuote: boolean

  orderData: OrderData | null
  isInitializingOrder: boolean
  orderReference: string | null
  paymentOrder: PaymentOrder | null

  // Actions
  fetchTokens: () => Promise<void>
  fetchCurrencies: () => Promise<void>
  fetchQuote: (tokenSymbol: string, amount: string, currency: string) => Promise<void>
  setSelectedToken: (token: Token | null) => void
  setSelectedCurrency: (currency: FiatCurrency | null) => void
  setTokenAmount: (amount: string) => void
  setFiatAmount: (amount: string) => void
  resetState: () => void

  initializeOrder: (memo: string, returnAddress: string, bankData: any) => Promise<boolean>
  generateReference: () => string
}

const useCryptoFiatStore = create<CryptoFiatState>((set, get) => ({
  // Initial state
  tokens: [],
  currencies: [],
  isLoadingTokens: false,
  isLoadingCurrencies: false,
  selectedToken: null,
  selectedCurrency: null,
  tokenAmount: "",
  fiatAmount: "",
  quote: null,
  isLoadingQuote: false,

  orderData: null,
  isInitializingOrder: false,
  orderReference: null,
  paymentOrder: null,

  // Fetch tokens from API
  fetchTokens: async () => {
    set({ isLoadingTokens: true })
    try {
      const authToken = Cookies.get("token")
      const api_url = process.env.NEXT_PUBLIC_PROD_API
      const response = await axios.get(`${api_url}/api/payCrest/trade/getSupportedTokens`, {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      const tokensData = response.data.data || []

      // Add logos from elbstream API
      const tokensWithLogos = tokensData.map((token: any) => ({
        symbol: token.symbol,
        contractAddress: token.contractAddress,
        decimals: token.decimals,
        baseCurrency: token.baseCurrency,
        network: token.network,
        logo: `https://api.elbstream.com/logos/crypto/${token.symbol.toLowerCase()}`,
      }))

      set({ tokens: tokensWithLogos })
    } catch (error) {
      console.error("Failed to fetch tokens:", error)
      // Fallback mock data
      set({
        tokens: [
          {
            symbol: "USDT",
            contractAddress: "0x...",
            decimals: 6,
            baseCurrency: "USD",
            network: "Ethereum",
            logo: "https://api.elbstream.com/logos/crypto/usdt",
          },
          {
            symbol: "USDC",
            contractAddress: "0x...",
            decimals: 6,
            baseCurrency: "USD",
            network: "Ethereum",
            logo: "https://api.elbstream.com/logos/crypto/usdc",
          },
        ],
      })
    } finally {
      set({ isLoadingTokens: false })
    }
  },

  // Fetch currencies from API
  fetchCurrencies: async () => {
    set({ isLoadingCurrencies: true })
    try {
      const authToken = Cookies.get("token")
      const api_url = process.env.NEXT_PUBLIC_PROD_API
      const response = await axios.get(`${api_url}/api/payCrest/trade/getSupportedCies`, {
        headers: { Authorization: `Bearer ${authToken}` },
      })

      const currenciesData = response.data.data || []

      const currencies = currenciesData
        .filter((currency: any) => currency.code === "NGN")
        .map((currency: any) => ({
          name: currency.name,
          code: currency.code,
          symbol: currency.symbol,
          shortName: currency.shortName,
          decimals: currency.decimals,
          marketRate: Number.parseFloat(currency.marketRate),
        }))

      set({ currencies })
    } catch (error) {
      console.error("Failed to fetch currencies:", error)
      set({
        currencies: [
          {
            name: "Nigerian Naira",
            code: "NGN",
            symbol: "₦",
            shortName: "Naira",
            decimals: 2,
            marketRate: 1600,
          },
        ],
      })
    } finally {
      set({ isLoadingCurrencies: false })
    }
  },

  // Fetch quote from API
  fetchQuote: async (tokenSymbol: string, amount: string, currency: string) => {
    if (!tokenSymbol || !amount || !currency || Number.parseFloat(amount) <= 0) return

    set({ isLoadingQuote: true })
    try {
      const authToken = Cookies.get("token")
      const api_url = process.env.NEXT_PUBLIC_PROD_API
      const response = await axios.get(
        `${api_url}/api/payCrest/trade/tokenRates/${tokenSymbol}/${amount}/${currency}`,
        {
          headers: { Authorization: `Bearer ${authToken}` },
        },
      )
      const quoteData = response.data

      if (quoteData.status === "success") {
        const ratePerUnit = Number.parseFloat(quoteData.data) // data is the rate as string
        const amountNum = Number.parseFloat(amount)
        const total = amountNum * ratePerUnit

        const quote: Quote = {
          rate: ratePerUnit,
          total: total,
          tokenSymbol: tokenSymbol,
          currencyCode: currency,
        }

        set({
          quote,
          fiatAmount: total.toFixed(2),
        })

        // Store in cookies
        Cookies.set("crypto-fiat-quote", JSON.stringify(quote), { expires: 1 / 24 }) // 1 hour
      }
    } catch (error) {
      console.error("Failed to fetch quote:", error)
      set({ quote: null })
    } finally {
      set({ isLoadingQuote: false })
    }
  },

  // Setters
  setSelectedToken: (token) => {
    set({ selectedToken: token })
    Cookies.set("selected-token", JSON.stringify(token), { expires: 7 })

    // Fetch quote if all required data is available
    const { selectedCurrency, tokenAmount } = get()
    if (token && selectedCurrency && tokenAmount) {
      get().fetchQuote(token.symbol, tokenAmount, selectedCurrency.code)
    }
  },

  setSelectedCurrency: (currency) => {
    set({ selectedCurrency: currency })
    Cookies.set("selected-currency", JSON.stringify(currency), { expires: 7 })

    // Fetch quote if all required data is available
    const { selectedToken, tokenAmount } = get()
    if (selectedToken && currency && tokenAmount) {
      get().fetchQuote(selectedToken.symbol, tokenAmount, currency.code)
    }
  },

  setTokenAmount: (amount) => {
    set({ tokenAmount: amount })

    // Fetch quote if all required data is available
    const { selectedToken, selectedCurrency } = get()
    if (selectedToken && selectedCurrency && amount) {
      get().fetchQuote(selectedToken.symbol, amount, selectedCurrency.code)
    }
  },

  setFiatAmount: (amount) => {
    set({ fiatAmount: amount })
  },

  initializeOrder: async (memo: string, returnAddress: string, bankData: any) => {
    const { selectedToken, selectedCurrency, tokenAmount, quote } = get()

    console.log("[v0] Order initialization started with data:", {
      selectedToken,
      selectedCurrency,
      tokenAmount,
      quote,
      bankData,
      memo,
      returnAddress,
    })

    if (!selectedToken || !selectedCurrency || !tokenAmount || !quote || !bankData) {
      console.error("[v0] Missing required data for order initialization:", {
        hasToken: !!selectedToken,
        hasCurrency: !!selectedCurrency,
        hasAmount: !!tokenAmount,
        hasQuote: !!quote,
        hasBankData: !!bankData,
      })
      return false
    }

    set({ isInitializingOrder: true })

    try {
      const reference = get().generateReference()

      const orderData: OrderData = {
        amount: Number.parseFloat(tokenAmount),
        token: selectedToken.symbol,
        rate: quote.rate,
        network: selectedToken.network.toLowerCase().replace(/\s+/g, "-"),
        recipient: {
          institution: bankData.institution,
          accountIdentifier: bankData.accountIdentifier,
          accountName: bankData.accountName,
          memo: memo,
          currency: selectedCurrency.code,
          metadata: {},
        },
        reference: reference,
        returnAddress: returnAddress,
      }

      console.log("[v0] Sending order data to API:", orderData)

      const authToken = Cookies.get("token")
      const api_url = process.env.NEXT_PUBLIC_PROD_API

      console.log("[v0] API URL and auth token:", { api_url, hasToken: !!authToken })

      const response = await axios.post(`${api_url}/api/payCrest/trade/init-order`, orderData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
      })

      console.log("[v0] API response:", response.data)

      if (response.data.status === "success") {
        const paymentOrder: PaymentOrder = response.data.data

        set({
          orderData,
          orderReference: reference,
          paymentOrder,
        })

        // Store order data in cookies
        Cookies.set("order-data", JSON.stringify(orderData), { expires: 1 / 24 }) // 1 hour
        Cookies.set("order-reference", reference, { expires: 1 / 24 })
        Cookies.set("payment-order", JSON.stringify(paymentOrder), { expires: 1 / 24 })

        console.log("[v0] Order initialization successful")
        return true
      } else {
        console.error("[v0] Order initialization failed:", response.data.message)
        return false
      }
    } catch (error) {
      console.error("[v0] Failed to initialize order:", error)
      if (axios.isAxiosError(error)) {
        console.error("[v0] API Error details:", {
          status: error.response?.status,
          data: error.response?.data,
          message: error.message,
        })
      }
      return false
    } finally {
      set({ isInitializingOrder: false })
    }
  },

  generateReference: () => {
    const timestamp = Date.now().toString(36)
    const randomStr = Math.random().toString(36).substring(2, 8)
    return `CF${timestamp}${randomStr}`.toUpperCase()
  },

  resetState: () => {
    set({
      selectedToken: null,
      selectedCurrency: null,
      tokenAmount: "",
      fiatAmount: "",
      quote: null,
      orderData: null,
      orderReference: null,
      paymentOrder: null,
    })
    Cookies.remove("selected-token")
    Cookies.remove("selected-currency")
    Cookies.remove("crypto-fiat-quote")
    Cookies.remove("order-data")
    Cookies.remove("order-reference")
    Cookies.remove("payment-order")
  },
}))

export { useCryptoFiatStore }
