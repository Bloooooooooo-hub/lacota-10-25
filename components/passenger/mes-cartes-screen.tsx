"use client"

import { useState } from "react"
import { Card } from "../ui/card"
import { Button } from "../ui/button"
import { ArrowLeft, CreditCard, Star } from "lucide-react"

interface MesCartesScreenProps {
  onBack: () => void
}

export default function MesCartesScreen({ onBack }: MesCartesScreenProps) {
  const [showCardOptions, setShowCardOptions] = useState(false)
  const [selectedCardType, setSelectedCardType] = useState<string | null>(null)

  const cardTypes = [
    {
      id: "student",
      name: "Carte Avantage Étudiant",
      price: "3,500 fr",
      benefits: [
        "Réductions chez nos partenaires (restaurant, salle de sport)",
        "Un trajet gratuit chaque semaine",
        "24h/24, 7j/7",
      ],
      note: "Il faudra bien sûr envoyer la photo du reçu de l'inscription de l'année en cours. Elle est valable un mois et peut être renouvelée.",
      color: "bg-slate-700",
    },
    {
      id: "adult",
      name: "Carte Avantage Adulte",
      price: "5,000 fr",
      benefits: [
        "Réductions chez nos partenaires (restaurant, salle de sport)",
        "Un trajet gratuit chaque semaine",
        "24h/24, 7j/7",
      ],
      color: "bg-blue-600",
    },
    {
      id: "senior",
      name: "Carte Avantage Sénior",
      price: "10,000 fr",
      benefits: [
        "Réductions chez nos partenaires",
        "Le senior pourra être déposé ou récupéré dans un rayon de 1 km de l'arrêt qu'il aura choisi",
        "Un trajet gratuit chaque semaine",
      ],
      color: "bg-red-600",
    },
  ]

  return (
    <div
      className="min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: "url(/placeholder.svg?height=800&width=400&query=people+in+car)" }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40" />

      <div className="relative z-10 p-4 space-y-4">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={onBack} className="text-white">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-black text-white" style={{ fontFamily: "cursive" }}>
            Mes cartes
          </h1>
        </div>

        <div className="space-y-3">
          <p className="text-white font-semibold">Vous souhaitez :</p>

          <Button
            onClick={() => setShowCardOptions(true)}
            className="w-full h-12 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold"
          >
            Acheter une carte
          </Button>

          <Button className="w-full h-12 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold">
            Renouveler une carte
          </Button>
        </div>

        <div className="mt-6">
          <Button className="w-full h-12 bg-red-500 hover:bg-red-600 text-white font-semibold">
            FAIRE UNE PROPOSITION
          </Button>
        </div>
      </div>

      {/* Card Options Modal */}
      {showCardOptions && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="max-w-sm w-full space-y-4 my-8">
            <Card className="bg-slate-700 text-white p-6 space-y-4">
              <div className="flex items-start justify-between">
                <div className="space-y-2 flex-1">
                  <h3 className="text-lg font-semibold">Achat & renouvellement de cartes avantages</h3>
                  <p className="text-sm">
                    Coucou [Prénom Nom], 👋
                    <br />
                    <br />
                    Tu veux te déplacer gratuitement et profiter d'avantages ?<br />
                    C'est ici que ça se passe !<br />
                    Tes cartes Avantages sont déjà dispos chez nous.
                    <br />
                    <br />
                    Toutes les 2 minutes chrono, tu peux commencer à économiser sur les trajets
                  </p>
                </div>
                <button onClick={() => setShowCardOptions(false)} className="text-white">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <Button className="w-full h-12 bg-red-500 hover:bg-red-600 text-white font-semibold">
                Acheter une carte avantage →
              </Button>
            </Card>

            {cardTypes.map((card) => (
              <Card key={card.id} className="bg-white p-6 space-y-4">
                <div className="space-y-3">
                  <h4 className="text-lg font-bold text-gray-900">{card.name}</h4>

                  <div className={`${card.color} text-white p-4 rounded-lg`}>
                    <div className="flex items-center justify-center mb-2">
                      <CreditCard className="w-12 h-12" />
                    </div>
                    <p className="text-center text-2xl font-bold">{card.price}</p>
                    <p className="text-center text-sm">LA COTA</p>
                  </div>

                  <div className="space-y-2">
                    {card.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <Star className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-gray-700">{benefit}</p>
                      </div>
                    ))}
                  </div>

                  {card.note && <p className="text-xs text-gray-600 italic">{card.note}</p>}

                  <Button className="w-full h-12 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold">
                    Commander cette carte
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
