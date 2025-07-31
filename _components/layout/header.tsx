"use client";

import React from "react";
import { Button } from "@/src/components/ui/button";
import { ChevronDown } from "lucide-react";
import Image from "next/image";

export default function Header() {
  return (
    <header className="fixed left-0 top-0 z-20 w-svw bg-transparent backdrop-blur transition-all dark:bg-neutral-900/95">
      <nav className="mx-auto flex items-center justify-between py-4 px-3 text-neutral-900 lg:container dark:text-white lg:px-8">
        <div className="flex items-start gap-2 lg:flex-1">
          <div className="relative flex items-start gap-1"> 
            <div className="flex items-center gap-1">
          
                <Image
                  src="/images/giddyimg.png"
                  alt="NextWeb3App Logo Icon"
                  width={80}
                  height={60}
                  className="sm:hidden"
                />
                <Image
                  src={"/images/giddyimg.png"}
                  width={100}
                  height={100}
                  alt="Noblocks logo"
                  className="hidden sm:flex"
                />
             
              <ChevronDown className="size-5 cursor-pointer text-gray-400 transition-transform duration-200 dark:text-white/50 max-sm:hidden -rotate-90" />
            </div>
          </div>
        </div>
        <div className="flex gap-3 text-sm font-medium">
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
