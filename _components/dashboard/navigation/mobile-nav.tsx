"use client"
import { Button } from "@/src/components/ui/button"
import Image from "next/image"
import { Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"

export function MobileNav() {
  const { theme, setTheme } = useTheme()

  return (
    <nav className="md:hidden sticky top-0 z-50 bg-white dark:bg-[#1a1d29] flex items-center justify-between px-4 py-3 border-b border-gray-800">
      <div className="relative flex items-center gap-2 flex-shrink-0 group">
        <Image src="/images/gidsfull.png" alt="Logo" width={100} height={80} />
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="text-gray-400 hover:text-white"
        >
          {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
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
  )
}
