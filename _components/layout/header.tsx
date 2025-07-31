"use client";

import React from "react";
import { Button } from "../ui/animate-section";
import { ChevronDown } from "lucide-react";
import Image from "next/image";

export default function Header() {
  return (
    <header className="fixed left-0 top-0 z-20 w-full bg-white/95 backdrop-blur transition-all dark:bg-neutral-900/95">
      <nav className="mx-auto flex items-center justify-between p-4 text-neutral-900 lg:container dark:text-white lg:px-8">
        <div className="flex items-start gap-2 lg:flex-1">
          <div className="relative flex items-start gap-1">
            <div className="flex items-center gap-1">
              <Button
                variant={"ghost"}
                className="flex items-center gap-1 max-sm:min-h-9 max-sm:rounded-lg max-sm:p-2"
              >
                <Image
                  src="/images/mobilelogo.svg"
                  alt="NextWeb3App Logo Icon"
                  width={18}
                  height={18}
                  className="size-[18px] sm:hidden"
                />
                <Image
                  src={"/images/noblocks-logo.svg"}
                  width={100}
                  height={100}
                  alt="Noblocks logo"
                  className="hidden sm:flex"
                />
              </Button>
              <ChevronDown className="size-5 cursor-pointer text-gray-400 transition-transform duration-200 dark:text-white/50 max-sm:hidden -rotate-90" />
            </div>
          </div>
        </div>
        <div className="flex gap-3 text-sm font-medium">
          <Button
            variant="secondary"
            size="sm"
            className="bg-purple-50 text-purple-500 hover:bg-purple-100 dark:bg-purple-500/[12%] dark:text-purple-500 dark:hover:bg-purple-500/[20%]"
          >
            Sign in
          </Button>
        </div>
      </nav>
    </header>
  );
}
