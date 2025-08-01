import { ArrowUpDown, ChevronDown } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { AnimatedSection } from "@/src/components/ui/animate-section";
import { Input } from "@/src/components/ui/input";
import { useState } from "react";
import Image from "next/image";
import { TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tabs } from "@radix-ui/react-tabs";

export default function Hero() {
  const [sendAmount, setSendAmount] = useState("0");
  const [selectedTab, setSelectedTab] = useState("buy");

  const [receiveAmount, setReceiveAmount] = useState("0");
  const [sendCurrency, setSendCurrency] = useState("USDC");
  const [receiveCurrency, setReceiveCurrency] = useState("Select currency");
  return (
    <div
      id="hero"
      className="flex min-h-screen w-full flex-col items-center justify-center overflow-y-auto py-20"
    >
      <div className="flex flex-1 flex-col justify-center">
        <AnimatedSection className="w-full">
          <section className="w-full px-5 mb-12">
            <h1 className="flex flex-col items-center gap-1 text-center font-semibold">
              <span className="text-3xl text-gray-600 dark:text-white/80 sm:text-[2.5rem] md:text-[3.5rem] lg:text-[4rem]">
                Buy, sell, or swap
              </span>
              <span className="text-[2rem] font-bold sm:text-[3.25rem] md:text-[4.75rem] lg:text-[5.25rem]">
                crypto for cash in seconds.
              </span>
            </h1>
          </section>
        </AnimatedSection>

        <Tabs
          value={selectedTab}
          onValueChange={setSelectedTab}
          className="w-full space-y-6"
        >
          <div className="flex justify-center mb-8">
            <TabsList className="grid grid-cols-3 w-full max-w-md">
              <TabsTrigger value="buy">Buy</TabsTrigger>
              <TabsTrigger value="sell">Sell</TabsTrigger>
              <TabsTrigger value="convert">Convert</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="buy" id="buy" className="w-full">
            <AnimatedSection delay={0.2}>
              <div className="px-5">
                <div className="mx-auto max-w-[27.3125rem]">
                  <form className="grid gap-4 pb-20 text-sm text-gray-700 transition-all dark:text-white sm:gap-2">
                    <div className="grid gap-2 relative rounded-[20px] bg-gray-50 p-2 dark:bg-white/5">
                      <h3 className="px-2 py-1 text-base font-medium">Swap</h3>

                      <div className="relative flex flex-col space-y-4 rounded-2xl bg-white px-4 py-3 dark:bg-neutral-900">
                        <label
                          htmlFor="amount-sent"
                          className="text-gray-500 dark:text-white/50"
                        >
                          Send
                        </label>
                        <div className="flex items-center justify-between gap-2">
                          <input
                            id="amount-sent"
                            inputMode="decimal"
                            className="w-full rounded-xl border-b border-transparent bg-transparent py-2 text-3xl outline-none transition-all placeholder:text-gray-400 focus:outline-none disabled:cursor-not-allowed dark:placeholder:text-white/30 text-neutral-900 dark:text-white/80"
                            value={sendAmount}
                            onChange={(e) => setSendAmount(e.target.value)}
                            placeholder="0"
                            title="Enter amount to send"
                            type="text"
                          />
                          <div className="relative">
                            <Button
                              variant="secondary"
                              size="sm"
                              className="flex h-9 items-center gap-1 rounded-full p-1.5 bg-gray-50 dark:bg-neutral-700"
                            >
                              <div className="mr-1 flex items-center gap-1">
                                <Image
                                  src={"/images/usdc-logo.svg"}
                                  alt="USDC Logo"
                                  height={100}
                                  width={100}
                                  className="w-5 h-5"
                                />
                                <p className="text-sm font-medium">USDC</p>
                              </div>
                              <ChevronDown className="size-4 ml-5 mr-1 text-gray-400 dark:text-white/50" />
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* Swap Arrow */}
                      <div className="absolute top-1/2 left-1/2 z-10 w-fit -translate-x-1/2 rounded-full border-4 border-gray-50 bg-gray-50 dark:border-white/5 dark:bg-neutral-800">
                        <div className="rounded-full bg-white p-0.5 dark:bg-neutral-800">
                          <ArrowUpDown className="text-xl text-gray-400 dark:text-white/80" />
                        </div>
                      </div>

                      <div className="flex flex-col space-y-4 rounded-2xl bg-white px-4 py-3 dark:bg-neutral-900">
                        <label
                          htmlFor="amount-received"
                          className="text-gray-500 dark:text-white/50"
                        >
                          Receive
                        </label>
                        <div className="flex items-center justify-between gap-2">
                          <input
                            id="amount-received"
                            inputMode="decimal"
                            className="w-full rounded-xl border-b border-transparent bg-transparent py-2 text-3xl outline-none transition-all placeholder:text-gray-400 focus:outline-none disabled:cursor-not-allowed dark:placeholder:text-white/30 text-neutral-900 dark:text-white/80"
                            value={Number(receiveAmount) * 2}
                            onChange={(e) => setReceiveAmount(e.target.value)}
                            placeholder="0"
                            title="Enter amount to receive"
                            type="text"
                          ></input>
                          <div className="relative">
                            <Button
                              variant="default"
                              size="sm"
                              className="flex h-9 rounded-full px-4 bg-blue-400  font-bolder hover: text-blue-900"
                            >
                              <div className="flex gap-1 items-center">
                                <p className="whitespace-nowrap font-medium">
                                  Select currency
                                </p>
                                <ChevronDown className="size-4 text-blue" />
                              </div>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Button
                      disabled
                      className="bg-purple-500 text-white disabled:bg-gray-300 disabled:text-white dark:disabled:bg-white/10 dark:disabled:text-white/50"
                    >
                      Swap
                    </Button>
                  </form>
                </div>
              </div>
            </AnimatedSection>
          </TabsContent>
          <TabsContent value="sell" id="sell" className="w-full">
            <AnimatedSection delay={0.2}>
              <div className="px-5">
                <div className="mx-auto max-w-[27.3125rem]">
                  <form className="grid gap-4 pb-20 text-sm text-gray-700 transition-all dark:text-white sm:gap-2">
                    <div className="grid gap-2 relative rounded-[20px] bg-gray-50 p-2 dark:bg-white/5">
                      <h3 className="px-2 py-1 text-base font-medium">Swap</h3>

                      <div className="relative flex flex-col space-y-4 rounded-2xl bg-white px-4 py-3 dark:bg-neutral-900">
                        <label
                          htmlFor="amount-sent"
                          className="text-gray-500 dark:text-white/50"
                        >
                          Send
                        </label>
                        <div className="flex items-center justify-between gap-2">
                          <input
                            id="amount-sent"
                            inputMode="decimal"
                            className="w-full rounded-xl border-b border-transparent bg-transparent py-2 text-3xl outline-none transition-all placeholder:text-gray-400 focus:outline-none disabled:cursor-not-allowed dark:placeholder:text-white/30 text-neutral-900 dark:text-white/80"
                            value={sendAmount}
                            onChange={(e) => setSendAmount(e.target.value)}
                            placeholder="0"
                            title="Enter amount to send"
                            type="text"
                          />
                          <div className="relative">
                            <Button
                              variant="secondary"
                              size="sm"
                              className="flex h-9 items-center gap-1 rounded-full p-1.5 bg-gray-50 dark:bg-neutral-700"
                            >
                              <div className="mr-1 flex items-center gap-1">
                                <Image
                                  src={"/images/usdc-logo.svg"}
                                  alt="USDC Logo"
                                  height={100}
                                  width={100}
                                  className="w-5 h-5"
                                />
                                <p className="text-sm font-medium">USDC</p>
                              </div>
                              <ChevronDown className="size-4 ml-5 mr-1 text-gray-400 dark:text-white/50" />
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* Swap Arrow */}
                      <div className="absolute top-1/2 left-1/2 z-10 w-fit -translate-x-1/2 rounded-full border-4 border-gray-50 bg-gray-50 dark:border-white/5 dark:bg-neutral-800">
                        <div className="rounded-full bg-white p-0.5 dark:bg-neutral-800">
                          <ArrowUpDown className="text-xl text-gray-400 dark:text-white/80" />
                        </div>
                      </div>

                      <div className="flex flex-col space-y-4 rounded-2xl bg-white px-4 py-3 dark:bg-neutral-900">
                        <label
                          htmlFor="amount-received"
                          className="text-gray-500 dark:text-white/50"
                        >
                          Receive
                        </label>
                        <div className="flex items-center justify-between gap-2">
                          <input
                            id="amount-received"
                            inputMode="decimal"
                            className="w-full rounded-xl border-b border-transparent bg-transparent py-2 text-3xl outline-none transition-all placeholder:text-gray-400 focus:outline-none disabled:cursor-not-allowed dark:placeholder:text-white/30 text-neutral-900 dark:text-white/80"
                            value={Number(receiveAmount) * 2}
                            onChange={(e) => setReceiveAmount(e.target.value)}
                            placeholder="0"
                            title="Enter amount to receive"
                            type="text"
                          ></input>
                          <div className="relative">
                            <Button
                              variant="default"
                              size="sm"
                              className="flex h-9 rounded-full px-4 bg-blue-400  font-bolder hover: text-blue-900"
                            >
                              <div className="flex gap-1 items-center">
                                <p className="whitespace-nowrap font-medium">
                                  Select currency
                                </p>
                                <ChevronDown className="size-4 text-blue" />
                              </div>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Button
                      disabled
                      className="bg-purple-500 text-white disabled:bg-gray-300 disabled:text-white dark:disabled:bg-white/10 dark:disabled:text-white/50"
                    >
                      Swap
                    </Button>
                  </form>
                </div>
              </div>
            </AnimatedSection>
          </TabsContent>
          <TabsContent value="convert" id="convert" className="w-full">
            <AnimatedSection delay={0.2}>
              {/* <div className="px-5 pb-32 sm:pb-24"> */}
              <div className="px-5">
                <div className="mx-auto max-w-[27.3125rem]">
                  <form className="grid gap-4 pb-20 text-sm text-gray-700 transition-all dark:text-white sm:gap-2">
                    <div className="grid gap-2 relative rounded-[20px] bg-gray-50 p-2 dark:bg-white/5">
                      <h3 className="px-2 py-1 text-base font-medium">Swap</h3>

                      <div className="relative flex flex-col space-y-4 rounded-2xl bg-white px-4 py-3 dark:bg-neutral-900">
                        <label
                          htmlFor="amount-sent"
                          className="text-gray-500 dark:text-white/50"
                        >
                          Send
                        </label>
                        <div className="flex items-center justify-between gap-2">
                          <input
                            id="amount-sent"
                            inputMode="decimal"
                            className="w-full rounded-xl border-b border-transparent bg-transparent py-2 text-3xl outline-none transition-all placeholder:text-gray-400 focus:outline-none disabled:cursor-not-allowed dark:placeholder:text-white/30 text-neutral-900 dark:text-white/80"
                            value={sendAmount}
                            onChange={(e) => setSendAmount(e.target.value)}
                            placeholder="0"
                            title="Enter amount to send"
                            type="text"
                          />
                          <div className="relative">
                            <Button
                              variant="secondary"
                              size="sm"
                              className="flex h-9 items-center gap-1 rounded-full p-1.5 bg-gray-50 dark:bg-neutral-700"
                            >
                              <div className="mr-1 flex items-center gap-1">
                                <Image
                                  src={"/images/usdc-logo.svg"}
                                  alt="USDC Logo"
                                  height={100}
                                  width={100}
                                  className="w-5 h-5"
                                />
                                <p className="text-sm font-medium">USDC</p>
                              </div>
                              <ChevronDown className="size-4 ml-5 mr-1 text-gray-400 dark:text-white/50" />
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* Swap Arrow */}
                      <div className="absolute top-1/2 left-1/2 z-10 w-fit -translate-x-1/2 rounded-full border-4 border-gray-50 bg-gray-50 dark:border-white/5 dark:bg-neutral-800">
                        <div className="rounded-full bg-white p-0.5 dark:bg-neutral-800">
                          <ArrowUpDown className="text-xl text-gray-400 dark:text-white/80" />
                        </div>
                      </div>

                      <div className="flex flex-col space-y-4 rounded-2xl bg-white px-4 py-3 dark:bg-neutral-900">
                        <label
                          htmlFor="amount-received"
                          className="text-gray-500 dark:text-white/50"
                        >
                          Receive
                        </label>
                        <div className="flex items-center justify-between gap-2">
                          <input
                            id="amount-received"
                            inputMode="decimal"
                            className="w-full rounded-xl border-b border-transparent bg-transparent py-2 text-3xl outline-none transition-all placeholder:text-gray-400 focus:outline-none disabled:cursor-not-allowed dark:placeholder:text-white/30 text-neutral-900 dark:text-white/80"
                            value={Number(receiveAmount) * 2}
                            onChange={(e) => setReceiveAmount(e.target.value)}
                            placeholder="0"
                            title="Enter amount to receive"
                            type="text"
                          ></input>
                          <div className="relative">
                            <Button
                              variant="default"
                              size="sm"
                              className="flex h-9 rounded-full px-4 bg-blue-400  font-bolder hover: text-blue-900"
                            >
                              <div className="flex gap-1 items-center">
                                <p className="whitespace-nowrap font-medium">
                                  Select currency
                                </p>
                                <ChevronDown className="size-4 text-blue" />
                              </div>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Button
                      disabled
                      className="bg-purple-500 text-white disabled:bg-gray-300 disabled:text-white dark:disabled:bg-white/10 dark:disabled:text-white/50"
                    >
                      Swap
                    </Button>
                  </form>
                </div>
              </div>
            </AnimatedSection>
          </TabsContent>
        </Tabs>

        {/* Scroll down to learn more */}
        <div className="flex flex-col gap-3">
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
