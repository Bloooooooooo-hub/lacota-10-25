"use client"

import { useState } from "react"
import { Card } from "../ui/card"
import { Button } from "../ui/button"
import { Plus, Send, Headphones, ArrowUpRight, ArrowDownLeft } from "lucide-react"

interface WalletScreenProps {
  passengerData: any
}

export default function WalletScreen({ passengerData }: WalletScreenProps) {
  const [showTransfer, setShowTransfer] = useState(false)

  const transactions = [
    { id: 1, type: "debit", date: "Transfert vers +225 07 00 657 679", amount: "-300 fr" },
    { id: 2, type: "credit", date: "Recharge avec +225 07 00 657 679", amount: "+3,300 fr" },
    { id: 3, type: "debit", date: "Transfert vers +225 07 00 657 679", amount: "+3,300 fr" },
  ]

  return (
    <div className="min-h-screen bg-[#fffaf3] p-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-black" style={{ fontFamily: "cursive" }}>
          La Cota
        </h1>
      </div>

      <Card className="bg-gradient-to-br from-red-600 to-red-700 text-white p-6 mb-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-sm opacity-90 mb-1">Portefeuille LA COTA</p>
            <p className="text-xs opacity-75">Solde</p>
          </div>
          <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
            <span className="text-2xl font-bold">LC</span>
          </div>
        </div>

        <p className="text-4xl font-bold mb-6">5,300 FR</p>

        <div className="flex items-center justify-around">
          <button className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <Plus className="w-6 h-6" />
            </div>
            <span className="text-xs">Recharger</span>
          </button>

          <button onClick={() => setShowTransfer(true)} className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <Send className="w-6 h-6" />
            </div>
            <span className="text-xs">Transférer</span>
          </button>

          <button className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <Headphones className="w-6 h-6" />
            </div>
            <span className="text-xs">Service client</span>
          </button>
        </div>
      </Card>

      <div className="space-y-4">
        <h3 className="font-semibold text-gray-900">Transactions</h3>

        {transactions.map((transaction) => (
          <Card key={transaction.id} className="p-4 bg-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    transaction.type === "credit" ? "bg-emerald-100" : "bg-red-100"
                  }`}
                >
                  {transaction.type === "credit" ? (
                    <ArrowDownLeft className="w-5 h-5 text-emerald-600" />
                  ) : (
                    <ArrowUpRight className="w-5 h-5 text-red-600" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{transaction.date}</p>
                  <p className="text-xs text-gray-500">LA COTA</p>
                </div>
              </div>
              <p className={`font-semibold ${transaction.type === "credit" ? "text-emerald-600" : "text-red-600"}`}>
                {transaction.amount}
              </p>
            </div>
          </Card>
        ))}
      </div>

      {/* Transfer Modal */}
      {showTransfer && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="bg-white p-6 max-w-sm w-full space-y-4">
            <div className="flex items-start justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Transfert</h3>
              <button onClick={() => setShowTransfer(false)} className="text-gray-400 hover:text-gray-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2 p-3 border border-gray-300 rounded-lg">
                <span className="text-sm">🇨🇮 +225</span>
                <input type="tel" placeholder="XX XX XX XXX" className="flex-1 outline-none bg-transparent" />
              </div>

              <div className="bg-slate-700 text-white p-4 rounded-lg text-center">
                <p className="text-3xl font-bold mb-2">2,500 FR</p>
                <p className="text-sm opacity-75">Indiquez un montant et le Solde</p>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, "*", 0, "#"].map((num) => (
                  <button
                    key={num}
                    className="h-12 bg-gray-200 hover:bg-gray-300 rounded-lg font-semibold text-gray-900"
                  >
                    {num}
                  </button>
                ))}
              </div>

              <Button className="w-full h-12 bg-slate-700 hover:bg-slate-800 text-white font-semibold">Terminer</Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
