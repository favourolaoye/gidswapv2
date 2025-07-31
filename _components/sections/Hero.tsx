import { ArrowUpDown, ChevronDown } from "lucide-react";
import { Button } from "../ui/animate-section";
import { AnimatedSection } from "../ui/animate-section";
import { Input } from "../ui/input";
import { useState } from "react";
import Image from "next/image";

export default function Hero() {
  const [sendAmount, setSendAmount] = useState("0");
  const [receiveAmount, setReceiveAmount] = useState("0");
  const [sendCurrency, setSendCurrency] = useState("USDC");
  const [receiveCurrency, setReceiveCurrency] = useState("Select currency");
  return (
    <div
      id="hero"
      className="flex min-h-screen w-full flex-col items-center justify-center overflow-y-auto py-20"
    >
      <div className="flex flex-1 flex-col justify-center">
        <AnimatedSection>
          <section className="w-full px-5 mb-12">
            <h1 className="flex flex-col items-center gap-1 text-center font-semibold">
              <span className="text-3xl text-gray-600 dark:text-white/80 sm:text-[2.5rem] md:text-[3.5rem] lg:text-[4rem]">
                Change stablecoins
              </span>
              <span className="text-[2.5rem] italic font-bold sm:text-[3.45rem] md:text-[4.75rem] lg:text-[5.25rem]">
                to cash in seconds
              </span>
            </h1>
          </section>
        </AnimatedSection>

        {/* Swap Interface */}
        <AnimatedSection delay={0.2}>
          <div className="px-5 pb-32 sm:pb-24">
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
                  <div className="absolute top-1/2 left-1/2 z-10 w-fit -translate-x-1/2 rounded-xl border-4 border-gray-50 bg-gray-50 dark:border-white/5 dark:bg-neutral-800">
                    <div className="rounded-lg bg-white p-0.5 dark:bg-neutral-800">
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
                        value={receiveAmount}
                        onChange={(e) => setReceiveAmount(e.target.value)}
                        placeholder="0"
                        title="Enter amount to receive"
                        type="text"
                      ></input>
                      <div className="relative">
                        <Button
                          variant="default"
                          size="sm"
                          className="flex h-9 rounded-full px-4 bg-purple-400 text-white"
                        >
                          <div className="flex gap-1 items-center">
                            <p className="whitespace-nowrap font-medium">
                              Select currency
                            </p>
                            <ChevronDown className="size-4 text-white" />
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

        <div
          className="fixed -bottom-10 z-40 flex w-full -translate-x-1/2 flex-col items-center"
          style={{ opacity: 1, transform: "none" }}
        >
          <span className="mb-3">
            <span className="block sm:hidden">
              <svg
                width="2"
                height="35"
                viewBox="0 0 2 35"
                fill="none"
                className="block dark:hidden "
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 1L0.999998 34"
                  stroke="#EBEBEF"
                  stroke-width="0.5"
                  stroke-linecap="round"
                  stroke-dasharray="4 4"
                ></path>
              </svg>
              <svg
                width="2"
                height="35"
                viewBox="0 0 2 35"
                fill="none"
                className="hidden dark:block "
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 1L0.999998 34"
                  stroke="white"
                  stroke-opacity="0.1"
                  stroke-width="0.5"
                  stroke-linecap="round"
                  stroke-dasharray="4 4"
                ></path>
              </svg>
            </span>
            <span className="hidden sm:block">
              <svg
                width="2"
                height="57"
                viewBox="0 0 2 57"
                fill="none"
                className="block dark:hidden "
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 1L0.999998 56"
                  stroke="#EBEBEF"
                  stroke-width="0.5"
                  stroke-linecap="round"
                  stroke-dasharray="4 4"
                ></path>
              </svg>
              <svg
                width="2"
                height="57"
                viewBox="0 0 2 57"
                fill="none"
                className="hidden dark:block "
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 1L0.999998 56"
                  stroke="white"
                  stroke-opacity="0.1"
                  stroke-width="0.5"
                  stroke-linecap="round"
                  stroke-dasharray="4 4"
                ></path>
              </svg>
            </span>
          </span>
          <div
            className="select-none text-sm font-normal text-text-disabled dark:text-white/30"
            style={{ transform: "translateY(-2.92266px)" }}
          >
            Scroll down to learn more
          </div>
          <span className="mt-3">
            <svg
              width="4"
              height="56"
              viewBox="0 0 4 56"
              fill="none"
              className="block dark:hidden"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.25 1C2.25 0.861929 2.13807 0.75 2 0.75C1.86193 0.75 1.75 0.861929 1.75 1L2.25 1ZM2 56L3.44337 53.5L0.556622 53.5L2 56ZM1.75 2.96429C1.75 3.10236 1.86193 3.21429 2 3.21429C2.13807 3.21429 2.25 3.10236 2.25 2.96429L1.75 2.96429ZM2.25 6.89286C2.25 6.75479 2.13807 6.64286 2 6.64286C1.86193 6.64286 1.75 6.75479 1.75 6.89286L2.25 6.89286ZM1.75 10.8214C1.75 10.9595 1.86193 11.0714 2 11.0714C2.13807 11.0714 2.25 10.9595 2.25 10.8214L1.75 10.8214ZM2.25 14.75C2.25 14.6119 2.13807 14.5 2 14.5C1.86193 14.5 1.75 14.6119 1.75 14.75L2.25 14.75ZM1.75 18.6786C1.75 18.8166 1.86193 18.9286 2 18.9286C2.13807 18.9286 2.25 18.8166 2.25 18.6786L1.75 18.6786ZM2.25 22.6071C2.25 22.4691 2.13807 22.3571 2 22.3571C1.86193 22.3571 1.75 22.4691 1.75 22.6071L2.25 22.6071ZM1.75 26.5357C1.75 26.6738 1.86193 26.7857 2 26.7857C2.13807 26.7857 2.25 26.6738 2.25 26.5357L1.75 26.5357ZM2.25 30.4643C2.25 30.3262 2.13807 30.2143 2 30.2143C1.86193 30.2143 1.75 30.3262 1.75 30.4643L2.25 30.4643ZM1.75 34.3929C1.75 34.5309 1.86193 34.6429 2 34.6429C2.13807 34.6429 2.25 34.5309 2.25 34.3929L1.75 34.3929ZM2.25 38.3214C2.25 38.1834 2.13807 38.0714 2 38.0714C1.86193 38.0714 1.75 38.1834 1.75 38.3214L2.25 38.3214ZM1.75 42.25C1.75 42.3881 1.86193 42.5 2 42.5C2.13807 42.5 2.25 42.3881 2.25 42.25L1.75 42.25ZM2.25 46.1786C2.25 46.0405 2.13807 45.9286 2 45.9286C1.86193 45.9286 1.75 46.0405 1.75 46.1786L2.25 46.1786ZM1.75 50.1071C1.75 50.2452 1.86193 50.3571 2 50.3571C2.13807 50.3571 2.25 50.2452 2.25 50.1071L1.75 50.1071ZM2.25 54.0357C2.25 53.8976 2.13807 53.7857 2 53.7857C1.86193 53.7857 1.75 53.8976 1.75 54.0357L2.25 54.0357ZM2 1L1.75 1L1.75 2.96429L2 2.96429L2.25 2.96429L2.25 1L2 1ZM2 6.89286L1.75 6.89286L1.75 10.8214L2 10.8214L2.25 10.8214L2.25 6.89286L2 6.89286ZM2 14.75L1.75 14.75L1.75 18.6786L2 18.6786L2.25 18.6786L2.25 14.75L2 14.75ZM2 22.6071L1.75 22.6071L1.75 26.5357L2 26.5357L2.25 26.5357L2.25 22.6071L2 22.6071ZM2 30.4643L1.75 30.4643L1.75 34.3929L2 34.3929L2.25 34.3929L2.25 30.4643L2 30.4643ZM2 38.3214L1.75 38.3214L1.75 42.25L2 42.25L2.25 42.25L2.25 38.3214L2 38.3214ZM2 46.1786L1.75 46.1786L1.75 50.1071L2 50.1071L2.25 50.1071L2.25 46.1786L2 46.1786Z"
                fill="#EBEBEF"
              ></path>
            </svg>
            <svg
              width="4"
              height="56"
              viewBox="0 0 4 56"
              fill="none"
              className="hidden dark:block"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.25 1C2.25 0.861929 2.13807 0.75 2 0.75C1.86193 0.75 1.75 0.861929 1.75 1L2.25 1ZM2 56L3.44337 53.5L0.556622 53.5L2 56ZM1.75 2.96429C1.75 3.10236 1.86193 3.21429 2 3.21429C2.13807 3.21429 2.25 3.10236 2.25 2.96429L1.75 2.96429ZM2.25 6.89286C2.25 6.75479 2.13807 6.64286 2 6.64286C1.86193 6.64286 1.75 6.75479 1.75 6.89286L2.25 6.89286ZM1.75 10.8214C1.75 10.9595 1.86193 11.0714 2 11.0714C2.13807 11.0714 2.25 10.9595 2.25 10.8214L1.75 10.8214ZM2.25 14.75C2.25 14.6119 2.13807 14.5 2 14.5C1.86193 14.5 1.75 14.6119 1.75 14.75L2.25 14.75ZM1.75 18.6786C1.75 18.8166 1.86193 18.9286 2 18.9286C2.13807 18.9286 2.25 18.8166 2.25 18.6786L1.75 18.6786ZM2.25 22.6071C2.25 22.4691 2.13807 22.3571 2 22.3571C1.86193 22.3571 1.75 22.4691 1.75 22.6071L2.25 22.6071ZM1.75 26.5357C1.75 26.6738 1.86193 26.7857 2 26.7857C2.13807 26.7857 2.25 26.6738 2.25 26.5357L1.75 26.5357ZM2.25 30.4643C2.25 30.3262 2.13807 30.2143 2 30.2143C1.86193 30.2143 1.75 30.3262 1.75 30.4643L2.25 30.4643ZM1.75 34.3929C1.75 34.5309 1.86193 34.6429 2 34.6429C2.13807 34.6429 2.25 34.5309 2.25 34.3929L1.75 34.3929ZM2.25 38.3214C2.25 38.1834 2.13807 38.0714 2 38.0714C1.86193 38.0714 1.75 38.1834 1.75 38.3214L2.25 38.3214ZM1.75 42.25C1.75 42.3881 1.86193 42.5 2 42.5C2.13807 42.5 2.25 42.3881 2.25 42.25L1.75 42.25ZM2.25 46.1786C2.25 46.0405 2.13807 45.9286 2 45.9286C1.86193 45.9286 1.75 46.0405 1.75 46.1786L2.25 46.1786ZM1.75 50.1071C1.75 50.2452 1.86193 50.3571 2 50.3571C2.13807 50.3571 2.25 50.2452 2.25 50.1071L1.75 50.1071ZM2.25 54.0357C2.25 53.8976 2.13807 53.7857 2 53.7857C1.86193 53.7857 1.75 53.8976 1.75 54.0357L2.25 54.0357ZM2 1L1.75 1L1.75 2.96429L2 2.96429L2.25 2.96429L2.25 1L2 1ZM2 6.89286L1.75 6.89286L1.75 10.8214L2 10.8214L2.25 10.8214L2.25 6.89286L2 6.89286ZM2 14.75L1.75 14.75L1.75 18.6786L2 18.6786L2.25 18.6786L2.25 14.75L2 14.75ZM2 22.6071L1.75 22.6071L1.75 26.5357L2 26.5357L2.25 26.5357L2.25 22.6071L2 22.6071ZM2 30.4643L1.75 30.4643L1.75 34.3929L2 34.3929L2.25 34.3929L2.25 30.4643L2 30.4643ZM2 38.3214L1.75 38.3214L1.75 42.25L2 42.25L2.25 42.25L2.25 38.3214L2 38.3214ZM2 46.1786L1.75 46.1786L1.75 50.1071L2 50.1071L2.25 50.1071L2.25 46.1786L2 46.1786Z"
                fill="white"
                fill-opacity="0.1"
              ></path>
            </svg>
          </span>
        </div>
        {/* Scroll Indicator */}
        {/* <div className="fixed -bottom-10 z-40 flex w-full -translate-x-1/2 flex-col items-center"> */}
        <div className="mb-3">
          <svg
            width="2"
            height="35"
            viewBox="0 0 2 35"
            fill="none"
            className="block dark:hidden sm:hidden"
          >
            <path
              d="M1 1L0.999998 34"
              stroke="#EBEBEF"
              strokeWidth="0.5"
              strokeLinecap="round"
              strokeDasharray="4 4"
            />
          </svg>
          <svg
            width="2"
            height="57"
            viewBox="0 0 2 57"
            fill="none"
            className="hidden sm:block dark:hidden"
          >
            <path
              d="M1 1L0.999998 56"
              stroke="#EBEBEF"
              strokeWidth="0.5"
              strokeLinecap="round"
              strokeDasharray="4 4"
            />
          </svg>
          <svg
            width="2"
            height="35"
            viewBox="0 0 2 35"
            fill="none"
            className="hidden dark:block sm:dark:hidden"
          >
            <path
              d="M1 1L0.999998 34"
              stroke="white"
              strokeOpacity="0.1"
              strokeWidth="0.5"
              strokeLinecap="round"
              strokeDasharray="4 4"
            />
          </svg>
          <svg
            width="2"
            height="57"
            viewBox="0 0 2 57"
            fill="none"
            className="hidden dark:sm:block"
          >
            <path
              d="M1 1L0.999998 56"
              stroke="white"
              strokeOpacity="0.1"
              strokeWidth="0.5"
              strokeLinecap="round"
              strokeDasharray="4 4"
            />
          </svg>
        </div>
        <div className="select-none text-sm mx-auto font-normal text-gray-400 dark:text-white/30 animate-bounce">
          Scroll down to learn more
        </div>
        <div className="mt-3">
          <ChevronDown className="size-4 text-gray-300 dark:text-white/10" />
        </div>
        {/* </div> */}
      </div>
    </div>
  );
}
