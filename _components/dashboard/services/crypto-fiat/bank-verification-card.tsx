"use client"

import { useEffect, useState } from "react"
import { ChevronDown, Check, Loader2 } from "lucide-react"
import { useBankVerificationStore } from "@/lib/bank-verification-store"
interface BankVerificationCardProps {
  onProceed: () => void
}

export function BankVerificationCard({ onProceed }: BankVerificationCardProps) {
  const {
    banks,
    selectedBank,
    accountNumber,
    accountName,
    isLoadingBanks,
    isVerifying,
    isVerified,
    error,
    fetchBanks,
    setSelectedBank,
    setAccountNumber,
    reset,
  } = useBankVerificationStore()

  const [showBankDropdown, setShowBankDropdown] = useState(false)

  useEffect(() => {
    fetchBanks()
    return () => reset()
  }, [fetchBanks, reset])

  return (
    <div className="">
      <div className="bg-gray-900 rounded-2xl p-2 border border-gray-800">
        <div className="mb-6">
          <h3 className="text-sm font-bold text-white mb-2">Verify Your Account</h3>
          {/* <p className="text-gray-400 text-sm">
            Select your bank and enter your account number to verify your identity
          </p> */}
        </div>

        {/* Bank Selection */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300 mb-2">Select Bank</label>
          <div className="relative">
            <button
              onClick={() => setShowBankDropdown(!showBankDropdown)}
              className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-left text-white hover:bg-gray-750 transition-colors flex items-center justify-between"
              disabled={isLoadingBanks}
            >
              <span className="truncate">
                {isLoadingBanks ? "Loading banks..." : selectedBank ? selectedBank.name : "Select your bank"}
              </span>
              {isLoadingBanks ? (
                <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
              ) : (
                <ChevronDown
                  className={`h-4 w-4 text-gray-400 transition-transform ${showBankDropdown ? "rotate-180" : ""}`}
                />
              )}
            </button>

            {showBankDropdown && !isLoadingBanks && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-gray-800 border border-gray-700 rounded-xl shadow-lg z-50 max-h-60 overflow-y-auto">
                {banks.map((bank) => (
                  <button
                    key={bank.code}
                    onClick={() => {
                      setSelectedBank(bank)
                      setShowBankDropdown(false)
                    }}
                    className="w-full px-4 py-3 text-left text-white hover:bg-gray-700 transition-colors border-b border-gray-700 last:border-b-0"
                  >
                    <div className="font-medium">{bank.name}</div>
                    <div className="text-xs text-gray-400">{bank.code}</div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Account Number Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300 mb-2">Account Number</label>
          <div className="relative">
            <input
              type="text"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              placeholder="Enter 10-digit account number"
              className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              maxLength={10}
              disabled={!selectedBank}
            />
            {isVerifying && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
              </div>
            )}
            {isVerified && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <Check className="h-4 w-4 text-green-500" />
              </div>
            )}
          </div>
          <div className="text-xs text-gray-500 mt-1">{accountNumber.length}/10 digits</div>
        </div>

        {/* Account Name Display */}
        {accountName && (
          <div className="mb-4 p-3 bg-green-900/20 border border-green-800 rounded-xl">
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-500" />
              <span className="text-sm font-medium text-green-400">Account Verified</span>
            </div>
            <div className="text-white font-medium mt-1">{accountName}</div>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="mb-4 p-3 bg-red-900/20 border border-red-800 rounded-xl">
            <div className="text-sm text-red-400">{error}</div>
          </div>
        )}

        {/* Proceed Button */}
        <button
          onClick={onProceed}
          disabled={!isVerified}
          className={`w-full py-3 px-4 rounded-xl font-medium transition-all ${
            isVerified ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-gray-700 text-gray-400 cursor-not-allowed"
          }`}
        >
          {isVerified ? "Proceed" : "Complete Verification to Continue"}
        </button>
      </div>
    </div>
  )
}
