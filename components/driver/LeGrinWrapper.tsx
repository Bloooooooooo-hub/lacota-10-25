// components/LeGrinWrapper.tsx
"use client"

import dynamic from "next/dynamic"

// Importation du composant Leaflet uniquement côté client
const LeGrin = dynamic(() => import("./active-ride"), {
  ssr: false, // désactive le rendu serveur
})

export default LeGrin
