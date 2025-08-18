"use client"
import { Button } from "@/src/components/ui/button"
import { Info } from "lucide-react"

interface SwapHeaderProps {
  title: string
  description: string
}

export function SwapHeader({ title, description }: SwapHeaderProps) {
  return (
    <div className="text-center mb-8">
      <div className="flex items-center justify-center gap-2 mb-2">
        <h1 className="text-3xl md:text-4xl font-bold">{title}</h1>
        <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300">
          <Info className="w-5 h-5" />
        </Button>
      </div>
      <p className="text-gray-400 text-sm md:text-base">{description}</p>
    </div>
  )
}
