"use client";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { ThemeProvider } from "next-themes";
import Sidebar from "@/_components/layout/dashboard/sidebar";
import { useState, useEffect } from "react";
import { Bell, Menu, Settings } from "lucide-react";
import { Button } from "@/src/components/ui/button";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// export const metadata: Metadata = {
//   title: "Gidswap Dashboard",
//   description: "Your crypto trading dashboard",
// };

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== "undefined" && window.innerWidth >= 1024) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased w-full`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 dark:from-slate-900 dark:via-blue-900/10 dark:to-purple-900/10">
            {/* Background Effects */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-pulse" />
              <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-1000" />
              <div className="absolute top-3/4 left-3/4 w-64 h-64 bg-cyan-400/10 rounded-full blur-2xl animate-pulse delay-2000" />
            </div>

            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
              <div
                className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                onClick={() => setSidebarOpen(false)}
              />
            )}

            {/* Sidebar */}
            <Sidebar
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
            />

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0">
              {/* Header */}
              <header className="sticky top-0 z-30 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-white/10">
                <div className="flex items-center justify-between px-4 md:px-6 py-3">
                  <div className="flex items-center gap-4">
                    <Button
                      onClick={() => setSidebarOpen(true)}
                      className="lg:hidden"
                    >
                      <Menu className="w-5 h-5" />
                    </Button>
                    <div>
                      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Dashboard
                      </h1>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Welcome back! Here's your trading overview.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button className="relative">
                      <Bell className="w-5 h-5" />
                      <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                    </Button>
                    <Button>
                      <Settings className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </header>

              {/* Page Content */}
              <main className="flex-1 px-4 md:px-6 py-4 space-y-4 relative z-10 overflow-y-auto">
                {children}
              </main>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
