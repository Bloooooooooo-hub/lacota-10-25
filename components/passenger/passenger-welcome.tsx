"use client"
import React from "react"


import { Button } from "../ui/button"

interface PassengerWelcomeProps {
  onNavigate: (screen: "signup" | "login") => void
}

export default function PassengerWelcome({ onNavigate }: PassengerWelcomeProps) {
  return (
    <div className="min-h-screen bg-[#fffaf3] flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8">
        {/* Logo */}
        <div className="text-center space-y-6">
          <div className="relative inline-block">
            <div
              className="absolute inset-0 border-2 border-dashed border-gray-300 rounded-full animate-spin-slow"
              style={{ animationDuration: "20s" }}
            />
            <h1 className="relative text-6xl font-black text-gray-900 px-8 py-4" style={{ fontFamily: "cursive" }}>
              La Cota
            </h1>
          </div>
        </div>

        {/* Buttons */}
        <div className="space-y-4">
          <Button
            onClick={() => onNavigate("signup")}
            className="w-full h-14 text-lg font-semibold bg-white text-gray-900 border-2 border-gray-900 hover:bg-gray-900 hover:text-white transition-all"
          >
            Je m'inscris
          </Button>

          <Button
            onClick={() => onNavigate("login")}
            className="w-full h-14 text-lg font-semibold bg-gray-900 text-white hover:bg-gray-800 transition-all"
          >
            J'ai un compte
          </Button>
        </div>

        {/* Footer */}
        <div className="text-center pt-8">
          <p className="text-sm text-gray-600">Transport économique et intelligent</p>
        </div>
      </div>
    </div>
  )
}
