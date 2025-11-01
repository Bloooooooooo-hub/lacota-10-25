"use client"

import { useState } from "react"
import { Card } from "../ui/card"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { ChevronRight, ChevronLeft, MapPin } from "lucide-react"
import MesCartesScreen from "./mes-cartes-screen"

interface InfosScreenProps {
  passengerData: any
  onLogout: () => void
}

export default function InfosScreen({ passengerData, onLogout }: InfosScreenProps) {
  const [currentView, setCurrentView] = useState<
    "menu" | "personal" | "schedule" | "history" | "stops" | "about" | "cards"
  >("menu")
  const [userType, setUserType] = useState<"etudiant" | "autre">("etudiant")

  if (currentView === "cards") {
    return <MesCartesScreen onBack={() => setCurrentView("menu")} />
  }

  if (currentView === "personal") {
    return (
      <div
        className="min-h-screen bg-cover bg-center relative"
        style={{ backgroundImage: "url(/placeholder.svg?height=800&width=400&query=people+in+car)" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40" />

        <div className="relative z-10 p-4">
          <button onClick={() => setCurrentView("menu")} className="mb-4 text-white flex items-center gap-2">
            <ChevronLeft className="w-5 h-5" />
            <span>Retour</span>
          </button>

          <div className="bg-white rounded-lg p-4 mb-4">
            <div className="flex items-center justify-center mb-4">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-200 to-green-200 rounded-full flex items-center justify-center">
                <div className="w-20 h-20 bg-white rounded-full" />
              </div>
            </div>
            <p className="text-center font-semibold text-gray-900">Emmanuel Niamke</p>
            <p className="text-center text-sm text-gray-600">+225 01 02 034 527</p>
          </div>

          <Card className="bg-slate-700 text-white p-4 mb-4">
            <h3 className="font-semibold mb-3">Je suis :</h3>
            <div className="space-y-2">
              <button
                onClick={() => setUserType("etudiant")}
                className={`w-full p-3 rounded-lg flex items-center justify-between ${
                  userType === "etudiant" ? "bg-slate-600" : "bg-slate-800"
                }`}
              >
                <span>Étudiant</span>
                <ChevronRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => setUserType("autre")}
                className={`w-full p-3 rounded-lg flex items-center justify-between ${
                  userType === "autre" ? "bg-slate-600" : "bg-slate-800"
                }`}
              >
                <span>Autre</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </Card>

          {userType === "etudiant" ? (
            <Card className="bg-slate-700 text-white p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Étudiants</h3>
                <button className="text-white">×</button>
              </div>
              <div className="space-y-3">
                <div>
                  <Label className="text-white text-sm">Nom</Label>
                  <Input className="bg-white text-gray-900" />
                </div>
                <div>
                  <Label className="text-white text-sm">Prénoms</Label>
                  <Input className="bg-white text-gray-900" />
                </div>
                <div>
                  <Label className="text-white text-sm">Date de naissance</Label>
                  <Input className="bg-white text-gray-900" />
                </div>
                <div>
                  <Label className="text-white text-sm">Numéro de téléphone</Label>
                  <Input className="bg-white text-gray-900" />
                </div>
                <div>
                  <Label className="text-white text-sm">Reçu d'inscription</Label>
                  <Input className="bg-white text-gray-900" />
                </div>
                <div>
                  <Label className="text-white text-sm">Date d'inscription</Label>
                  <Input className="bg-white text-gray-900" />
                </div>
                <div>
                  <Label className="text-white text-sm">Photo CNI recto</Label>
                  <Input className="bg-white text-gray-900" />
                </div>
                <div>
                  <Label className="text-white text-sm">Photo CNI verso</Label>
                  <Input className="bg-white text-gray-900" />
                </div>
                <div>
                  <Label className="text-white text-sm">Selfie avec la CNI</Label>
                  <Input className="bg-white text-gray-900" />
                </div>
                <Button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white">Enregistrer</Button>
              </div>
              <p className="text-xs text-white/70 mt-3">
                L'utilisateur doit mettre à jour ses informations étudiants à la fin de chaque vacance scolaire
                (Généralement début Septembre)
              </p>
            </Card>
          ) : (
            <Card className="bg-slate-700 text-white p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Autre</h3>
                <button className="text-white">×</button>
              </div>
              <div className="space-y-3">
                <div>
                  <Label className="text-white text-sm">Nom</Label>
                  <Input className="bg-white text-gray-900" />
                </div>
                <div>
                  <Label className="text-white text-sm">Prénoms</Label>
                  <Input className="bg-white text-gray-900" />
                </div>
                <div>
                  <Label className="text-white text-sm">Date de naissance</Label>
                  <Input className="bg-white text-gray-900" />
                </div>
                <div>
                  <Label className="text-white text-sm">Profession</Label>
                  <Input className="bg-white text-gray-900" />
                </div>
                <div>
                  <Label className="text-white text-sm">Photo CNI recto ou autre doc</Label>
                  <Input className="bg-white text-gray-900" />
                </div>
                <div>
                  <Label className="text-white text-sm">Photo CNI verso ou autre doc</Label>
                  <Input className="bg-white text-gray-900" />
                </div>
                <div>
                  <Label className="text-white text-sm">Selfie avec la CNI ou autre doc</Label>
                  <Input className="bg-white text-gray-900" />
                </div>
                <Button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white">Enregistrer</Button>
              </div>
              <p className="text-xs text-white/70 mt-3">
                *Autre doc : Un badge professionnel, un contrat ou tout autre document officiel comportant votre photo.
              </p>
            </Card>
          )}
        </div>
      </div>
    )
  }

  if (currentView === "schedule") {
    return (
      <div
        className="min-h-screen bg-cover bg-center relative"
        style={{ backgroundImage: "url(/placeholder.svg?height=800&width=400&query=people+in+car)" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40" />

        <div className="relative z-10 p-4">
          <button onClick={() => setCurrentView("menu")} className="mb-4 text-white flex items-center gap-2">
            <ChevronLeft className="w-5 h-5" />
            <span>Retour</span>
          </button>

          <Card className="bg-slate-700 text-white p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Mes horaires</h3>
              <button className="text-white">×</button>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-sm mb-2">Je me rends presque tout les jours à [Destination]</p>
                <Input className="bg-white text-gray-900" placeholder="Destination" />
              </div>

              <div>
                <p className="text-sm mb-2">Pour la première destination, je me déplace entre</p>
                <div className="flex items-center gap-2">
                  <Input className="bg-white text-gray-900 flex-1" placeholder="Heure" />
                  <span>et</span>
                  <Input className="bg-white text-gray-900 flex-1" placeholder="Heure" />
                </div>
              </div>

              <div>
                <p className="text-sm mb-2">Pour la deuxième destination, je me déplace entre</p>
                <div className="flex items-center gap-2">
                  <Input className="bg-white text-gray-900 flex-1" placeholder="Heure" />
                  <span>et</span>
                  <Input className="bg-white text-gray-900 flex-1" placeholder="Heure" />
                </div>
              </div>

              <Button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white">Enregistrer</Button>
            </div>
          </Card>
        </div>
      </div>
    )
  }

  if (currentView === "history") {
    return (
      <div
        className="min-h-screen bg-cover bg-center relative"
        style={{ backgroundImage: "url(/placeholder.svg?height=800&width=400&query=people+in+car)" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40" />

        <div className="relative z-10 p-4">
          <button onClick={() => setCurrentView("menu")} className="mb-4 text-white flex items-center gap-2">
            <ChevronLeft className="w-5 h-5" />
            <span>Retour</span>
          </button>

          <Card className="bg-slate-700 text-white p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Historique des trajets</h3>
              <button onClick={() => setCurrentView("menu")} className="text-white">
                ×
              </button>
            </div>

            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="bg-white text-gray-900 p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold">Lun 15 Sept. 06:00 - 7:30</span>
                  </div>
                  <div className="text-xs text-gray-600 mb-2">Bingerville Nouvelle gare - Shell Angré 7e tranche</div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-600">06:00 Bingerville Nouvelle gare</p>
                      <p className="font-bold text-sm">LA COTA</p>
                      <p className="text-xs text-gray-500">Ligne 1 • Mercedes C300 2018 Noire</p>
                      <p className="text-xs text-gray-500">Koné Mamadou • +225 07 02 545 689</p>
                      <p className="text-xs text-gray-600">07:30 Shell Angré 7e tranche</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg">1000 fr</p>
                      <p className="text-xs text-gray-500">Par passager</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        </div>
      </div>
    )
  }

  if (currentView === "stops") {
    return (
      <div
        className="min-h-screen bg-cover bg-center relative"
        style={{ backgroundImage: "url(/placeholder.svg?height=800&width=400&query=people+in+car)" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40" />

        <div className="relative z-10 p-4">
          <button onClick={() => setCurrentView("menu")} className="mb-4 text-white flex items-center gap-2">
            <ChevronLeft className="w-5 h-5" />
            <span>Retour</span>
          </button>

          <Card className="bg-slate-700 text-white p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Arrêts et lignes disponibles</h3>
              <button onClick={() => setCurrentView("menu")} className="text-white">
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <Label className="text-white text-sm mb-2 block">Ligne</Label>
                <select className="w-full p-2 rounded-lg bg-white text-gray-900">
                  <option>Ligne 1</option>
                  <option>Ligne 2</option>
                  <option>Ligne 3</option>
                </select>
              </div>

              <div className="bg-slate-600 p-3 rounded-lg">
                <p className="text-sm mb-1">Prix : 1.000 fr</p>
                <p className="text-xs text-white/70">Le prix s'affiche en fonction de la ligne sélectionnée</p>
              </div>

              <div className="bg-slate-600 p-4 rounded-lg text-center">
                <p className="text-sm mb-2">GIF de l'arrêt</p>
                <div className="w-full h-32 bg-slate-500 rounded-lg flex items-center justify-center">
                  <MapPin className="w-8 h-8" />
                </div>
              </div>

              <div className="text-center">
                <p className="font-semibold">Bingerville Nouvelle gare</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    )
  }

  if (currentView === "about") {
    return (
      <div
        className="min-h-screen bg-cover bg-center relative"
        style={{ backgroundImage: "url(/placeholder.svg?height=800&width=400&query=people+in+car)" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40" />

        <div className="relative z-10 p-4">
          <button onClick={() => setCurrentView("menu")} className="mb-4 text-white flex items-center gap-2">
            <ChevronLeft className="w-5 h-5" />
            <span>Retour</span>
          </button>

          <Card className="bg-white p-6">
            <h2 className="text-2xl font-black mb-4" style={{ fontFamily: "cursive" }}>
              À propos de LA COTA
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                LA COTA est une application de covoiturage qui vous permet de vous déplacer facilement et à moindre
                coût.
              </p>
              <p>
                Notre mission est de rendre le transport accessible à tous en connectant les passagers avec des
                chauffeurs de confiance.
              </p>
              <p className="text-sm text-gray-500">Version 1.0.0</p>
            </div>
          </Card>
        </div>
      </div>
    )
  }

  // Main menu
  return (
    <div
      className="min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: "url(/placeholder.svg?height=800&width=400&query=people+in+car)" }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40" />

      <div className="relative z-10 p-4 space-y-3">
        <div className="bg-white rounded-lg p-4 mb-4">
          <div className="flex items-center justify-center mb-4">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-200 to-green-200 rounded-full flex items-center justify-center">
              <div className="w-20 h-20 bg-white rounded-full" />
            </div>
          </div>
          <p className="text-center font-semibold text-gray-900">Emmanuel Niamke</p>
          <p className="text-center text-sm text-gray-600">+225 01 02 034 527</p>
        </div>

        <button
          onClick={() => setCurrentView("personal")}
          className="w-full bg-white/90 backdrop-blur-sm rounded-lg p-4 flex items-center justify-between hover:bg-white transition-colors"
        >
          <span className="font-medium text-gray-900">Informations personnelles</span>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>

        <button
          onClick={() => setCurrentView("schedule")}
          className="w-full bg-white/90 backdrop-blur-sm rounded-lg p-4 flex items-center justify-between hover:bg-white transition-colors"
        >
          <span className="font-medium text-gray-900">Mes horaires</span>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>

        <button
          onClick={() => setCurrentView("history")}
          className="w-full bg-white/90 backdrop-blur-sm rounded-lg p-4 flex items-center justify-between hover:bg-white transition-colors"
        >
          <span className="font-medium text-gray-900">Historique des commandes</span>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>

        <button
          onClick={() => setCurrentView("stops")}
          className="w-full bg-white/90 backdrop-blur-sm rounded-lg p-4 flex items-center justify-between hover:bg-white transition-colors"
        >
          <span className="font-medium text-gray-900">Arrêts et lignes disponibles</span>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>

        <button
          onClick={() => setCurrentView("about")}
          className="w-full bg-white/90 backdrop-blur-sm rounded-lg p-4 flex items-center justify-between hover:bg-white transition-colors"
        >
          <span className="font-medium text-gray-900">
            À propos de <strong>LA COTA</strong>
          </span>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>

        <div className="mt-6">
          <Button className="w-full h-12 bg-red-500 hover:bg-red-600 text-white font-semibold">
            FAIRE UNE PROPOSITION
          </Button>
        </div>
      </div>
    </div>
  )
}
