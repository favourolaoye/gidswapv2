"use client"
import { Button } from "@/src/components/ui/button"
import { useEffect, useRef, useState } from "react"
import { ArrowUpDown, ChevronDown } from "lucide-react"
import { useSwapStore } from "@/lib/swap-store"

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

interface SwapCardProps {
  onSwap: (swapData: any) => void
  isLoading?: boolean
}

/** only allow "", numbers, and one "." */
function sanitizeNumericInput(value: string): string {
  if (value === "") return ""
  if (/^\d*\.?\d*$/.test(value)) return value
  return value.slice(0, -1)
}

function CurrencyDropdown({
  currency,
  currencies,
  onSelect,
  isOpen,
  onToggle,
}: {
  currency: Currency | null
  currencies: Currency[]
  onSelect?: (currency: Currency) => void
  isOpen: boolean
  onToggle: () => void
}) {
  const [searchTerm, setSearchTerm] = useState("")
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        if (isOpen) onToggle()
      }
    }
    if (isOpen) document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isOpen, onToggle])

  const filteredCurrencies = currencies.filter(
    (curr) =>
      curr.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      curr.coin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      curr.code.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-full px-4 py-2 flex items-center gap-2"
        onClick={onToggle}
      >
        {currency ? (
          <>
            <img src={currency.logo || "/placeholder.svg"} alt={currency.coin} className="w-5 h-5 rounded-full" />
            <span className="text-sm">{currency.coin}</span>
          </>
        ) : (
          <span className="text-sm">Select</span>
        )}
        <ChevronDown className="w-4 h-4" />
      </Button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-72 sm:w-64 max-w-[calc(100vw-2rem)] bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg z-50 max-h-60 overflow-hidden">
          <div className="p-3 border-b border-gray-200 dark:border-gray-700">
            <input
              type="text"
              placeholder="Search currencies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-700 placeholder-gray-400 rounded-lg px-3 py-2 text-sm border-none outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
          </div>

          <div className="max-h-48 overflow-y-auto">
            {filteredCurrencies.length > 0 ? (
              filteredCurrencies.map((curr) => (
                <button
                  key={curr.code}
                  className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-gray-700 text-left"
                  onClick={() => {
                    onSelect?.(curr)
                    onToggle()
                    setSearchTerm("")
                  }}
                >
                  <img src={curr.logo || "/placeholder.svg"} alt={curr.coin} className="w-6 h-6 rounded-full" />
                  <div className="flex-1 min-w-0">
                    <div className="text-gray-900 dark:text-white font-medium truncate">{curr.coin}</div>
                    <div className="text-gray-500 dark:text-gray-400 text-sm truncate">{curr.name}</div>
                  </div>
                </button>
              ))
            ) : (
              <div className="px-4 py-6 text-center text-gray-500 dark:text-gray-400 text-sm">
                No currencies found for "{searchTerm}"
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

function SwapSection({
  type,
  usdAmount,
  currencyAmount,
  currency,
  currencies,
  onUsdAmountChange,
  onCurrencySelect,
  dropdownOpen,
  onDropdownToggle,
}: {
  type: "from" | "to"
  usdAmount: string
  currencyAmount?: string
  currency: Currency | null
  currencies: Currency[]
  onUsdAmountChange?: (value: string) => void
  onCurrencySelect?: (currency: Currency) => void
  dropdownOpen: boolean
  onDropdownToggle: () => void
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-gray-500 dark:text-gray-400 text-base font-medium capitalize">{type}</span>
        <CurrencyDropdown
          currency={currency}
          currencies={currencies}
          onSelect={onCurrencySelect}
          isOpen={dropdownOpen}
          onToggle={onDropdownToggle}
        />
      </div>
      <div className="relative">
        <span className="absolute left-0 top-0 text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">$</span>
        <input
          type="text"
          value={usdAmount ?? ""}
          onChange={(e) => onUsdAmountChange?.(sanitizeNumericInput(e.target.value))}
          readOnly={type === "to"} // TO is read-only per your rule
          placeholder="0.00"
          className="w-full bg-transparent text-2xl md:text-3xl font-bold mb-2 text-gray-900 dark:text-gray-100 placeholder-gray-400 border-none outline-none pl-6"
        />
      </div>
      {currencyAmount && currency && (
        <div className="flex items-center gap-2">
          <img src={currency.logo || "/placeholder.svg"} alt={currency.coin} className="w-4 h-4 rounded-full" />
          <span className="text-gray-600 dark:text-gray-400 font-semibold">
            {Number.parseFloat(currencyAmount).toFixed(8)} {currency.coin}
          </span>
        </div>
      )}
    </div>
  )
}

export function SwapCard({ onSwap, isLoading }: SwapCardProps) {
  const {
    sellAmount,
    receiveAmount,
    sellUsdAmount,
    receiveUsdAmount,
    currencies,
    sellCurrency,
    receiveCurrency,
    quote,
    isLoadingCurrencies,
    setSellUsdAmount,
    setReceiveAmount,
    setReceiveUsdAmount,
    setSellCurrency,
    setReceiveCurrency,
    fetchQuote,
    showQuote,
  } = useSwapStore()

  // local input for the editable FROM USD field (prevents flicker while typing)
  const [localSellUsd, setLocalSellUsd] = useState<string>(sellUsdAmount || "")

  // debounce timer ref
  const debounceRef = useRef<number | null>(null)
  // editing indicator
  const editingRef = useRef(false)

  // keep local in-sync on external changes unless user is actively typing
  useEffect(() => {
    if (!editingRef.current) {
      setLocalSellUsd(sellUsdAmount || "")
    }
  }, [sellUsdAmount])

  // clear debounce on unmount
  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        window.clearTimeout(debounceRef.current)
        debounceRef.current = null
      }
    }
  }, [])

  // handler for FROM input (local-first, debounced commit to store + fetch)
  const handleLocalSellChange = (val: string) => {
    const sanitized = sanitizeNumericInput(val)
    setLocalSellUsd(sanitized)

    // clearing the input — clear dependent fields immediately and cancel pending fetch
    if (sanitized === "") {
      if (debounceRef.current) {
        window.clearTimeout(debounceRef.current)
        debounceRef.current = null
      }
      editingRef.current = false
      setSellUsdAmount("") // commit clear to store so no stale sellAmount is used
      setReceiveAmount("")
      setReceiveUsdAmount("")
      return
    }

    // user is editing: debounce commit to store & fetch
    editingRef.current = true
    if (debounceRef.current) {
      window.clearTimeout(debounceRef.current)
      debounceRef.current = null
    }
    debounceRef.current = window.setTimeout(() => {
      setSellUsdAmount(sanitized)
      // fetchQuote will read sellUsdAmount from store; calling it immediately is fine
      fetchQuote()
      editingRef.current = false
      debounceRef.current = null
    }, 420)
  }

  // when quote arrives: ONLY update the receive side (do not overwrite FROM)
  useEffect(() => {
    if (!quote) return
    // only update receive side (usd + crypto) — leave sell/local alone
    setReceiveUsdAmount(quote.to.usd.toFixed(4))
    setReceiveAmount(quote.to.amount.toString())
    // note: we avoid touching sellUsdAmount/sellAmount to prevent overwriting user edit
  }, [quote, setReceiveUsdAmount, setReceiveAmount])

  // sell currency selection — reset inputs (reset-to-empty behavior) and fetch nothing until user enters
  const handleSellCurrencySelect = (currency: Currency) => {
    setSellCurrency(currency)
    // clear UI & store values relevant to amounts so no stale payloads
    setLocalSellUsd("") // local UI
    setSellUsdAmount("") // store
    setReceiveAmount("")
    setReceiveUsdAmount("")
    // do not call fetchQuote yet — wait for user to type or change receive currency
  }

  // receive currency selection — keep current FROM amount and trigger a fresh quote if FROM has value
  const handleReceiveCurrencySelect = (currency: Currency) => {
    setReceiveCurrency(currency)
    // if there's an existing valid local FROM value, commit and fetch immediately
    const localVal = localSellUsd.trim()
    if (localVal && !isNaN(Number(localVal)) && Number(localVal) > 0) {
      // commit to store then fetch a new quote for the new pair
      setSellUsdAmount(localVal)
      fetchQuote()
    } else {
      // otherwise ensure receive side is cleared (no stale data)
      setReceiveAmount("")
      setReceiveUsdAmount("")
    }
  }

  // swap handler — ensure store has committed amount & quote, then open quote step
  const handleSwap = async () => {
    // basic validations
    if (!sellCurrency || !receiveCurrency) return
    const localVal = localSellUsd.trim()
    if (!localVal || isNaN(Number(localVal)) || Number(localVal) <= 0) return

    // ensure store has the same sellUsdAmount before fetch
    if (sellUsdAmount !== localVal) {
      setSellUsdAmount(localVal)
      await fetchQuote()
    } else if (!quote) {
      await fetchQuote()
    }

    // read latest store state (ensure we use final values set by fetchQuote)
    const state = (useSwapStore as any).getState() as ReturnType<typeof useSwapStore.getState>
    if (!state.quote) {
      // no valid quote -> abort
      return
    }

    const swapData = {
      fromCcy: state.sellCurrency!.code,
      toCcy: state.receiveCurrency!.code,
      amount: Number.parseFloat(state.sellAmount || "0"),
      direction: "from",
      type: "float",
      quote: state.quote,
      sellCurrency: state.sellCurrency,
      receiveCurrency: state.receiveCurrency,
    }
    showQuote(swapData)
  }

  if (isLoadingCurrencies) {
    return (
      <div className="w-full max-w-md mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-center">
          <span className="text-gray-600 dark:text-gray-400">Loading currencies...</span>
        </div>
      </div>
    )
  }

  // validation / UI state
  const sellUsdNumber = Number.parseFloat(localSellUsd || "0")
  const sellAmountNum = Number.parseFloat(sellAmount || "0")
  const isAmountTooLow = quote && (sellAmount || "") && sellAmountNum < quote.from.min
  const isAmountTooHigh = quote && (sellAmount || "") && sellAmountNum > quote.from.max
  const hasValidationError = !!(isAmountTooLow || isAmountTooHigh)

  const isFormValid =
    !!localSellUsd && sellUsdNumber > 0 && !!sellCurrency && !!receiveCurrency && !!quote && !hasValidationError

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 mb-6">
        <div className="mb-4">
          <SwapSection
            type="from"
            usdAmount={localSellUsd}
            currencyAmount={sellAmount}
            currency={sellCurrency}
            currencies={currencies}
            onUsdAmountChange={handleLocalSellChange}
            onCurrencySelect={handleSellCurrencySelect}
            dropdownOpen={false}
            onDropdownToggle={() => {}}
          />
          {hasValidationError && (
            <div className="mt-2 text-sm text-red-500">
              {isAmountTooLow && (
                <span>
                  Amount too low. Minimum: {quote.from.min} {quote.from.coin}
                </span>
              )}
              {isAmountTooHigh && (
                <span>
                  Amount too high. Maximum: {quote.from.max} {quote.from.coin}
                </span>
              )}
            </div>
          )}
        </div>

        <div className="flex justify-center my-4">
          <Button
            variant="ghost"
            size="sm"
            className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-full p-2"
          >
            <ArrowUpDown className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </Button>
        </div>

        <div>
          <SwapSection
            type="to"
            usdAmount={receiveUsdAmount}
            currencyAmount={receiveAmount}
            currency={receiveCurrency}
            currencies={currencies}
            // TO input is read-only per your rule; still pass handler so store can be updated if needed elsewhere
            onUsdAmountChange={() => {}}
            onCurrencySelect={handleReceiveCurrencySelect}
            dropdownOpen={false}
            onDropdownToggle={() => {}}
          />
        </div>
      </div>

      {quote && (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-4 text-sm text-gray-600 dark:text-gray-300">
          <div className="flex justify-between mb-1">
            <span className="font-semibold text-blue-600 dark:text-blue-400">Minimum</span>
            <span className="text-gray-900 dark:text-white">
              {quote.from.min} {quote.from.coin}
            </span>
          </div>
          <div className="flex justify-between mb-1">
            <span className="font-semibold text-blue-600 dark:text-blue-400">Maximum</span>
            <span className="text-gray-900 dark:text-white">
              {quote.from.max} {quote.from.coin}
            </span>
          </div>
          <div className="flex justify-between mb-1">
            <span className="font-semibold text-blue-600 dark:text-blue-400">Network</span>
            <span className="text-gray-900 dark:text-white">{quote.to.network}</span>
          </div>
          <div className="flex justify-between mb-1">
            <span className="font-semibold text-blue-600 dark:text-blue-400">Rate</span>
            <span className="text-gray-900 dark:text-white">
              1 {quote.from.coin} ≈ {quote.from.rate.toFixed(4)} {quote.to.coin}
            </span>
          </div>
        </div>
      )}

      <Button
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={handleSwap}
        disabled={!isFormValid || isLoading}
      >
        {isLoading ? "Processing..." : "Swap"}
      </Button>
    </div>
  )
}
