"use client";

import Drawer from "@/_components/popups/AuthPop";
import { Button } from "@/src/components/ui/button";
import usePopStore from "@/store/popStore";

export default function Auth() {
  const isOpen = usePopStore((state) => state.isOpen);
  const setIsOpen = usePopStore((state) => state.setIsOpen);
  return (
    <div className="p-6">
      <Button onClick={() => setIsOpen(true)}>Open Drawer</Button>

      <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h2 className="text-xl font-semibold mb-4">Signin to Gidswap</h2>
        <p>cool.</p>
        <Button className="mt-4" onClick={() => setIsOpen(false)}>
          Close
        </Button>
      </Drawer>
    </div>
  );
}
