"use client";

import type React from "react";

import { useState } from "react";
import {
  ChevronDown,
  Play,
  ArrowUpDown,
  Plus,
  Sun,
  Moon,
  Instagram,
  Linkedin,
  Twitter,
} from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import { useTheme } from "next-themes";
import { AnimatedSection } from "@/src/components/ui/animate-section";
import Hero from "@/_components/sections/Hero";
import { useCaseNoExp, useWeb3Dengen } from "@/lib/constants";
import WaysToUse from "@/_components/sections/WaysToUse";
import RatesSection from "@/_components/sections/Rates";
import FaqsSection from "@/_components/sections/Faqs";
import MobileAppSection from "@/_components/sections/MobileApp";
import Footer from "@/_components/layout/footer";
import VideoSection from "@/_components/sections/OnboardVideo";

export default function LandingPage() {
  return (
    <div className="min-h-full min-w-full bg-white transition-colors dark:bg-neutral-900">
      {/* Main Content */}
      <div className="relative mx-auto flex min-h-dvh flex-col items-center transition-all">
        <main className="w-full flex-grow max-w-full">
          <div className="flex w-full flex-col">
            {/* Hero Section */}
            <Hero />

            {/* Video Section */}
            <VideoSection />

            {/* Ways to Use Noblocks */}
            <WaysToUse />

            {/* Rates Section */}
            <RatesSection />

            {/* FAQ Section */}
            <FaqsSection />
            {/* Mobile App Section */}
            {/* <MobileAppSection /> */}
          </div>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
