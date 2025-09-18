import { ChevronDown } from "lucide-react";
import { AnimatedSection } from "@/src/components/ui/animate-section";
import { useState } from "react";
import TextType from "@/src/components/ui/textType";
import { currencies } from "@/lib/constants";
import HeroSwapForm from "./HeroSwapForm";

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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const actions = ["Buy", "Sell", "Swap"];

  const handleSwap = () => {
    if (!isLoggedIn) {
      setShowModal(true);
    } else {
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
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-y-auto py-20"
    >
      {/* Background Glow Effects */}
      <div className="absolute inset-0 overflow-hidden">
      
        {/* <div className="absolute top-[-200px] left-[-200px] h-[500px] w-[500px] rounded-full bg-blue-500/30 blur-[160px] animate-glow" />

       
        <div className="absolute bottom-[-200px] right-[-200px] h-[500px] w-[500px] rounded-full bg-blue-500/30 blur-[160px] animate-glow" />

      
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 h-[400px] w-[400px] rounded-full bg-indigo-400/20 blur-[200px] animate-glow" /> */}
      </div>

      {/* Hero Content */}
      <div className="flex h-full flex-col justify-center relative z-10">
        <AnimatedSection className="w-full">
          <section className="w-full px-5 mb-12">
            <h1 className="flex flex-col items-center gap-1 text-center font-semibold font-poppins tracking-wider">
              <TextType
                className="text-4xl sm:text-[2.5rem] md:text-[3.5rem] lg:text-[4rem] transition-all duration-500 ease-out opacity-100"
                text={actions.map((text) => text)}
                typingSpeed={500}
                pauseDuration={1500}
                showCursor={true}
                cursorCharacter="<"
              />
              <span className="text-[2.5rem] sm:text-[2.5rem] font-bold md:text-[3.25rem] lg:text-[5.5rem] font-playfair italic tracking-wide">
                crypto in seconds.
              </span>
            </h1>
          </section>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <div className="px-5">
            <div className="mx-auto max-w-md bg-white/50 dark:bg-neutral-900/50 backdrop-blur-md rounded-2xl px-4 py-8 shadow-lg border border-[#0d6fde]/20 dark:border-blue-400/20">
              <HeroSwapForm
                sendAmount={sendAmount}
                setSendAmount={setSendAmount}
                sendCurrency={sendCurrency}
                setSendCurrency={setSendCurrency}
                receiveAmount={receiveAmount}
                setReceiveAmount={setReceiveAmount}
                receiveCurrency={receiveCurrency}
                setReceiveCurrency={setReceiveCurrency}
                setShowModal={setShowModal}
                tab={selectedTab}
              />
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
