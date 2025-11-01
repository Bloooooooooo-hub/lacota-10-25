"use client"

import { useState } from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { ArrowLeft } from "lucide-react"

interface PassengerSignupProps {
  onComplete: (data: any) => void
  onBack: () => void
}

export default function PassengerSignup({ onComplete, onBack }: PassengerSignupProps) {
  const [step, setStep] = useState(1)
  const [phone, setPhone] = useState("")
  const [otp, setOtp] = useState(["", "", "", ""])
  const [formData, setFormData] = useState({
    gender: "",
    firstName: "",
    lastName: "",
    birthDate: "",
    profession: "",
    email: "",
  })

  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newOtp = [...otp]
      newOtp[index] = value
      setOtp(newOtp)
      if (value && index < 3) {
        document.getElementById(`otp-${index + 1}`)?.focus()
      }
    }
  }

  const handleSubmit = () => {
    onComplete({ ...formData, phone })
  }

  if (step === 1) {
    return (
      <div className="min-h-screen bg-[#fffaf3] p-6">
        <div className="max-w-md mx-auto">
          <Button variant="ghost" onClick={onBack} className="mb-6">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Retour
          </Button>

          <div className="bg-white rounded-2xl p-6 shadow-lg space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Entrez votre numéro de téléphone :</h2>

            <div className="space-y-2">
              <div className="flex gap-2">
                <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg">
                  <span className="text-2xl">🇨🇮</span>
                  <span className="font-semibold">+225</span>
                </div>
                <Input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="XX XX XX XXX"
                  className="flex-1 h-12 text-lg"
                />
              </div>
              <p className="text-sm text-gray-500">Un SMS de confirmation vous sera envoyé</p>
            </div>

            <Button
              onClick={() => setStep(2)}
              disabled={phone.length < 8}
              className="w-full h-12 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold"
            >
              Suivant
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (step === 2) {
    return (
      <div className="min-h-screen bg-[#fffaf3] p-6">
        <div className="max-w-md mx-auto">
          <Button variant="ghost" onClick={() => setStep(1)} className="mb-6">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Retour
          </Button>

          <div className="bg-white rounded-2xl p-6 shadow-lg space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Entrez le code de confirmation envoyé au +225 {phone} :
            </h2>

            <div className="flex gap-3 justify-center">
              {otp.map((digit, index) => (
                <Input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  className="w-16 h-16 text-center text-2xl font-bold"
                />
              ))}
            </div>

            <Button
              onClick={() => setStep(3)}
              disabled={otp.some((d) => !d)}
              className="w-full h-12 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold"
            >
              Suivant
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#fffaf3] p-6">
      <div className="max-w-md mx-auto">
        <Button variant="ghost" onClick={() => setStep(2)} className="mb-6">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Retour
        </Button>

        <div className="bg-white rounded-2xl p-6 shadow-lg space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Informations personnelles</h2>

          <div className="space-y-4">
            <div>
              <Label>Comment préférez-vous qu'on vous appelle ?</Label>
              <div className="flex gap-2 mt-2">
                <Button
                  variant={formData.gender === "Madame" ? "default" : "outline"}
                  onClick={() => setFormData({ ...formData, gender: "Madame" })}
                  className="flex-1"
                >
                  Madame / Mademoiselle
                </Button>
                <Button
                  variant={formData.gender === "Monsieur" ? "default" : "outline"}
                  onClick={() => setFormData({ ...formData, gender: "Monsieur" })}
                  className="flex-1"
                >
                  Monsieur
                </Button>
              </div>
            </div>

            <div>
              <Label>Prénom</Label>
              <Input
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                placeholder="Prénoms"
                className="mt-2"
              />
            </div>

            <div>
              <Label>Nom</Label>
              <Input
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                placeholder="Nom"
                className="mt-2"
              />
            </div>

            <div>
              <Label>Date de naissance</Label>
              <Input
                type="date"
                value={formData.birthDate}
                onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                placeholder="JJ/MM/AAAA"
                className="mt-2"
              />
            </div>

            <div>
              <Label>Profession</Label>
              <Input
                value={formData.profession}
                onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
                placeholder="Profession"
                className="mt-2"
              />
            </div>

            <div>
              <Label>Adresse e-mail (facultatif)</Label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Votre adresse e-mail"
                className="mt-2"
              />
              <p className="text-xs text-gray-500 mt-1">
                En saisissant votre adresse email, vous acceptez de recevoir des emails promotionnels de LA COTA.
              </p>
            </div>
          </div>

          <Button
            onClick={handleSubmit}
            disabled={!formData.gender || !formData.firstName || !formData.lastName || !formData.birthDate}
            className="w-full h-12 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold"
          >
            Enregistrer
          </Button>
        </div>
      </div>
    </div>
  )
}
