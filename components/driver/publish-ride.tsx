"use client"

import { useState } from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { MapPin, Calendar, Clock, Users } from "lucide-react"

const lignes = {
  line1: [
    "Bingerville Nouvelle Gare",
    "Nouveau Goudron",
    "Cité Sir",
    "CHU Angré",
    "Carrefour prière",
    "SICOMEX",
    "Stade Angré",
    "Carrefour Bluetooth",
    "SHELL 7e tranche",
    "Carrefour Cascade",
  ],
  line2: [
    "Bingerville Nouvelle Gare",
    "Freeworld Hôtel",
    "Carrefour AB Center",
    "Bon prix Faya",
    "Rond point ancien camp",
    "Rond point Théodore",
    "Rond point Notre Dame de la Tendresse",
    "Saint Jean",
    "Carrefour La Vie",
  ],
  line3: [
    "Bingerville Nouvelle Gare",
    "Nouveau Goudron",
    "Faya",
    "Carrefour Ferronnerie",
    "MACI Canada",
    "Feu Pharmacie du Bonheur",
    "Chez Station Ola",
    "Palmeraie",
  ],
  line4: [
    "Station Ola Palmeraie",
    "Carrefour Guiraud",
    "Market",
    "Rosiers Programme 2",
    "Pharmacie Val de Grâce",
    "CGK",
    "Carrefour prière",
    "SICOMEX",
    "Stade Angré",
    "Carrefour Bluetooth",
    "SHELL 7e tranche",
    "Carrefour Cascade",
  ],
  line5: [
    "Rond point Rosiers Programme 3",
    "Rond point 35e",
    "Rond point Ado",
    "Sacré Cœur",
    "Pharmacie Notre Dame de l’incarnation",
    "Carrefour Commissariat",
    "9 Kilos",
    "Cap Nord",
    "Riviera 2",
    "École de Police",
    "École de Gendarmerie",
    "Cité des Arts",
    "RTI",
    "Saint Jean",
  ],
  line6: [
    "Angré Carrefour Cabri",
    "Angré Fin Goudron",
    "Pharmacie des Allées",
    "Terminus 81/82",
    "Pétro Ivoire",
    "22ème arrondissement",
    "Carrefour Opéra",
    "Las Palmas",
    "Carrefour Mobile",
    "ENA",
    "Carrefour La Vie",
    "RTI",
    "Saint Jean",
  ],
  line7: [
    "Angré Carrefour Cabri",
    "Angré Fin Goudron",
    "Angré Château",
    "Lycée Angré",
    "Groupement 4000 D",
    "SNEDAI Angré",
    "Terminus 81/82",
    "Carrefour Bluetooth",
    "SHELL 7e tranche",
    "Carrefour Cascade",
  ],
  line8: [
    "Angré Carrefour Cabri",
    "Angré Fin Goudron",
    "Angré Château",
    "Lycée Angré",
    "Groupement 4000 D",
    "SNEDAI Angré",
    "Terminus 81/82",
    "Carrefour Bluetooth",
    "SHELL 7e Tranche",
    "Carrefour Cascade",
    "30ème arrondissement",
    "Pharmacie St Bernard",
    "Doraville",
    "Pharmacie St Ange",
    "André Malraux",
  ],
}

export default function PublishRide() {
  const [formData, setFormData] = useState({
    line: "",
    departure: "",
    arrival: "",
    date: "",
    time: "",
    seats: "",
  })

  const currentStops = formData.line ? lignes[formData.line as keyof typeof lignes] : []

  return (
    <div className="min-h-screen bg-[#fffaf3]">
      {/* Header */}
      <div className="bg-white border-b p-4">
        <h1 className="text-xl font-bold text-center">PUBLIER UN TRAJET</h1>
      </div>

      {/* Formulaire */}
      <div className="p-6 space-y-6 max-w-md mx-auto">
        {/* Ligne */}
        <div className="space-y-2">
          <Label className="text-base font-semibold">Ligne</Label>
          <Select value={formData.line} onValueChange={(value) => setFormData({ ...formData, line: value })}>
            <SelectTrigger className="h-12">
              <SelectValue placeholder="Sélectionnez une ligne" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(lignes).map((key) => (
                <SelectItem key={key} value={key}>
                  Ligne {key.replace("line", "")}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Points de départ / arrivée */}
        <div className="space-y-2">
          <Label className="text-base font-semibold">Point de départ</Label>
          <Select
            value={formData.departure}
            onValueChange={(value) => setFormData({ ...formData, departure: value })}
          >
            <SelectTrigger className="h-12">
              <SelectValue placeholder="Choisir un arrêt" />
            </SelectTrigger>
            <SelectContent>
              {currentStops.map((stop, idx) => (
                <SelectItem key={idx} value={stop}>
                  {stop}
                </SelectItem>
              ))}
              <SelectItem value="autre">Autre (saisir manuellement)</SelectItem>
            </SelectContent>
          </Select>

          {formData.departure === "autre" && (
            <Input
              placeholder="Saisir le point de départ"
              value={formData.departure}
              onChange={(e) => setFormData({ ...formData, departure: e.target.value })}
              className="h-12 mt-2"
            />
          )}
        </div>

        <div className="space-y-2">
          <Label className="text-base font-semibold">Point d'arrivée</Label>
          <Select value={formData.arrival} onValueChange={(value) => setFormData({ ...formData, arrival: value })}>
            <SelectTrigger className="h-12">
              <SelectValue placeholder="Choisir un arrêt" />
            </SelectTrigger>
            <SelectContent>
              {currentStops.map((stop, idx) => (
                <SelectItem key={idx} value={stop}>
                  {stop}
                </SelectItem>
              ))}
              <SelectItem value="autre">Autre (saisir manuellement)</SelectItem>
            </SelectContent>
          </Select>

          {formData.arrival === "autre" && (
            <Input
              placeholder="Saisir le point d'arrivée"
              value={formData.arrival}
              onChange={(e) => setFormData({ ...formData, arrival: e.target.value })}
              className="h-12 mt-2"
            />
          )}
        </div>

        {/* Date & heure */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-base font-semibold">Date</Label>
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

        {/* Places */}
        <div className="space-y-2">
          <Label className="text-base font-semibold">Nombre de places</Label>
          <div className="relative">
            <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Ex : 3"
              value={formData.seats}
              onChange={(e) => setFormData({ ...formData, seats: e.target.value })}
              className="h-12 pl-10"
            />
          </div>
        </div>

        {/* Boutons */}
        <div className="space-y-3 pt-4">
          <Button className="w-full h-14 text-lg font-semibold bg-[#3B82F6] hover:bg-blue-600 text-white rounded-xl">
            Publier le trajet
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
