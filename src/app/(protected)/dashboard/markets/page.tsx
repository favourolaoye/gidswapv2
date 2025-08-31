"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, TrendingUp, TrendingDown, BarChart3 } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";

interface Token {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  price_change_percentage_1h_in_currency?: number;
  price_change_percentage_24h?: number;
  fully_diluted_valuation?: number;
}

export default function MarketsPage() {
  const [activeTab, setActiveTab] = useState("Tokens");
  const [activeFilter, setActiveFilter] = useState("All");
  const [activeCurrency, setActiveCurrency] = useState<"USD" | "NGN">("USD");
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch market data from CoinGecko
  const { data: tokens = [], isLoading } = useQuery<Token[]>({
    queryKey: ["markets", activeCurrency],
    queryFn: async () => {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${activeCurrency.toLowerCase()}&order=market_cap_desc&per_page=50&page=1&sparkline=false&price_change_percentage=1h,24h`
      );
      return res.json();
    },
    refetchInterval: 120000, // refresh every 2 min
  });

  const filteredTokens = tokens.filter(
    (token) =>
      token.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      token.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: activeCurrency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 4,
    }).format(price);

  const formatChange = (change?: number) => {
    if (change === undefined || change === null) return <span>-</span>;
    const isPositive = change > 0;
    return (
      <span
        className={`flex items-center justify-end gap-1 ${
          isPositive
            ? "text-green-500 dark:text-green-400"
            : "text-red-500 dark:text-red-400"
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

        {/* Filters + Search */}
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
                  onClick={() => setActiveCurrency(currency as "USD" | "NGN")}
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
      {activeTab === "Tokens" && !isLoading && filteredTokens.length > 0 ? (
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
              {filteredTokens.map((token, index) => (
                <tr
                  key={token.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors border-b border-gray-100 dark:border-gray-700 last:border-b-0"
                >
                  <td className="p-4 text-gray-500 dark:text-gray-400">
                    {index + 1}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={token.image}
                        alt={token.name}
                        className="w-8 h-8 rounded-full"
                      />
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white truncate max-w-[80px] sm:max-w-none">
                          {token.symbol.toUpperCase()}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-[100px] sm:max-w-none">
                          {token.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-right font-medium text-gray-900 dark:text-white">
                    {formatPrice(token.current_price)}
                  </td>
                  <td className="p-4 text-right">
                    {formatChange(token.price_change_percentage_1h_in_currency)}
                  </td>
                  <td className="p-4 text-right">
                    {formatChange(token.price_change_percentage_24h)}
                  </td>
                  <td className="p-4 text-right text-gray-500 dark:text-gray-400">
                    {token.fully_diluted_valuation
                      ? formatPrice(token.fully_diluted_valuation)
                      : "-"}
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
