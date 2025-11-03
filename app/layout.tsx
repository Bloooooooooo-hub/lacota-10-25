// app/layout.tsx
"use client"

import { useEffect } from "react"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Toaster } from "@/components/ui/toaster"
import "./globals.css"

const geistSans = Geist({ subsets: ["latin"], variable: "--font-geist-sans" })
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Affiche la popup uniquement en préproduction
    if (window.location.hostname.includes("preprod")) {
      const popup = document.createElement("div")
      popup.innerHTML = `
        <div id="preprod-popup"
          class="fixed bottom-4 right-4 bg-yellow-100 border border-yellow-400 text-yellow-800 px-4 py-3 rounded-xl shadow-lg z-50 max-w-sm">
          <strong class="font-bold">⚠️ Environnement de préproduction</strong>
          <p class="text-sm mt-1">Veuillez joindre <b>Junior</b> ou <b>Loic-Emmanuel</b> pour plus d'informations 🫡</p>
          <button id="close-popup" class="absolute top-1 right-2 text-yellow-700 hover:text-yellow-900">✖</button>
        </div>
      `
      document.body.appendChild(popup)
      document.getElementById("close-popup")?.addEventListener("click", () => {
        document.getElementById("preprod-popup")?.remove()
      })
    }
  }, [])

  return (
    <html lang="fr" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="font-sans antialiased bg-white text-gray-900">
        {children}
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}
