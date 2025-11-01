"use client"

import { useState } from "react"
import { Button } from "../ui/button"
import { Card } from "../ui/card"
import { MapPin, Car, Phone, MessageCircle, X, QrCode } from "lucide-react"

export default function TrajetScreen() {
  const [showDriverInfo, setShowDriverInfo] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [rideStarted, setRideStarted] = useState(false)

  const rides = [
    {
      id: 1,
      date: "Lun 15 Sept. 06:00 - 7:30",
      from: "Bingerville Nouvelle gare",
      to: "Snef Angré 7è tranche",
      price: "1000 fr",
    },
  ]

  const handleRideClick = () => {
    setShowDriverInfo(true)
  }

  const handleConfirmArrival = () => {
    setShowDriverInfo(false)
    setShowConfirmation(true)
  }

  const handleScanQR = () => {
    setShowConfirmation(false)
    setRideStarted(true)
  }

  return (
    <div className="min-h-screen bg-[#fffaf3]">
      <div
        className="h-64 bg-cover bg-center relative"
        style={{ backgroundImage: "url(/placeholder.svg?height=300&width=400&query=city+map)" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent" />
        <div className="absolute top-4 left-4">
          <button className="text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </div>

        {/* Map markers */}
        <div className="absolute top-20 left-1/4">
          <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center">
            <MapPin className="w-5 h-5 text-white" />
          </div>
          <p className="text-xs text-white mt-1">Navala GROUP</p>
        </div>
        <div className="absolute top-32 left-1/3">
          <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center">
            <MapPin className="w-5 h-5 text-white" />
          </div>
          <p className="text-xs text-white mt-1">BOLD</p>
        </div>
      </div>

      <div className="p-4 space-y-4 -mt-20 relative z-10">
        <div className="bg-orange-500 text-white px-4 py-2 rounded-lg text-center font-semibold">
          Trajets en cours : 1
        </div>

        <Card className="bg-white p-4 space-y-3">
          <p className="text-sm font-semibold text-gray-700">Sélectionner un trajet</p>

          {rides.map((ride) => (
            <Card
              key={ride.id}
              onClick={handleRideClick}
              className="p-4 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-semibold text-gray-900">{ride.date}</p>
                  <p className="text-xs text-gray-600">{ride.from}</p>
                  <div className="flex items-center gap-2 my-2">
                    <div className="text-xs text-gray-500">1h30min</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Car className="w-4 h-4 text-gray-400" />
                    <p className="text-xs text-gray-600">LA COTA</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <p className="text-xs text-gray-600">{ride.to}</p>
                  </div>
                  <p className="text-xs text-gray-500">3 places restantes</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">{ride.price}</p>
                  <p className="text-xs text-gray-500">Par passager</p>
                </div>
              </div>
            </Card>
          ))}
        </Card>

        <Button className="w-full h-12 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold">
          Commencer un trajet
        </Button>
      </div>

      {/* Driver Info Modal */}
      {showDriverInfo && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="bg-white p-6 max-w-sm w-full space-y-4">
            <div className="flex items-start justify-between">
              <div className="space-y-4 flex-1">
                <div className="bg-slate-700 text-white p-4 rounded-lg space-y-3">
                  <div className="flex items-center justify-center">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                      <div className="w-12 h-12 bg-gray-300 rounded-full" />
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="font-semibold">Kouassi Richard</p>
                    <p className="text-sm">Toyota Yaaris, AA-252-AU</p>
                  </div>
                  <div className="flex items-center justify-around pt-2">
                    <button className="flex flex-col items-center gap-1">
                      <Phone className="w-5 h-5" />
                      <span className="text-xs">Appeler le chauffeur</span>
                    </button>
                    <button className="flex flex-col items-center gap-1">
                      <MessageCircle className="w-5 h-5" />
                      <span className="text-xs">Écrire au chauffeur</span>
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm text-gray-700">
                    Votre chauffeur est en route et arrivera aux environs de [+ ou - heure de départ en fonction de
                    l'arrêt]
                  </p>
                  <p className="text-sm text-gray-700">Une fois dans le véhicule, scannez le code qr du chauffeur</p>
                </div>

                <Button
                  onClick={handleConfirmArrival}
                  className="w-full h-12 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold"
                >
                  Je suis à mon arrêt
                </Button>
              </div>
              <button onClick={() => setShowDriverInfo(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
          </Card>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="bg-white p-6 max-w-sm w-full space-y-4">
            <div className="flex items-start justify-between">
              <div className="space-y-4 flex-1">
                <p className="text-sm font-semibold text-gray-900">
                  Attention, assurez vous d'être à votre arrêt avant de commencer le trajet
                </p>

                <Button
                  onClick={handleScanQR}
                  className="w-full h-12 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold flex items-center justify-center gap-2"
                >
                  <QrCode className="w-5 h-5" />
                  Scanner le code qr
                </Button>

                <Button className="w-full h-12 bg-orange-500 hover:bg-orange-600 text-white font-semibold">
                  Commencer un autre trajet
                </Button>

                <Button className="w-full h-12 bg-red-500 hover:bg-red-600 text-white font-semibold">
                  Annuler le trajet
                </Button>
              </div>
              <button onClick={() => setShowConfirmation(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
          </Card>
        </div>
      )}

      {/* Ride Started Modal */}
      {rideStarted && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="bg-white p-6 max-w-sm w-full space-y-4">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm font-semibold text-gray-900">
                  Votre course a débutée. Vous serez à votre destination dans OO minutes
                </p>
              </div>
              <button onClick={() => setRideStarted(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
