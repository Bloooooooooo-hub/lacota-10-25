"use client"

import { useState } from "react"
import PassengerSignup from "@/components/passenger/passenger-signup"
import PassengerLogin from "@/components/passenger/passenger-login"

export default function PassengerAuthPage() {
  const [mode, setMode] = useState<"login" | "signup">("login")

  return (
    <div className="min-h-screen bg-[#fffaf3] flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-6 space-y-6">
        {mode === "login" ? (
          <PassengerLogin
            onComplete={(data) => console.log("Connexion réussie :", data)}
            onBack={() => setMode("signup")}
          />
        ) : (
          <PassengerSignup
            onComplete={(data) => console.log("Inscription réussie :", data)}
            onBack={() => setMode("login")}
          />
        )}

        {/* --- Choix du mode --- */}
        <div className="text-center text-sm text-gray-600 mt-6">
          {mode === "login" ? (
            <>
              Pas encore de compte ?{" "}
              <button
                onClick={() => setMode("signup")}
                className="text-emerald-600 font-semibold hover:underline"
              >
                Créer un compte
              </button>
            </>
          ) : (
            <>
              Déjà inscrit ?{" "}
              <button
                onClick={() => setMode("login")}
                className="text-emerald-600 font-semibold hover:underline"
              >
                Se connecter
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
