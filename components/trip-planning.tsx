"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { ArrowLeft, Calendar, Clock, MapPin, Navigation, Bus, Car } from "lucide-react"

// ✅ Supprimé l’import invalide depuis "@/app/page"
type UserProfile = "user" | "healthcare"

interface TripPlanningProps {
  userProfile: UserProfile
  onBack: () => void
}

export default function TripPlanning({ userProfile, onBack }: TripPlanningProps) {
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [departure, setDeparture] = useState("")
  const [destination, setDestination] = useState("")
  const [transportMode, setTransportMode] = useState<"bus" | "taxi" | null>(null)

  const handleSearch = () => {
    console.log("Recherche de transport…", {
      userProfile,
      selectedDate,
      selectedTime,
      departure,
      destination,
      transportMode,
    })
  }

  const profileInfo = {
    user: {
      title: "Utilisateur",
      color: "primary",
      icon: "👤",
    },
    healthcare: {
      title: "Professionnel de santé",
      color: "secondary",
      icon: "🩺",
    },
  }

  const currentProfile = userProfile ? profileInfo[userProfile] : profileInfo.user

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-accent/10 p-4">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between pt-4">
          <Button variant="ghost" size="sm" onClick={onBack} className="p-2">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="text-center">
            <h1 className="text-2xl font-black text-primary">LA COTA</h1>
          </div>
          <div className="w-9" />
        </div>

        {/* Profil */}
        <Card
          className={`border-2 ${
            currentProfile.color === "primary"
              ? "border-primary/20 bg-primary/5"
              : "border-secondary/20 bg-secondary/5"
          }`}
        >
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{currentProfile.icon}</span>
              <div>
                <h3 className="font-semibold text-foreground">{currentProfile.title}</h3>
                <p className="text-sm text-muted-foreground">Profil sélectionné</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Formulaire */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Navigation className="w-5 h-5 text-primary" />
              <span>Planifier votre trajet</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div>
                <Label htmlFor="departure" className="flex items-center space-x-2 mb-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span>Départ</span>
                </Label>
                <Input
                  id="departure"
                  placeholder="Adresse de départ"
                  value={departure}
                  onChange={(e) => setDeparture(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="destination" className="flex items-center space-x-2 mb-2">
                  <MapPin className="w-4 h-4 text-secondary" />
                  <span>Destination</span>
                </Label>
                <Input
                  id="destination"
                  placeholder="Adresse de destination"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="date" className="flex items-center space-x-2 mb-2">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span>Date</span>
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="time" className="flex items-center space-x-2 mb-2">
                  <Clock className="w-4 h-4 text-primary" />
                  <span>Heure</span>
                </Label>
                <Input
                  id="time"
                  type="time"
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                />
              </div>
            </div>

            <div>
              <Label className="mb-3 block">Mode de transport</Label>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant={transportMode === "bus" ? "default" : "outline"}
                  className={`h-auto p-4 ${
                    transportMode === "bus" ? "bg-primary text-primary-foreground" : ""
                  }`}
                  onClick={() => setTransportMode("bus")}
                >
                  <div className="text-center">
                    <Bus className="w-6 h-6 mx-auto mb-2" />
                    <span className="text-sm">Ligne de bus</span>
                  </div>
                </Button>

                <Button
                  variant={transportMode === "taxi" ? "default" : "outline"}
                  className={`h-auto p-4 ${
                    transportMode === "taxi" ? "bg-secondary text-secondary-foreground" : ""
                  }`}
                  onClick={() => setTransportMode("taxi")}
                >
                  <div className="text-center">
                    <Car className="w-6 h-6 mx-auto mb-2" />
                    <span className="text-sm">Taxi partagé</span>
                  </div>
                </Button>
              </div>
            </div>

            <Button
              className="w-full mt-6"
              size="lg"
              onClick={handleSearch}
              disabled={
                !departure || !destination || !selectedDate || !selectedTime || !transportMode
              }
            >
              Rechercher des options
            </Button>
          </CardContent>
        </Card>

        {/* Actions rapides */}
        <div className="grid grid-cols-2 gap-3">
          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <p className="text-sm font-medium">Lignes populaires</p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <Clock className="w-6 h-6 text-secondary" />
              </div>
              <p className="text-sm font-medium">Horaires temps réel</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
