"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function InfosDriver() {
  // -----------------------------
  // 1️⃣ INFOS PERSONNELLES
  // -----------------------------
  const [infos, setInfos] = useState({
    nom: "",
    prenoms: "",
    birth_date: "",
    profession: "",
    cni_number: "",
    cni_recto: "",
    cni_verso: "",
    permis_number: "",
    permis_recto: "",
    permis_verso: "",
    selfie: "",
  })

  const handleChange = (e: any) => {
    const { name, value, files } = e.target
    if (files) {
      const file = files[0]
      const preview = URL.createObjectURL(file)
      setInfos({ ...infos, [name]: preview })
    } else {
      setInfos({ ...infos, [name]: value })
    }
  }

  const handleSaveInfos = () => {
    console.log("✅ Infos perso :", infos)
    alert("Informations personnelles enregistrées ✅")
  }

  // -----------------------------
  // 2️⃣ VEHICULES
  // -----------------------------
  const [vehicule, setVehicule] = useState({
    marque: "",
    matricule: "",
    carte_grise_recto: "",
    carte_grise_verso: "",
    annee: "",
    certificat_visite: "",
    date_expiration_visite: "",
    assurance: "",
    date_fin_assurance: "",
    photo_avant: "",
    photo_arriere: "",
  })

  const handleVehiculeChange = (e: any) => {
    const { name, value, files } = e.target
    if (files) {
      const file = files[0]
      const preview = URL.createObjectURL(file)
      setVehicule({ ...vehicule, [name]: preview })
    } else {
      setVehicule({ ...vehicule, [name]: value })
    }
  }

  const handleSaveVehicule = () => {
    console.log("🚗 Véhicule :", vehicule)
    alert("Véhicule enregistré ✅")
  }

  // -----------------------------
  // 3️⃣ HORAIRES
  // -----------------------------
  const [horaires, setHoraires] = useState({
    aller_debut: "",
    aller_fin: "",
    retour_debut: "",
    retour_fin: "",
  })

  const handleHoraireChange = (e: any) => {
    const { name, value } = e.target
    setHoraires({ ...horaires, [name]: value })
  }

  const handleSaveHoraires = () => {
    console.log("🕒 Horaires :", horaires)
    alert("Horaires enregistrés ✅")
  }

  // -----------------------------
  // 4️⃣ HISTORIQUE & PASSAGERS
  // -----------------------------
  const historiques = [
    { date: "Lun 15 Sept", heure: "06:00 - 07:30", depart: "Imprimerie Nouvelle Gare", destination: "LA COTA", prix: "1000 fr" },
    { date: "Mar 16 Sept", heure: "06:00 - 07:30", depart: "Imprimerie Nouvelle Gare", destination: "LA COTA", prix: "1000 fr" },
  ]

  const passagers = [
    "Diomandé Noura",
    "Emmanuel Ake",
    "Sandra Kouakou"
  ]

  return (
    <div className="p-6 space-y-10 overflow-y-auto bg-[#fffaf3] min-h-screen">
      {/* SECTION 1 - INFOS PERSONNELLES */}
      <section className="space-y-4">
        <h3 className="text-2xl font-bold text-gray-800">Je suis :</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input placeholder="Nom" name="nom" value={infos.nom} onChange={handleChange} />
          <Input placeholder="Prénoms" name="prenoms" value={infos.prenoms} onChange={handleChange} />
          <Input type="date" name="birth_date" value={infos.birth_date} onChange={handleChange} />
          <Input placeholder="Profession" name="profession" value={infos.profession} onChange={handleChange} />
          <Input placeholder="Numéro de CNI" name="cni_number" value={infos.cni_number} onChange={handleChange} />
          <Input placeholder="Numéro de permis de conduire" name="permis_number" value={infos.permis_number} onChange={handleChange} />
        </div>

        {/* Uploads */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label>Photo CNI Recto</Label>
            <Input type="file" name="cni_recto" accept="image/*" onChange={handleChange} />
          </div>
          <div>
            <Label>Photo CNI Verso</Label>
            <Input type="file" name="cni_verso" accept="image/*" onChange={handleChange} />
          </div>
          <div>
            <Label>Selfie avec permis</Label>
            <Input type="file" name="selfie" accept="image/*" onChange={handleChange} />
          </div>
        </div>

        <Button onClick={handleSaveInfos} className="bg-emerald-600 text-white">Enregistrer</Button>
      </section>

      {/* SECTION 2 - VEHICULES */}
      <section className="space-y-4">
        <h3 className="text-2xl font-bold text-gray-800">Mes véhicules</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input placeholder="Marque" name="marque" value={vehicule.marque} onChange={handleVehiculeChange} />
          <Input placeholder="Matricule" name="matricule" value={vehicule.matricule} onChange={handleVehiculeChange} />
          <Input placeholder="Année" name="annee" value={vehicule.annee} onChange={handleVehiculeChange} />
          <Input placeholder="Certificat de visite technique" name="certificat_visite" value={vehicule.certificat_visite} onChange={handleVehiculeChange} />
          <Input type="date" name="date_expiration_visite" value={vehicule.date_expiration_visite} onChange={handleVehiculeChange} />
          <Input placeholder="Assurance" name="assurance" value={vehicule.assurance} onChange={handleVehiculeChange} />
          <Input type="date" name="date_fin_assurance" value={vehicule.date_fin_assurance} onChange={handleVehiculeChange} />
        </div>

        {/* Uploads */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label>Photo avant</Label>
            <Input type="file" name="photo_avant" accept="image/*" onChange={handleVehiculeChange} />
          </div>
          <div>
            <Label>Photo arrière</Label>
            <Input type="file" name="photo_arriere" accept="image/*" onChange={handleVehiculeChange} />
          </div>
        </div>

        <Button onClick={handleSaveVehicule} className="bg-blue-600 text-white">Ajouter un véhicule</Button>
      </section>

      {/* SECTION 3 - HORAIRES */}
      <section className="space-y-4">
        <h3 className="text-2xl font-bold text-gray-800">Mes horaires</h3>
        <p className="text-gray-600 text-sm">Je me rends presque tous les jours à destination.</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Input type="time" name="aller_debut" value={horaires.aller_debut} onChange={handleHoraireChange} />
          <Input type="time" name="aller_fin" value={horaires.aller_fin} onChange={handleHoraireChange} />
          <Input type="time" name="retour_debut" value={horaires.retour_debut} onChange={handleHoraireChange} />
          <Input type="time" name="retour_fin" value={horaires.retour_fin} onChange={handleHoraireChange} />
        </div>
        <Button onClick={handleSaveHoraires} className="bg-emerald-500 text-white">Enregistrer</Button>
      </section>

      {/* SECTION 4 - HISTORIQUE DES COMMANDES */}
      <section className="space-y-4">
        <h3 className="text-2xl font-bold text-gray-800">Historique des commandes</h3>
        <div className="space-y-3">
          {historiques.map((h, i) => (
            <div key={i} className="border rounded-lg p-3 bg-white">
              <div className="flex justify-between text-sm">
                <span className="font-semibold">{h.date} {h.heure}</span>
                <span className="text-emerald-600 font-bold">{h.prix}</span>
              </div>
              <p className="text-gray-500">{h.depart} → {h.destination}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 5 - PASSAGERS */}
      <section className="space-y-4">
        <h3 className="text-2xl font-bold text-gray-800">Passagers récents</h3>
        <div className="space-y-2">
          {passagers.map((p, i) => (
            <div key={i} className="bg-white border rounded-lg p-3 flex justify-between items-center">
              <span>{p}</span>
              <span className="text-gray-400">👤</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
