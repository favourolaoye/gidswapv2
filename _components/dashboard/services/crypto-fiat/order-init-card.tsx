"use client"

import { useState } from "react"
import { useCryptoFiatStore } from "@/lib/crypto-fiat-store"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Loader2, ArrowLeft } from "lucide-react"
import Cookies from "js-cookie"

interface OrderInitializationCardProps {
  onBack?: () => void
  onNext?: () => void
  onOrderComplete?: () => void
}

export function OrderInitializationCard({ onBack, onNext, onOrderComplete }: OrderInitializationCardProps) {
  const [memo, setMemo] = useState("")
  const [returnAddress, setReturnAddress] = useState("")
  const [errors, setErrors] = useState<{ memo?: string; returnAddress?: string }>({})

  const { selectedToken, selectedCurrency, tokenAmount, quote, isInitializingOrder, initializeOrder } =
    useCryptoFiatStore()

  // Extract verified bank data from cookie
  const verifiedBank = Cookies.get("verifiedBank")
  const bankData = verifiedBank ? JSON.parse(verifiedBank) : null

  const { selectedBank, accountNumber, accountName, bankName, bankCode } = bankData || {}

  const validateForm = () => {
    const newErrors: { memo?: string; returnAddress?: string } = {}

    if (!memo.trim()) {
      newErrors.memo = "Memo is required"
    }

    if (!returnAddress.trim()) {
      newErrors.returnAddress = "Return address is required"
    } else if (!/^0x[a-fA-F0-9]{40}$/.test(returnAddress)) {
      newErrors.returnAddress = "Invalid wallet address format"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInitializeOrder = async () => {
    if (!validateForm()) return

    if (!bankData) {
      console.error("Missing bank verification data")
      return
    }

    // use values from cookie
    const payload = {
      institution: bankCode,
      accountIdentifier: accountNumber,
      accountName: accountName,
    }

    const success = await initializeOrder(memo, returnAddress, payload)
    if (success) {
      if (onOrderComplete) {
        onOrderComplete()
      } else if (onNext) {
        onNext()
      }
    }
  }

  return (
    <Card className="w-full bg-gray-900 border-gray-800">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-xl font-bold text-gray-200">Initialize Order</CardTitle>
        {onBack && (
          <Button variant="ghost" size="sm" onClick={onBack} className="text-gray-400 hover:text-white">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
        )}
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Order Summary */}
        <div className="bg-gray-800 rounded-lg p-4 space-y-2">
          <h3 className="text-sm font-medium text-gray-300">Order Summary</h3>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Amount:</span>
            <span className="text-white">
              {tokenAmount} {selectedToken?.symbol}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Rate:</span>
            <span className="text-white">
              1 {selectedToken?.symbol} = {quote?.rate.toLocaleString()} {selectedCurrency?.code}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Total:</span>
            <span className="text-white font-medium">
              {quote?.total.toLocaleString()} {selectedCurrency?.code}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Bank:</span>
            <span className="text-white">{bankName || "N/A"}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Account:</span>
            <span className="text-white">{accountNumber || "N/A"}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Account Name:</span>
            <span className="text-white">{accountName || "N/A"}</span>
          </div>
        </div>

        {/* Memo Input */}
        <div className="space-y-2">
          <Label htmlFor="memo" className="text-sm font-medium text-gray-300">
            Payment Memo *
          </Label>
          <Input
            id="memo"
            type="text"
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            placeholder="Enter payment description"
            className="bg-gray-800 border-gray-700 text-white placeholder-gray-500"
          />
          {errors.memo && <p className="text-sm text-red-400">{errors.memo}</p>}
        </div>

        {/* Return Address Input */}
        <div className="space-y-2">
          <Label htmlFor="returnAddress" className="text-sm font-medium text-gray-300">
            Return Wallet Address *
          </Label>
          <Input
            id="returnAddress"
            type="text"
            value={returnAddress}
            onChange={(e) => setReturnAddress(e.target.value)}
            placeholder="0x742d35Cc6634C0532925a3b8D395745e99F1E17A"
            className="bg-gray-800 border-gray-700 text-white placeholder-gray-500 font-mono text-sm"
          />
          {errors.returnAddress && <p className="text-sm text-red-400">{errors.returnAddress}</p>}
          <p className="text-xs text-gray-500">Address where funds will be returned if the transaction fails</p>
        </div>

        {/* Initialize Order Button */}
        <Button
          onClick={handleInitializeOrder}
          disabled={isInitializingOrder || !memo.trim() || !returnAddress.trim()}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3"
        >
          {isInitializingOrder ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Initializing Order...
            </>
          ) : (
            "Initialize Order"
          )}
        </Button>
      </CardContent>
    </Card>
  )
}
