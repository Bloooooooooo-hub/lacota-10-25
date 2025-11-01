"use client"

import React, { useState } from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { ArrowLeft } from "lucide-react"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input"

import {
  sendOtpToPhone,
  confirmOtp,
} from "@/lib/firebaseClient"

interface SignupFlowProps {
  onComplete: (data: any) => void
  onBack: () => void
}

type SignupStep = "phone" | "otp" | "personal" | "documents" | "done"

export default function SignupFlow({ onComplete, onBack }: SignupFlowProps) {
  const [step, setStep] = useState<SignupStep>("phone")
  const [status, setStatus] = useState<string>("")
  const [confirmationResult, setConfirmationResult] = useState<any>(null)

  const [formData, setFormData] = useState({
    countryCode: "+225", // ✅ ajouté ici
    phone: "",
    otp: "",
    gender: "",
    firstName: "",
    lastName: "",
    birthDate: "",
    profession: "",
    email: "",
    cniRecto: null as File | null,
    cniVerso: null as File | null,
    permisRecto: null as File | null,
    permisVerso: null as File | null,
    selfiePer: null as File | null,
  })

  async function handleNext() {
    if (step === "phone") {
      // 1. on envoie OTP
      try {
        setStatus("Envoi du SMS...")
const fullNumber =
  (formData.countryCode || "+225") + formData.phone.replace(/\s+/g, "")
        const result = await sendOtpToPhone(fullNumber)
        setConfirmationResult(result)
        setStatus("Code envoyé ✅")
        setStep("otp")
      } catch (err: any) {
        console.error(err)
        setStatus("Erreur envoi SMS: " + err.message)
      }
      return
    }

    if (step === "otp") {
      // 2. on vérifie OTP
      if (!confirmationResult) {
        setStatus("Pas de session OTP active")
        return
      }
      try {
        setStatus("Vérification du code...")
        const user = await confirmOtp(confirmationResult, formData.otp)

        // ici tu peux aussi déjà créer le compte côté Hasura si tu veux,
        // comme tu le fais dans LoginFlow
        // (même remarque attention secret admin)

        setStatus("Téléphone confirmé ✅ " + user.phoneNumber)
        setStep("personal")
      } catch (err: any) {
        console.error(err)
        setStatus("Code invalide ❌ : " + err.message)
      }
      return
    }

    if (step === "personal") {
      setStep("documents")
      return
    }

    if (step === "documents") {
      // dernière étape : onComplete avec toutes les infos
      setStep("done")
      onComplete(formData)
      return
    }

    if (step === "done") {
      // rien
      return
    }
  }

  function handleBack() {
    if (step === "phone") {
      onBack()
    } else if (step === "otp") {
      setStep("phone")
    } else if (step === "personal") {
      setStep("otp")
    } else if (step === "documents") {
      setStep("personal")
    } else if (step === "done") {
      setStep("documents")
    }
  }

  return (
    <div className="min-h-screen bg-[#fffaf3] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-white">
        <button onClick={handleBack} className="p-2">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className="text-lg font-bold">JE M'INSCRIS</h2>
        <div className="w-10" />
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-md mx-auto space-y-6">
         {step === "phone" && (
  <div className="space-y-6 animate-slide-up">
    <div>
      <Label className="text-base mb-3 block">
        Entrez votre numéro de téléphone :
      </Label>

      <div className="flex gap-2">
        {/* Sélecteur d'indicatif pays */}
        <select
          className="px-3 py-2 bg-gray-100 rounded-lg font-semibold"
          value={formData.countryCode || "+225"}
          onChange={(e) =>
            setFormData({ ...formData, countryCode: e.target.value })
          }
        >
          <option value="+225">🇨🇮 +225</option>
          <option value="+33">🇫🇷 +33</option>
          <option value="+237">🇨🇲 +237</option>
          <option value="+221">🇸🇳 +221</option>
        </select>

        <Input
          type="tel"
          placeholder="Ex: 01 41 36 28 39"
          value={formData.phone}
          onChange={(e) =>
            setFormData({ ...formData, phone: e.target.value })
          }
          className="flex-1 h-12 text-lg"
        />
      </div>

      <p className="text-sm text-gray-500 mt-2">
        Un SMS de confirmation vous sera envoyé
      </p>
    </div>
  </div>
)}


          {step === "otp" && (
            <div className="space-y-6 animate-slide-up">
              <div>
                <Label className="text-base mb-3 block">
                  Entrez le code de confirmation envoyé au +225{" "}
                  {formData.phone} :
                </Label>
                <div className="flex justify-center">
                  <InputOTP
                    maxLength={6}
                    value={formData.otp}
                    onChange={(val) =>
                      setFormData({ ...formData, otp: val })
                    }
                  >
                    <InputOTPGroup>
                      <InputOTPSlot
                        index={0}
                        className="w-12 h-12 text-2xl"
                      />
                      <InputOTPSlot
                        index={1}
                        className="w-12 h-12 text-2xl"
                      />
                      <InputOTPSlot
                        index={2}
                        className="w-12 h-12 text-2xl"
                      />
                      <InputOTPSlot
                        index={3}
                        className="w-12 h-12 text-2xl"
                      />
                      <InputOTPSlot
                        index={4}
                        className="w-12 h-12 text-2xl"
                      />
                      <InputOTPSlot
                        index={5}
                        className="w-12 h-12 text-2xl"
                      />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
              </div>
            </div>
          )}

          {step === "personal" && (
            <div className="space-y-4 animate-slide-up">
              <div>
                <Label className="text-base mb-2 block">
                  Comment préférez-vous qu'on vous appelle ?
                </Label>
                <RadioGroup
                  value={formData.gender}
                  onValueChange={(value) =>
                    setFormData({ ...formData, gender: value })
                  }
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="mme" id="mme" />
                    <Label htmlFor="mme">
                      Madame / Mademoiselle
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="mr" id="mr" />
                    <Label htmlFor="mr">Monsieur</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label className="text-base mb-2 block">
                  Comment vous appelez-vous ?
                </Label>
                <Input
                  placeholder="Prénoms"
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      firstName: e.target.value,
                    })
                  }
                  className="mb-2"
                />
                <Input
                  placeholder="Nom"
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      lastName: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <Label className="text-base mb-2 block">
                  Quelle est votre date de naissance ?
                </Label>
                <Input
                  type="text"
                  placeholder="JJ/MM/AAAA"
                  value={formData.birthDate}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      birthDate: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <Label className="text-base mb-2 block">
                  Profession
                </Label>
                <Input
                  placeholder="Votre profession"
                  value={formData.profession}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      profession: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <Label className="text-base mb-2 block">
                  Votre adresse e-mail (facultatif)
                </Label>
                <Input
                  type="email"
                  placeholder="exemple@email.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      email: e.target.value,
                    })
                  }
                />
                <p className="text-xs text-gray-500 mt-1">
                  En saisissant votre adresse email, vous acceptez
                  de recevoir des emails promotionnels de La COTA.
                </p>
              </div>
            </div>
          )}

          {step === "documents" && (
            <div className="space-y-4 animate-slide-up">
              <DocumentUpload label="Numéro de CNI" />
              <DocumentUpload label="Recto de la CNI" />
              <DocumentUpload label="Verso de la CNI" />
              <DocumentUpload label="Numéro du permis de conduire" />
              <DocumentUpload label="Recto du permis de conduire" />
              <DocumentUpload label="Verso du permis de conduire" />
              <DocumentUpload label="Selfie avec le permis de conduire" />
            </div>
          )}

          {step === "done" && (
            <div className="space-y-4 animate-slide-up text-center">
              <p className="text-lg font-semibold text-green-600">
                Inscription terminée ✅
              </p>
              <p className="text-sm text-gray-600">
                Vos informations ont bien été envoyées.
              </p>
            </div>
          )}

          <p className="text-center text-xs text-gray-500 min-h-[1.5rem]">
            {status}
          </p>

          {/* IMPORTANT: pour reCAPTCHA Firebase */}
          <div id="recaptcha-container" />
        </div>
      </div>

      {/* Footer Button */}
      <div className="p-4 bg-white border-t">
        <Button
          onClick={handleNext}
          className="w-full h-14 text-lg font-semibold bg-[#3B82F6] hover:bg-blue-600 text-white rounded-xl"
        >
          {step === "phone"
            ? "Recevoir mon code"
            : step === "otp"
            ? "Vérifier le code"
            : step === "personal"
            ? "Continuer"
            : step === "documents"
            ? "Terminer"
            : "Terminé"}
        </Button>
      </div>
    </div>
  )
}
function DocumentUpload({ label }: { label: string }) {
  const [fileName, setFileName] = React.useState<string>("")

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFileName(file.name)
      console.log(`✅ Fichier sélectionné pour ${label}:`, file)
    }
  }

  const fileInputId = label.replace(/\s+/g, "-").toLowerCase()

  return (
    <div className="space-y-2">
      <Label className="text-sm">{label}</Label>
      <div className="flex gap-2 items-center">
        {label.includes("Numéro") ? (
          <Input
            placeholder="Entrer le numéro"
            className="flex-1"
          />
        ) : (
          <>
            <input
              id={fileInputId}
              type="file"
              accept="image/*,.pdf"
              className="hidden"
              onChange={handleFileChange}
            />
            <Button
              variant="outline"
              size="lg"
              className="px-6 bg-transparent"
              onClick={() =>
                document.getElementById(fileInputId)?.click()
              }
            >
              {fileName ? "Changer" : "Ajouter"}
            </Button>
            {fileName && (
              <span className="text-sm text-gray-600 truncate max-w-[150px]">
                {fileName}
              </span>
            )}
          </>
        )}
      </div>
    </div>
  )
}
