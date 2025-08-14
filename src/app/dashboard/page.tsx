"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/ui/tabs";
import {
  ArrowUpDown,
  TrendingUp,
  TrendingDown,
  Wallet,
  History,
  Settings,
  Bell,
  User,
  Menu,
  X,
  Eye,
  EyeOff,
  RefreshCw,
  Plus,
  Minus,
  Activity,
  Bitcoin,
  Zap,
} from "lucide-react";
import {
  cryptoHoldings,
  currencies,
  portfolioValue,
  recentTransactions,
} from "@/lib/constants";
import SwapForm from "@/_components/backup/swapform";
import Sidebar from "@/_components/layout/dashboard/sidebar";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";

export default function Dashboard() {
  const [sendAmount, setSendAmount] = useState("0");
  const [receiveAmount, setReceiveAmount] = useState("0");
  const [sendCurrency, setSendCurrency] = useState(currencies[0]);
  const [receiveCurrency, setReceiveCurrency] = useState({
    name: "Select currency",
    logo: "",
    rate: 1,
  });
  const [showModal, setShowModal] = useState(false);
  const [selectedTab, setSelectedTab] = useState("buy");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [balanceVisible, setBalanceVisible] = useState(true);

  // Handle sidebar visibility on large screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    // Set initial state
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      {/* Dashboard Content */}
      <main className="flex-1 px-4 md:px-6 py-4 space-y-4 relative z-10 overflow-y-auto">
        {/* Portfolio Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-2 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-gray-200/50 dark:border-white/10">
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="w-full">
                <CardTitle className="w-full flex items-center justify-between text-lg font-semibold">
                  Portfolio Value
                  <Button variant="outline" size="sm">
                    <RefreshCw className="w-4 h-4 mr-1" />
                    Refresh
                  </Button>
                </CardTitle>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-3xl font-bold">
                    {balanceVisible
                      ? `$${portfolioValue.toLocaleString()}`
                      : "••••••"}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setBalanceVisible(!balanceVisible)}
                  >
                    {balanceVisible ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>
            </CardHeader>
          </Card>

          <Card className="mygradient text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Activity className="w-8 h-8 opacity-80" />
                <Badge
                  variant="secondary"
                  className="bg-green-600/50 text-white border-0 px-2"
                >
                  Live
                </Badge>
              </div>
              <h3 className="text-lg font-semibold mb-2">Market Status</h3>
              <p className="text-sm opacity-90 mb-4">
                Markets are active with high volume
              </p>
              <div className="flex items-center gap-4 text-sm">
                <div>
                  <span className="opacity-80">BTC: </span>
                  <span className="font-semibold">$45,230</span>
                </div>
                <div>
                  <span className="opacity-80">ETH: </span>
                  <span className="font-semibold">$2,840</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Trading Interface */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Swap Form */}
          <Card className="xl:col-span-2 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-gray-200/50 dark:border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ArrowUpDown className="w-5 h-5" />
                Trade Crypto
              </CardTitle>
            </CardHeader>
            <CardContent className="p-2">
              <Tabs
                value={selectedTab}
                onValueChange={setSelectedTab}
                className="w-full"
              >
                <TabsList className="grid grid-cols-3 w-full bg-gray-100/50 dark:bg-neutral-800/50 rounded-full p-1 mb-6">
                  {["buy", "sell", "swap"].map((tab) => (
                    <TabsTrigger
                      key={tab}
                      value={tab}
                      className="rounded-full py-2 text-sm font-medium mygradient-active data-[state=active]:text-white transition-all duration-300"
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </TabsTrigger>
                  ))}
                </TabsList>
                {["buy", "sell", "swap"].map((tab) => (
                  <TabsContent key={tab} value={tab} className="mt-0">
                    <SwapForm
                      sendAmount={sendAmount}
                      setSendAmount={setSendAmount}
                      sendCurrency={sendCurrency}
                      setSendCurrency={setSendCurrency}
                      receiveAmount={receiveAmount}
                      setReceiveAmount={setReceiveAmount}
                      receiveCurrency={receiveCurrency}
                      setReceiveCurrency={setReceiveCurrency}
                      setShowModal={setShowModal}
                      tab={tab}
                    />
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>

          {/* Holdings */}
          <Card className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-gray-200/50 dark:border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wallet className="w-5 h-5" />
                Your Holdings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {cryptoHoldings.map((holding, index) => (
                <motion.div
                  key={holding.symbol}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-3 rounded-xl bg-gray-50/50 dark:bg-white/5 hover:bg-gray-100/50 dark:hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-yellow-500 rounded-full flex items-center justify-center">
                      <Bitcoin className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {holding.symbol}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {holding.amount}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900 dark:text-white">
                      {holding.value}
                    </p>
                    <p
                      className={`text-sm ${
                        holding.change.startsWith("+")
                          ? "text-green-500"
                          : holding.change.startsWith("-")
                          ? "text-red-500"
                          : "text-gray-500"
                      }`}
                    >
                      {holding.change}
                    </p>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Recent Transactions */}
        <Card className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-gray-200/50 dark:border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <History className="w-5 h-5" />
              Recent Transactions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTransactions.map((tx, index) => (
                <motion.div
                  key={tx.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 rounded-xl bg-gray-50/50 dark:bg-white/5 hover:bg-gray-100/50 dark:hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        tx.type === "buy"
                          ? "bg-green-100 dark:bg-green-900/20"
                          : tx.type === "sell"
                          ? "bg-red-100 dark:bg-red-900/20"
                          : "bg-blue-100 dark:bg-blue-900/20"
                      }`}
                    >
                      {tx.type === "buy" ? (
                        <Plus className="w-5 h-5 text-green-600 dark:text-green-400" />
                      ) : tx.type === "sell" ? (
                        <Minus className="w-5 h-5 text-red-600 dark:text-red-400" />
                      ) : (
                        <ArrowUpDown className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white capitalize">
                        {tx.type} {tx.amount}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {tx.time}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900 dark:text-white">
                      {tx.value}
                    </p>
                    <Badge
                      variant={
                        tx.status === "completed" ? "default" : "secondary"
                      }
                    >
                      {tx.status}
                    </Badge>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
