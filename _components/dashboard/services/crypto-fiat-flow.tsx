"use client"
import { useState } from "react"
import { CryptoFiatSwapCard } from "./crypto-fiat/crypto-to-fiat-card"
import { BankVerificationCard } from "./crypto-fiat/bank-verification-card"
import { Button } from "@/src/components/ui/button"
import { ArrowLeft } from "lucide-react"

type FlowStep = "swap" | "verification" | "payment"

function CryptoFiatFlow() {
  const [currentStep, setCurrentStep] = useState<FlowStep>("swap")

  const handleSwapComplete = () => {
    setCurrentStep("verification")
  }

  const handleVerificationComplete = () => {
    setCurrentStep("payment")
    console.log("Proceeding to payment...")
  }

  const handleBack = () => {
    if (currentStep === "verification") {
      setCurrentStep("swap")
    } else if (currentStep === "payment") {
      setCurrentStep("verification")
    }
  }

  return (
    <div className="min-h-screen p-2 sm:p-4">
      <div className="w-full max-w-lg sm:max-w-md mx-auto mb-6">
        {currentStep !== "swap" && (
          <Button variant="ghost" onClick={handleBack} className="mb-4 text-gray-400 hover:text-white p-0">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        )}

        <h1 className="text-2xl font-bold text-white text-center mb-2">
          {currentStep === "swap" && "Crypto to Fiat"}
          {currentStep === "verification" && "Verify Account"}
          {currentStep === "payment" && "Complete Payment"}
        </h1>
        <p className="text-gray-400 text-center text-sm">
          {currentStep === "swap" && "Convert your cryptocurrency to cash instantly"}
          {currentStep === "verification" && "Verify your bank account details"}
          {currentStep === "payment" && "Complete your transaction"}
        </p>
      </div>

      {currentStep === "swap" && <CryptoFiatSwapCard onSwapComplete={handleSwapComplete} />}

      {currentStep === "verification" && <BankVerificationCard onProceed={handleVerificationComplete} />}

      {currentStep === "payment" && (
        <div className="w-full max-w-lg sm:max-w-md mx-auto nrounded-2xl p-6 text-center">
          <h3 className="text-xl font-bold text-white mb-4">Payment Processing</h3>
          <p className="text-gray-400">Your transaction is being processed...</p>
        </div>
      )}
    </div>
  )
}

export { CryptoFiatFlow }
export default CryptoFiatFlow
