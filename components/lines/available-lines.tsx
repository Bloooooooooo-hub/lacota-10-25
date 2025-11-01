"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { LINES, type Line } from "@/lib/lines-data"
import { MapPin, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface AvailableLinesProps {
  selectedLineId?: number
  onSelectLine: (line: Line) => void
}

export function AvailableLines({ selectedLineId, onSelectLine }: AvailableLinesProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-foreground">Lignes disponibles</h2>
        <p className="text-muted-foreground">Sélectionnez une ligne pour voir les points de départ et d'arrivée</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {LINES.map((line) => (
          <Card
            key={line.id}
            className={cn(
              "cursor-pointer transition-all hover:shadow-lg hover:scale-[1.02]",
              selectedLineId === line.id && "ring-2 ring-primary shadow-lg",
            )}
            onClick={() => onSelectLine(line)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">{line.name}</CardTitle>
                <Badge variant="secondary" className="text-lg font-bold">
                  {line.price} fr
                </Badge>
              </div>
              <CardDescription>{line.stops.length} arrêts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <div className="flex items-start gap-2 text-sm">
                  <MapPin className="h-4 w-4 mt-0.5 text-green-600 flex-shrink-0" />
                  <span className="text-muted-foreground">{line.stops[0]}</span>
                </div>
                <div className="flex items-center justify-center">
                  <div className="h-8 w-px bg-border" />
                </div>
                <div className="flex items-start gap-2 text-sm">
                  <MapPin className="h-4 w-4 mt-0.5 text-red-600 flex-shrink-0" />
                  <span className="text-muted-foreground">{line.stops[line.stops.length - 1]}</span>
                </div>
              </div>

              <Button variant={selectedLineId === line.id ? "default" : "outline"} className="w-full" size="sm">
                {selectedLineId === line.id ? "Ligne sélectionnée" : "Sélectionner"}
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
