"use client";

import { useEffect } from "react";
import { Button } from "@/src/components/ui/button";
import Image from "next/image";
import PolicyPrivacyPop from "./policy-privacy";
import { ChevronDown } from "lucide-react";
import { useAuthStore } from "@/store/Authstore";
import Link from "next/link";

export default function Header() {
  const {
    isAuthenticated,
    regStatus,
    setRegisterModalOpen,
    setLoginModalOpen,
    initializeAuth,
    logout,
  } = useAuthStore();

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  const handleRegisterClick = () => {
    setRegisterModalOpen(true);
  };

  const handleSignInClick = () => {
    setLoginModalOpen(true);
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
          {isAuthenticated ? (
            <>
              <Link href="/dashboard" passHref>
                <Button className="futuristic-button bg-blue-300/20 text-blue-600/90 font-semibold text-sm hover:bg-blue-300/20">
                  Dashboard
                </Button>
              </Link>
            </>
          ) : (
            <>
              {regStatus ? (
                <Button
                  onClick={handleSignInClick}
                  className="futuristic-button bg-blue-300/20 text-blue-600/90 font-semibold text-sm hover:bg-blue-300/20"
                >
                  Sign in
                </Button>
              ) : (
                <Button
                  onClick={handleRegisterClick}
                  className="futuristic-button bg-blue-300/20 text-blue-600/90 font-semibold text-sm hover:bg-blue-300/20"
                >
                  Register
                </Button>
              )}
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
