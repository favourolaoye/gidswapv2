"use client";

import { ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import clsx from "clsx";

interface ReusablePopProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function ResuablePop({ open, onClose, children }: ReusablePopProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={clsx(
          "w-full max-w-md bg-white dark:bg-neutral-900 rounded-t-lg sm:rounded-lg shadow-lg transition-all p-4",
          "fixed bottom-0 sm:static sm:translate-y-0 sm:mx-auto",
          "animate-slide-up sm:animate-fade-in"
        )}
      >
        {/* Close button */}
        <div className="flex justify-end">
          <button onClick={onClose} className="text-gray-500 hover:text-blue-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div>{children}</div>
      </div>
    </div>,
    document.body
  );
}
