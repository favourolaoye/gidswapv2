"use client"

import type React from "react"

import { AlertDialog, AlertDialogContent, AlertDialogHeader } from "@/src/components/ui/alert-dialog"
import { Button } from "@/components/ui/button" // Assuming Button is available from shadcn/ui
import { X } from "lucide-react" // Import the X icon

interface ResuablePopProps {
  open: boolean
  onClose: () => void
  children: React.ReactNode
}

const ResuablePop: React.FC<ResuablePopProps> = ({ open, onClose, children }) => {
  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader className="flex justify-end p-0">
          {" "}
          {/* Adjusted padding */}
          <Button
            variant="ghost" // Use ghost variant for a subtle button
            size="icon" // Make it a square icon button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span> {/* For accessibility */}
          </Button>
        </AlertDialogHeader>
        {children}
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default ResuablePop
