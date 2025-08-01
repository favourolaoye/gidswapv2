"use client";

import React from "react";
import { Button } from "@/src/components/ui/button";
import { ChevronDown } from "lucide-react";
import Image from "next/image";

export default function Header() {
  return (
    <header className="sticky left-0 top-0 z-20 bg-transparent w-full bg- backdrop-blur transition-all dark:bg-neutral-900/95">
      <nav className="mx-auto container max-w-6xl flex items-center justify-between py-3 px-4 text-neutral-900 dark:text-white">
        {/* Logo & dropdown */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {/* Mobile logo */}
          <Image
            src="/images/giddyimg.png"
            alt="Logo"
            width={100}
            height={80}
            className="block sm:hidden"
          />
          {/* Desktop logo */}
          <Image
            src="/images/giddyimg.png"
            alt="Logo"
            width={80}
            height={80}
            className="hidden sm:block"
          />
          {/* Dropdown Icon */}
          <ChevronDown className="hidden sm:inline size-5 text-gray-400 dark:text-white/50 -rotate-90" />
        </div>

        {/* CTA
        <div className="flex items-center gap-2 text-sm font-medium">
          <Button
            variant="secondary"
            size="sm"
            className="bg-transparent text-[#0d6fde] hover:bg-transparent dark:bg-blue-500/[12%] dark:text-blue-500 dark:hover:bg-blue-500/[20%]"
          >
            Sign in
          </Button>
        </div> */}

        {/* CTA */}
        <div className="flex items-center gap-2 text-sm font-medium">
          <Button
            variant="outline"
            size="sm"
            className="futuristic-button bg-transparent border-[#0d6fde] text-[#0d6fde] rounded-full px-6 py-2 hover:bg-[#0d6fde]/10 hover:scale-105 hover:border-[#0d6fde]/80 hover:shadow-[0_0_10px_rgba(13,111,222,0.4)] transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-[#0d6fde] focus:ring-offset-2
              dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-400/10 dark:hover:border-blue-400/80 dark:hover:shadow-[0_0_10px_rgba(59,130,246,0.3)] dark:focus:ring-offset-[#1a1a1a]"
          >
            Sign in
          </Button>
        </div>
      </nav>
    </header>
  );
}
