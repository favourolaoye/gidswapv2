"use client";

import {useState} from "react";
import { Button } from "@/src/components/ui/button";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import PolicyPrivacyPop from "../popups/policy-privacy";
import usePopStore from "@/store/popStore";
export default function Header() {
const setIsOpen = usePopStore((state) => state.setIsOpen);
  return (
    <header className="sticky left-0 top-0 z-20 w-full bg-black/10 backdrop-blur transition-all dark:bg-neutral-900/95">
      <nav className="mx-auto container max-w-6xl flex items-center justify-between py-3 px-4 text-neutral-900 dark:text-white">
        {/* Logo & dropdown */}
        <div className="relative flex items-center gap-2 flex-shrink-0 group">
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
            src="/images/gidsfull.png"
            alt="Logo"
            width={80}
            height={80}
            className="hidden sm:block"
          />
          {/* Dropdown Icon */}
          <ChevronDown className="hidden sm:inline size-5 text-gray-400 dark:text-white/50 transition-transform duration-200 group-hover:rotate-180" />
          <PolicyPrivacyPop />
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
            size="sm"
            onClick={() => setIsOpen(true)}
            className="bg-blue-500/20 text-[#0d6fde] px-6 py-2  hover:text-blue-600 dark:hover:bg-blue-500/20"
            className="futuristic-button bg-blue-500/20 text-[#0d6fde] px-6 py-2  hover:text-blue-600 dark:hover:bg-blue-500/20"
          >
            Sign in
          </Button>
        </div>
      </nav>
    </header>
  );
}
