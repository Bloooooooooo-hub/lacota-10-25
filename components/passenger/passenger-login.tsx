"use client"

import React, { useState } from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { ArrowLeft } from "lucide-react"
import { OTPInput } from "input-otp"

import { sendOtpToPhone, confirmOtp, getFirebaseAuth } from "@/lib/firebaseClient"
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"

interface PassengerLoginProps {
  onComplete: (data: any) => void
  onBack: () => void
}

export default function PassengerLogin({ onComplete, onBack }: PassengerLoginProps) {
  const [step, setStep] = useState<"phone" | "otp" | "done">("phone")
  const [countryCode, setCountryCode] = useState("+225")
  const [phone, setPhone] = useState("")
  const [otp, setOtp] = useState("")
  const [status, setStatus] = useState("")
  const [loading, setLoading] = useState(false)
  const [confirmationResult, setConfirmationResult] = useState<any>(null)

  // ✅ Firebase Auth côté client
  const auth = typeof window !== "undefined" ? getFirebaseAuth() : null

  // 🔹 Étape 1 : Envoi du code OTP
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
      setStatus("Erreur d’envoi : " + err.message)
    } finally {
      setLoading(false)
    }
  }

  // 🔹 Étape 2 : Vérification du code
  async function handleVerifyCode() {
    if (!confirmationResult) return setStatus("Pas de session OTP active.")
    if (otp.trim().length < 6) return setStatus("Le code doit faire 6 chiffres.")

    try {
      setLoading(true)
      setStatus("Vérification du code...")
      const user = await confirmOtp(confirmationResult, otp)
      const validatedPhone = user.phoneNumber

      await syncUserWithHasura({ phone: validatedPhone, role: "passenger" })

      setStep("done")
      setStatus("Connexion réussie ✅")
      onComplete({ phone: validatedPhone })

      if (typeof window !== "undefined") {
        window.location.href = "/passenger/home"
      }
    } catch (err: any) {
      console.error(err)
      setStatus("Code invalide ❌ : " + (err.message || "Erreur inconnue"))
    } finally {
      setLoading(false)
    }
  }

  // 🟢 Connexion Google
  async function handleGoogleLogin() {
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

      const [firstName, ...rest] = (user.displayName || "").split(" ")
      const lastName = rest.join(" ")

      await syncUserWithHasura({
        email: user.email,
        first_name: firstName,
        last_name: lastName,
        role: "passenger",
        provider: "google",
      })

      setStatus("Connexion réussie ✅")
      onComplete({ email: user.email, name: user.displayName })

      if (typeof window !== "undefined") {
        window.location.href = "/passenger/home"
      }
    } catch (err: any) {
      console.error("Erreur Google Auth:", err)
      setStatus("Erreur Google : " + err.message)
    } finally {
      setLoading(false)
    }
  }

  // 🔁 Enregistrement côté Hasura
  async function syncUserWithHasura(payload: any) {
    const resp = await fetch("/api/upsert-user", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    })

    if (!resp.ok) {
      const errorText = await resp.text()
      console.error("Erreur API:", errorText)
      throw new Error("Erreur Hasura /api/upsert-user")
    }
  }

  // 🔹 Interface utilisateur
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
        <h2 className="text-lg font-bold">CONNEXION PASSAGER</h2>
        <div className="w-10" />
      </div>

      {/* Corps */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md space-y-6">
          {/* Étape 1 - Numéro */}
          {step === "phone" && (
            <div className="space-y-6 animate-slide-up">
              <Label className="text-base mb-3 block">Entrez votre numéro de téléphone :</Label>
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
                className="w-full h-14 text-lg font-semibold bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Envoi..." : "Recevoir mon code"}
              </Button>

              {/* --- OU --- */}
              <div className="flex items-center justify-center my-4">
                <div className="border-t border-gray-300 w-1/3" />
                <span className="px-3 text-gray-500 text-sm">ou</span>
                <div className="border-t border-gray-300 w-1/3" />
              </div>

              {/* Connexion Google */}
              <Button
                onClick={handleGoogleLogin}
                disabled={loading}
                className="w-full h-14 bg-white text-gray-800 border border-gray-300 hover:bg-gray-100 flex items-center justify-center gap-2"
              >
                <img src="/google-logo.svg" alt="Google" className="w-5 h-5" />
                <span>Continuer avec Google</span>
              </Button>
            </div>
          )}

          {/* Étape 2 - OTP */}
          {step === "otp" && (
            <div className="space-y-6 animate-slide-up">
              <Label className="text-base mb-3 block">
                Entrez le code envoyé au {countryCode} {phone} :
              </Label>
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
                className="w-full h-14 text-lg font-semibold bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Vérification..." : "Se connecter"}
              </Button>
            </div>
          )}

          {/* Étape 3 - Terminé */}
          {step === "done" && (
            <div className="space-y-4 animate-slide-up text-center">
              <p className="text-lg font-semibold text-green-600">Connecté ✅</p>
              <p className="text-sm text-gray-600">Redirection vers votre espace...</p>
            </div>
          )}

          {/* Statut */}
          <p className="text-center text-xs text-gray-500 min-h-[1.5rem]">{status}</p>
          <div id="recaptcha-container" />
        </div>
      </div>
    </div>
  )
}
