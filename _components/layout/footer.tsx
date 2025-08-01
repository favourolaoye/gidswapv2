"use client";

import React from "react";
import { AnimatedSection } from "@/src/components/ui/animate-section";
import { Button } from "@/src/components/ui/button";
import Image from "next/image";
import { Instagram, Linkedin, Moon, Sun, Twitter } from "lucide-react";
import { useTheme } from "next-themes";
import { dt } from "framer-motion/client";

export default function Footer() {
  const date = new Date().getFullYear();
  function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    return (
      <div className="hidden sm:flex h-11 items-center justify-between gap-2 rounded-full bg-gray-100 dark:bg-neutral-800 p-1 transition-all">
        <button
          onClick={() => setTheme("system")}
          className={`flex cursor-pointer items-center justify-center rounded-full transition-colors h-9 px-4 ${
            theme === "system" ? "bg-white dark:bg-neutral-700" : ""
          }`}
          title="Switch to auto mode"
        >
          <span className="text-sm font-medium text-gray-400 dark:text-white/50">
            Auto
          </span>
        </button>
        <button
          onClick={() => setTheme("light")}
          className={`flex cursor-pointer items-center justify-center rounded-full transition-colors h-9 w-9 ${
            theme === "light" ? "bg-white dark:bg-neutral-700" : ""
          }`}
          title="Switch to light mode"
        >
          <Sun className="size-5 text-gray-400 dark:text-white/50" />
        </button>
        <button
          onClick={() => setTheme("dark")}
          className={`flex cursor-pointer items-center justify-center rounded-full transition-colors h-9 w-9 ${
            theme === "dark" ? "bg-white dark:bg-neutral-700" : ""
          }`}
          title="Switch to dark mode"
        >
          <Moon className="size-5 text-gray-400 dark:text-white/50" />
        </button>
      </div>
    );
  }

  return (
    <footer className="relative mx-auto w-full max-w-6xl px-5 min-h-[200px]">
      <div className="mx-auto w-full transition-all">
        <div className="flex gap-6 max-sm:items-center">
          <div className="w-fit h-fit">
            <Image
              src="/images/gidswap-icon.png"
              alt="NextWeb3App Logo Icon"
              width={40}
              height={70}
            />
          </div>

          <div className="flex flex-col gap-4">
            <ThemeToggle />

            <div className="flex items-center gap-4">
              <div className="flex gap-2">
                <a
                  href="https://instagram.com/noblocks_xyz"
                  className="rounded-full bg-gray-100 p-1.5 transition-colors duration-200 hover:bg-gray-200 dark:bg-white/10 dark:hover:bg-white/20"
                >
                  <Instagram className="size-5" />
                </a>
                <a
                  href="https://linkedin.com/company/paycrest"
                  className="rounded-full bg-gray-100 p-1.5 transition-colors duration-200 hover:bg-gray-200 dark:bg-white/10 dark:hover:bg-white/20"
                >
                  <Linkedin className="size-5" />
                </a>
                <a
                  href="https://x.com/noblocks_xyz"
                  className="rounded-full bg-gray-100 p-1.5 transition-colors duration-200 hover:bg-gray-200 dark:bg-white/10 dark:hover:bg-white/20"
                >
                  <Twitter className="size-5" />
                </a>
              </div>
              <div className="h-4 w-px bg-gray-200 dark:bg-white/10" />
            </div>
          </div>
        </div>
      </div>
      <p className="absolute bottom-8 text-xs font-medium">
        <span className="text-gray-500 dark:text-white/50">
          © {date} All rights reserved
        </span>{" "}
        <a
          href="https://paycrest.io"
          target="_blank"
          rel="noopener noreferrer"
          className="text-neutral-900 hover:underline dark:text-white/80"
        >
          Gidswap
        </a>
      </p>
    </footer>
  );
}
