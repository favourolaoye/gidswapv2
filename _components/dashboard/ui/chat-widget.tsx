"use client";
import { Button } from "@/src/components/ui/button";
import { MessageCircle } from "lucide-react";

interface ChatWidgetProps {
  onClick?: () => void;
}

export function ChatWidget({ onClick }: ChatWidgetProps) {
  return (
    <div className="fixed bottom-1/6 right-6 md:bottom-8 md:right-8">
      <Button
        className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-full w-12 h-12 md:w-14 md:h-14 shadow-lg"
        onClick={onClick}
      >
        <MessageCircle className="w-6 h-6" />
      </Button>
    </div>
  );
}
