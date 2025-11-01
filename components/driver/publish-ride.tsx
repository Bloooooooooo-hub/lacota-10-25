"use client"

import { useState } from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { MapPin, Calendar, Clock, Users } from "lucide-react"

export default function PublishRide() {
  const [formData, setFormData] = useState({
    line: "",
    departure: "",
    arrival: "",
    date: "",
    time: "",
    seats: "",
  })

  return (
    <div className="min-h-screen bg-[#fffaf3]">
      <div className="bg-white border-b p-4">
        <h1 className="text-xl font-bold text-center">PUBLIER UN TRAJET</h1>
      </div>

      <div className="p-6 space-y-6 max-w-md mx-auto">
        <div className="space-y-2">
          <Label className="text-base font-semibold">Ligne</Label>
          <Select value={formData.line} onValueChange={(value) => setFormData({ ...formData, line: value })}>
            <SelectTrigger className="h-12">
              <SelectValue placeholder="Sélectionnez une ligne" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="line1">Ligne 1 - Bingerville → Angré</SelectItem>
              <SelectItem value="line2">Ligne 2 - Cocody → Plateau</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-base font-semibold">Point de départ</Label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Choisir le point de départ"
              value={formData.departure}
              onChange={(e) => setFormData({ ...formData, departure: e.target.value })}
              className="h-12 pl-10"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-base font-semibold">Point d'arrivée</Label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Choisir le point d'arrivée"
              value={formData.arrival}
              onChange={(e) => setFormData({ ...formData, arrival: e.target.value })}
              className="h-12 pl-10"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-base font-semibold">Date de départ</Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="h-12 pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-base font-semibold">Heure</Label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="h-12 pl-10"
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-base font-semibold">Nombre de places disponible</Label>
          <div className="relative">
            <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Sélectionner les passagers"
              value={formData.seats}
              onChange={(e) => setFormData({ ...formData, seats: e.target.value })}
              className="h-12 pl-10"
            />
          </div>
        </div>

        <div className="space-y-3 pt-4">
          <Button className="w-full h-14 text-lg font-semibold bg-[#3B82F6] hover:bg-blue-600 text-white rounded-xl">
            Publier
          </Button>
          <Button
            variant="outline"
            className="w-full h-14 text-lg font-semibold border-2 border-[#EF4444] text-[#EF4444] hover:bg-red-50 rounded-xl bg-transparent"
          >
            + PROPOSER UNE NOUVELLE LIGNE
          </Button>
        </div>
      </div>
    </div>
  )
}
