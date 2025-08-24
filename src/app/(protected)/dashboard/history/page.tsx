// app/history/page.tsx
"use client";

import { useState } from "react";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { ArrowUpDown, Clock, Copy, Check } from "lucide-react";

const mockTransactions = [
  {
    id: 1,
    type: "swap",
    fromToken: "BTC",
    toToken: "NGN",
    fromAmount: "0.0025",
    toAmount: "431,715.63",
    status: "completed",
    timestamp: "2024-01-15T10:30:00Z",
    txHash: "0x1234...5678",
    fee: "5,785.42 NGN",
  },
  {
    id: 2,
    type: "swap",
    fromToken: "ETH",
    toToken: "USD",
    fromAmount: "2.5",
    toAmount: "10,931.56",
    status: "completed",
    timestamp: "2024-01-14T15:45:00Z",
    txHash: "0x2345...6789",
    fee: "32.79 USD",
  },
  {
    id: 3,
    type: "swap",
    fromToken: "USDT",
    toToken: "GHS",
    fromAmount: "500",
    toAmount: "5,952.38",
    status: "pending",
    timestamp: "2024-01-14T09:15:00Z",
    txHash: "0x3456...7890",
    fee: "15.00 USDT",
  },
  {
    id: 4,
    type: "swap",
    fromToken: "BNB",
    toToken: "USD",
    fromAmount: "5.0",
    toAmount: "4,287.68",
    status: "failed",
    timestamp: "2024-01-13T14:20:00Z",
    txHash: "0x4567...8901",
    fee: "0.00 USD",
  },
];

export default function HistoryPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [copied, setCopied] = useState<string | null>(null);

  const filteredTransactions = mockTransactions.filter((tx) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Completed") return tx.status === "completed";
    if (activeFilter === "Pending") return tx.status === "pending";
    if (activeFilter === "Failed") return tx.status === "failed";
    return true;
  });

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge className="bg-green-100 text-green-800 border border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-700/50">
            Completed
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 border border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-700/50">
            Pending
          </Badge>
        );
      case "failed":
        return (
          <Badge className="bg-red-100 text-red-800 border border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-700/50">
            Failed
          </Badge>
        );
      default:
        return (
          <Badge
            variant="secondary"
            className="dark:bg-gray-700 dark:text-gray-300"
          >
            {status}
          </Badge>
        );
    }
  };

  const getTokenIcon = (token: string) => {
    const icons: { [key: string]: { icon: string; color: string } } = {
      BTC: { icon: "₿", color: "bg-orange-500" },
      ETH: { icon: "Ξ", color: "bg-blue-500" },
      USDT: { icon: "₮", color: "bg-green-500" },
      BNB: { icon: "B", color: "bg-yellow-500" },
      USD: { icon: "$", color: "bg-gray-500" },
      NGN: { icon: "₦", color: "bg-green-600" },
      GHS: { icon: "₵", color: "bg-red-500" },
    };
    return icons[token] || { icon: token[0], color: "bg-gray-500" };
  };

  return (
    <div className="min-h-screen p-4 pb-20 md:p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
          Transaction History
        </h1>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mt-4">
          {["All", "Completed", "Pending", "Failed"].map((filter) => (
            <Button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              aria-pressed={activeFilter === filter}
              className={`text-sm px-4 py-2 rounded-full transition-colors
                ${
                  activeFilter === filter
                    ? "bg-white text-black hover:bg-gray-200 dark:bg-gray-700 dark:text-white"
                    : "bg-transparent text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
            >
              {filter}
            </Button>
          ))}
        </div>
      </div>

      {/* Content */}
      {filteredTransactions.length > 0 ? (
        <div className="space-y-4">
          {filteredTransactions.map((tx) => {
            const fromTokenInfo = getTokenIcon(tx.fromToken);
            const toTokenInfo = getTokenIcon(tx.toToken);

            return (
              <div
                key={tx.id}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  {/* Transaction Info */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 flex-1">
                    {/* Token Icons */}
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-10 h-10 ${fromTokenInfo.color} rounded-full flex items-center justify-center text-white font-bold`}
                        aria-label={`${tx.fromToken} icon`}
                      >
                        {fromTokenInfo.icon}
                      </div>
                      <ArrowUpDown className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                      <div
                        className={`w-10 h-10 ${toTokenInfo.color} rounded-full flex items-center justify-center text-white font-bold`}
                        aria-label={`${tx.toToken} icon`}
                      >
                        {toTokenInfo.icon}
                      </div>
                    </div>

                    {/* Details */}
                    <div className="min-w-0 flex-1">
                      <div className="font-semibold text-gray-900 dark:text-white truncate">
                        {tx.fromAmount} {tx.fromToken} → {tx.toAmount}{" "}
                        {tx.toToken}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mt-1">
                        <Clock className="w-4 h-4" />
                        {formatDate(tx.timestamp)}
                      </div>
                    </div>
                  </div>

                  {/* Status & Hash */}
                  <div className="flex flex-col items-start sm:items-end gap-2 min-w-0 mt-2 sm:mt-0">
                    {getStatusBadge(tx.status)}

                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Fee: {tx.fee}
                    </div>

                    <div className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500 font-mono truncate max-w-[180px] sm:max-w-xs">
                      <span className="truncate">{tx.txHash}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(tx.txHash)}
                        aria-label={`Copy transaction hash ${tx.txHash}`}
                        className="p-0 h-auto flex-shrink-0"
                      >
                        {copied === tx.txHash ? (
                          <Check className="w-3 h-3 text-green-500" />
                        ) : (
                          <Copy className="w-3 h-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-12 text-center shadow-sm">
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <Clock className="w-8 h-8 text-gray-400 dark:text-gray-500" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No transactions found
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            {activeFilter === "All"
              ? "You haven't made any transactions yet. Start by making your first swap!"
              : `No ${activeFilter.toLowerCase()} transactions found`}
          </p>
          <Button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full px-6 py-2 hover:from-blue-600 hover:to-purple-700">
            Make Your First Swap
          </Button>
        </div>
      )}
    </div>
  );
}
