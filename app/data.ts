export type NavItem = {
  label: string;
  href: string;
};

export type Method = {
  name: string;
  arabicName: string;
  description: string;
  bestFor: string;
};

export const navigation: NavItem[] = [
  { label: "Accueil", href: "/" },
  { label: "Dashboard", href: "/dashboard" },
  { label: "Mémoriser", href: "/memorize" },
  { label: "Réviser", href: "/review" },
  { label: "Écouter", href: "/listen" },
  { label: "Mushaf", href: "/quran" },
  { label: "Progression", href: "/progress" },
  { label: "Parent", href: "/parent" },
];

export const methods: Method[] = [
  {
    name: "Tikrar",
    arabicName: "تكرار",
    description: "Répétition guidée du verset avec compteur et checkpoints.",
    bestFor: "Ancrer un nouveau passage",
  },
  {
    name: "SRS",
    arabicName: "مراجعة",
    description: "File quotidienne basée sur la confiance mémoire.",
    bestFor: "Ne pas oublier",
  },
  {
    name: "Mosaïque",
    arabicName: "تقسيم",
    description: "Découpage du verset en segments progressifs.",
    bestFor: "Versets longs",
  },
  {
    name: "Samaa",
    arabicName: "سماع",
    description: "Écoute répétée avec vitesse et boucle contrôlées.",
    bestFor: "Apprenants auditifs",
  },
  {
    name: "Kitaba",
    arabicName: "كتابة",
    description: "Dictée, écriture et correction visuelle.",
    bestFor: "Fixer les détails",
  },
  {
    name: "Miroir",
    arabicName: "عكس",
    description: "Révision du dernier verset vers le premier.",
    bestFor: "Solidifier les fins",
  },
];

export const weeklyHeatmap = [
  ["Lun", 32],
  ["Mar", 18],
  ["Mer", 41],
  ["Jeu", 24],
  ["Ven", 36],
  ["Sam", 16],
  ["Dim", 29],
] as const;

export const roadmap = [
  "P0 · Prototype UI et parcours MVP",
  "P1 · Auth + profils + contrôle parental",
  "P2 · Moteur de plan personnalisé",
  "P3 · SRS + analytics rétention",
  "P4 · Audio offline + PWA",
];
