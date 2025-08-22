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

  // Actions
  fetchTokens: () => Promise<void>
  fetchCurrencies: () => Promise<void>
  fetchQuote: (tokenSymbol: string, amount: string, currency: string) => Promise<void>
  setSelectedToken: (token: Token | null) => void
  setSelectedCurrency: (currency: FiatCurrency | null) => void
  setTokenAmount: (amount: string) => void
  setFiatAmount: (amount: string) => void
  resetState: () => void
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

  resetState: () => {
    set({
      selectedToken: null,
      selectedCurrency: null,
      tokenAmount: "",
      fiatAmount: "",
      quote: null,
    })
    Cookies.remove("selected-token")
    Cookies.remove("selected-currency")
    Cookies.remove("crypto-fiat-quote")
  },
}))

export { useCryptoFiatStore }
