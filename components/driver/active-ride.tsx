"use client"

import { useEffect, useState } from "react"
import { Button } from "../ui/button"
import { MapPin, Phone, Users, X } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"

export default function LeGrin() {
  const [selectedRide, setSelectedRide] = useState<number | null>(null)
  const [showPassengersDialog, setShowPassengersDialog] = useState(false)
  const [position, setPosition] = useState<[number, number] | null>(null)
  const [consent, setConsent] = useState<boolean | null>(null)

  // Icône personnalisée pour Leaflet
  const markerIcon = new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  })

  // Demande de géolocalisation avec consentement
  useEffect(() => {
    if (consent) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setPosition([pos.coords.latitude, pos.coords.longitude]),
        () => setPosition(null),
        { enableHighAccuracy: true }
      )
    }
  }, [consent])

  const rides = [
    {
      id: 1,
      date: "Lun 15 Sept.",
      time: "06:00 - 07:30",
      depart: "Bingerville Nouvelle gare",
      arrivee: "Shell Angré 7e tranche",
      prix: "1000",
      distance: "25 km",
      temps: "1h30min",
      places: 3,
      complet: false,
      passagers: [
        { id: 1, name: "Diomandé Noura", stop: "Angré Bluetooth", phone: "+2250701010101", rating: 5, status: "confirmé" },
        { id: 2, name: "Emmanuel Ake", stop: "Angré SICOMEX", phone: "+2250505050505", rating: 4, status: "confirmé" },
        { id: 3, name: "Sandra Kouakou", stop: "Angré SHELL", phone: "+2250788888888", rating: 5, status: "en attente" },
      ],
    },
    {
      id: 2,
      date: "Lun 15 Sept.",
      time: "06:00 - 07:30",
      depart: "Bingerville Nouvelle gare",
      arrivee: "LA COTA",
      prix: "1000",
      distance: "25 km",
      temps: "1h30min",
      places: 0,
      complet: true,
      passagers: [],
    },
  ]

  return (
    <div className="min-h-screen bg-[#fffaf3] flex flex-col p-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Annonces du Grin 🚗</h2>

      {/* Consentement GPS */}
      {consent === null && (
        <div className="bg-yellow-100 border border-yellow-300 text-yellow-800 p-4 rounded-lg mb-4 text-sm">
          <p>Souhaitez-vous autoriser l'accès à votre position GPS pour afficher les trajets proches ?</p>
          <div className="flex gap-3 mt-3">
            <Button onClick={() => setConsent(true)} className="bg-green-600 text-white">Oui</Button>
            <Button onClick={() => setConsent(false)} variant="outline">Non</Button>
          </div>
        </div>
      )}

      {/* Carte GPS */}
      {consent && position && (
        <div className="h-64 mb-5 rounded-xl overflow-hidden border border-gray-300 shadow-sm">
          <MapContainer center={position} zoom={13} scrollWheelZoom={false} className="h-full w-full">
            <TileLayer
              attribution='© <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position} icon={markerIcon}>
              <Popup>Vous êtes ici 📍</Popup>
            </Marker>
          </MapContainer>
        </div>
      )}

      {/* Liste des trajets */}
      <div className="flex-1 overflow-y-auto space-y-4 pb-20">
        {rides.map((ride) => (
          <div
            key={ride.id}
            onClick={() => setSelectedRide(ride.id === selectedRide ? null : ride.id)}
            className={`rounded-2xl p-4 shadow-md transition-all cursor-pointer border ${
              ride.complet ? "bg-green-100 border-green-300" : "bg-white border-gray-200 hover:border-[#8B4789]"
            }`}
          >
            <div className="flex justify-between">
              <div>
                <p className="font-semibold text-gray-700">{ride.date}</p>
                <p className="text-sm text-gray-500">{ride.time}</p>
                <p className="text-gray-600">
                  {ride.depart} → <strong>{ride.arrivee}</strong>
                </p>
              </div>
              <div className="text-right">
                <p className="font-bold text-[#8B4789]">{ride.prix} fr</p>
                <p className="text-xs text-gray-500">
                  {ride.places > 0 ? `${ride.places} place restante` : "Aucune place disponible"}
                </p>
              </div>
            </div>

            {/* Détails si sélectionné */}
            {selectedRide === ride.id && (
              <div className="mt-4 space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <MapPin className="w-4 h-4" />
                  <span>{ride.distance} • {ride.temps}</span>
                </div>

                {ride.places > 0 && (
                  <Button
                    onClick={(e) => {
                      e.stopPropagation()
                      setShowPassengersDialog(true)
                    }}
                    className="w-full bg-[#8B4789] hover:bg-[#723770] text-white text-sm flex items-center justify-center gap-2"
                  >
                    <Users className="w-4 h-4" />
                    Voir les passagers
                  </Button>
                )}

                <div className="flex flex-col gap-2">
                  <Button className="bg-green-600 hover:bg-green-700 text-white font-semibold">
                    On y va pour LA COTA
                  </Button>
                  <Button className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold">
                    J’attends un autre chauffeur
                  </Button>
                  <Button className="bg-red-600 hover:bg-red-700 text-white font-semibold">
                    Annuler la réservation
                  </Button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Dialog Passagers */}
      <Dialog open={showPassengersDialog} onOpenChange={setShowPassengersDialog}>
        <DialogContent className="max-w-md bg-white rounded-2xl p-6 shadow-xl">
          <DialogHeader>
            <DialogTitle className="text-center text-lg font-bold">Passagers inscrits</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 mt-4">
            {rides[0].passagers.map((p) => (
              <div key={p.id} className="flex flex-col gap-1 border p-3 rounded-xl bg-gray-50">
                <div className="flex justify-between">
                  <div>
                    <p className="font-semibold text-gray-700">{p.name}</p>
                    <p className="text-xs text-gray-500">Arrêt : {p.stop}</p>
                  </div>
                  <p className="text-yellow-500 text-sm">{"★".repeat(p.rating)}</p>
                </div>
                <p className="text-xs text-gray-400">Statut : {p.status}</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2 text-xs flex items-center gap-2"
                  onClick={() => window.open(`tel:${p.phone}`, "_self")}
                >
                  <Phone className="w-4 h-4" /> Appeler {p.name.split(" ")[0]}
                </Button>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-4">
            <Button onClick={() => setShowPassengersDialog(false)} className="bg-[#8B4789] text-white">
              <X className="w-4 h-4 mr-1" /> Fermer
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
