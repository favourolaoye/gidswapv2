"use client";

import { Badge } from "@/src/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import React from "react";
import { motion } from "framer-motion";
import { Plus, Minus, ArrowUpDown, History } from "lucide-react";
import { recentTransactions } from "@/lib/constants";

export default function HistoryPage() {
  return (
    <div>
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
    </div>
  );
}
