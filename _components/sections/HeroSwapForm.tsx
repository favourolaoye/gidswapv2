import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/src/components/ui/select";
import { currencies } from "@/lib/constants";
import { Currency } from "@/lib/types";
import { Button } from "@/src/components/ui/button";
import { useAuthStore } from "@/store/Authstore";
import { ArrowUpDown } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";

const HeroSwapForm: React.FC<{
  sendAmount: string;
  setSendAmount: (value: string) => void;
  sendCurrency: Currency;
  setSendCurrency: (currency: Currency) => void;
  receiveAmount: string;
  setReceiveAmount: (value: string) => void;
  receiveCurrency: Currency;
  setReceiveCurrency: (currency: Currency) => void;
  setShowModal: (value: boolean) => void;
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
  setShowModal,
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
      setReceiveAmount(converted.toFixed(4));
    } else {
      setReceiveAmount("0");
    }
  }, [sendAmount, sendCurrency, receiveCurrency, setReceiveAmount]);

  const {
    isAuthenticated,
    regStatus,
    setRegisterModalOpen,
    setLoginModalOpen,
    initializeAuth,
    logout,
  } = useAuthStore();

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  const handleRegisterClick = (e: any) => {
    e.preventDefault();
    setRegisterModalOpen(true);
  };

  const handleSignInClick = (e: any) => {
    e.preventDefault();
    setLoginModalOpen(true);
  };

  return (
    <form className="grid gap-6 text-sm text-gray-700 transition-all dark:text-white">
      <div className="relative rounded-[20px] bg-gray-100 p-3 dark:bg-white/5 backdrop-blur-sm">
        <div className="flex space-y-2 flex-col">
          <div className="flex flex-col gap-1 px-2 py-1">
            <h3 className="text-2xl font-medium">Swap</h3>
            <p>Exchange your fiat for crypto in an instant</p>
          </div>
          {/* Send Field */}
          <div className="flex flex-col space-y-2 rounded-xl bg-white px-3 py-2 dark:bg-neutral-900 shadow-sm">
            <label
              htmlFor={`amount-sent-${tab}`}
              className="text-gray-500 dark:text-white/50"
            >
              Send
            </label>
            <div className="flex items-center justify-between gap-2">
              <input
                id={`amount-sent-${tab}`}
                inputMode="decimal"
                className="w-full rounded-lg border-b border-transparent bg-transparent py-1 text-2xl outline-none placeholder:text-gray-400  text-neutral-900 dark:text-white/80 invalid:border-red-500"
                value={sendAmount}
                onChange={(e) => handleAmountChange(e, setSendAmount)}
                placeholder="0"
                type="text"
                maxLength={10}
                aria-describedby="send-error"
              />
              <Select
                onValueChange={(value: string) =>
                  setSendCurrency(currencies.find((c) => c.name === value)!)
                }
                defaultValue={sendCurrency.name}
              >
                <SelectTrigger className="futuristic-button min-w-[100px] rounded-full flex h-8 items-center gap-2 p-2 border-[#0b5cb5] text-[#0b5cb5] hover:bg-[#0b5cb5]/10 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-400/10 hover:shadow-[0_0_6px_rgba(11,92,181,0.3)]">
                  <Image
                    src={sendCurrency.logo}
                    alt={`${sendCurrency.name} cryptocurrency logo`}
                    width={16}
                    height={16}
                    className="w-4 h-4"
                  />
                  <span className="text-xs font-medium">
                    {sendCurrency.name}
                  </span>
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((currency) => (
                    <SelectItem key={currency.name} value={currency.name}>
                      <Image
                        src={currency.logo}
                        alt={`${currency.name} cryptocurrency logo`}
                        width={16}
                        height={16}
                        className="w-4 h-4"
                      />
                      {currency.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {sendAmount && !/^\d*\.?\d*$/.test(sendAmount) && (
              <p id="send-error" className="text-xs text-red-500">
                Please enter a valid number.
              </p>
            )}
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
              Receive
            </label>
            <div className="flex items-center justify-between gap-2">
              <input
                id={`amount-received-${tab}`}
                inputMode="decimal"
                className="w-full rounded-lg border-b border-transparent bg-transparent py-1 text-2xl outline-none placeholder:text-gray-400 text-neutral-900 dark:text-white/80 cursor-not-allowed"
                value={receiveAmount}
                readOnly
                placeholder="0"
                title="Estimated amount to receive"
              />
              <Select
                onValueChange={(value: string) =>
                  setReceiveCurrency(currencies.find((c) => c.name === value)!)
                }
                defaultValue={receiveCurrency.name}
              >
                <SelectTrigger className="futuristic-button min-w-[150px] w-fit flex h-9 items-center gap-2 rounded-full p-2 border-[#0b5cb5] text-[#0b5cb5] hover:bg-[#0b5cb5]/10 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-400/10 hover:shadow-[0_0_6px_rgba(11,92,181,0.3)]">
                  <Image
                    src={receiveCurrency.logo || "/images/usdc-logo.svg"}
                    alt={`${receiveCurrency.name} cryptocurrency logo`}
                    width={16}
                    height={16}
                    className="w-4 h-4"
                  />
                  <span className="text-xs font-medium">
                    {receiveCurrency.name}
                  </span>
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((currency) => (
                    <SelectItem key={currency.name} value={currency.name}>
                      {currency.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      <Button
        className="futuristic-button bg-gradient-to-r from-[#0d6fde] to-[#3b82f6] text-white rounded-full px-6 py-2 mt-4 hover:scale-105 hover:opacity-90 hover:shadow-[0_0_15px_rgba(13,111,222,0.5)] dark:from-[#0d6fde]/80 dark:to-[#3b82f6]/80 dark:hover:shadow-[0_0_15px_rgba(13,111,222,0.3)] disabled:bg-gray-300 disabled:text-white disabled:hover:scale-100 disabled:hover:shadow-none dark:disabled:bg-white/10 dark:disabled:text-white/50 transition-all duration-300 font-orbitron"
        onClick={handleSignInClick}
      >
        Swap
      </Button>
    </form>
  );
};

export default HeroSwapForm;
