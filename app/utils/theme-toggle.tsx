"use client";
import React from 'react'
import { Button } from '@/components/ui/button'
import { SunMoon } from 'lucide-react'
import { useTheme } from 'next-themes';

export default function ThemeToggle() {
    const {theme, setTheme} = useTheme()
  return (
    <div className="flex gap-1">
        <Button variant={"outline"} size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            <SunMoon/>
        </Button>
    </div>
  )
}
