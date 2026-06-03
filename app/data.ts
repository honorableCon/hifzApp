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

export type Metric = {
  label: string;
  value: string;
  helper: string;
};

export type ReviewCard = {
  surah: string;
  range: string;
  due: string;
  strength: "Fragile" | "Stable" | "Solide";
};

export type Verse = {
  number: number;
  arabic: string;
  translation: string;
  tajwidHint: string;
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

export const profileAnswers = [
  "Âge : 13–17 ans",
  "Temps : 25 min / jour",
  "Niveau : début Juz 30",
  "Objectif : Sourate Al-Mulk",
  "Réciteur : Mishary Alafasy",
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

export const dashboardMetrics: Metric[] = [
  { label: "Streak", value: "18 jours", helper: "Régularité active" },
  { label: "Rétention", value: "86%", helper: "Moyenne SRS" },
  { label: "Hasanat", value: "12 480", helper: "Points gagnés" },
  { label: "Objectif", value: "74%", helper: "Al-Mulk en cours" },
];

export const reviewQueue: ReviewCard[] = [
  {
    surah: "Al-Mulk",
    range: "67:1–7",
    due: "Aujourd’hui",
    strength: "Stable",
  },
  {
    surah: "An-Naba",
    range: "78:1–10",
    due: "Aujourd’hui",
    strength: "Fragile",
  },
  {
    surah: "Al-Fajr",
    range: "89:15–22",
    due: "Demain",
    strength: "Solide",
  },
];

export const sampleVerses: Verse[] = [
  {
    number: 1,
    arabic: "تَبَارَكَ الَّذِي بِيَدِهِ الْمُلْكُ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ",
    translation:
      "Béni soit Celui dans la main de qui est la royauté, et Il est Omnipotent.",
    tajwidHint: "Travaille le madd sur قَدِيرٌ et la fluidité du début.",
  },
  {
    number: 2,
    arabic:
      "الَّذِي خَلَقَ الْمَوْتَ وَالْحَيَاةَ لِيَبْلُوَكُمْ أَيُّكُمْ أَحْسَنُ عَمَلًا",
    translation:
      "Celui qui a créé la mort et la vie afin de vous éprouver.",
    tajwidHint: "Marque la liaison entre الْمَوْتَ وَالْحَيَاةَ.",
  },
  {
    number: 3,
    arabic:
      "الَّذِي خَلَقَ سَبْعَ سَمَاوَاتٍ طِبَاقًا مَّا تَرَىٰ فِي خَلْقِ الرَّحْمَٰنِ مِن تَفَاوُتٍ",
    translation:
      "Celui qui a créé sept cieux superposés, sans disproportion.",
    tajwidHint: "Isole le segment سَبْعَ سَمَاوَاتٍ avant d’enchaîner.",
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

export const badges = [
  "7 jours sans rupture",
  "Premier Juz planifié",
  "Révision parfaite",
  "Mode enfant validé",
];

export const roadmap = [
  "P0 · Prototype UI et parcours MVP",
  "P1 · Auth + profils + contrôle parental",
  "P2 · Moteur de plan personnalisé",
  "P3 · SRS + analytics rétention",
  "P4 · Audio offline + PWA",
];
