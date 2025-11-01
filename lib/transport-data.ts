export interface TransportLine {
  id: string
  name: string
  price: number
  route: string
  stops: string[]
}

export const transportLines: TransportLine[] = [
  {
    id: "ligne1",
    name: "Ligne 1",
    price: 1000,
    route:
      "Bingerville Nouvelle Gare → Nouveau Goudron → Cité Sir → CHU Angré → Carrefour prière → SICOMEX → Stade Angré → Carrefour bluetooth → SHELL 7e tranche → Carrefour Cascade",
    stops: [
      "Bingerville Nouvelle Gare",
      "Nouveau Goudron",
      "Cité Sir",
      "CHU Angré",
      "Carrefour prière",
      "SICOMEX",
      "Stade Angré",
      "Carrefour bluetooth",
      "SHELL 7e tranche",
      "Carrefour Cascade",
    ],
  },
  {
    id: "ligne2",
    name: "Ligne 2",
    price: 1000,
    route:
      "Bingerville Nouvelle Gare → Freeworld Hôtel → Carrefour AB Center → Bon prix Faya → Rond point ancien camp → Rond point Mel Théodore → Rond point Notre Dame de la Tendresse → Saint Jean → Carrefour La Vie",
    stops: [
      "Bingerville Nouvelle Gare",
      "Freeworld Hôtel",
      "Carrefour AB Center",
      "Bon prix Faya",
      "Rond point ancien camp",
      "Rond point Mel Théodore",
      "Rond point Notre Dame de la Tendresse",
      "Saint Jean",
      "Carrefour La Vie",
    ],
  },
  {
    id: "ligne3",
    name: "Ligne 3",
    price: 600,
    route:
      "Bingerville Nouvelle Gare → Nouveau Goudron → Faya → Carrefour ferronnerie → MACI Canada → Feu Pharmacie du bonheur → Chez Samer → Station Ola Palmeraie",
    stops: [
      "Bingerville Nouvelle Gare",
      "Nouveau Goudron",
      "Faya",
      "Carrefour ferronnerie",
      "MACI Canada",
      "Feu Pharmacie du bonheur",
      "Chez Samer",
      "Station Ola Palmeraie",
    ],
  },
  {
    id: "ligne4",
    name: "Ligne 4",
    price: 700,
    route:
      "Station Ola Palmeraie → Chez Samer Palmeraie → Carrefour Guiraud → Quick Market → Rosiers Programme 2 → Pharmacie Val de Grâce → CGK → Carrefour prière → SICOMEX → Stade Angré → Carrefour Bluetooth → Station SHELL 7e tranche → Carrefour Cascade",
    stops: [
      "Station Ola Palmeraie",
      "Chez Samer Palmeraie",
      "Carrefour Guiraud",
      "Quick Market",
      "Rosiers Programme 2",
      "Pharmacie Val de Grâce",
      "CGK",
      "Carrefour prière",
      "SICOMEX",
      "Stade Angré",
      "Carrefour Bluetooth",
      "Station SHELL 7e tranche",
      "Carrefour Cascade",
    ],
  },
  {
    id: "ligne5",
    name: "Ligne 5",
    price: 1000,
    route:
      "Rond point Rosiers Programme 3 → Rond point 35e → Rond point Ado → Sacré coeur → Pharmacie Notre Dame de l'Incarnation → Carrefour Commissariat → 9 Kilos → Cap Nord → Riviera 2 → École de police → École de gendarmerie → Cité des Arts → RTI → Saint Jean",
    stops: [
      "Rond point Rosiers Programme 3",
      "Rond point 35e",
      "Rond point Ado",
      "Sacré coeur",
      "Pharmacie Notre Dame de l'Incarnation",
      "Carrefour Commissariat",
      "9 Kilos",
      "Cap Nord",
      "Riviera 2",
      "École de police",
      "École de gendarmerie",
      "Cité des Arts",
      "RTI",
      "Saint Jean",
    ],
  },
  {
    id: "ligne6",
    name: "Ligne 6",
    price: 1000,
    route:
      "Angré Carrefour Cabri → Angré Fin Goudron → Pharmacie des Allées → Terminus 81/82 → Pétro Ivoire → 22ème arrondissement → Carrefour Opéra → Las Palmas → Carrefour Mobile → ENA → Carrefour La Vie → RTI → Saint Jean",
    stops: [
      "Angré Carrefour Cabri",
      "Angré Fin Goudron",
      "Pharmacie des Allées",
      "Terminus 81/82",
      "Pétro Ivoire",
      "22ème arrondissement",
      "Carrefour Opéra",
      "Las Palmas",
      "Carrefour Mobile",
      "ENA",
      "Carrefour La Vie",
      "RTI",
      "Saint Jean",
    ],
  },
  {
    id: "ligne7",
    name: "Ligne 7",
    price: 700,
    route:
      "Angré Carrefour Cabri → Angré Fin goudron → Angré Chateau → Lycée Angré → Groupement 4000 D → SNEDAI Angré → Terminus 81/82 → Carrefour Bluetooth → Shell 7e Tranche → Carrefour Cascade",
    stops: [
      "Angré Carrefour Cabri",
      "Angré Fin goudron",
      "Angré Chateau",
      "Lycée Angré",
      "Groupement 4000 D",
      "SNEDAI Angré",
      "Terminus 81/82",
      "Carrefour Bluetooth",
      "Shell 7e Tranche",
      "Carrefour Cascade",
    ],
  },
  {
    id: "ligne8",
    name: "Ligne 8",
    price: 1000,
    route:
      "Angré Carrefour Cabri → Angré Fin goudron → Angré Chateau → Lycée Angré → Groupement 4000 D → SNEDAI Angré → Terminus 81/82 → Carrefour Bluetooth → Shell 7e Tranche → Carrefour Cascade → 30ème arrondissement → Pharmacie St Bernard → Doraville → Pharmacie St Ange → André Malraux",
    stops: [
      "Angré Carrefour Cabri",
      "Angré Fin goudron",
      "Angré Chateau",
      "Lycée Angré",
      "Groupement 4000 D",
      "SNEDAI Angré",
      "Terminus 81/82",
      "Carrefour Bluetooth",
      "Shell 7e Tranche",
      "Carrefour Cascade",
      "30ème arrondissement",
      "Pharmacie St Bernard",
      "Doraville",
      "Pharmacie St Ange",
      "André Malraux",
    ],
  },
]
