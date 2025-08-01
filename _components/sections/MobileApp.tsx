// app/page.tsx or a component file
"use client";

import { useState } from "react";
import Drawer from "@/_components/popups/AuthPop";
import { Button } from "@/src/components/ui/button";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="p-6">
      <Button onClick={() => setIsOpen(true)}>Open Drawer</Button>

      <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h2 className="text-xl font-semibold mb-4">Drawer Content</h2>
        <p>This drawer is responsive. Bottom on mobile, center on desktop.</p>
        <Button className="mt-4" onClick={() => setIsOpen(false)}>
          Close
        </Button>
      </Drawer>
    </div>
  );
}
