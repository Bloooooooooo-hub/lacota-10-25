"use client"

import { useState, useEffect } from "react"
import { Button } from "../ui/button"

interface WelcomeScreenProps {
  onNavigate: (screen: "signup" | "login") => void
}

export default function WelcomeScreen({ onNavigate }: WelcomeScreenProps) {
  const [showSplash, setShowSplash] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false)
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  if (showSplash) {
    return (
      <div className="min-h-screen bg-[#fffaf3] flex items-center justify-center relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-gradient-to-br from-pink-200 to-peach-200 opacity-60 blur-2xl" />
        <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-gradient-to-br from-pink-200 to-peach-200 opacity-60 blur-2xl" />

        {/* Logo */}
        <div className="text-center animate-fade-in z-10">
          <div className="relative inline-block">
            <svg width="200" height="200" viewBox="0 0 200 200" className="animate-pulse-dot">
              <circle cx="100" cy="100" r="80" fill="none" stroke="#ffc0cb" strokeWidth="2" strokeDasharray="5,5" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <h1 className="text-6xl font-bold" style={{ fontFamily: "cursive" }}>
                La Cota
              </h1>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#fffaf3] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-gradient-to-br from-pink-200 to-peach-200 opacity-60 blur-2xl" />
      <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-gradient-to-br from-pink-200 to-peach-200 opacity-60 blur-2xl" />

      <div className="w-full max-w-md space-y-8 animate-slide-up z-10">
        {/* Logo */}
        <div className="text-center mb-12">
          <div className="relative inline-block mb-4">
            <svg width="150" height="150" viewBox="0 0 150 150">
              <circle cx="75" cy="75" r="60" fill="none" stroke="#ffc0cb" strokeWidth="2" strokeDasharray="5,5" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <h1 className="text-5xl font-bold" style={{ fontFamily: "cursive" }}>
                La Cota
              </h1>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="space-y-4">
          <Button
            onClick={() => onNavigate("signup")}
            className="w-full h-14 text-lg font-semibold bg-white text-gray-900 border-2 border-gray-900 hover:bg-gray-50 rounded-xl"
          >
            Je m'inscris
          </Button>

          <Button
            onClick={() => onNavigate("login")}
            className="w-full h-14 text-lg font-semibold bg-white text-gray-900 border-2 border-gray-900 hover:bg-gray-50 rounded-xl"
          >
            J'ai un compte
          </Button>
        </div>
      </div>
    </div>
  )
}
