"use client"

import { useState } from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { ArrowLeft } from "lucide-react"

interface PassengerLoginProps {
  onComplete: (data: any) => void
  onBack: () => void
}

export default function PassengerLogin({ onComplete, onBack }: PassengerLoginProps) {
  const [phone, setPhone] = useState("")
  const [otp, setOtp] = useState(["", "", "", ""])
  const [step, setStep] = useState(1)

  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newOtp = [...otp]
      newOtp[index] = value
      setOtp(newOtp)
      if (value && index < 3) {
        document.getElementById(`login-otp-${index + 1}`)?.focus()
      }
    }
  }

  const handleLogin = () => {
    onComplete({ phone, name: "Utilisateur" })
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
            <h2 className="text-2xl font-bold text-gray-900">Connexion</h2>

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

  return (
    <div className="min-h-screen bg-[#fffaf3] p-6">
      <div className="max-w-md mx-auto">
        <Button variant="ghost" onClick={() => setStep(1)} className="mb-6">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Retour
        </Button>

        <div className="bg-white rounded-2xl p-6 shadow-lg space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Entrez le code de confirmation :</h2>

          <div className="flex gap-3 justify-center">
            {otp.map((digit, index) => (
              <Input
                key={index}
                id={`login-otp-${index}`}
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
            onClick={handleLogin}
            disabled={otp.some((d) => !d)}
            className="w-full h-12 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold"
          >
            Se connecter
          </Button>
        </div>
      </div>
    </div>
  )
}
