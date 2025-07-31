"use client";

import React from "react";
import { Button } from "@/src/components/ui/button";
import { ChevronDown } from "lucide-react";
import Image from "next/image";

export default function Header() {
  return (
    <header className="fixed left-0 top-0 z-20 bg-transparent w-full bg- backdrop-blur transition-all dark:bg-neutral-900/95">
      <nav className="mx-auto flex items-center justify-between py-3 px-4 text-neutral-900 lg:container dark:text-white">
        {/* Logo & dropdown */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {/* Mobile logo */}
          <Image
            src="/images/giddyimg.png"
            alt="Logo"
            width={80}
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

        {/* CTA */}
        <div className="flex items-center gap-2 text-sm font-medium">
          <Button
            variant="secondary"
            size="sm"
            className="bg-transparent text-blue-500 hover:bg-transparent dark:bg-blue-500/[12%] dark:text-blue-500 dark:hover:bg-blue-500/[20%]"
          >
            Sign in
          </Button>
        </div>
      </nav>
    </header>
  );
}
