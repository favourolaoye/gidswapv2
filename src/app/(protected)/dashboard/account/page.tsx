// "use client";
// import { useState } from "react";
// import { Button } from "@/src/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from "@/src/components/ui/card";
// import { Badge } from "@/src/components/ui/badge";
// import {
//   User,
//   Wallet,
//   Shield,
//   Settings,
//   Copy,
//   Eye,
//   EyeOff,
//   Plus,
//   ExternalLink,
//   Bell,
//   Lock,
//   CreditCard,
//   Smartphone,
// } from "lucide-react";

// const mockWallets = [
//   {
//     id: 1,
//     name: "MetaMask",
//     address: "0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4",
//     balance: "12.5847 ETH",
//     usdValue: "$35,234.56",
//     connected: true,
//   },
//   {
//     id: 2,
//     name: "Trust Wallet",
//     address: "0x8D4C0532925a3b8D4C0532925a3b8D4C0532925a",
//     balance: "0.2547 BTC",
//     usdValue: "$29,847.23",
//     connected: true,
//   },
// ];

// const mockActivity = [
//   { action: "Wallet Connected", timestamp: "2 hours ago", status: "success" },
//   { action: "Profile Updated", timestamp: "1 day ago", status: "success" },
//   { action: "2FA Enabled", timestamp: "3 days ago", status: "success" },
//   { action: "Password Changed", timestamp: "1 week ago", status: "success" },
// ];

// export default function AccountPage() {
//   const [balanceVisible, setBalanceVisible] = useState(true);
//   const [hasWallets] = useState(true);
//   const [isVerified] = useState(false);

//   const copyToClipboard = (text: string) => {
//     navigator.clipboard.writeText(text);
//   };

//   const truncateAddress = (address: string) => {
//     return `${address.slice(0, 6)}...${address.slice(-4)}`;
//   };

//   return (
//     <div className="p-4 md:p-6 space-y-6 bg-white/80 dark:bg-slate-900/80 max-w-6xl mx-auto">
//       {/* Header */}
//       <div className="mb-6">
//         <h1 className="text-2xl md:text-3xl font-bold mb-2 text-gray-900 dark:text-white">
//           Account
//         </h1>
//         <p className="text-gray-400 dark:text-gray-600">
//           Manage your profile, wallets, and security settings
//         </p>
//       </div>

//       {/* Profile Section */}
//       <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
//         <CardHeader>
//           <CardTitle className="flex items-center gap-2 text-white dark:text-white">
//             <User className="w-5 h-5" />
//             Profile Information
//           </CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-4 dark:bg-slate-900/80">
//           <div className="flex items-center gap-4">
//             <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
//               <User className="w-8 h-8 text-white" />
//             </div>
//             <div className="flex-1">
//               <h3 className="text-xl font-semibold text-white dark:text-white">
//                 John Doe
//               </h3>
//               <p className="text-gray-400 dark:text-gray-600">
//                 john.doe@example.com
//               </p>
//               <div className="flex items-center gap-2 mt-2">
//                 {isVerified ? (
//                   <Badge className="bg-green-500/20 text-green-400 border-green-500/30 dark:bg-green-500/20 dark:text-green-400 dark:border-green-500/30">
//                     <Shield className="w-3 h-3 mr-1" />
//                     Verified
//                   </Badge>
//                 ) : (
//                   <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 dark:bg-yellow-500/20 dark:text-yellow-400 dark:border-yellow-500/30">
//                     <Shield className="w-3 h-3 mr-1" />
//                     Unverified
//                   </Badge>
//                 )}
//               </div>
//             </div>
//             <Button
//               variant="outline"
//               className="border-gray-600 text-white hover:bg-gray-800 bg-transparent dark:border-gray-600 dark:text-white dark:hover:bg-gray-800"
//             >
//               <Settings className="w-4 h-4 mr-2" />
//               Edit Profile
//             </Button>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Connected Wallets */}
//       <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
//         <CardHeader className="flex flex-row items-center justify-between">
//           <CardTitle className="flex items-center gap-2 text-white dark:text-white">
//             <Wallet className="w-5 h-5" />
//             Connected Wallets
//           </CardTitle>
//           <Button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full px-4 py-2 dark:bg-gradient-to-r dark:from-blue-500 dark:to-purple-600 dark:text-white">
//             <Plus className="w-4 h-4 mr-2" />
//             Connect Wallet
//           </Button>
//         </CardHeader>
//         <CardContent className="dark:bg-slate-900/80">
//           {hasWallets && mockWallets.length > 0 ? (
//             <div className="space-y-4">
//               {mockWallets.map((wallet) => (
//                 <div
//                   key={wallet.id}
//                   className="bg-gray-800/50 rounded-lg p-4 dark:bg-white/5"
//                 >
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center gap-3">
//                       <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-yellow-500 rounded-full flex items-center justify-center">
//                         <Wallet className="w-5 h-5 text-white" />
//                       </div>
//                       <div>
//                         <h4 className="font-semibold text-white dark:text-white">
//                           {wallet.name}
//                         </h4>
//                         <div className="flex items-center gap-2 text-sm text-gray-400 dark:text-gray-600">
//                           <span className="truncate max-w-[120px] md:max-w-full">
//                             {truncateAddress(wallet.address)}
//                           </span>
//                           <Button
//                             variant="ghost"
//                             size="sm"
//                             onClick={() => copyToClipboard(wallet.address)}
//                             className="p-1 h-auto dark:text-gray-400 dark:hover:text-white"
//                           >
//                             <Copy className="w-3 h-3" />
//                           </Button>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="text-right">
//                       <div className="font-semibold text-white dark:text-white">
//                         {balanceVisible ? wallet.balance : "••••••"}
//                       </div>
//                       <div className="text-sm text-gray-400 dark:text-gray-600">
//                         {balanceVisible ? wallet.usdValue : "••••••"}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//               <div className="flex items-center justify-between pt-2">
//                 <Button
//                   variant="ghost"
//                   onClick={() => setBalanceVisible(!balanceVisible)}
//                   className="text-gray-400 hover:text-white dark:text-gray-400 dark:hover:text-white"
//                 >
//                   {balanceVisible ? (
//                     <EyeOff className="w-4 h-4 mr-2" />
//                   ) : (
//                     <Eye className="w-4 h-4 mr-2" />
//                   )}
//                   {balanceVisible ? "Hide Balances" : "Show Balances"}
//                 </Button>
//               </div>
//             </div>
//           ) : (
//             /* Empty State */
//             <div className="text-center py-8 dark:bg-slate-900/80">
//               <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4 dark:bg-white/5">
//                 <Wallet className="w-8 h-8 text-gray-400 dark:text-gray-600" />
//               </div>
//               <h3 className="text-lg font-semibold text-white dark:text-white mb-2">
//                 No wallets connected
//               </h3>
//               <p className="text-gray-400 dark:text-gray-600 mb-4">
//                 Connect your first wallet to start trading
//               </p>
//               <Button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full px-6 py-2 dark:bg-gradient-to-r dark:from-blue-500 dark:to-purple-600 dark:text-white">
//                 <Plus className="w-4 h-4 mr-2" />
//                 Connect Your First Wallet
//               </Button>
//             </div>
//           )}
//         </CardContent>
//       </Card>

//       {/* Security Settings */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 dark:bg-slate-900/80">
//         <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2 text-white dark:text-white">
//               <Shield className="w-5 h-5" />
//               Security
//             </CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-4 dark:bg-slate-900/80">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-3">
//                 <Lock className="w-5 h-5 text-gray-400 dark:text-gray-600" />
//                 <div>
//                   <p className="font-medium text-white dark:text-white">
//                     Two-Factor Authentication
//                   </p>
//                   <p className="text-sm text-gray-400 dark:text-gray-600">
//                     Add an extra layer of security
//                   </p>
//                 </div>
//               </div>
//               <Badge className="bg-green-500/20 text-green-400 border-green-500/30 dark:bg-green-500/20 dark:text-green-400 dark:border-green-500/30">
//                 Enabled
//               </Badge>
//             </div>
//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-3">
//                 <Smartphone className="w-5 h-5 text-gray-400 dark:text-gray-600" />
//                 <div>
//                   <p className="font-medium text-white dark:text-white">
//                     SMS Verification
//                   </p>
//                   <p className="text-sm text-gray-400 dark:text-gray-600">
//                     Verify transactions via SMS
//                   </p>
//                 </div>
//               </div>
//               <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 dark:bg-yellow-500/20 dark:text-yellow-400 dark:border-yellow-500/30">
//                 Disabled
//               </Badge>
//             </div>
//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-3">
//                 <Bell className="w-5 h-5 text-gray-400 dark:text-gray-600" />
//                 <div>
//                   <p className="font-medium text-white dark:text-white">
//                     Email Notifications
//                   </p>
//                   <p className="text-sm text-gray-400 dark:text-gray-600">
//                     Get notified of account activity
//                   </p>
//                 </div>
//               </div>
//               <Badge className="bg-green-500/20 text-green-400 border-green-500/30 dark:bg-green-500/20 dark:text-green-400 dark:border-green-500/30">
//                 Enabled
//               </Badge>
//             </div>
//           </CardContent>
//         </Card>

//         <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2 text-white dark:text-white">
//               <CreditCard className="w-5 h-5" />
//               Recent Activity
//             </CardTitle>
//           </CardHeader>
//           <CardContent className="dark:bg-slate-900/80">
//             {mockActivity.length > 0 ? (
//               <div className="space-y-3">
//                 {mockActivity.map((activity, index) => (
//                   <div
//                     key={index}
//                     className="flex items-center justify-between"
//                   >
//                     <div>
//                       <p className="font-medium text-white dark:text-white">
//                         {activity.action}
//                       </p>
//                       <p className="text-sm text-gray-400 dark:text-gray-600">
//                         {activity.timestamp}
//                       </p>
//                     </div>
//                     <Badge className="bg-green-500/20 text-green-400 border-green-500/30 dark:bg-green-500/20 dark:text-green-400 dark:border-green-500/30">
//                       Success
//                     </Badge>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <div className="text-center py-4 dark:bg-slate-900/80">
//                 <p className="text-gray-400 dark:text-gray-600">
//                   No recent activity
//                 </p>
//               </div>
//             )}
//           </CardContent>
//         </Card>
//       </div>

//       {/* Quick Actions */}
//       <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
//         <CardHeader>
//           <CardTitle className="text-white dark:text-white">
//             Quick Actions
//           </CardTitle>
//         </CardHeader>
//         <CardContent className="dark:bg-slate-900/80">
//           <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
//             {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-4"> */}
//             <Button
//               variant="outline"
//               className="border-gray-600 text-white hover:bg-gray-800 flex flex-col gap-2 h-auto py-4 bg-transparent dark:border-gray-600 dark:text-white dark:hover:bg-gray-800"
//             >
//               <Settings className="w-6 h-6" />
//               <span className="text-sm dark:text-white">Settings</span>
//             </Button>
//             <Button
//               variant="outline"
//               className="border-gray-600 text-white hover:bg-gray-800 flex flex-col gap-2 h-auto py-4 bg-transparent dark:border-gray-600 dark:text-white dark:hover:bg-gray-800"
//             >
//               <Shield className="w-6 h-6" />
//               <span className="text-sm dark:text-white">Security</span>
//             </Button>
//             <Button
//               variant="outline"
//               className="border-gray-600 text-white hover:bg-gray-800 flex flex-col gap-2 h-auto py-4 bg-transparent dark:border-gray-600 dark:text-white dark:hover:bg-gray-800"
//             >
//               <Bell className="w-6 h-6" />
//               <span className="text-sm dark:text-white">Notifications</span>
//             </Button>
//             <Button
//               variant="outline"
//               className="border-gray-600 text-white hover:bg-gray-800 flex flex-col gap-2 h-auto py-4 bg-transparent dark:border-gray-600 dark:text-white dark:hover:bg-gray-800"
//             >
//               <ExternalLink className="w-6 h-6" />
//               <span className="text-sm dark:text-white">Support</span>
//             </Button>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

// app/account/page.tsx
"use client";

import { useState } from "react";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import {
  User,
  Wallet,
  Shield,
  Settings,
  Copy,
  Check,
  Eye,
  EyeOff,
  Plus,
  ExternalLink,
  Bell,
  Lock,
  CreditCard,
  Smartphone,
} from "lucide-react";

const mockWallets = [
  {
    id: 1,
    name: "MetaMask",
    address: "0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4",
    balance: "12.5847 ETH",
    usdValue: "$35,234.56",
    connected: true,
  },
  {
    id: 2,
    name: "Trust Wallet",
    address: "0x8D4C0532925a3b8D4C0532925a3b8D4C0532925a",
    balance: "0.2547 BTC",
    usdValue: "$29,847.23",
    connected: true,
  },
];

const mockActivity = [
  { action: "Wallet Connected", timestamp: "2 hours ago", status: "success" },
  { action: "Profile Updated", timestamp: "1 day ago", status: "success" },
  { action: "2FA Enabled", timestamp: "3 days ago", status: "success" },
  { action: "Password Changed", timestamp: "1 week ago", status: "success" },
];

export default function AccountPage() {
  const [balanceVisible, setBalanceVisible] = useState(true);
  const [copied, setCopied] = useState<string | null>(null);
  const [hasWallets] = useState(true);
  const [isVerified] = useState(true); // Example: user is verified

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div className="p-4 pb-10 md:p-6 space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-2 text-gray-900 dark:text-white">
          Account
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your profile, wallets, and security settings
        </p>
      </div>

      {/* Profile Section */}
      <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
            <User className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            Profile Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                John Doe
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                john.doe@example.com
              </p>
              <div className="flex justify-center sm:justify-start items-center gap-2 mt-2">
                {isVerified ? (
                  <Badge className="bg-green-100 text-green-800 border border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-700/50">
                    <Shield className="w-3 h-3 mr-1" />
                    Verified
                  </Badge>
                ) : (
                  <Badge className="bg-yellow-100 text-yellow-800 border border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-700/50">
                    <Shield className="w-3 h-3 mr-1" />
                    Unverified
                  </Badge>
                )}
              </div>
            </div>
            <Button
              variant="outline"
              className="w-full sm:w-auto border-gray-300 dark:border-gray-600 text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Settings className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Connected Wallets */}
      <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm">
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
            <Wallet className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            Connected Wallets
          </CardTitle>
          <Button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full px-4 py-2 hover:from-blue-600 hover:to-purple-700">
            <Plus className="w-4 h-4 mr-2" />
            Connect Wallet
          </Button>
        </CardHeader>
        <CardContent>
          {hasWallets && mockWallets.length > 0 ? (
            <div className="space-y-4">
              {mockWallets.map((wallet) => (
                <div
                  key={wallet.id}
                  className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-4 border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-yellow-500 rounded-full flex items-center justify-center">
                        <Wallet className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          {wallet.name}
                        </h4>
                        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mt-1">
                          <span className="truncate max-w-[120px] sm:max-w-none">
                            {truncateAddress(wallet.address)}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard(wallet.address)}
                            aria-label={`Copy ${wallet.name} address`}
                            className="p-1 h-auto"
                          >
                            {copied === wallet.address ? (
                              <Check className="w-3 h-3 text-green-500" />
                            ) : (
                              <Copy className="w-3 h-3 text-gray-500 dark:text-gray-400" />
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="text-right sm:text-left mt-2 sm:mt-0">
                      <div className="font-semibold text-gray-900 dark:text-white">
                        {balanceVisible ? wallet.balance : "••••••"}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {balanceVisible ? wallet.usdValue : "••••••"}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div className="pt-2">
                <Button
                  variant="ghost"
                  onClick={() => setBalanceVisible(!balanceVisible)}
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                  {balanceVisible ? (
                    <>
                      <EyeOff className="w-4 h-4 mr-2" />
                      Hide Balances
                    </>
                  ) : (
                    <>
                      <Eye className="w-4 h-4 mr-2" />
                      Show Balances
                    </>
                  )}
                </Button>
              </div>
            </div>
          ) : (
            /* Empty State */
            <div className="text-center py-10">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Wallet className="w-8 h-8 text-gray-400 dark:text-gray-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                No wallets connected
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Connect your first wallet to start trading
              </p>
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full px-6 py-2 hover:from-blue-600 hover:to-purple-700">
                <Plus className="w-4 h-4 mr-2" />
                Connect Your First Wallet
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Security & Activity */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Security Settings */}
        <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
              <Shield className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              Security
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div className="flex items-center gap-3">
                <Lock className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    Two-Factor Authentication
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Add an extra layer of security
                  </p>
                </div>
              </div>
              <Badge className="bg-green-100 text-green-800 border border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-700/50">
                Enabled
              </Badge>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div className="flex items-center gap-3">
                <Smartphone className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    SMS Verification
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Verify transactions via SMS
                  </p>
                </div>
              </div>
              <Badge className="bg-yellow-100 text-yellow-800 border border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-700/50">
                Disabled
              </Badge>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    Email Notifications
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Get notified of account activity
                  </p>
                </div>
              </div>
              <Badge className="bg-green-100 text-green-800 border border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-700/50">
                Enabled
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
              <CreditCard className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            {mockActivity.length > 0 ? (
              <div className="space-y-3">
                {mockActivity.map((activity, index) => (
                  <div
                    key={index}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
                  >
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {activity.action}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {activity.timestamp}
                      </p>
                    </div>
                    <Badge className="bg-green-100 text-green-800 border border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-700/50">
                      Success
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-gray-500 dark:text-gray-400">
                  No recent activity
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-white">
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { icon: Settings, label: "Settings" },
              { icon: Shield, label: "Security" },
              { icon: Bell, label: "Notifications" },
              { icon: ExternalLink, label: "Support" },
            ].map(({ icon: Icon, label }) => (
              <Button
                key={label}
                variant="outline"
                className="flex flex-col items-center justify-center gap-2 h-auto py-3 px-2 text-sm border-gray-300 dark:border-gray-600 text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <Icon className="w-6 h-6" />
                <span>{label}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
