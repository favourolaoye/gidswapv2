"use client"
import { useState } from "react"
import { ArrowUpDown, Home, History, BarChart3, ChevronDown } from "lucide-react"
import { Button } from "@/src/components/ui/button"
import { DesktopNav } from "@/_components/dashboard/navigation/desktop-nav"
import { MobileNav } from "@/_components/dashboard/navigation/mobile-nav"
import { MobileBottomNav } from "@/_components/dashboard/navigation/mobile-bottom-nav"
import { SwapHeader } from "@/_components/dashboard/swap/swap-header"
import { SwapCard } from "@/_components/dashboard/swap/swap-card"
import { ChatWidget } from "@/_components/dashboard/ui/chat-widget"
export default function Dashboard() {
  const [sellAmount, setSellAmount] = useState("0.0025")
  const [receiveAmount, setReceiveAmount] = useState("431,715.63")
  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false)
  const [activeLink, setActiveLink] = useState("Swap")

  const handleSwap = () => {
    console.log("Swap initiated")
  }

  const navLinks = [
    { name: "Swap", icon: <ArrowUpDown className="w-5 h-5" /> },
    { name: "Account", icon: <Home className="w-5 h-5" /> },
    { name: "History", icon: <History className="w-5 h-5" /> },
    { name: "Markets", icon: <BarChart3 className="w-5 h-5" /> },
  ]

  return (
    <div className="min-h-screen bg-[#1a1d29] text-white">
      {/* Navigation */}
      <DesktopNav navLinks={navLinks} activeLink={activeLink} onLinkClick={setActiveLink} />
      <MobileNav />

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-8 md:py-16">
        <div className="w-full max-w-md">
          <SwapHeader title="Swap" description="Exchange your crypto for fiat in an instant" />

          <SwapCard
            sellAmount={sellAmount}
            receiveAmount={receiveAmount}
            rate="1 BTC ≈ 172,686,253.43 ₦"
            fee="5,785.42 ₦"
            onSwap={handleSwap}
            onSellAmountChange={setSellAmount}
            onReceiveAmountChange={setReceiveAmount}
          />

          {/* Additional Information */}
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
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav navLinks={navLinks} activeLink={activeLink} onLinkClick={setActiveLink} />

      {/* Chat Widget */}
      <ChatWidget />
    </div>
  )
}
