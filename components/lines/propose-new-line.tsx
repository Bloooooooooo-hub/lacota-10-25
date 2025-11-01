"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { COMMUNES } from "@/lib/lines-data"
import { Plus, Send } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function ProposeNewLine() {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    departureCommune: "",
    departureDetails: "",
    arrivalCommune: "",
    arrivalDetails: "",
    departureTime: "",
    returnTime: "",
    partnershipRequest: false,
    additionalInfo: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    if (!formData.departureCommune || !formData.arrivalCommune) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir les communes de départ et d'arrivée",
        variant: "destructive",
      })
      return
    }

    // Simuler l'envoi
    toast({
      title: "Proposition envoyée",
      description: "Votre proposition de nouvelle ligne a été envoyée avec succès",
    })

    // Réinitialiser le formulaire
    setFormData({
      departureCommune: "",
      departureDetails: "",
      arrivalCommune: "",
      arrivalDetails: "",
      departureTime: "",
      returnTime: "",
      partnershipRequest: false,
      additionalInfo: "",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="h-5 w-5" />
          Proposer une nouvelle ligne
        </CardTitle>
        <CardDescription>Suggérez une nouvelle ligne de transport pour améliorer le réseau LA COTA</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Point de départ */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="departure-commune">Commune de départ *</Label>
              <Select
                value={formData.departureCommune}
                onValueChange={(value) => setFormData({ ...formData, departureCommune: value })}
              >
                <SelectTrigger id="departure-commune">
                  <SelectValue placeholder="Sélectionnez une commune" />
                </SelectTrigger>
                <SelectContent>
                  {COMMUNES.map((commune) => (
                    <SelectItem key={commune} value={commune}>
                      {commune}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="departure-details">Détails du point de départ</Label>
              <Input
                id="departure-details"
                placeholder="Ex: Carrefour principal, près de..."
                value={formData.departureDetails}
                onChange={(e) => setFormData({ ...formData, departureDetails: e.target.value })}
              />
            </div>
          </div>

          {/* Point d'arrivée */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="arrival-commune">Commune d'arrivée *</Label>
              <Select
                value={formData.arrivalCommune}
                onValueChange={(value) => setFormData({ ...formData, arrivalCommune: value })}
              >
                <SelectTrigger id="arrival-commune">
                  <SelectValue placeholder="Sélectionnez une commune" />
                </SelectTrigger>
                <SelectContent>
                  {COMMUNES.map((commune) => (
                    <SelectItem key={commune} value={commune}>
                      {commune}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="arrival-details">Détails du point d'arrivée</Label>
              <Input
                id="arrival-details"
                placeholder="Ex: Station de bus, devant..."
                value={formData.arrivalDetails}
                onChange={(e) => setFormData({ ...formData, arrivalDetails: e.target.value })}
              />
            </div>
          </div>

          {/* Horaires */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="departure-time">Heure aller</Label>
              <Input
                id="departure-time"
                type="time"
                value={formData.departureTime}
                onChange={(e) => setFormData({ ...formData, departureTime: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="return-time">Heure retour</Label>
              <Input
                id="return-time"
                type="time"
                value={formData.returnTime}
                onChange={(e) => setFormData({ ...formData, returnTime: e.target.value })}
              />
            </div>
          </div>

          {/* Informations supplémentaires */}
          <div className="space-y-2">
            <Label htmlFor="additional-info">Informations supplémentaires</Label>
            <Textarea
              id="additional-info"
              placeholder="Ajoutez des détails sur votre proposition..."
              value={formData.additionalInfo}
              onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
              rows={4}
            />
          </div>

          {/* Demande de partenariat */}
          <div className="flex items-start space-x-3 rounded-lg border p-4 bg-muted/50">
            <Checkbox
              id="partnership"
              checked={formData.partnershipRequest}
              onCheckedChange={(checked) => setFormData({ ...formData, partnershipRequest: checked as boolean })}
            />
            <div className="space-y-1 leading-none">
              <Label htmlFor="partnership" className="text-sm font-medium leading-relaxed cursor-pointer">
                Je souhaite que mon entreprise devienne partenaire légalement
              </Label>
              <p className="text-sm text-muted-foreground">(RCCM, DFE requis pour le partenariat officiel)</p>
            </div>
          </div>

          {/* Bouton de soumission */}
          <Button type="submit" className="w-full" size="lg">
            <Send className="mr-2 h-4 w-4" />
            Proposer la ligne
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
