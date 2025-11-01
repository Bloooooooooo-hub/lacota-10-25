"use client"

import React, { useState } from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { ArrowLeft } from "lucide-react"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input"

import { sendOtpToPhone, confirmOtp } from "@/lib/firebaseClient"

interface LoginFlowProps {
  onComplete: (data: any) => void
  onBack: () => void
}

export default function LoginFlow({ onComplete, onBack }: LoginFlowProps) {
  const [step, setStep] = useState<"phone" | "otp" | "done">("phone")
  const [countryCode, setCountryCode] = useState("+225") // 🌍 multi-pays
  const [phone, setPhone] = useState("")
  const [otp, setOtp] = useState("")
  const [status, setStatus] = useState<string>("")
  const [loading, setLoading] = useState(false)
  const [confirmationResult, setConfirmationResult] = useState<any>(null)

  // 1️⃣ Envoi du code SMS
  async function handleSendCode() {
    if (!phone.trim()) {
      setStatus("Merci d'entrer un numéro.")
      return
    }

    try {
      setLoading(true)
      setStatus("Envoi du SMS...")

      const fullNumber = countryCode + phone.replace(/\s+/g, "")
      const result = await sendOtpToPhone(fullNumber)

      setConfirmationResult(result)
      setStep("otp")
      setStatus("Code envoyé ✅")
    } catch (err: any) {
      console.error(err)
      setStatus("Erreur envoi SMS: " + err.message)
    } finally {
      setLoading(false)
    }
  }

  // 2️⃣ Vérification du code
  async function handleVerifyCode() {
    if (!confirmationResult) {
      setStatus("Pas de session OTP active.")
      return
    }

    if (otp.trim().length < 6) {
      setStatus("Le code doit faire 6 chiffres.")
      return
    }

    try {
      setLoading(true)
      setStatus("Vérification du code...")

      const user = await confirmOtp(confirmationResult, otp)
      const validatedPhone = user.phoneNumber
      setStatus("Connecté ✅ " + validatedPhone)

      const role = "driver"

      // 🔁 Appel à ton API /upsert-user pour créer ou mettre à jour
      const resp = await fetch("/api/upsert-user", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ phone: validatedPhone, role }),
      })

      if (!resp.ok) {
        const errData = await resp.json().catch(() => ({}))
        console.error("Erreur /api/upsert-user:", errData)
        setStatus("Erreur d’enregistrement du profil ❌")
        setLoading(false)
        return
      }

      const data = await resp.json()
      console.log("✅ Utilisateur connecté :", data)

      setStep("done")
      setStatus("Connexion réussie ✅")

      onComplete({
        phone: validatedPhone,
        userRecord: data.userRecord,
      })

      // 🚗 Redirection chauffeur
      window.location.href = "/driver/lines"
    } catch (err: any) {
      console.error(err)
      setStatus("Code invalide ❌ : " + (err.message || "Erreur inconnue"))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#fffaf3] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-white">
        <button
          onClick={step === "phone" ? onBack : () => setStep("phone")}
          className="p-2"
          disabled={loading}
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className="text-lg font-bold">CONNEXION</h2>
        <div className="w-10" />
      </div>

      {/* Corps */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md space-y-6">
          {/* Étape 1 - Téléphone */}
          {step === "phone" && (
            <div className="space-y-6 animate-slide-up">
              <div>
                <Label className="text-base mb-3 block">
                  Entrez votre numéro de téléphone :
                </Label>
                <div className="flex gap-2">
                  <select
                    className="px-3 py-2 bg-gray-100 rounded-lg font-semibold"
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                  >
                    <option value="+225">🇨🇮 +225</option>
                    <option value="+33">🇫🇷 +33</option>
                    <option value="+237">🇨🇲 +237</option>
                    <option value="+221">🇸🇳 +221</option>
                  </select>

                  <Input
                    type="tel"
                    placeholder="01 41 36 28 39"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="flex-1 h-12 text-lg"
                    disabled={loading}
                  />
                </div>
              </div>

              <Button
                onClick={handleSendCode}
                disabled={loading || phone.trim().length === 0}
                className="w-full h-14 text-lg font-semibold bg-[#3B82F6] hover:bg-blue-600 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Envoi..." : "Recevoir mon code"}
              </Button>
            </div>
          )}

          {/* Étape 2 - Code OTP */}
          {step === "otp" && (
            <div className="space-y-6 animate-slide-up">
              <Label className="text-base mb-3 block">
                Entrez le code de confirmation envoyé au {countryCode}{" "}
                {phone} :
              </Label>
              <div className="flex justify-center">
                <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                  <InputOTPGroup>
                    {[0, 1, 2, 3, 4, 5].map((i) => (
                      <InputOTPSlot key={i} index={i} className="w-12 h-12 text-2xl" />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
              </div>

              <Button
                onClick={handleVerifyCode}
                disabled={loading || otp.trim().length < 6}
                className="w-full h-14 text-lg font-semibold bg-[#3B82F6] hover:bg-blue-600 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Vérification..." : "Se connecter"}
              </Button>
            </div>
          )}

          {/* Étape finale */}
          {step === "done" && (
            <div className="space-y-4 animate-slide-up text-center">
              <p className="text-lg font-semibold text-green-600">
                Connecté ✅
              </p>
              <p className="text-sm text-gray-600">
                Redirection vers ton espace chauffeur...
              </p>
            </div>
          )}

          <p className="text-center text-xs text-gray-500 min-h-[1.5rem]">
            {status}
          </p>

          <div id="recaptcha-container" />
        </div>
      </div>
    </div>
  )
}
