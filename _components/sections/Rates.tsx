import React from "react";
import { AnimatedSection } from "../ui/animate-section";
import Image from "next/image";

export default function RatesSection() {
  return (
    <AnimatedSection>
      <div className="mb-20 flex w-full flex-col items-center justify-center gap-6 px-5 md:mb-48">
        <div className="flex flex-col items-center gap-6">
          <h3 className="text-2xl font-semibold sm:text-4xl md:text-5xl">
            Rates like no other
          </h3>
          <p className="max-w-[712px] text-center text-base font-normal leading-[30px] opacity-80 lg:text-lg">
            You have no cause for worry when it comes to rates, Noblocks offers
            the best rates that beat the speed and amount for P2Ps and other
            stablecoin exchange options
          </p>
          <button className="flex items-center gap-2 text-base font-medium hover:cursor-pointer hover:opacity-80">
            Get started
            <svg
              className="size-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M14 12L4 12M18.5859 13.6026L17.6194 14.3639C16.0536 15.5974 15.2707 16.2141 14.6354 15.9328C14 15.6515 14 14.6881 14 12.7613L14 11.2387C14 9.31191 14 8.34853 14.6354 8.06721C15.2707 7.7859 16.0536 8.40264 17.6194 9.63612L18.5858 10.3974C19.5286 11.1401 20 11.5115 20 12C20 12.4885 19.5286 12.8599 18.5859 13.6026Z"
              />
            </svg>
          </button>
        </div>
        <div className="mx-auto w-full">
          <div className="mx-auto hidden w-full max-w-[834px] dark:md:block">
            <Image
              alt="Rates Graph"
              loading="lazy"
              width={100}
              height={100}
              decoding="async"
              data-nimg="1"
              className="my-8 w-full"
              src="/images/rates-graph.svg"
            />
          </div>
          <div className="mx-auto hidden w-full dark:block dark:md:hidden">
            <Image
              alt="Rates Graph"
              loading="lazy"
              width={100}
              height={100}
              decoding="async"
              data-nimg="1"
              className="my-8 w-full"
              src="/images/rates-graph-mobile.svg"
            />
          </div>

          <div className="mx-auto block w-full dark:hidden md:hidden">
            <Image
              alt="Rates Graph"
              loading="lazy"
              width={100}
              height={100}
              decoding="async"
              data-nimg="1"
              className="my-8 w-full"
              src="/images/rates-graph-mobile-light-mode.svg"
            />
          </div>
          <div className="mx-auto hidden w-full max-w-[834px] md:block dark:md:hidden">
            <Image
              alt="Rates Graph"
              loading="lazy"
              width={100}
              height={100}
              decoding="async"
              data-nimg="1"
              className="my-8 w-full"
              src="/images/rates-graph-desktop-light-mode.svg"
            />
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
