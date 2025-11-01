"use client"

import { useState } from "react"
import { Card } from "../ui/card"
import { Button } from "../ui/button"
import { Bell, Search, Check, MapPin, Phone, MessageCircle, X } from "lucide-react"

export default function GrinScreen() {
  const [showTripDetail, setShowTripDetail] = useState(false)
  const [showCancelModal, setShowCancelModal] = useState(false)
  const [showConfirmCancel, setShowConfirmCancel] = useState(false)

  const reservedTrips = [
    {
      id: 1,
      company: "LA COTA",
      date: "Lun 15 Sept.",
      time: "06:00 - 7:00",
      from: "Bingerville Nouvelle gare",
      to: "Carrefour Cascade",
      price: "1000 fr",
      status: "searching",
      message: "Recherche de chauffeurs...",
    },
    {
      id: 2,
      company: "LA COTA",
      date: "Lun 15 Sept.",
      time: "06:00 - 7:00",
      from: "Bingerville Nouvelle gare",
      to: "Carrefour Cascade",
      price: "1000 fr",
      status: "found",
      message: "1 chauffeur disponible",
      availableDrivers: 1,
    },
  ]

  const upcomingTrips = [
    {
      id: 3,
      company: "LA COTA",
      date: "Lun 15 Sept.",
      time: "06:00 - 7:00",
      from: "Bingerville Nouvelle gare",
      to: "Carrefour Cascade",
      price: "1000 fr",
      spotsLeft: 3,
    },
    {
      id: 4,
      company: "LA COTA",
      date: "Lun 15 Sept.",
      time: "06:00 - 7:00",
      from: "Bingerville Nouvelle gare",
      to: "Carrefour Cascade",
      price: "1000 fr",
      spotsLeft: 1,
    },
    {
      id: 5,
      company: "LA COTA",
      date: "Lun 15 Sept.",
      time: "06:00 - 7:00",
      from: "Bingerville Nouvelle gare",
      to: "Carrefour Cascade",
      price: "1000 fr",
      spotsLeft: 0,
    },
  ]

  if (showTripDetail) {
    return (
      <div className="min-h-screen bg-slate-800 p-4">
        <Card className="bg-slate-700 text-white p-4 mb-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Développement</h3>
            <button onClick={() => setShowTripDetail(false)} className="text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          <Card className="bg-white text-gray-900 p-3 mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold">LA COTA</span>
              <span className="font-bold text-lg">1000 fr</span>
            </div>
            <div className="flex items-center justify-between text-xs text-gray-600">
              <span>06:00 Bingerville Nouvelle gare</span>
              <span>7:30 Carrefour Cascade</span>
            </div>
          </Card>

          <div className="bg-slate-600 rounded-lg p-3 mb-4">
            <div className="text-sm mb-2">Lun 15 Sept. 06:00 - 7:30</div>
            <div className="text-xs text-white/70 mb-3">Bingerville Nouvelle gare - Shell Angré 7e tranche</div>

            <div className="space-y-2 text-xs mb-3">
              <div className="flex items-center gap-2">
                <span>06:00</span>
                <MapPin className="w-3 h-3" />
                <span>Bingerville Nouvelle gare</span>
              </div>
              <div className="font-bold">LA COTA</div>
              <div className="text-white/70">Ligne 1 • Mercedes C300 2018 Noire</div>
              <div className="text-white/70">Koné Mamadou • +225 07 02 545 689</div>
              <div className="flex items-center gap-2">
                <span>07:30</span>
                <MapPin className="w-3 h-3" />
                <span>Shell Angré 7e tranche</span>
              </div>
            </div>

            <div className="w-full h-32 bg-slate-500 rounded-lg mb-3 flex items-center justify-center">
              <MapPin className="w-8 h-8" />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <MessageCircle className="w-4 h-4" />
              </div>
            </div>
          </div>

          <Button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white mb-2">Commencer le trajet</Button>
          <Button className="w-full bg-red-500 hover:bg-red-600 text-white">Annuler le trajet</Button>

          <p className="text-xs text-white/70 mt-3">Redirige sur Trajet</p>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-700 to-slate-800 p-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold text-white">Annonces du Grin</h1>
          <div className="relative">
            <Bell className="w-5 h-5 text-white" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
              1
            </span>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <div className="bg-orange-500 rounded-t-lg p-3">
          <h2 className="text-white font-bold">Trajets réservés : 2</h2>
        </div>
        <div className="space-y-3 p-3 bg-orange-400/20 rounded-b-lg">
          {reservedTrips.map((trip) => (
            <Card key={trip.id} className="bg-white p-3 relative">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="font-bold text-sm">{trip.company}</p>
                  <p className="text-xs text-gray-600">
                    {trip.date} {trip.time}
                  </p>
                  <p className="text-xs text-gray-600">
                    {trip.from} → {trip.to}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg">{trip.price}</p>
                  {trip.status === "found" && (
                    <div className="flex items-center gap-1 text-emerald-600">
                      <Check className="w-4 h-4" />
                      <span className="text-xs">{trip.availableDrivers}</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                {trip.status === "searching" ? (
                  <>
                    <Search className="w-3 h-3 animate-pulse" />
                    <span>{trip.message}</span>
                  </>
                ) : (
                  <span className="text-emerald-600">{trip.message}</span>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <div className="bg-slate-600 rounded-t-lg p-3">
          <h2 className="text-white font-bold">Trajets à venir : 3</h2>
        </div>
        <div className="space-y-3 p-3 bg-slate-600/20 rounded-b-lg">
          {upcomingTrips.map((trip) => (
            <Card
              key={trip.id}
              className="bg-white p-3 cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => setShowTripDetail(true)}
            >
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="font-bold text-sm">{trip.company}</p>
                  <p className="text-xs text-gray-600">
                    {trip.date} {trip.time}
                  </p>
                  <p className="text-xs text-gray-600">
                    {trip.from} → {trip.to}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg">{trip.price}</p>
                </div>
              </div>
              <div className="text-xs text-gray-500">
                {trip.spotsLeft > 0 ? (
                  <span>
                    {trip.spotsLeft} place{trip.spotsLeft > 1 ? "s" : ""} restante{trip.spotsLeft > 1 ? "s" : ""}
                  </span>
                ) : (
                  <span className="text-red-500 font-semibold">AUCUNE PLACE DISPONIBLE</span>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>

      <Button className="w-full h-12 bg-red-500 hover:bg-red-600 text-white font-semibold mb-4">
        FAIRE UNE PROPOSITION
      </Button>

      {showCancelModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="bg-white p-6 max-w-sm w-full">
            <p className="text-center mb-4">Voulez vous annuler votre réservation ?</p>
            <div className="space-y-2">
              <Button
                className="w-full bg-red-500 hover:bg-red-600 text-white"
                onClick={() => {
                  setShowCancelModal(false)
                  setShowConfirmCancel(true)
                }}
              >
                Annuler ma réservation
              </Button>
              <Button
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white"
                onClick={() => setShowCancelModal(false)}
              >
                Place réservée
              </Button>
            </div>
          </Card>
        </div>
      )}

      {showConfirmCancel && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="bg-white p-6 max-w-sm w-full">
            <p className="text-center mb-4">Êtes vous sûr de vouloir annuler votre réservation ?</p>
            <div className="flex gap-2">
              <Button
                className="flex-1 bg-red-500 hover:bg-red-600 text-white"
                onClick={() => setShowConfirmCancel(false)}
              >
                Oui
              </Button>
              <Button
                className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white"
                onClick={() => setShowConfirmCancel(false)}
              >
                Non
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
