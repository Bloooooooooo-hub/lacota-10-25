"use client"

import React, { useState } from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { ArrowLeft } from "lucide-react"
import { OTPInput } from "input-otp"

import { sendOtpToPhone, confirmOtp, getFirebaseAuth } from "@/lib/firebaseClient"
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"

interface PassengerSignupProps {
  onComplete: (data: any) => void
  onBack: () => void
}

type SignupStep = "phone" | "otp" | "personal" | "done"

export default function PassengerSignup({ onComplete, onBack }: PassengerSignupProps) {
  const [step, setStep] = useState<SignupStep>("phone")
  const [countryCode, setCountryCode] = useState("+225")
  const [phone, setPhone] = useState("")
  const [otp, setOtp] = useState("")
  const [status, setStatus] = useState("")
  const [loading, setLoading] = useState(false)
  const [confirmationResult, setConfirmationResult] = useState<any>(null)

  const [formData, setFormData] = useState({
    gender: "",
    firstName: "",
    lastName: "",
    birthDate: "",
    profession: "",
    email: "",
  })

  // ✅ Récupère Firebase Auth côté client uniquement
  const auth = typeof window !== "undefined" ? getFirebaseAuth() : null

  // 🔹 Étape 1 — Envoi du code
  async function handleSendCode() {
    if (!phone.trim()) return setStatus("Merci d'entrer un numéro.")
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
      setStatus("Erreur envoi SMS : " + err.message)
    } finally {
      setLoading(false)
    }
  }

  // 🔹 Étape 2 — Vérification OTP
  async function handleVerifyCode() {
    if (!confirmationResult) return setStatus("Pas de session OTP active.")
    if (otp.trim().length < 6) return setStatus("Le code doit faire 6 chiffres.")
    try {
      setLoading(true)
      setStatus("Vérification du code...")
      const user = await confirmOtp(confirmationResult, otp)
      setStatus("Téléphone confirmé ✅ " + user.phoneNumber)
      setStep("personal")
    } catch (err: any) {
      console.error(err)
      setStatus("Code invalide ❌ : " + err.message)
    } finally {
      setLoading(false)
    }
  }

  // 🔹 Étape 3 — Envoi des infos
  async function handleSubmit() {
    try {
      setLoading(true)
      setStatus("Enregistrement en cours...")

      const fullNumber = countryCode + phone.replace(/\s+/g, "")
      const role = "passenger"

      const resp = await fetch("/api/upsert-user", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ phone: fullNumber, role, ...formData }),
      })

      if (!resp.ok) {
        const errData = await resp.json().catch(() => ({}))
        console.error("Erreur /api/upsert-user:", errData)
        setStatus("Erreur d’enregistrement ❌")
        return
      }

      const data = await resp.json()
      setStatus("Compte créé ✅")
      setStep("done")
      onComplete(data)

      if (typeof window !== "undefined") {
        window.location.href = "/passenger/home"
      }
    } catch (err: any) {
      console.error(err)
      setStatus("Erreur : " + err.message)
    } finally {
      setLoading(false)
    }
  }

  // 🟢 Connexion / inscription Google
  async function handleGoogleSignup() {
    if (!auth || typeof window === "undefined") {
      console.error("Firebase Auth indisponible (exécution côté serveur)")
      return
    }
    try {
      setLoading(true)
      setStatus("Connexion Google...")

      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)
      const user = result.user

      const resp = await fetch("/api/upsert-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: user.displayName,
          email: user.email,
          role: "passenger",
          provider: "google",
        }),
      })

      if (!resp.ok) throw new Error("Erreur lors de la création du compte")

      setStatus("Compte créé avec Google ✅")
      setStep("done")
      onComplete({ email: user.email, name: user.displayName })

      if (typeof window !== "undefined") {
        window.location.href = "/passenger/home"
      }
    } catch (err: any) {
      console.error("Erreur Google:", err)
      setStatus("Erreur Google : " + err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#fffaf3] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-white">
        <button onClick={onBack} className="p-2">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className="text-lg font-bold">INSCRIPTION PASSAGER</h2>
        <div className="w-10" />
      </div>

      {/* Contenu */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-md mx-auto space-y-6">
          {/* Étape 1 — téléphone */}
          {step === "phone" && (
            <div className="space-y-6 animate-slide-up">
              <Label>Entrez votre numéro de téléphone :</Label>
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
                />
              </div>

              <Button
                onClick={handleSendCode}
                disabled={loading || phone.trim().length === 0}
                className="w-full h-14 text-lg font-semibold bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl"
              >
                {loading ? "Envoi..." : "Recevoir mon code"}
              </Button>

              {/* --- OU --- */}
              <div className="flex items-center justify-center my-4">
                <div className="border-t border-gray-300 w-1/3" />
                <span className="px-3 text-gray-500 text-sm">ou</span>
                <div className="border-t border-gray-300 w-1/3" />
              </div>

              {/* Bouton Google */}
              <Button
                onClick={handleGoogleSignup}
                disabled={loading}
                className="w-full h-14 bg-white text-gray-800 border border-gray-300 hover:bg-gray-100 flex items-center justify-center gap-2"
              >
                <img src="/google-logo.svg" alt="Google" className="w-5 h-5" />
                <span>Continuer avec Google</span>
              </Button>
            </div>
          )}

          {/* Étape 2 — OTP */}
          {step === "otp" && (
            <div className="space-y-6 animate-slide-up">
              <Label>Entrez le code envoyé au {countryCode} {phone} :</Label>
              <div className="flex justify-center">
                <OTPInput
                  maxLength={6}
                  value={otp}
                  onChange={(value) => setOtp(value)}
                  render={({ slots }) => (
                    <div className="flex justify-center gap-2">
                      {slots.map((slot, i) => (
                        <div
                          key={i}
                          className={`w-12 h-12 border rounded-lg flex items-center justify-center text-2xl font-semibold shadow-sm transition-colors ${
                            slot.char
                              ? "border-blue-500 text-blue-600"
                              : "border-gray-300 text-gray-400"
                          }`}
                        >
                          {slot.char ?? "•"}
                        </div>
                      ))}
                    </div>
                  )}
                />
              </div>

              <Button
                onClick={handleVerifyCode}
                disabled={loading || otp.trim().length < 6}
                className="w-full h-14 text-lg font-semibold bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl"
              >
                {loading ? "Vérification..." : "Confirmer le code"}
              </Button>
            </div>
          )}

          {/* Étape 3 — Données personnelles */}
          {step === "personal" && (
            <div className="space-y-4 animate-slide-up">
              <Label>Informations personnelles</Label>

              <div className="flex gap-2">
                <Button
                  variant={formData.gender === "Mme" ? "default" : "outline"}
                  onClick={() => setFormData({ ...formData, gender: "Mme" })}
                  className="flex-1"
                >
                  Madame / Mademoiselle
                </Button>
                <Button
                  variant={formData.gender === "Mr" ? "default" : "outline"}
                  onClick={() => setFormData({ ...formData, gender: "Mr" })}
                  className="flex-1"
                >
                  Monsieur
                </Button>
              </div>

              <Input
                placeholder="Prénom"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              />
              <Input
                placeholder="Nom"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              />
              <Input
                type="date"
                value={formData.birthDate}
                onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
              />
              <Input
                placeholder="Profession"
                value={formData.profession}
                onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
              />
              <Input
                type="email"
                placeholder="Email (facultatif)"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />

              <Button
                onClick={handleSubmit}
                disabled={!formData.firstName || !formData.lastName || !formData.gender}
                className="w-full h-14 text-lg font-semibold bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl"
              >
                {loading ? "Enregistrement..." : "Terminer l'inscription"}
              </Button>
            </div>
          )}

          {/* Étape finale */}
          {step === "done" && (
            <div className="space-y-4 text-center animate-slide-up">
              <p className="text-lg font-semibold text-green-600">Inscription terminée ✅</p>
              <p className="text-sm text-gray-600">Bienvenue sur LA COTA 🚖</p>
            </div>
          )}

          <p className="text-center text-xs text-gray-500 min-h-[1.5rem]">{status}</p>
          <div id="recaptcha-container" />
        </div>
      </div>
    </div>
  )
}
