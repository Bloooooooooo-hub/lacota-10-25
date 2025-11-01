"use client"

import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import { User, Car, ArrowRight } from "lucide-react"

interface ProfileSelectionProps {
  onSelect: (type: "driver" | "passenger") => void
}

export default function ProfileSelection({ onSelect }: ProfileSelectionProps) {
  return (
    <div className="min-h-screen bg-[#fffaf3] flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="relative inline-block">
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-pink-200 to-peach-200 rounded-full opacity-50 blur-2xl" />
            <h1 className="relative text-5xl font-black text-gray-900" style={{ fontFamily: "cursive" }}>
              La Cota
            </h1>
          </div>
          <p className="text-lg text-gray-600">Choisissez votre profil</p>
        </div>

        {/* Profile Cards */}
        <div className="space-y-4">
          <Card className="border-2 border-gray-200 hover:border-emerald-400 transition-all duration-300 hover:shadow-lg cursor-pointer group bg-white">
            <CardContent className="p-6">
              <Button
                variant="ghost"
                className="w-full h-auto p-0 justify-start group-hover:bg-transparent"
                onClick={() => onSelect("passenger")}
              >
                <div className="flex items-center space-x-4 w-full">
                  <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center group-hover:bg-emerald-200 transition-colors">
                    <User className="w-7 h-7 text-emerald-600" />
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="text-xl font-bold text-gray-900">Passager</h3>
                    <p className="text-sm text-gray-600">Réserver un trajet</p>
                  </div>
                  <ArrowRight className="w-6 h-6 text-gray-400 group-hover:text-emerald-600 transition-colors" />
                </div>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-2 border-gray-200 hover:border-blue-400 transition-all duration-300 hover:shadow-lg cursor-pointer group bg-white">
            <CardContent className="p-6">
              <Button
                variant="ghost"
                className="w-full h-auto p-0 justify-start group-hover:bg-transparent"
                onClick={() => onSelect("driver")}
              >
                <div className="flex items-center space-x-4 w-full">
                  <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                    <Car className="w-7 h-7 text-blue-600" />
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="text-xl font-bold text-gray-900">Chauffeur</h3>
                    <p className="text-sm text-gray-600">Proposer des trajets</p>
                  </div>
                  <ArrowRight className="w-6 h-6 text-gray-400 group-hover:text-blue-600 transition-colors" />
                </div>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-sm text-gray-500">Université ou boulot, on y va beaucoup plus chap</p>
        </div>
      </div>
    </div>
  )
}
