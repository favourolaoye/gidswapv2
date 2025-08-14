import { ArrowUpDown, ChevronDown } from "lucide-react";
import { AnimatedSection } from "@/src/components/ui/animate-section";
import { useEffect, useState } from "react";
import Image from "next/image";
import { TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tabs } from "@radix-ui/react-tabs";
import TextType from "@/src/components/ui/textType";
import { currencies } from "@/lib/constants";
import SwapForm from "./swapform";

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
