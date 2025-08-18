"use client"
import { useEffect } from "react"
import { ArrowUpDown, Home, History, BarChart3, ChevronDown } from "lucide-react"
import { Button } from "@/src/components/ui/button"
import { DesktopNav } from "@/_components/dashboard/navigation/desktop-nav"
import { MobileNav } from "@/_components/dashboard/navigation/mobile-nav"
import { MobileBottomNav } from "@/_components/dashboard/navigation/mobile-bottom-nav"
import { SwapHeader } from "@/_components/dashboard/swap/swap-header"
import { SwapCard } from "@/_components/dashboard/swap/swap-card"
import { QuoteCard } from "@/_components/dashboard/swap/quote-card"
import { PendingDepositCard } from "@/_components/dashboard/swap/pending-card"
import { WalletAddressCard } from "@/_components/dashboard/swap/wallet-card"
import { ChatWidget } from "@/_components/dashboard/ui/chat-widget"
import { useSwapStore } from "@/lib/store"

export default function Dashboard() {
  const {
    showAdditionalInfo,
    activeLink,
    swapStep,
    swapData,
    isSwapping,
    setShowAdditionalInfo,
    setActiveLink,
    backToSwap,
    proceedWithWallet,
    fetchCurrencies,
  } = useSwapStore()

  useEffect(() => {
    fetchCurrencies()
  }, [fetchCurrencies])

  const navLinks = [
    { name: "Swap", icon: <ArrowUpDown className="w-5 h-5" /> },
    { name: "Account", icon: <Home className="w-5 h-5" /> },
    { name: "History", icon: <History className="w-5 h-5" /> },
    { name: "Markets", icon: <BarChart3 className="w-5 h-5" /> },
  ]

  return (
    <div className="min-h-screen bg-[#1a1d29] text-white">
      <DesktopNav navLinks={navLinks} activeLink={activeLink} onLinkClick={setActiveLink} />
      <MobileNav />

      <main className="flex-1 flex items-center justify-center px-4 py-8 md:py-16">
        <div className="w-full max-w-md">
          {swapStep === "swap" ? (
            <>
              <SwapHeader title="Swap" description="Exchange your crypto for fiat in an instant" />

              <SwapCard isLoading={isSwapping} onSwap={function (swapData: any): void {
                throw new Error("Function not implemented.")
              } } />

              <div className="text-center">
                <Button
                  variant="ghost"
                  onClick={() => setShowAdditionalInfo(!showAdditionalInfo)}
                  className="text-gray-400 hover:text-white flex items-center gap-2 mx-auto"
                >
                  <span>Additional Information</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${showAdditionalInfo ? "rotate-180" : ""}`} />
                </Button>
              </div>
            </>
          ) : swapStep === "quote" ? (
            <>
              <SwapHeader title="Confirm Swap" description="Review details and enter your wallet address" />
              <QuoteCard />
            </>
          ) : swapStep === "pending" ? (
            <>
              <SwapHeader title="Send Deposit" description="Send the exact amount to complete your swap" />
              <PendingDepositCard swapData={swapData} />
            </>
          ) : (
            <>
              <SwapHeader title="Complete Swap" description="Enter your wallet address to receive your funds" />

              {swapData ? (
                <WalletAddressCard swapData={swapData} onBack={backToSwap} onProceed={proceedWithWallet} />
              ) : (
                <div className="bg-[#2a2d3a] rounded-2xl p-6 text-center">
                  <p className="text-gray-400">Loading swap details...</p>
                  <Button
                    variant="outline"
                    onClick={backToSwap}
                    className="mt-4 border-[#3a3d4a] text-gray-400 hover:text-white hover:bg-[#3a3d4a] bg-transparent"
                  >
                    Back to Swap
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      <MobileBottomNav navLinks={navLinks} activeLink={activeLink} onLinkClick={setActiveLink} />

      <ChatWidget />
    </div>
  )
}
