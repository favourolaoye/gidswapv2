"use client"
import { Button } from "@/src/components/ui/button"
import { ArrowUpDown, ChevronDown, Info } from "lucide-react"
import { useState, useEffect } from "react"
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

interface SwapCardProps {
  sellAmount: string
  receiveAmount: string
  rate: string
  fee: string
  onSwap: () => void
  onSellAmountChange?: (value: string) => void
  onReceiveAmountChange?: (value: string) => void
  onSellCurrencySelect?: (currency: Currency) => void
  onReceiveCurrencySelect?: (currency: Currency) => void
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
  return (
    <div className="relative">
      <Button
        className="bg-[#3a3d4a] hover:bg-[#4a4d5a] text-white rounded-full px-4 py-2 flex items-center gap-2"
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
        <div className="absolute top-full left-0 mt-2 w-64 bg-[#2a2d3a] rounded-xl border border-[#3a3d4a] shadow-lg z-50 max-h-60 overflow-y-auto">
          {currencies.map((curr) => (
            <button
              key={curr.code}
              className="w-full px-4 py-3 flex items-center gap-3 hover:bg-[#3a3d4a] text-left first:rounded-t-xl last:rounded-b-xl"
              onClick={() => {
                onSelect?.(curr)
                onToggle()
              }}
            >
              <img src={curr.logo || "/placeholder.svg"} alt={curr.coin} className="w-6 h-6 rounded-full" />
              <div className="flex-1">
                <div className="text-white font-medium">{curr.coin}</div>
                <div className="text-gray-400 text-sm">{curr.name}</div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function SwapSection({
  type,
  amount,
  currency,
  currencies,
  usdValue,
  onAmountChange,
  onCurrencySelect,
  dropdownOpen,
  onDropdownToggle,
}: {
  type: "sell" | "receive"
  amount: string
  currency: Currency | null
  currencies: Currency[]
  usdValue?: string
  onAmountChange?: (value: string) => void
  onCurrencySelect?: (currency: Currency) => void
  dropdownOpen: boolean
  onDropdownToggle: () => void
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-gray-400 text-sm capitalize">{type}</span>
        <CurrencyDropdown
          currency={currency}
          currencies={currencies}
          onSelect={onCurrencySelect}
          isOpen={dropdownOpen}
          onToggle={onDropdownToggle}
        />
      </div>
      <input
        type="number"
        value={amount ?? ""}
        onChange={(e) => onAmountChange?.(e.target.value)}
        placeholder="0.00"
        className="w-full bg-transparent text-2xl md:text-3xl font-bold mb-2 text-white placeholder-gray-500 border-none outline-none"
      />
      {usdValue && (
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center">
            <span className="text-xs font-bold text-black">$</span>
          </div>
          <span className="text-yellow-400 font-semibold">{usdValue}</span>
        </div>
      )}
    </div>
  )
}

export function SwapCard({
  sellAmount,
  receiveAmount,
  rate,
  fee,
  onSwap,
  onSellAmountChange,
  onReceiveAmountChange,
  onSellCurrencySelect,
  onReceiveCurrencySelect,
}: SwapCardProps) {
  const [currencies, setCurrencies] = useState<Currency[]>([])
  const [sellCurrency, setSellCurrency] = useState<Currency | null>(null)
  const [receiveCurrency, setReceiveCurrency] = useState<Currency | null>(null)
  const [sellDropdownOpen, setSellDropdownOpen] = useState(false)
  const [receiveDropdownOpen, setReceiveDropdownOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  const api = process.env.NEXT_PUBLIC_PROD_API
  const token = Cookies.get("token")

  useEffect(() => {
    const fetchCurrencies = async () => {
      if (!api || !token) {
        console.error("Missing API endpoint or token")
        setLoading(false)
        return
      }

      try {
        const response = await axios.get(`${api}/api/fixfloat/trade/currencies`, {
          headers: { Authorization: `Bearer ${token}` },
        })

        if (response.data.code === 0) {
          const data = response.data.data as Currency[]
          setCurrencies(data)

          if (data.length > 1) {
            const btc = data.find((c) => c.coin === "BTC")
            const eth = data.find((c) => c.coin === "ETH")

            setSellCurrency(btc || data[0])
            setReceiveCurrency(eth || data.find((c) => c.coin !== (btc?.coin || data[0].coin)) || data[1])
          }
        }
      } catch (error) {
        console.error("Failed to fetch currencies:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCurrencies()
  }, [api, token])

  const handleSellCurrencySelect = (currency: Currency) => {
    setSellCurrency(currency)
    // Ensure receive is not the same
    if (currency.coin === receiveCurrency?.coin) {
      const alt = currencies.find((c) => c.coin !== currency.coin)
      setReceiveCurrency(alt || null)
    }
    onSellCurrencySelect?.(currency)
  }

  const handleReceiveCurrencySelect = (currency: Currency) => {
    setReceiveCurrency(currency)
    // Ensure sell is not the same
    if (currency.coin === sellCurrency?.coin) {
      const alt = currencies.find((c) => c.coin !== currency.coin)
      setSellCurrency(alt || null)
    }
    onReceiveCurrencySelect?.(currency)
  }

  if (loading) {
    return (
      <div className="w-full max-w-md mx-auto">
        <div className="bg-[#2a2d3a] rounded-2xl p-6 text-center">
          <span className="text-gray-400">Loading currencies...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-[#2a2d3a] rounded-xl p-4 mb-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-gray-400 text-sm">Rate</span>
          <div className="flex items-center gap-2 text-yellow-400 text-sm">
            <ArrowUpDown className="w-4 h-4" />
            <span>{rate}</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-gray-400 text-sm">LP Fee</span>
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-0">
              <Info className="w-4 h-4" />
            </Button>
          </div>
          <span className="text-white text-sm">{fee}</span>
        </div>
      </div>

      <div className="bg-[#2a2d3a] rounded-2xl p-6 mb-6">
        {/* Sell Section */}
        <div className="mb-4">
          <SwapSection
            type="sell"
            amount={sellAmount}
            currency={sellCurrency}
            currencies={currencies}
            usdValue={sellAmount && rate ? `$${(parseFloat(sellAmount) * parseFloat(rate)).toFixed(2)}` : undefined}
            onAmountChange={onSellAmountChange}
            onCurrencySelect={handleSellCurrencySelect}
            dropdownOpen={sellDropdownOpen}
            onDropdownToggle={() => {
              setSellDropdownOpen(!sellDropdownOpen)
              setReceiveDropdownOpen(false)
            }}
          />
        </div>

        {/* Swap Button */}
        <div className="flex justify-center my-4">
          <Button variant="ghost" size="sm" className="bg-[#3a3d4a] hover:bg-[#4a4d5a] rounded-full p-2">
            <ArrowUpDown className="w-5 h-5 text-gray-400" />
          </Button>
        </div>

        {/* Receive Section */}
        <div>
          <SwapSection
            type="receive"
            amount={receiveAmount}
            currency={receiveCurrency}
            currencies={currencies}
            onAmountChange={onReceiveAmountChange}
            onCurrencySelect={handleReceiveCurrencySelect}
            dropdownOpen={receiveDropdownOpen}
            onDropdownToggle={() => {
              setReceiveDropdownOpen(!receiveDropdownOpen)
              setSellDropdownOpen(false)
            }}
          />
        </div>
      </div>

      {/* Swap Action Button */}
      <Button
        className="w-full bg-blue-900 hover:bg-blue-500 text-black font-semibold py-3 rounded-xl"
        onClick={onSwap}
      >
        Swap
      </Button>
    </div>
  )
}
