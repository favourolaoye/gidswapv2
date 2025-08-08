"use client";

import { useEffect, useState } from "react";
import { Button } from "@/src/components/ui/button";
import RegisterModal from "../popups/RegisterModal";
import Image from "next/image";
import PolicyPrivacyPop from "./policy-privacy";
import { ChevronDown } from "lucide-react";
import useAuthStore from "@/store/Authstore"; 
import { getCookie } from "@/lib/cookieHelpers";
import LoginModal from "../popups/LoginModal";

export default function Header() {
  const { isLoggedIn, checkAuthStatus } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const handleonComplete = () => {
    
  }
  useEffect(() => {
    checkAuthStatus(); 
  }, []);

  const handleSignInClick = () => {
    const token = useAuthStore.getState().token;
    if (token) {
      return;
    }
    const userWasRegistered = !!getCookie("regstatus");
    if (userWasRegistered) {
      setShowLogin(true);
    } else {
      setIsOpen(true);
    }
  };

  return (
    <header className="sticky left-0 top-0 z-20 w-full bg-black/10 backdrop-blur transition-all dark:bg-neutral-900/95">
      <nav className="mx-auto container max-w-6xl flex items-center justify-between py-3 px-4 text-neutral-900 dark:text-white">
        {/* Logo & dropdown */}
        <div className="relative flex items-center gap-2 flex-shrink-0 group">
          <Image
            src="/images/giddyimg.png"
            alt="Logo"
            width={100}
            height={80}
            className="block sm:hidden"
          />
          <Image
            src="/images/gidsfull.png"
            alt="Logo"
            width={80}
            height={80}
            className="hidden sm:block"
          />
          <ChevronDown className="hidden sm:inline size-5 text-gray-400 dark:text-white/50 transition-transform duration-200 group-hover:rotate-180" />
          <PolicyPrivacyPop />
        </div>

        {/* CTA */}
       <div className="flex items-center gap-2">
          {!isLoggedIn ? (
            <Button onClick={handleSignInClick}>Sign in</Button>
          ) : (
            <Button>Dashboard</Button>
          )}
        </div>
      </nav>

      <RegisterModal open={isOpen} onClose={() => setIsOpen(false)} onComplete={handleonComplete} />
      <LoginModal open={showLogin} onClose={() => setShowLogin(false)} />
    </header>
  );
}
