import { ArrowUpDown, ChevronDown } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { AnimatedSection } from "@/src/components/ui/animate-section";
import { useEffect, useState } from "react";
import Image from "next/image";
import { TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs";
import { Tabs } from "@radix-ui/react-tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog";
import TextType from "@/src/components/ui/textType";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/src/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";

export interface Currency {
  name: string;
  logo: string;
  rate: number;
}

export const currencies: Currency[] = [
  { name: "USDC", logo: "/images/usdc-logo.svg", rate: 1 },
  { name: "ETH", logo: "/images/usdc-logo.svg", rate: 0.0005 },
  { name: "BTC", logo: "/images/usdc-logo.svg", rate: 0.00002 },
];

const SwapForm: React.FC<{
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
      setReceiveAmount(converted.toFixed(6));
    } else {
      setReceiveAmount("0");
    }
  }, [sendAmount, sendCurrency, receiveCurrency, setReceiveAmount]);

  // const [showModal, setShowModal] = useState(false);
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

export default function Hero() {
  const [sendAmount, setSendAmount] = useState("0");
  const [receiveAmount, setReceiveAmount] = useState("0");
  const [selectedTab, setSelectedTab] = useState("buy");
  const [sendCurrency, setSendCurrency] = useState(currencies[0]);
  const [receiveCurrency, setReceiveCurrency] = useState({
    name: "Select currency",
    logo: "",
    rate: 1,
  });
  const [showModal, setShowModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Placeholder for auth check
  const [currentAction, setCurrentAction] = useState("Buy");
  const actions = ["Buy", "Sell", "Swap"];

  const handleSwap = () => {
    if (!isLoggedIn) {
      setShowModal(true);
    } else {
      // Implement swap logic here
      console.log("Swap initiated:", {
        sendAmount,
        sendCurrency,
        receiveAmount,
        receiveCurrency,
      });
    }
  };
  return (
    <div
      id="hero"
      className="flex min-h-screen w-full flex-col items-center justify-center overflow-y-auto py-20"
    >
      <div className="flex h-full flex-col justify-center">
        <AnimatedSection className="w-full">
          <section className="w-full px-5 mb-12">
            <h1 className="flex flex-col items-center gap-1 text-center font-semibold">
              <TextType
                className="text-3xl sm:text-[2.5rem] md:text-[3.5rem] lg:text-[4rem] transition-all duration-500 ease-out opacity-100"
                text={actions.map((text) => text)}
                typingSpeed={500}
                pauseDuration={1500}
                showCursor={true}
                cursorCharacter="|"
              />
              <span className="text-[2rem] sm:text-[2.5rem] font-bold md:text-[3.25rem] lg:text-[4rem] font-crimson italic">
                crypto for cash in seconds.
              </span>
            </h1>
          </section>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <div className="px-5">
            <div className="mx-auto max-w-md bg-white/50 dark:bg-neutral-900/50 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-[#0d6fde]/20 dark:border-blue-400/20">
              <Tabs
                value={selectedTab}
                onValueChange={setSelectedTab}
                className="w-full space-y-3"
              >
                <TabsList className="grid grid-cols-3 w-full bg-gray-100/50 dark:bg-neutral-800/50 rounded-full p-0.5">
                  {["buy", "sell", "convert"].map((tab) => (
                    <TabsTrigger
                      key={tab}
                      value={tab}
                      className="futuristic-button relative z-10 rounded-full py-1.5 text-sm font-medium text-gray-700 dark:text-white/80 data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#0d6fde] data-[state=active]:to-[#3b82f6] data-[state=active]:text-white hover:bg-[#0d6fde]/10 dark:hover:bg-blue-400/10 hover:shadow-[0_0_6px_rgba(13,111,222,0.3)] dark:hover:shadow-[0_0_6px_rgba(59,130,246,0.2)] transition-all duration-300"
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </TabsTrigger>
                  ))}
                </TabsList>
                {["buy", "sell", "convert"].map((tab) => (
                  <TabsContent key={tab} value={tab} className="w-full mt-0">
                    <SwapForm
                      sendAmount={sendAmount}
                      setSendAmount={setSendAmount}
                      sendCurrency={sendCurrency}
                      setSendCurrency={setSendCurrency}
                      receiveAmount={receiveAmount}
                      setReceiveAmount={setReceiveAmount}
                      receiveCurrency={receiveCurrency}
                      setReceiveCurrency={setReceiveCurrency}
                      setShowModal={setShowModal}
                      tab={tab}
                    />
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          </div>
        </AnimatedSection>

        {/* Scroll down to learn more */}
        <div className="flex flex-col gap-3 mt-20">
          <div className="select-none text-sm mx-auto font-normal text-gray-400 dark:text-white/30 animate-bounce">
            Scroll down to learn more
          </div>
          <div className="mx-auto animate-bounce">
            <ChevronDown className="w-5 h-5 text-gray-300 dark:text-white/50" />
          </div>
        </div>
      </div>
    </div>
  );
}
