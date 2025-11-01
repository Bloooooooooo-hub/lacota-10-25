"use client"

import { useState } from "react"
import { Button } from "../ui/button"
import { Card } from "../ui/card"
import { MapPin, Calendar, Clock, Users, X, Car } from "lucide-react"

export default function CourseScreen() {
  const [showResults, setShowResults] = useState(false)
  const [showRideDetail, setShowRideDetail] = useState(false)
  const [showWaveMessage, setShowWaveMessage] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)

  const rides = [
    {
      id: 1,
      line: "Ligne 1",
      date: "Lun 15 Sept. 06:00 - 7:00",
      from: "Bingerville Nouvelle gare",
      to: "Snef Angré 7è tranche",
      price: "1000 fr",
      seats: 4,
      image: "/busy-city-street.png",
    },
    {
      id: 2,
      line: "Ligne 2",
      date: "Lun 15 Sept. 06:00 - 6:50",
      from: "Bingerville Nouvelle gare",
      to: "Snef Angré 7è tranche",
      price: "1000 fr",
      seats: 3,
      image: "/winding-mountain-highway.png",
    },
    {
      id: 3,
      line: "Ligne 3",
      date: "Lun 15 Sept. 06:00 - 6:40",
      from: "Bingerville Nouvelle gare",
      to: "Snef Angré 7è tranche",
      price: "1000 fr",
      seats: 2,
      image: "/winding-mountain-road.png",
    },
  ]

  const otherRides = [
    {
      id: 4,
      line: "Ligne 4",
      date: "Lun 15 Sept. 06:00 - 6:40",
      from: "Bingerville Nouvelle gare",
      to: "Carrefour La Cascade",
      price: "600 fr",
      seats: 5,
    },
    {
      id: 5,
      line: "Ligne 5",
      date: "Lun 15 Sept. 06:00 - 6:25",
      from: "Bingerville Nouvelle gare",
      to: "Feu Pharmacie du Bonheur",
      price: "600 fr",
      seats: 3,
    },
  ]

  const handleSearch = () => {
    setShowResults(true)
    setShowWaveMessage(true)
  }

  const handleRideClick = () => {
    setShowRideDetail(true)
  }

  const handleReserve = () => {
    setShowRideDetail(false)
    setShowConfirmation(true)
  }

  return (
    <div className="min-h-screen bg-[#fffaf3]">
      {!showResults ? (
        <div className="p-4 space-y-4">
          <div className="flex items-center gap-3 mb-6">
            <h1 className="text-2xl font-black" style={{ fontFamily: "cursive" }}>
              La Cota
            </h1>
          </div>

          <h2 className="text-lg font-bold text-gray-900">MODE PASSAGER</h2>

          <Card className="p-4 space-y-4 bg-white">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Ligne</label>
              <select className="w-full p-3 border border-gray-300 rounded-lg outline-none">
                <option>Sélectionnez une ligne</option>
                <option>Ligne 1</option>
                <option>Ligne 2</option>
                <option>Ligne 3</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Point de départ</label>
              <div className="flex items-center gap-2 p-3 border border-gray-300 rounded-lg">
                <MapPin className="w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Choisir le point de départ"
                  className="flex-1 outline-none bg-transparent"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Point d'arrivée</label>
              <div className="flex items-center gap-2 p-3 border border-gray-300 rounded-lg">
                <MapPin className="w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Choisir le point d'arrivée"
                  className="flex-1 outline-none bg-transparent"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Date de départ</label>
                <div className="flex items-center gap-2 p-3 border border-gray-300 rounded-lg">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <input type="date" defaultValue="2001-06-06" className="flex-1 outline-none bg-transparent text-sm" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Heure</label>
                <div className="flex items-center gap-2 p-3 border border-gray-300 rounded-lg">
                  <Clock className="w-5 h-5 text-gray-400" />
                  <input type="time" className="flex-1 outline-none bg-transparent text-sm" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Passagers</label>
              <div className="flex items-center gap-2 p-3 border border-gray-300 rounded-lg">
                <Users className="w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Sélectionner les passagers"
                  className="flex-1 outline-none bg-transparent"
                />
              </div>
            </div>

            <Button
              onClick={handleSearch}
              className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold"
            >
              Rechercher
            </Button>

            <Button className="w-full h-12 bg-red-500 hover:bg-red-600 text-white font-semibold">
              + PROPOSER UNE NOUVELLE LIGNE
            </Button>
          </Card>
        </div>
      ) : (
        <div className="relative">
          <div
            className="h-48 bg-cover bg-center relative"
            style={{ backgroundImage: "url(/placeholder.svg?height=200&width=400&query=city+aerial)" }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent" />
            <div className="absolute top-4 left-4">
              <button onClick={() => setShowResults(false)} className="text-white">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            </div>
            <div className="absolute top-4 right-4">
              <h1 className="text-2xl font-black text-white" style={{ fontFamily: "cursive" }}>
                Recherche trajets
              </h1>
            </div>
          </div>

          <div className="p-4 space-y-4">
            {rides.map((ride) => (
              <Card
                key={ride.id}
                onClick={handleRideClick}
                className="overflow-hidden bg-white cursor-pointer hover:shadow-lg transition-shadow"
              >
                <div className="h-24 bg-cover bg-center" style={{ backgroundImage: `url(${ride.image})` }} />
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <p className="text-xs text-gray-600 mb-1">{ride.line}</p>
                      <p className="text-sm font-semibold text-gray-900 mb-1">{ride.date}</p>
                      <div className="space-y-1">
                        <div className="flex items-start gap-2">
                          <span className="text-xs text-gray-600">06:00</span>
                          <Car className="w-3 h-3 text-gray-400 mt-0.5" />
                          <span className="text-xs text-gray-600">{ride.from}</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-xs text-gray-600">1h30min</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-xs text-gray-600">07:30</span>
                          <MapPin className="w-3 h-3 text-gray-400 mt-0.5" />
                          <span className="text-xs text-gray-600">{ride.to}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-900">{ride.price}</p>
                      <p className="text-xs text-gray-500">Par passager</p>
                      <div className="flex items-center gap-1 mt-2">
                        <Users className="w-3 h-3 text-gray-400" />
                        <span className="text-xs text-gray-600">{ride.seats}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}

            <div className="flex items-center gap-2 py-2">
              <div className="flex-1 h-px bg-gray-300" />
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-gray-700">Autres trajets</span>
                <span className="px-2 py-1 bg-red-500 text-white text-xs font-semibold rounded">Ligne 3 v</span>
                <button className="px-3 py-1 border border-gray-300 rounded text-xs font-medium">Date</button>
                <button className="px-3 py-1 border border-gray-300 rounded text-xs font-medium">Heure</button>
              </div>
              <div className="flex-1 h-px bg-gray-300" />
            </div>

            {otherRides.map((ride) => (
              <Card key={ride.id} className="p-4 bg-white">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-xs text-gray-600 mb-1">{ride.line}</p>
                    <p className="text-sm font-semibold text-gray-900 mb-1">{ride.date}</p>
                    <p className="text-xs text-gray-600">{ride.from}</p>
                    <p className="text-xs text-gray-600">{ride.to}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900">{ride.price}</p>
                    <p className="text-xs text-gray-500">Par passager</p>
                    <div className="flex items-center gap-1 mt-2">
                      <Users className="w-3 h-3 text-gray-400" />
                      <span className="text-xs text-gray-600">{ride.seats}</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}

            <Button className="w-full h-12 bg-red-500 hover:bg-red-600 text-white font-semibold">
              FAIRE UNE PROPOSITION
            </Button>
          </div>
        </div>
      )}

      {/* Wave Message Modal */}
      {showWaveMessage && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="bg-white p-6 max-w-sm w-full space-y-4">
            <div className="flex items-start justify-between">
              <p className="text-sm text-gray-700">
                Privilégiez le paiement par Wave pour faciliter la monnaie, ensuite la page en bas s'affiche.
              </p>
              <button onClick={() => setShowWaveMessage(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
          </Card>
        </div>
      )}

      {/* Ride Detail Modal */}
      {showRideDetail && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="bg-slate-700 text-white p-6 max-w-sm w-full space-y-4">
            <div className="flex items-start justify-between">
              <div className="space-y-2 flex-1">
                <p className="text-sm font-semibold">Lun 15 Sept. 06:00 - 7:30</p>
                <p className="text-xs">Bingerville Nouvelle gare - Snef Angré 7è tranche</p>
                <div className="h-32 bg-gray-600 rounded-lg mt-4">
                  <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
                    Carte avec itinéraire
                  </div>
                </div>
              </div>
              <button onClick={() => setShowRideDetail(false)} className="text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <Button
              onClick={handleReserve}
              className="w-full h-12 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold"
            >
              On y va pour LA COTA
            </Button>
          </Card>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="bg-white p-6 max-w-sm w-full space-y-4">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm font-semibold text-gray-900">Course validée.</p>
                <p className="text-sm text-gray-700">
                  Votre chauffeur sera là à 00:00 min. Vous recevrez plus d'informations sur le chauffeur au grin.
                </p>
              </div>
              <button onClick={() => setShowConfirmation(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <Button className="w-full h-12 bg-red-500 hover:bg-red-600 text-white font-semibold">Allons au grin</Button>
          </Card>
        </div>
      )}
    </div>
  )
}
