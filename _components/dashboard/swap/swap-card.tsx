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

/** ✅ only allow "", numbers, and one "." */
function sanitizeNumericInput(value: string): string {
  if (value === "") return "" // allow clearing
  if (/^\d*\.?\d*$/.test(value)) return value
  return value.slice(0, -1) // drop last invalid char
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
          readOnly={type === "to"}
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
    setReceiveUsdAmount,
    setSellCurrency,
    setReceiveCurrency,
    fetchQuote,
    showQuote,
  } = useSwapStore()

  const [sellDropdownOpen, setSellDropdownOpen] = useState(false)
  const [receiveDropdownOpen, setReceiveDropdownOpen] = useState(false)

  const sellUsdAmountNum = Number.parseFloat(sellUsdAmount)
  const sellAmountNum = Number.parseFloat(sellAmount)
  const isAmountTooLow = quote && sellAmount && sellAmountNum < quote.from.min
  const isAmountTooHigh = quote && sellAmount && sellAmountNum > quote.from.max
  const hasValidationError = isAmountTooLow || isAmountTooHigh

  const isFormValid =
    !!sellUsdAmount && sellUsdAmountNum > 0 && !!sellCurrency && !!receiveCurrency && !!quote && !hasValidationError

  /** ✅ debounce fetchQuote so it doesn’t fire on every keystroke instantly */
  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchQuote()
    }, 400)
    return () => clearTimeout(timeout)
  }, [sellUsdAmount, sellCurrency, receiveCurrency, fetchQuote])

  const handleSellCurrencySelect = (currency: Currency) => {
    setSellCurrency(currency)
    if (currency.coin === receiveCurrency?.coin) {
      const alt = currencies.find((c) => c.coin !== currency.coin)
      setReceiveCurrency(alt || null)
    }
  }

  const handleReceiveCurrencySelect = (currency: Currency) => {
    setReceiveCurrency(currency)
    if (currency.coin === sellCurrency?.coin) {
      const alt = currencies.find((c) => c.coin !== currency.coin)
      setSellCurrency(alt || null)
    }
  }

  const handleSwap = () => {
    if (!isFormValid) return
    const swapData = {
      fromCcy: sellCurrency!.code,
      toCcy: receiveCurrency!.code,
      amount: Number.parseFloat(sellAmount),
      direction: "from",
      type: "float",
      quote,
      sellCurrency,
      receiveCurrency,
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

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 mb-6">
        <div className="mb-4">
          <SwapSection
            type="from"
            usdAmount={sellUsdAmount}
            currencyAmount={sellAmount}
            currency={sellCurrency}
            currencies={currencies}
            onUsdAmountChange={setSellUsdAmount}
            onCurrencySelect={handleSellCurrencySelect}
            dropdownOpen={sellDropdownOpen}
            onDropdownToggle={() => {
              setSellDropdownOpen(!sellDropdownOpen)
              setReceiveDropdownOpen(false)
            }}
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
            onUsdAmountChange={setReceiveUsdAmount}
            onCurrencySelect={handleReceiveCurrencySelect}
            dropdownOpen={receiveDropdownOpen}
            onDropdownToggle={() => {
              setReceiveDropdownOpen(!receiveDropdownOpen)
              setSellDropdownOpen(false)
            }}
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
              1 {quote.from.coin} ≈ {quote.from.rate.toFixed(2)} {quote.to.coin}
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
