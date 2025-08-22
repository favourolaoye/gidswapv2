"use client";
import { useEffect, useState } from "react";
import { ArrowUpDown, Home, History, BarChart3, ArrowLeft } from "lucide-react";
import { DesktopNav } from "@/_components/dashboard/navigation/desktop-nav";
import { MobileNav } from "@/_components/dashboard/navigation/mobile-nav";
import { MobileBottomNav } from "@/_components/dashboard/navigation/mobile-bottom-nav";
import { ChatWidget } from "@/_components/dashboard/ui/chat-widget";
import { useSwapStore } from "@/lib/store";
import { CryptoSwapFlow } from "@/_components/dashboard/services/crypto-swap-flow";
import { CryptoFiatFlow } from "@/_components/dashboard/services/crypto-fiat-flow";
import { CexTransferFlow } from "@/_components/dashboard/services/cex-transfer-flow";
import { FiatCryptoFlow } from "@/_components/dashboard/services/fiat-crypto-flow";

type ServiceType =
  | "crypto-crypto"
  | "crypto-fiat"
  | "fiat-crypto"
  | "cex-transfer"
  | null;

const services = [
  {
    id: "crypto-crypto" as ServiceType,
    title: "Crypto to Crypto",
    description:
      "Swap between different cryptocurrencies instantly with competitive rates",
    icon: "🔄",
    color: "from-blue-500 to-purple-600",
  },
  {
    id: "crypto-fiat" as ServiceType,
    title: "Crypto to Cash",
    description:
      "Convert your cryptocurrency to fiat currency and withdraw to your bank",
    icon: "💰",
    color: "from-green-500 to-emerald-600",
  },
  {
    id: "fiat-crypto" as ServiceType,
    title: "Cash to Crypto",
    description: "Buy cryptocurrency using your bank account or credit card",
    icon: "🏦",
    color: "from-orange-500 to-red-600",
  },
  {
    id: "cex-transfer" as ServiceType,
    title: "Exchange Transfer",
    description:
      "Transfer funds between different cryptocurrency exchanges securely",
    icon: "🔀",
    color: "from-purple-500 to-pink-600",
  },
];

export const navLinks = [
  {
    name: "Swap",
    icon: <ArrowUpDown className="w-5 h-5" />,
    href: "/dashboardb/",
  },
  {
    name: "Account",
    icon: <Home className="w-5 h-5" />,
    href: "/dashboardb/account",
  },
  {
    name: "History",
    icon: <History className="w-5 h-5" />,
    href: "/dashboardb/history",
  },
  {
    name: "Markets",
    icon: <BarChart3 className="w-5 h-5" />,
    href: "/dashboardb/markets",
  },
];

export default function Dashboard() {
  const {
    showAdditionalInfo,
    activeLink,
    swapStep,
    swapData,
    isSwapping,
    setShowAdditionalInfo,
    setActiveLink,
    backToSwap,
    proceedWithWallet,
    fetchCurrencies,
  } = useSwapStore();

  const [selectedService, setSelectedService] = useState<ServiceType>(null);

  useEffect(() => {
    fetchCurrencies();
  }, [fetchCurrencies]);

  const renderServiceFlow = () => {
    switch (selectedService) {
      case "crypto-crypto":
        return <CryptoSwapFlow />;
      case "crypto-fiat":
        return <CryptoFiatFlow />;
      case "fiat-crypto":
        return <FiatCryptoFlow />;
      case "cex-transfer":
        return <CexTransferFlow />;
      default:
        return null;
    }
  };

  const renderServiceSelection = () => (
    <div className="w-full max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Flip, Swap & Send</h1>
        <p className="text-gray-400 text-lg">
          All your crypto moves in one place
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((service) => (
          <div
            key={service.id}
            onClick={() => setSelectedService(service.id)}
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 cursor-pointer hover:scale-[1.02] hover:shadow-2xl"
          >
            <div
              className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
            />

            <div className="relative p-8">
              <div className="flex items-start space-x-4">
                <div className="text-4xl">{service.icon}</div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-white transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                    {service.description}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex items-center text-sm text-gray-500 group-hover:text-gray-400 transition-colors">
                <span>Click to get started</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex-1 flex items-center justify-center px-4 md:py-16">
      {selectedService ? (
        <div className="w-full max-w-md mx-auto">
          <button
            onClick={() => setSelectedService(null)}
            className="flex items-center text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Home
          </button>
          {renderServiceFlow()}
        </div>
      ) : (
        renderServiceSelection()
      )}
    </div>
  );
}
