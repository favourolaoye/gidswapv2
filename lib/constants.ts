import { Currency } from "./types";
import { ArrowUpDown, BarChart3, History, Home } from "lucide-react";

export const useCaseNoExp = [
  {
    icon: "/images/transfer-stable-coin.svg",
    text: "Transfer stablecoins to cash in any bank account",
  },
  {
    icon: "/images/turn-defi-to-cash.svg",
    text: "Turn your DEFI yields into cash easily",
  },
  {
    icon: "/images/escape-p2p.svg",
    text: "Escape P2P and liquidate your cash in no time",
  },
  {
    icon: "/images/no-issue-dex.svg",
    text: "No issues of losses or security concerns like DEXes",
  },
];

export const useWeb3Dengen = [];

export // FAQ data
const faqs = [
  {
    question: "What is Gidswap?",
    answer:
      "Gidswap is a decentralized platform that allows you to convert stablecoins to local currency quickly and securely.",
  },
  {
    question: "Who is Gidswap for?",
    answer:
      "Gidswap is for anyone who needs to convert stablecoins to local currency, including traders, businesses, and individual users.",
  },
  {
    question: "How does Gidswap work?",
    answer:
      "Gidswap connects users with liquidity providers through smart contracts to facilitate fast and secure currency exchanges.",
  },
];

export const navLinks = [
  {
    name: "Swap",
    icon: ArrowUpDown,
    href: "/dashboard/",
  },
  {
    name: "Account",
    icon: Home,
    href: "/dashboard/account",
  },
  {
    name: "History",
    icon: History,
    href: "/dashboard/history",
  },
  {
    name: "Markets",
    icon: BarChart3,
    href: "/dashboard/markets",
  },
];
export const currencies: Currency[] = [
  {
    name: "USDC",
    logo: "/placeholder.svg?height=24&width=24&text=USDC",
    rate: 1,
    symbol: "USDC",
    type: "crypto",
  },
  {
    name: "USDT",
    logo: "/placeholder.svg?height=24&width=24&text=USDT",
    rate: 0.999,
    symbol: "USDT",
    type: "crypto",
  },
  {
    name: "BTC",
    logo: "/placeholder.svg?height=24&width=24&text=BTC",
    rate: 45000,
    symbol: "BTC",
    type: "crypto",
  },
  {
    name: "ETH",
    logo: "/placeholder.svg?height=24&width=24&text=ETH",
    rate: 2800,
    symbol: "ETH",
    type: "crypto",
  },
  {
    name: "NGN",
    logo: "/placeholder.svg?height=24&width=24&text=NGN",
    rate: 0.0013,
    symbol: "₦",
    type: "fiat",
  },
  {
    name: "USD",
    logo: "/placeholder.svg?height=24&width=24&text=USD",
    rate: 1,
    symbol: "$",
    type: "fiat",
  },
  {
    name: "GHS",
    logo: "/placeholder.svg?height=24&width=24&text=GHS",
    rate: 0.084,
    symbol: "₵",
    type: "fiat",
  },
];

// Mock data
export const portfolioValue = 12847.32;
export const portfolioChange = 5.67;
export const recentTransactions = [
  {
    id: 1,
    type: "buy",
    amount: "0.5 BTC",
    value: "$22,500",
    status: "completed",
    time: "2 hours ago",
  },
  {
    id: 2,
    type: "sell",
    amount: "100 USDC",
    value: "$100",
    status: "pending",
    time: "5 hours ago",
  },
  {
    id: 3,
    type: "swap",
    amount: "2 ETH → 5000 USDC",
    value: "$5,000",
    status: "completed",
    time: "1 day ago",
  },
];

export const cryptoHoldings = [
  {
    name: "Bitcoin",
    symbol: "BTC",
    amount: "0.5",
    value: "$22,500",
    change: "+2.5%",
  },
  {
    name: "Ethereum",
    symbol: "ETH",
    amount: "3.2",
    value: "$8,960",
    change: "-1.2%",
  },
  {
    name: "USDC",
    symbol: "USDC",
    amount: "1,500",
    value: "$1,500",
    change: "0%",
  },
];
