"use client";
import { useState } from "react";
import {
  ArrowUpDown,
  Home,
  History,
  BarChart3,
  ChevronDown,
  MessageCircle,
  Sun,
  Moon,
  Zap,
} from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/src/components/ui/button";

import { currencies } from "@/lib/constants";
import type { Currency } from "@/lib/types";
import SwapForm from "@/_components/backup/swapform"; // Your reusable form

export default function Dashboard2() {
  const [sendAmount, setSendAmount] = useState("0");
  const [receiveAmount, setReceiveAmount] = useState("0");
  const [sendCurrency, setSendCurrency] = useState<Currency>(currencies[0]); // BTC
  const [receiveCurrency, setReceiveCurrency] = useState<Currency>({
    name: "NGN",
    logo: "/images/naira.svg", // Add your NGN logo path
    rate: 1400, // Example: 1 USD = 1400 NGN
  });
  const [showModal, setShowModal] = useState(false);
  const [selectedTab, setSelectedTab] = useState("sell"); // buy/sell/swap
  const { theme, setTheme } = useTheme();
  const [activeLink, setActiveLink] = useState("Swap");

  const navLinks = [
    { name: "Swap", icon: <ArrowUpDown className="w-5 h-5" /> },
    { name: "Account", icon: <Home className="w-5 h-5" /> },
    { name: "History", icon: <History className="w-5 h-5" /> },
    { name: "Markets", icon: <BarChart3 className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-[#1a1d29] text-white">
      {/* Desktop Navigation */}
      <nav className="hidden sticky top-0 z-50 bg-white dark:bg-[#1a1d29] md:flex items-center justify-between px-6 py-4 border-b border-gray-800">
        <div className="flex items-center gap-8">
          {/* Logo */}
          <div className="relative flex items-center gap-2 flex-shrink-0 group">
            <img
              src="/images/gidsfull.png"
              alt="Logo"
              width={100}
              height={80}
            />
          </div>

          {/* Navigation Items */}
          <div className="flex items-center gap-6">
            {navLinks.map((link) => (
              <Button
                key={link.name}
                variant="ghost"
                className={`flex items-center gap-2 text-gray-600 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 bg-transparent ${
                  activeLink === link.name
                    ? "border-2 border-blue-600 text-blue-600 rounded-full"
                    : ""
                } hover:bg-blue-400/10`}
                onClick={() => setActiveLink(link.name)}
              >
                {link.icon}
                <span className="hidden md:inline">{link.name}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="text-gray-400 hover:text-white"
          >
            {theme === "dark" ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </Button>
          <Button className="mygradient futuristic-button text-white rounded-full px-6 py-2 hover:opacity-90">
            Get Started
          </Button>
          <Button
            variant="outline"
            className="border-gray-600 text-blue-800 dark:text-white hover:bg-gray-800 rounded-full px-6 py-2 bg-transparent"
          >
            Login
          </Button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="md:hidden sticky top-0 z-50 bg-white dark:bg-[#1a1d29] flex items-center justify-between px-4 py-3 border-b border-gray-800">
        <div className="relative flex items-center gap-2 flex-shrink-0 group">
          <img src="/images/gidsfull.png" alt="Logo" width={100} height={80} />
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="text-gray-400 hover:text-white"
          >
            {theme === "dark" ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </Button>
          <Button className="mygradient futuristic-button text-white rounded-full px-4 py-2 text-sm hover:opacity-90">
            Get Started
          </Button>
          <Button
            variant="outline"
            className="border-gray-600 text-blue-800 dark:text-white hover:bg-gray-800 rounded-full px-4 py-2 text-sm bg-transparent"
          >
            Login
          </Button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-8 md:py-16">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-2">
              <h1 className="text-3xl md:text-4xl font-bold">Swap</h1>
            </div>
            <p className="text-gray-400 text-sm md:text-base">
              Exchange your crypto for fiat in an instant
            </p>
          </div>

          {/* SwapForm Integration */}
          <SwapForm
            sendAmount={sendAmount}
            setSendAmount={setSendAmount}
            sendCurrency={sendCurrency}
            setSendCurrency={setSendCurrency}
            receiveAmount={receiveAmount}
            setReceiveAmount={setReceiveAmount}
            receiveCurrency={receiveCurrency}
            setReceiveCurrency={setReceiveCurrency}
            setShowModal={setShowModal}
            tab={selectedTab}
          />
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-[#2a2d3a] border-t border-gray-800">
        <div className="flex items-center justify-around py-3">
          {navLinks.map((link) => (
            <Button
              key={link.name}
              variant="ghost"
              className={`flex flex-col items-center gap-1 text-gray-600 dark:text-white py-4 hover:text-blue-600 dark:hover:text-blue-400 bg-transparent rounded-none ${
                activeLink === link.name
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : ""
              } hover:bg-blue-400/10`}
              onClick={() => setActiveLink(link.name)}
            >
              {link.icon}
              <span className="text-xs">{link.name}</span>
            </Button>
          ))}
        </div>
      </nav>

      {/* Chat Widget */}
      <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8">
        <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-full w-12 h-12 md:w-14 md:h-14 shadow-lg">
          <MessageCircle className="w-6 h-6" />
        </Button>
      </div>
    </div>
  );
}
