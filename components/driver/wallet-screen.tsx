"use client"

import { useState } from "react"
import { Button } from "../ui/button"
import { Plus, ArrowRightLeft, Headphones } from "lucide-react"

export default function WalletScreen() {
  const [balance] = useState(5300)

  const transactions = [
    { id: 1, date: "11/09/2025 à 06:00", amount: -300, type: "Transfert" },
    { id: 2, date: "12/09/2025 à 14:30", amount: 5300, type: "Recharge avec Wave" },
    { id: 3, date: "13/09/2025 à 09:15", amount: -1500, type: "Paiement" },
  ]

  return (
    <div className="min-h-screen bg-[#fffaf3] p-6">
      <div className="max-w-md mx-auto space-y-6">
        {/* Wallet Card */}
        <div className="bg-gradient-to-br from-[#8B4789] to-[#6B3569] rounded-3xl p-6 text-white shadow-xl">
          <div className="flex items-start justify-between mb-8">
            <div>
              <p className="text-sm opacity-90 mb-1">Portefeuille LA COTA</p>
              <p className="text-xs opacity-75">Solde</p>
            </div>
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-2xl">💳</span>
            </div>
          </div>

          <div className="mb-8">
            <p className="text-5xl font-bold">{balance} FR</p>
          </div>

          <div className="flex gap-3">
            <Button className="flex-1 bg-white/20 hover:bg-white/30 text-white border-0 h-12">
              <Plus className="w-5 h-5 mr-2" />
              Recharger
            </Button>
            <Button className="flex-1 bg-white/20 hover:bg-white/30 text-white border-0 h-12">
              <ArrowRightLeft className="w-5 h-5 mr-2" />
              Transferer
            </Button>
            <Button className="flex-1 bg-white/20 hover:bg-white/30 text-white border-0 h-12">
              <Headphones className="w-5 h-5 mr-2" />
              Service client
            </Button>
          </div>
        </div>

        {/* Transactions */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-bold mb-4">Transactions</h3>
          <div className="space-y-3">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between py-3 border-b last:border-0">
                <div>
                  <p className="font-semibold">{transaction.type}</p>
                  <p className="text-sm text-gray-500">{transaction.date}</p>
                </div>
                <p className={`text-lg font-bold ${transaction.amount > 0 ? "text-green-600" : "text-gray-900"}`}>
                  {transaction.amount > 0 ? "+" : ""}
                  {transaction.amount} fr
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
