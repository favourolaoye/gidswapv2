"use client";

import { useState } from "react";
import { Search, TrendingUp, TrendingDown, BarChart3 } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";

const mockTokens = [
  {
    id: 1,
    name: "Bitcoin",
    symbol: "BTC",
    price: 117003.7029,
    change1h: 0.24,
    change24h: -0.92,
    fdv: "2,329,344,819.161B",
    icon: "₿",
    iconColor: "bg-orange-500",
  },
  {
    id: 2,
    name: "Ethereum",
    symbol: "ETH",
    price: 4372.625,
    change1h: 0.57,
    change24h: -3.45,
    fdv: "514,953,319.280B",
    icon: "Ξ",
    iconColor: "bg-blue-500",
  },
  {
    id: 3,
    name: "Tether",
    symbol: "USDT",
    price: 1.0019,
    change1h: -0.01,
    change24h: 0.05,
    fdv: "149,181,413.465B",
    icon: "₮",
    iconColor: "bg-green-500",
  },
  {
    id: 4,
    name: "BNB",
    symbol: "BNB",
    price: 857.5365,
    change1h: 1.02,
    change24h: -0.1,
    fdv: "127,713,112.999B",
    icon: "B",
    iconColor: "bg-yellow-500",
  },
  {
    id: 5,
    name: "Solana",
    symbol: "SOL",
    price: 184.8614,
    change1h: 0.79,
    change24h: -4.19,
    fdv: "99,838,035.059B",
    icon: "◎",
    iconColor: "bg-purple-500",
  },
  {
    id: 6,
    name: "USD Coin",
    symbol: "USDC",
    price: 1.0025,
    change1h: -0.06,
    change24h: 0.27,
    fdv: "68,558,975.194B",
    icon: "$",
    iconColor: "bg-blue-600",
  },
];

export default function MarketsPage() {
  const [activeTab, setActiveTab] = useState("Tokens");
  const [activeFilter, setActiveFilter] = useState("All");
  const [activeCurrency, setActiveCurrency] = useState("USD");
  const [searchQuery, setSearchQuery] = useState("");
  const [hasData] = useState(true);

  const filteredTokens = mockTokens.filter(
    (token) =>
      token.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      token.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 4,
    }).format(price);
  };

  const formatChange = (change: number) => {
    const isPositive = change > 0;
    return (
      <span
        className={`flex items-center justify-end gap-1 ${
          isPositive
            ? "text-green-500 dark:text-green-400"
            : "text-red-500 dark:text-red-400"
        }`}
        aria-label={`${Math.abs(change).toFixed(2)}% ${
          isPositive ? "increase" : "decrease"
        }`}
      >
        {isPositive ? (
          <TrendingUp className="w-3 h-3" />
        ) : (
          <TrendingDown className="w-3 h-3" />
        )}
        {Math.abs(change).toFixed(2)}%
      </span>
    );
  };

  return (
    <main className="p-4 md:p-6 w-full pb-10 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
          Markets
        </h1>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {["Tokens", "Watchlist"].map((tab) => (
            <Button
              key={tab}
              onClick={() => setActiveTab(tab)}
              aria-pressed={activeTab === tab}
              className={`text-sm px-6 py-2 rounded-full transition-colors
                ${
                  activeTab === tab
                    ? "bg-black text-white hover:bg-gray-200 dark:bg-gray-700"
                    : "bg-transparent text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
            >
              {tab}
            </Button>
          ))}
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row gap-4 items-start justify-between">
          <div className="flex flex-wrap gap-2">
            {["All", "Top gainers", "Top losers"].map((filter) => (
              <Button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                aria-pressed={activeFilter === filter}
                className={`text-sm px-4 py-2 rounded-full transition-colors
                  ${
                    activeFilter === filter
                      ? "bg-black text-white hover:bg-gray-200 dark:bg-gray-700"
                      : "bg-transparent text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
              >
                {filter}
              </Button>
            ))}
          </div>

          <div className="flex items-center gap-4 w-full sm:w-auto">
            {/* Currency Selector */}
            <div className="flex gap-2">
              {["USD", "NGN"].map((currency) => (
                <Button
                  key={currency}
                  onClick={() => setActiveCurrency(currency)}
                  aria-pressed={activeCurrency === currency}
                  className={`text-sm px-4 py-2 rounded-full transition-colors
                    ${
                      activeCurrency === currency
                        ? "bg-white text-black hover:bg-gray-200 dark:bg-gray-700 dark:text-white"
                        : "bg-transparent text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                >
                  {currency}
                </Button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search tokens..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded-lg w-full"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      {activeTab === "Tokens" && hasData && filteredTokens.length > 0 ? (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden overflow-x-auto shadow-sm">
          <table className="w-full table-auto">
            <thead className="text-gray-600 dark:text-gray-400 text-sm font-medium border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th className="text-left p-4">#</th>
                <th className="text-left p-4">Token</th>
                <th className="text-right p-4">Price</th>
                <th className="text-right p-4">1H</th>
                <th className="text-right p-4">24H</th>
                <th className="text-right p-4">FDV</th>
              </tr>
            </thead>
            <tbody>
              {filteredTokens.map((token) => (
                <tr
                  key={token.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors border-b border-gray-100 dark:border-gray-700 last:border-b-0"
                >
                  <td className="p-4 text-gray-500 dark:text-gray-400">
                    {token.id}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 ${token.iconColor} rounded-full flex items-center justify-center text-white font-bold`}
                        aria-label={`${token.symbol} icon`}
                      >
                        {token.icon}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white truncate max-w-[80px] sm:max-w-none">
                          {token.symbol}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-[100px] sm:max-w-none">
                          {token.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-right font-medium text-gray-900 dark:text-white">
                    {formatPrice(token.price)}
                  </td>
                  <td className="p-4 text-right">
                    {formatChange(token.change1h)}
                  </td>
                  <td className="p-4 text-right">
                    {formatChange(token.change24h)}
                  </td>
                  <td className="p-4 text-right text-gray-500 dark:text-gray-400">
                    ${token.fdv}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-12 text-center shadow-sm">
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <BarChart3 className="w-8 h-8 text-gray-400 dark:text-gray-500" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            {activeTab === "Watchlist"
              ? "No tokens in watchlist"
              : "No tokens found"}
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            {activeTab === "Watchlist"
              ? "Add tokens to your watchlist to track their performance"
              : searchQuery
              ? `No tokens match "${searchQuery}"`
              : "Market data is currently unavailable"}
          </p>
          {activeTab === "Watchlist" && (
            <Button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full px-6 py-2 hover:from-blue-600 hover:to-purple-700">
              Browse Tokens
            </Button>
          )}
        </div>
      )}
    </main>
  );
}
