import { Currency } from "./types";

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
  {
    question: "Who is a provider?",
    answer:
      "Liquidity providers are individuals or institutions who supply funds to facilitate exchanges and earn fees for their services.",
  },
];

// export const currencies: Currency[] = [
//   { name: "USDC", logo: "/images/usdc-logo.svg", rate: 0.00002 },
//   { name: "ETH", logo: "/images/usdc-logo.svg", rate: 0.09 },
//   { name: "BTC", logo: "/images/usdc-logo.svg", rate: 1 },
// ];

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
