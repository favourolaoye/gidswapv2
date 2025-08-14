import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  ArrowUpDown,
  Wallet,
  History,
  Settings,
  User,
  X,
  BarChart3,
  PieChart,
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
// import { Button } from "@/components/ui/button";

export default function Sidebar({
  sidebarOpen,
  setSidebarOpen,
}: {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}) {
  return (
    <div>
      <motion.aside
        initial={{ x: -300 }}
        animate={{
          x: sidebarOpen
            ? 0
            : typeof window !== "undefined" && window.innerWidth >= 1024
            ? 0
            : -300,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed left-0 top-0 z-50 h-full w-72 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-r border-gray-200/50 dark:border-white/10 lg:relative lg:translate-x-0 lg:flex lg:flex-col lg:z-auto"
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200/50 dark:border-white/10">
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
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {[
              { icon: ArrowUpDown, label: "Swap", active: true },
              { icon: Wallet, label: "Portfolio" },
              { icon: History, label: "History" },
              { icon: BarChart3, label: "Markets" },
              { icon: PieChart, label: "Analytics" },
              { icon: Settings, label: "Settings" },
            ].map((item, index) => (
              <motion.button
                key={item.label}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                  item.active
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </motion.button>
            ))}
          </nav>

          {/* User Profile */}
          <div className="p-4 border-t border-gray-200/50 dark:border-white/10">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-white/5">
              <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900 dark:text-white">
                  Makinde Mayowa
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  mayowamakinde23@gmail.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.aside>
    </div>
  );
}
