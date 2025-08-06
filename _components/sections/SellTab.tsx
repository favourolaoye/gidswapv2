import { Button } from "@/src/components/ui/button";
import Image from "next/image";
import { useEffect, useState } from "react";
import { currencies, Currency } from "./Hero";
import { ArrowUpDown, ChevronDown } from "lucide-react";
import { DropdownMenu, DropdownMenuItem } from "@/components/ui/dropdown-menu";

const SwapForm: React.FC<{
  sendAmount: string;
  setSendAmount: (value: string) => void;
  sendCurrency: Currency;
  setSendCurrency: (currency: Currency) => void;
  receiveAmount: string;
  setReceiveAmount: (value: string) => void;
  receiveCurrency: Currency;
  setReceiveCurrency: (currency: Currency) => void;
  tab: string;
}> = ({
  sendAmount,
  setSendAmount,
  sendCurrency,
  setSendCurrency,
  receiveAmount,
  setReceiveAmount,
  receiveCurrency,
  setReceiveCurrency,
  tab,
}) => {
  const handleAmountChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: (value: string) => void
  ) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value) || value === "") {
      setter(value);
    }
  };

  useEffect(() => {
    if (
      sendAmount &&
      sendCurrency.name !== "Select currency" &&
      receiveCurrency.name !== "Select currency"
    ) {
      const sendValue = parseFloat(sendAmount) || 0;
      const converted = sendValue * (sendCurrency.rate / receiveCurrency.rate);
      setReceiveAmount(converted.toFixed(6));
    } else {
      setReceiveAmount("0");
    }
  }, [sendAmount, sendCurrency, receiveCurrency, setReceiveAmount]);

  const [showModal, setShowModal] = useState(false);
  return (
    <form className="grid gap-3 text-sm text-gray-700 transition-all dark:text-white">
      <div className="relative rounded-[20px] bg-gray-100 p-3 dark:bg-white/5 backdrop-blur-sm">
        <div className="flex space-y-2 flex-col">
          <h3 className="px-2 py-1 text-base font-medium">Swap</h3>
          {/* Send Field */}
          <div className="flex flex-col space-y-2 rounded-xl bg-white px-3 py-2 dark:bg-neutral-900 shadow-sm">
            <label
              htmlFor={`amount-sent-${tab}`}
              className="text-gray-500 dark:text-white/50"
            >
              From
            </label>
            <div className="flex items-center justify-between gap-2">
              <input
                id={`amount-sent-${tab}`}
                inputMode="decimal"
                className="w-full rounded-lg border-b border-transparent bg-transparent py-1 text-2xl outline-none placeholder:text-gray-400  text-neutral-900 dark:text-white/80"
                value={sendAmount}
                onChange={(e) => handleAmountChange(e, setSendAmount)}
                placeholder="0"
                type="text"
                maxLength={10}
              />
              <DropdownMenu>
                {currencies.map((curr) => (
                  <DropdownMenuItem>
                    <Button
                      variant="outline"
                      size="sm"
                      className="futuristic-button flex h-8 items-center gap-1 rounded-full p-1 bg-transparent border-[#0d6fde] text-[#0d6fde] hover:bg-[#0d6fde]/10 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-400/10 hover:shadow-[0_0_6px_rgba(13,111,222,0.3)]"
                      onClick={(e) => {
                        e.preventDefault();
                        setSendCurrency(curr);
                      }}
                    >
                      <Image
                        src={curr.logo}
                        alt={`${curr.name} Logo`}
                        width={16}
                        height={16}
                        className="w-4 h-4"
                      />
                      <p className="text-xs font-medium">{curr.name}</p>
                      <ChevronDown className="size-3 text-[#0d6fde] dark:text-blue-400" />
                    </Button>
                  </DropdownMenuItem>
                ))}
              </DropdownMenu>
            </div>
          </div>

          {/* Swap Arrow */}
          <div
            className="absolute top-1/2 left-1/2 z-10 w-fit -translate-x-1/2 rounded-full border-2 border-gray-50 bg-gray-50 dark:border-white/5 dark:bg-neutral-800"
            role="img"
            aria-label="Swap send and receive currencies"
          >
            <div className="rounded-full bg-white p-1 dark:bg-neutral-800">
              <ArrowUpDown className="text-lg text-[#0d6fde] dark:text-blue-400" />
            </div>
          </div>

          {/* Receive Field */}
          <div className="flex flex-col space-y-2 rounded-xl bg-white px-3 py-2 dark:bg-neutral-900 shadow-sm">
            <label
              htmlFor={`amount-received-${tab}`}
              className="text-gray-500 dark:text-white/50"
            >
              To
            </label>
            <div className="flex items-center justify-between gap-2">
              <input
                id={`amount-received-${tab}`}
                inputMode="decimal"
                className="w-full rounded-lg border-b border-transparent bg-transparent py-1 text-2xl outline-none placeholder:text-gray-400 text-neutral-900 dark:text-white/80 cursor-not-allowed"
                value={receiveAmount}
                readOnly
                placeholder="0"
                title="Converted amount to receive"
              />
              <Button
                variant="outline"
                size="sm"
                className="futuristic-button flex h-8 items-center gap-1 rounded-full p-1 text-[#0d6fde] hover:bg-[#0d6fde]/10"
                onClick={(e) => {
                  e.preventDefault();
                  setReceiveCurrency(currencies[1]);
                }}
              >
                <Image
                  src={receiveCurrency.logo || "/images/usdc-logo.svg"}
                  alt={`${receiveCurrency.name} Logo`}
                  width={16}
                  height={16}
                  className="w-4 h-4"
                />
                <p className="text-xs font-medium">{receiveCurrency.name}</p>
                <ChevronDown className="size-3 text-[#0d6fde] dark:text-blue-400" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Button
        disabled={
          !sendAmount ||
          sendAmount === "0" ||
          sendCurrency.name === "Select currency" ||
          receiveCurrency.name === "Select currency"
        }
        className="futuristic-button bg-gradient-to-r from-[#0d6fde] to-[#3b82f6] text-white rounded-full px-6 py-2 mt-4 hover:scale-105 hover:opacity-90 hover:shadow-[0_0_15px_rgba(13,111,222,0.5)] dark:from-[#0d6fde]/80 dark:to-[#3b82f6]/80 dark:hover:shadow-[0_0_15px_rgba(13,111,222,0.3)] disabled:bg-gray-300 disabled:text-white disabled:hover:scale-100 disabled:hover:shadow-none dark:disabled:bg-white/10 dark:disabled:text-white/50 transition-all duration-300 font-orbitron"
        onClick={() => setShowModal(true)}
        aria-disabled={
          !sendAmount ||
          sendAmount === "0" ||
          sendCurrency.name === "Select currency" ||
          receiveCurrency.name === "Select currency"
        }
      >
        Swap
      </Button>
    </form>
  );
};
