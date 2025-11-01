"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { MapPin, ArrowRight } from "lucide-react"
import type { Line } from "@/lib/lines-data"

interface DepartureArrivalPointsProps {
  selectedLine: Line | null
  departurePoint: string
  arrivalPoint: string
  onDepartureChange: (value: string) => void
  onArrivalChange: (value: string) => void
}

export function DepartureArrivalPoints({
  selectedLine,
  departurePoint,
  arrivalPoint,
  onDepartureChange,
  onArrivalChange,
}: DepartureArrivalPointsProps) {
  if (!selectedLine) {
    return (
      <Card className="border-dashed">
        <CardHeader>
          <CardTitle>Points de départ et d'arrivée</CardTitle>
          <CardDescription>Sélectionnez d'abord une ligne pour voir les arrêts disponibles</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center py-12">
          <div className="text-center text-muted-foreground">
            <MapPin className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>Aucune ligne sélectionnée</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Points de départ et d'arrivée</h2>
          <p className="text-muted-foreground">
            {selectedLine.name} • {selectedLine.price} fr
          </p>
        </div>
        <Badge variant="outline" className="text-sm">
          {selectedLine.stops.length} arrêts disponibles
        </Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-green-600" />
              Point de départ
            </CardTitle>
            <CardDescription>Choisissez votre arrêt de départ</CardDescription>
          </CardHeader>
          <CardContent>
            <Select value={departurePoint} onValueChange={onDepartureChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Sélectionnez un arrêt" />
              </SelectTrigger>
              <SelectContent>
                {selectedLine.stops.map((stop, index) => (
                  <SelectItem key={index} value={stop}>
                    {stop}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-red-600" />
              Point d'arrivée
            </CardTitle>
            <CardDescription>Choisissez votre arrêt d'arrivée</CardDescription>
          </CardHeader>
          <CardContent>
            <Select value={arrivalPoint} onValueChange={onArrivalChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Sélectionnez un arrêt" />
              </SelectTrigger>
              <SelectContent>
                {selectedLine.stops.map((stop, index) => (
                  <SelectItem key={index} value={stop}>
                    {stop}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
      </div>

      {departurePoint && arrivalPoint && (
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-green-600" />
                <span className="font-medium">{departurePoint}</span>
              </div>
              <ArrowRight className="h-5 w-5 text-primary" />
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-red-600" />
                <span className="font-medium">{arrivalPoint}</span>
              </div>
            </div>
            <div className="text-center mt-3">
              <Badge variant="default" className="text-base">
                Prix: {selectedLine.price} fr
              </Badge>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
