"use client"

import { useState } from "react"
import { Button } from "../ui/button"
import { MapPin, Clock, Users, Car } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"

interface SelectRideProps {
  onStartRide: () => void
}

export default function SelectRide({ onStartRide }: SelectRideProps) {
  const [selectedRide, setSelectedRide] = useState<any>(null)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)

  const rides = [
    {
      id: 1,
      date: "Lun 15 Sept. 06:00 - 7:30",
      departure: "Bingerville Nouvelle gare",
      arrival: "Snell Angré 7e tranche",
      vehicle: "LA COTA",
      vehicleDetails: "Mercedes C300 2018 Noire\nAA-278-AS",
      price: "1000 fr",
      seats: 3,
      duration: "1h30mn",
    },
    {
      id: 2,
      date: "Lun 15 Sept. 06:00 - 7:30",
      departure: "Bingerville Nouvelle gare",
      arrival: "Snell Angré 7e tranche",
      vehicle: "LA COTA",
      vehicleDetails: "Mercedes C300 2018 Noire\nAA-278-AS",
      price: "1000 fr",
      seats: 3,
      duration: "1h30mn",
    },
    {
      id: 3,
      date: "Lun 15 Sept. 06:00 - 7:30",
      departure: "Bingerville Nouvelle gare",
      arrival: "Snell Angré 7e tranche",
      vehicle: "LA COTA",
      vehicleDetails: "Mercedes C300 2018 Noire\nAA-278-AS",
      price: "1000 fr",
      seats: 3,
      duration: "1h30mn",
    },
  ]

  const handleStartRide = (ride: any) => {
    setSelectedRide(ride)
    setShowConfirmDialog(true)
  }

  return (
    <div className="min-h-screen bg-[#fffaf3]">
      {/* Map Section */}
      <div className="h-64 bg-gray-200 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#fffaf3]" />
        <div className="absolute top-4 left-4 bg-white rounded-full p-2 shadow-lg">
          <MapPin className="w-6 h-6 text-gray-700" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center text-gray-400">
          [Carte GPS avec positions]
        </div>
      </div>

      {/* Rides List */}
      <div className="p-4 space-y-4">
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h2 className="text-lg font-bold mb-4">Sélectionner le trajet</h2>

          <div className="space-y-3">
            {rides.map((ride) => (
              <div key={ride.id} className="border-2 border-gray-200 rounded-xl p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <p className="text-sm font-semibold">{ride.date}</p>
                    <p className="text-xs text-gray-600">
                      {ride.departure} - {ride.arrival}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold">{ride.price}</p>
                    <p className="text-xs text-gray-500">Par passager</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{ride.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Car className="w-4 h-4" />
                    <span>{ride.vehicle}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{ride.seats} places restantes</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Button
            onClick={() => handleStartRide(rides[0])}
            className="w-full h-14 mt-4 text-lg font-semibold bg-[#28C76F] hover:bg-green-600 text-white rounded-xl"
          >
            Commencer le trajet
          </Button>
        </div>
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-lg">Attention, il est l'heure de débuter le trajet</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="bg-gray-50 rounded-xl p-4 space-y-2">
              <p className="font-semibold">{selectedRide?.date}</p>
              <p className="text-sm text-gray-600">
                {selectedRide?.departure} - {selectedRide?.arrival}
              </p>
              <div className="flex justify-between items-center pt-2">
                <span className="text-sm">{selectedRide?.duration}</span>
                <span className="text-2xl font-bold">{selectedRide?.price}</span>
              </div>
            </div>
            <div className="space-y-2">
              <Button
                onClick={() => {
                  setShowConfirmDialog(false)
                  onStartRide()
                }}
                className="w-full h-12 bg-[#28C76F] hover:bg-green-600 text-white"
              >
                Commencer le trajet
              </Button>
              <Button onClick={() => setShowConfirmDialog(false)} variant="destructive" className="w-full h-12">
                Annuler le trajet
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
