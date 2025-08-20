"use client";
import { Button } from "@/src/components/ui/button";
import type React from "react";

import Image from "next/image";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";

interface NavLink {
  name: string;
  icon: React.ReactNode;
  href: string;
}

interface DesktopNavProps {
  navLinks: NavLink[];
  activeLink: string;
  onLinkClick: (linkName: string) => void;
}

export function DesktopNav({
  navLinks,
  activeLink,
  onLinkClick,
}: DesktopNavProps) {
  const { theme, setTheme } = useTheme();

  return (
    <nav className="hidden sticky top-0 z-50 bg-white dark:bg-[#1a1d29] md:flex items-center justify-between px-6 py-4 border-b border-gray-800">
      <div className="flex items-center gap-8">
        {/* Logo */}
        <div className="relative flex items-center gap-2 flex-shrink-0 group">
          <Image
            src="/images/gidsfull.png"
            alt="Logo"
            width={100}
            height={80}
          />
        </div>

        {/* Navigation Items */}
        <div className="flex items-center gap-6">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href}>
              <Button
                variant="ghost"
                className={`flex items-center gap-2 text-gray-600 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 bg-transparent ${
                  activeLink === link.name
                    ? "border-2 border-blue-600 text-blue-600 rounded-full"
                    : ""
                } hover:bg-blue-400/10`}
                onClick={() => onLinkClick(link.name)}
              >
                {link.icon}
                <span className="hidden md:inline">{link.name}</span>
              </Button>
            </Link>
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
  );
}
