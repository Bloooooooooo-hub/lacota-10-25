"use client"

import { useState } from "react"
import { AvailableLines } from "./available-lines"
import { DepartureArrivalPoints } from "./departure-arrival-points"
import { ProposeNewLine } from "./propose-new-line"
import { Separator } from "@/components/ui/separator"
import type { Line } from "@/lib/lines-data"

interface LinesManagementProps {
  userType?: "passenger" | "driver"
}

export function LinesManagement({ userType = "passenger" }: LinesManagementProps) {
  const [selectedLine, setSelectedLine] = useState<Line | null>(null)
  const [departurePoint, setDeparturePoint] = useState("")
  const [arrivalPoint, setArrivalPoint] = useState("")

  const handleSelectLine = (line: Line) => {
    setSelectedLine(line)
    // Réinitialiser les points lors du changement de ligne
    setDeparturePoint("")
    setArrivalPoint("")
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-12 max-w-7xl">
      {/* En-tête */}
      <div className="space-y-2 text-center">
        <h1 className="text-4xl font-bold tracking-tight">Gestion des lignes LA COTA</h1>
        <p className="text-lg text-muted-foreground">
          {userType === "passenger"
            ? "Trouvez votre ligne et planifiez votre trajet"
            : "Gérez vos lignes et proposez de nouveaux itinéraires"}
        </p>
      </div>

      <Separator />

      {/* Lignes disponibles */}
      <AvailableLines selectedLineId={selectedLine?.id} onSelectLine={handleSelectLine} />

      <Separator />

      {/* Points de départ et d'arrivée */}
      <DepartureArrivalPoints
        selectedLine={selectedLine}
        departurePoint={departurePoint}
        arrivalPoint={arrivalPoint}
        onDepartureChange={setDeparturePoint}
        onArrivalChange={setArrivalPoint}
      />

      <Separator />

      {/* Proposer une nouvelle ligne */}
      <ProposeNewLine />
    </div>
  )
}
