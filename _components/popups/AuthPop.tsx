import React from "react";
import { cn } from "@/lib/utils"; 
interface AuthpopProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

export default function Authpop({ isOpen, onClose, children, className }: AuthpopProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Authpop Panel */}
      <div
        className={cn(
          "absolute w-full max-w-md rounded-t-xl bg-white p-6 shadow-lg transition-all duration-300",
          "bottom-0 left-1/2 -translate-x-1/2",
          "md:top-1/2 md:bottom-auto md:rounded-xl md:translate-y-[-50%]",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
}
