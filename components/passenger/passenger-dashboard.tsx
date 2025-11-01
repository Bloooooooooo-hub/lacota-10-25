"use client"

import { useState } from "react"
import CourseScreen from "./course-screen"
import TrajetScreen from "./trajet-screen"
import GrinScreen from "./grin-screen"
import InfosScreen from "./infos-screen"
import WalletScreen from "./wallet-screen"
import { Wallet, Plus, MapPin, MessageSquare, Info } from "lucide-react"

interface PassengerDashboardProps {
  passengerData: any
  onLogout: () => void
}

export default function PassengerDashboard({ passengerData, onLogout }: PassengerDashboardProps) {
  const [activeTab, setActiveTab] = useState<"wallet" | "course" | "trajet" | "grin" | "infos">("course")

  return (
    <div className="min-h-screen bg-[#fffaf3] pb-20">
      {/* Content */}
      <div className="h-[calc(100vh-80px)] overflow-y-auto">
        {activeTab === "wallet" && <WalletScreen passengerData={passengerData} />}
        {activeTab === "course" && <CourseScreen />}
        {activeTab === "trajet" && <TrajetScreen />}
        {activeTab === "grin" && <GrinScreen />}
        {activeTab === "infos" && <InfosScreen passengerData={passengerData} onLogout={onLogout} />}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-3 safe-area-bottom">
        <div className="flex items-center justify-around max-w-md mx-auto">
          <button
            onClick={() => setActiveTab("wallet")}
            className={`flex flex-col items-center gap-1 px-2 ${
              activeTab === "wallet" ? "text-emerald-600" : "text-gray-600"
            }`}
          >
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
              <Wallet className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-medium">Portefeuille</span>
          </button>

          <button
            onClick={() => setActiveTab("course")}
            className={`flex flex-col items-center gap-1 px-2 ${
              activeTab === "course" ? "text-emerald-600" : "text-gray-600"
            }`}
          >
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
              <Plus className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-medium">Course</span>
          </button>

          <button
            onClick={() => setActiveTab("trajet")}
            className={`flex flex-col items-center gap-1 px-2 ${
              activeTab === "trajet" ? "text-emerald-600" : "text-gray-600"
            }`}
          >
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
              <MapPin className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-medium">Trajet</span>
          </button>

          <button
            onClick={() => setActiveTab("grin")}
            className={`flex flex-col items-center gap-1 px-2 ${
              activeTab === "grin" ? "text-emerald-600" : "text-gray-600"
            }`}
          >
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
              <MessageSquare className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-medium">Le grin</span>
          </button>

          <button
            onClick={() => setActiveTab("infos")}
            className={`flex flex-col items-center gap-1 px-2 ${
              activeTab === "infos" ? "text-emerald-600" : "text-gray-600"
            }`}
          >
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
              <Info className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-medium">Infos</span>
          </button>
        </div>
      </div>
    </div>
  )
}
