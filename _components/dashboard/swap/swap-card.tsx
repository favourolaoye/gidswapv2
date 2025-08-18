"use client"
import { Button } from "@/src/components/ui/button"
import { ArrowUpDown, ChevronDown, Info } from "lucide-react"
import type React from "react"

interface Currency {
  symbol: string
  name: string
  color: string
  icon: React.ReactNode
}

interface SwapCardProps {
  sellAmount: string
  receiveAmount: string
  rate: string
  fee: string
  onSwap: () => void
  onSellAmountChange?: (value: string) => void
  onReceiveAmountChange?: (value: string) => void
  onSellCurrencySelect?: () => void
  onReceiveCurrencySelect?: () => void
}

function CurrencySelector({ currency, onSelect }: { currency: Currency; onSelect?: () => void }) {
  return (
    <Button
      className="bg-[#3a3d4a] hover:bg-[#4a4d5a] text-white rounded-full px-4 py-2 flex items-center gap-2"
      onClick={onSelect}
    >
      <div className={`w-5 h-5 ${currency.color} rounded-full flex items-center justify-center`}>{currency.icon}</div>
      <span className="text-sm">{currency.name}</span>
      <ChevronDown className="w-4 h-4" />
    </Button>
  )
}

function SwapSection({
  type,
  amount,
  currency,
  usdValue,
  onAmountChange,
  onCurrencySelect,
}: {
  type: "sell" | "receive"
  amount: string
  currency: Currency
  usdValue?: string
  onAmountChange?: (value: string) => void
  onCurrencySelect?: () => void
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-gray-400 text-sm capitalize">{type}</span>
        <CurrencySelector currency={currency} onSelect={onCurrencySelect} />
      </div>
      <div className="text-2xl md:text-3xl font-bold mb-2">{amount}</div>
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
  const btcCurrency = {
    symbol: "₿",
    name: "BTC",
    color: "bg-orange-500",
    icon: <span className="text-xs font-bold text-white">₿</span>,
  }

  const ngnCurrency = {
    symbol: "₦",
    name: "NGN",
    color: "bg-green-600",
    icon: <span className="text-xs font-bold text-white">₦</span>,
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
            currency={btcCurrency}
            usdValue="$283.81"
            onAmountChange={onSellAmountChange}
            onCurrencySelect={onSellCurrencySelect}
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
            currency={ngnCurrency}
            onAmountChange={onReceiveAmountChange}
            onCurrencySelect={onReceiveCurrencySelect}
          />
        </div>
      </div>

      {/* Swap Action Button */}
      <Button
        className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 rounded-xl"
        onClick={onSwap}
      >
        Swap
      </Button>
    </div>
  )
}
