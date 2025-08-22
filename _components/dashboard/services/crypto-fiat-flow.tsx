"use client"
import { SwapHeader } from "@/_components/dashboard/swap/swap-header"
import { Card, CardContent } from "@/src/components/ui/card"

export function CryptoFiatFlow() {
  return (
    <div className="w-full max-w-md">
      <SwapHeader title="Crypto to Fiat" description="Convert cryptocurrency to traditional currency" />
      <Card className="bg-[#2a2d3a] border-[#3a3d4a]">
        <CardContent className="p-6 text-center">
          <p className="text-gray-400 mb-4">Crypto to Fiat exchange coming soon!</p>
          <p className="text-gray-500 text-sm">
            This feature will allow you to convert your cryptocurrencies to fiat currencies like USD, EUR, etc.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
