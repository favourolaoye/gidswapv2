"use client";

import { Button } from "@/src/components/ui/button";
import { useEffect } from "react";
import { ArrowUpDown } from "lucide-react";
import { useState } from "react";
import { useSwapStore } from "@/lib/store";
import Swapfooter from "./swap-footer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";

interface Currency {
  code: string;
  coin: string;
  network: string;
  name: string;
  logo: string;
  color: string;
  recv: number;
  send: number;
}

interface SwapCardProps {
  onSwap: (swapData: any) => void;
  isLoading?: boolean;
}

function CurrencyDropdown({
  currency,
  currencies,
  onSelect,
}: {
  currency: Currency | null;
  currencies: Currency[];
  onSelect?: (currency: Currency) => void;
}) {
  const handleChange = (value: string) => {
    const selected = currencies.find((c) => c.code === value);
    if (selected && onSelect) {
      onSelect(selected);
    }
  };

  return (
    <Select onValueChange={handleChange} defaultValue={currency?.code}>
      <SelectTrigger
        className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white rounded-full px-4 py-2 flex items-center gap-2 shadow-sm hover:shadow focus:ring-2 focus:ring-blue-500/30"
        aria-label={`Select ${currency?.coin || "currency"} to ${
          currency ? "change" : "select"
        }`}
      >
        {currency ? (
          <>
            <img
              src={currency.logo || "/placeholder.svg"}
              alt={currency.coin}
              className="w-5 h-5 rounded-full"
            />
            <span className="text-sm font-medium">{currency.coin}</span>
          </>
        ) : (
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Select
          </span>
        )}
      </SelectTrigger>
      <SelectContent className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg rounded-xl max-h-60 overflow-y-auto z-50">
        {currencies.map((curr) => (
          <SelectItem
            key={curr.code}
            value={curr.code}
            // className="flex items-center gap-3 p-2 hover:bg-[#3a3d4a]"
            className="flex items-center gap-3 p-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <img
              src={curr.logo || "/placeholder.svg"}
              alt={curr.coin}
              className="w-6 h-6 rounded-full flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <div className="text-gray-900 dark:text-white font-medium truncate">
                {curr.coin}
              </div>
              <div className="text-gray-500 dark:text-gray-400 text-sm truncate">
                {curr.name}
              </div>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

function SwapSection({
  type,
  amount,
  currency,
  currencies,
  usdValue,
  onAmountChange,
  onCurrencySelect,
}: {
  type: "sell" | "receive";
  amount: string;
  currency: Currency | null;
  currencies: Currency[];
  usdValue?: string;
  onAmountChange?: (value: string) => void;
  onCurrencySelect?: (currency: Currency) => void;
  dropdownOpen: boolean;
  onDropdownToggle: () => void;
}) {
  return (
    <div className="bg-gray-100 dark:bg-black p-4 rounded-xl">
      <div className="flex items-center justify-between mb-2">
        <label className="font-medium text-gray-500 dark:text-gray-400 text-sm capitalize">
          {type}
        </label>
        <CurrencyDropdown
          currency={currency}
          currencies={currencies}
          onSelect={onCurrencySelect}
        />
      </div>
      <input
        type="text"
        value={amount ?? ""}
        onChange={(e) => onAmountChange?.(e.target.value)}
        readOnly={type === "receive"}
        placeholder="0.00"
        className="w-full bg-transparent text-2xl md:text-3xl font-bold text-black dark:text-white placeholder-gray-500 border-none outline-none"
        aria-label={`${type} amount`}
      />
      {usdValue && (
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-900 dark:bg-blue-300 rounded-full flex items-center justify-center">
            <span className="text-xs font-bold text-white dark:text-dark">
              $
            </span>
          </div>
          <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm">
            {usdValue}
          </span>
        </div>
      )}
    </div>
  );
}

export function SwapCard({ onSwap, isLoading }: SwapCardProps) {
  const {
    sellAmount,
    receiveAmount,
    currencies,
    sellCurrency,
    receiveCurrency,
    quote,
    isLoadingCurrencies,
    setSellAmount,
    setReceiveAmount,
    setSellCurrency,
    setReceiveCurrency,
    fetchQuote,
    showQuote,
  } = useSwapStore();

  const [sellDropdownOpen, setSellDropdownOpen] = useState(false);
  const [receiveDropdownOpen, setReceiveDropdownOpen] = useState(false);

  const sellAmountNum = Number.parseFloat(sellAmount);
  const isAmountTooLow = quote && sellAmount && sellAmountNum < quote.from.min;
  const isAmountTooHigh = quote && sellAmount && sellAmountNum > quote.from.max;
  const hasValidationError = isAmountTooLow || isAmountTooHigh;

  const isFormValid =
    !!sellAmount &&
    sellAmountNum > 0 &&
    !!sellCurrency &&
    !!receiveCurrency &&
    !!quote &&
    !hasValidationError;

  useEffect(() => {
    fetchQuote();
  }, [sellAmount, sellCurrency, receiveCurrency, fetchQuote]);

  const handleSellCurrencySelect = (currency: Currency) => {
    setSellCurrency(currency);
    if (currency.coin === receiveCurrency?.coin) {
      const alt = currencies.find((c) => c.coin !== currency.coin);
      setReceiveCurrency(alt || null);
    }
  };

  const handleReceiveCurrencySelect = (currency: Currency) => {
    setReceiveCurrency(currency);
    if (currency.coin === sellCurrency?.coin) {
      const alt = currencies.find((c) => c.coin !== currency.coin);
      setSellCurrency(alt || null);
    }
  };

  const handleSwap = async () => {
    if (!isFormValid) return;

    const swapData = {
      fromCcy: sellCurrency!.code,
      toCcy: receiveCurrency!.code,
      amount: Number.parseFloat(sellAmount),
      direction: "from",
      type: "float",
      quote: quote,
      sellCurrency: sellCurrency,
      receiveCurrency: receiveCurrency,
    };

    showQuote(swapData);
  };

  if (isLoadingCurrencies) {
    return (
      <div className="w-full max-w-md mx-auto p-6">
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 text-center shadow-sm">
          <p className="text-gray-600 dark:text-gray-400">
            Loading currencies...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl py-6 px-4 mb-6 shadow-sm">
        <div className="space-y-1 flex flex-col relative">
          <div>
            <SwapSection
              type="sell"
              amount={sellAmount}
              currency={sellCurrency}
              currencies={currencies}
              usdValue={quote ? `$${quote.from.usd.toFixed(2)}` : undefined}
              onAmountChange={setSellAmount}
              onCurrencySelect={handleSellCurrencySelect}
              dropdownOpen={sellDropdownOpen}
              onDropdownToggle={() => {
                setSellDropdownOpen(!sellDropdownOpen);
                setReceiveDropdownOpen(false);
              }}
            />
          </div>

          {/* Swap Arrow Button */}

          <Button
            variant="ghost"
            size="sm"
            className="bg-gray-100 dark:bg-black border-4 border-white dark:border-gray-800 hover:bg-[#4a4d5a] rounded-full p-2 
    absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
    z-10 w-10 h-10 flex items-center justify-center
    transition-transform duration-300 hover:scale-110"
            aria-label="Swap currencies"
            onClick={() => {
              setSellCurrency(receiveCurrency);
              setReceiveCurrency(sellCurrency);
              setSellAmount(receiveAmount);
              setReceiveAmount(sellAmount);
            }}
          >
            <ArrowUpDown className="w-5 h-5 text-black dark:text-white text-bold" />
          </Button>

          {/* Receive Section */}
          <div>
            <SwapSection
              type="receive"
              amount={receiveAmount}
              currency={receiveCurrency}
              currencies={currencies}
              usdValue={quote ? `$${quote.to.usd.toFixed(2)}` : undefined}
              onAmountChange={setReceiveAmount}
              onCurrencySelect={handleReceiveCurrencySelect}
              dropdownOpen={receiveDropdownOpen}
              onDropdownToggle={() => {
                setReceiveDropdownOpen(!receiveDropdownOpen);
                setSellDropdownOpen(false);
              }}
            />
          </div>
        </div>
        {hasValidationError && (
          <div className="mt-2 text-sm text-red-500 dark:text-red-400">
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

      {quote && (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 mb-6 text-sm shadow-sm">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="font-medium text-gray-700 dark:text-gray-300">
                Minimum
              </span>
              <span className="text-gray-900 dark:text-white">
                {quote.from.min} {quote.from.coin}
              </span>
            </div>
            <div className="flex justify-between mb-1">
              <span className="font-medium text-gray-700 dark:text-gray-300">
                Maximum
              </span>
              <span className="text-gray-900 dark:text-white">
                {quote.from.max} {quote.from.coin}
              </span>
            </div>
            <div className="flex justify-between mb-1">
              <span className="font-medium text-gray-700 dark:text-gray-300">
                Network
              </span>
              <span className="text-gray-900 dark:text-white">
                {quote.to.network}
              </span>
            </div>
            <div className="flex justify-between mb-1">
              <span className="font-medium text-gray-700 dark:text-gray-300">
                Rate
              </span>
              <span className="text-gray-900 dark:text-white">
                1 {quote.from.coin} ≈ {quote.from.rate.toFixed(2)}{" "}
                {quote.to.coin}
              </span>
            </div>
          </div>

          <div className="pt-3 mt-3 border-t border-gray-100 dark:border-gray-700">
            <Swapfooter />
          </div>
        </div>
      )}

      <Button
        className="w-full bg-blue-900 hover:bg-blue-500 text-white font-semibold py-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={handleSwap}
        disabled={!isFormValid || isLoading}
      >
        {isLoading ? "Processing..." : "Swap"}
      </Button>
    </div>
  );
}
