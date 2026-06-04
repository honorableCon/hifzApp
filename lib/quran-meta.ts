export type SurahMeta = {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
};

// Récupère les métadonnées des 114 sourates (très léger, parfait pour un index)
export async function getAllSurahsMeta(): Promise<SurahMeta[]> {
  const res = await fetch("https://api.alquran.cloud/v1/surah", {
    next: { revalidate: 86400 * 30 }, // Cache pour 30 jours (ces données ne changent jamais)
  });
  
  if (!res.ok) {
    throw new Error("Failed to fetch surahs meta");
  }

  const json = await res.json();
  return json.data;
}

export const JUZ_COUNT = 30;
