"use client"

import { useState } from "react"
import { Wallet, Plus, MapPin, Mail, Info } from "lucide-react"
import PublishRide from "./publish-ride"
import SelectRide from "./select-ride"
import WalletScreen from "./wallet-screen"
import ActiveRide from "./active-ride"

interface DriverDashboardProps {
  driverData: any
  onLogout: () => void
}

type DashboardTab = "wallet" | "publish" | "rides" | "grin" | "info"

export default function DriverDashboard({ driverData, onLogout }: DriverDashboardProps) {
  const [activeTab, setActiveTab] = useState<DashboardTab>("rides")
  const [hasActiveRide, setHasActiveRide] = useState(false)

  if (hasActiveRide) {
    return <ActiveRide onComplete={() => setHasActiveRide(false)} />
  }

  return (
    <div className="min-h-screen bg-[#fffaf3] flex flex-col">
      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-20">
        {activeTab === "wallet" && <WalletScreen />}
        {activeTab === "publish" && <PublishRide />}
        {activeTab === "rides" && <SelectRide onStartRide={() => setHasActiveRide(true)} />}
        {activeTab === "grin" && (
          <div className="p-6">
            <h2 className="text-2xl font-bold">Le Grin</h2>
          </div>
        )}
        {activeTab === "info" && (
          <div className="p-6">
            <h2 className="text-2xl font-bold">Infos</h2>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-3 safe-area-bottom">
        <div className="flex justify-around items-center max-w-md mx-auto">
          <NavButton
            icon={Wallet}
            label="Portefeuille"
            active={activeTab === "wallet"}
            onClick={() => setActiveTab("wallet")}
          />
          <NavButton
            icon={Plus}
            label="Publier"
            active={activeTab === "publish"}
            onClick={() => setActiveTab("publish")}
            highlight
          />
          <NavButton
            icon={MapPin}
            label="Trajets"
            active={activeTab === "rides"}
            onClick={() => setActiveTab("rides")}
          />
          <NavButton icon={Mail} label="Le grin" active={activeTab === "grin"} onClick={() => setActiveTab("grin")} />
          <NavButton icon={Info} label="Infos" active={activeTab === "info"} onClick={() => setActiveTab("info")} />
        </div>
      </div>
    </div>
  )
}

function NavButton({ icon: Icon, label, active, onClick, highlight }: any) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors ${
        highlight ? "bg-[#8B4789] text-white" : active ? "text-gray-900" : "text-gray-400"
      }`}
    >
      <Icon className="w-6 h-6" />
      <span className="text-xs font-medium">{label}</span>
    </button>
  )
}
