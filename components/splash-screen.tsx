"use client"
import React from "react"


import { useEffect, useState } from "react"

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url(/images/bridge-bg.jpg)",
          filter: "brightness(0.3) contrast(1.2)",
        }}
      />

      {/* Dark overlay for guaranteed contrast */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-orange-400/20 rounded-full blur-xl animate-pulse-soft" />
      <div className="absolute bottom-32 right-16 w-24 h-24 bg-pink-400/20 rounded-full blur-lg animate-pulse-soft" />

      {/* Main content */}
      <div
        className={`relative z-10 text-center px-8 transition-all duration-1000 ${
          isVisible ? "animate-fade-in-up" : "opacity-0"
        }`}
      >
        <div className="mb-8">
          <h1
            className="text-6xl md:text-8xl font-black text-white mb-4 tracking-tight"
            style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}
          >
            LA COTA
          </h1>
          <div className="w-32 h-1 bg-white mx-auto mb-6 rounded-full shadow-lg" />
          <p
            className="text-xl md:text-2xl text-white font-light tracking-wide"
            style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}
          >
            PRÉSENTATION
          </p>
        </div>

        <div className="mt-12">
          <p
            className="text-lg text-white max-w-md mx-auto leading-relaxed text-balance"
            style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}
          >
            UNIVERSITÉ OU BOULOT, ON Y VA BEAUCOUP PLUS CHAP
          </p>
        </div>

        {/* Loading indicator */}
        <div className="mt-16 flex justify-center">
          <div className="flex space-x-2">
            {[0, 150, 300].map((delay, index) => (
              <div
                key={index}
                className="w-3 h-3 bg-white rounded-full animate-bounce shadow-lg"
                style={{ animationDelay: `${delay}ms` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
