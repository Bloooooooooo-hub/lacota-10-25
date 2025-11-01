"use client"

import { useState } from "react"
import { Button } from "../ui/button"
import { MapPin, Phone, Star } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"

interface ActiveRideProps {
  onComplete: () => void
}

export default function ActiveRide({ onComplete }: ActiveRideProps) {
  const [passengers, setPassengers] = useState([
    { id: 1, name: "Diomandé Noura", stop: "Angré Bluetooth", status: "waiting", rating: 5 },
    { id: 2, name: "Emmanuel Ake", stop: "Angré S1COMEX", status: "waiting", rating: 5 },
    { id: 3, name: "Sandra Kouakou", stop: "Angré SIBELL", status: "waiting", rating: 5 },
  ])
  const [showRatingDialog, setShowRatingDialog] = useState(false)
  const [selectedPassenger, setSelectedPassenger] = useState<any>(null)

  const handlePassengerAction = (passengerId: number, action: "picked" | "absent" | "dropped") => {
    setPassengers(passengers.map((p) => (p.id === passengerId ? { ...p, status: action } : p)))
  }

  const handleRatePassenger = (passengerId: number) => {
    const passenger = passengers.find((p) => p.id === passengerId)
    setSelectedPassenger(passenger)
    setShowRatingDialog(true)
  }

  const allDropped = passengers.every((p) => p.status === "dropped" || p.status === "absent")

  return (
    <div className="min-h-screen bg-[#fffaf3] flex flex-col">
      {/* Map Section */}
      <div className="h-1/3 bg-gray-200 relative">
        <div className="absolute inset-0 flex items-center justify-center text-gray-400">[Carte GPS en temps réel]</div>
        <div className="absolute top-4 left-4 bg-white rounded-full p-2 shadow-lg">
          <MapPin className="w-6 h-6 text-green-600" />
        </div>
      </div>

      {/* Passengers List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        <h2 className="text-lg font-bold mb-4">
          Votre trajet a commencé, veuillez aller récupérer vos passagers ci-dessous.
        </h2>

        {passengers.map((passenger) => (
          <div key={passenger.id} className="bg-gradient-to-br from-[#3B5A7C] to-[#2A4A6C] rounded-2xl p-4 text-white">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-2xl">👤</span>
                </div>
                <div>
                  <p className="font-bold">{passenger.name}</p>
                  <p className="text-sm opacity-90">Arrêt : {passenger.stop}</p>
                </div>
              </div>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="flex-1 bg-white/20 hover:bg-white/30 border-0 text-white">
                <Phone className="w-4 h-4 mr-1" />
                Appeler le passager
              </Button>
              <Button size="sm" variant="outline" className="bg-white/20 hover:bg-white/30 border-0 text-white">
                <MapPin className="w-4 h-4" />
              </Button>
            </div>

            <div className="mt-3 space-y-2">
              {passenger.status === "waiting" && (
                <>
                  <Button
                    onClick={() => handlePassengerAction(passenger.id, "picked")}
                    className="w-full bg-[#28C76F] hover:bg-green-600 text-white"
                  >
                    Je suis à l'arrêt
                  </Button>
                  <Button
                    onClick={() => handlePassengerAction(passenger.id, "absent")}
                    variant="destructive"
                    className="w-full"
                  >
                    Passager absent
                  </Button>
                </>
              )}
              {passenger.status === "picked" && (
                <Button
                  onClick={() => {
                    handlePassengerAction(passenger.id, "dropped")
                    handleRatePassenger(passenger.id)
                  }}
                  className="w-full bg-[#28C76F] hover:bg-green-600 text-white"
                >
                  Passager récupéré
                </Button>
              )}
              {passenger.status === "dropped" && (
                <div className="bg-green-600 text-white text-center py-2 rounded-lg font-semibold">Passager déposé</div>
              )}
              {passenger.status === "absent" && (
                <div className="bg-red-600 text-white text-center py-2 rounded-lg font-semibold">Passager absent</div>
              )}
            </div>
          </div>
        ))}

        {allDropped && (
          <Button
            onClick={onComplete}
            className="w-full h-14 bg-[#3B82F6] hover:bg-blue-600 text-white text-lg font-semibold"
          >
            Terminer le trajet
          </Button>
        )}
      </div>

      {/* Rating Dialog */}
      <Dialog open={showRatingDialog} onOpenChange={setShowRatingDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">Laissez une note au passager</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="text-center">
              <p className="font-bold text-lg mb-2">{selectedPassenger?.name}</p>
              <div className="flex justify-center gap-2 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-8 h-8 fill-yellow-400 text-yellow-400 cursor-pointer" />
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <span className="mr-2">⏰</span> En retard à l'arrêt
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <span className="mr-2">✅</span> Ponctuel
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <span className="mr-2">😊</span> Poli
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <span className="mr-2">😠</span> Mal poli
              </Button>
            </div>
            <Button
              onClick={() => setShowRatingDialog(false)}
              className="w-full bg-[#28C76F] hover:bg-green-600 text-white"
            >
              Valider
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
