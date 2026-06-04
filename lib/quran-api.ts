export type QuranCloudVerse = {
  number: number;
  text: string;
  numberInSurah: number;
  juz: number;
  manzil: number;
  page: number;
  ruku: number;
  hizbQuarter: number;
  sajda: boolean | object;
  audio?: string; // S'il y a une édition audio
};

export type QuranCloudSurah = {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  revelationType: string;
  numberOfAyahs: number;
  ayahs: QuranCloudVerse[];
};

export type QuranCloudResponse<T> = {
  code: number;
  status: string;
  data: T;
};

/**
 * Récupère une sourate avec le texte arabe, la traduction française et l'audio.
 * @param surahNumber Le numéro de la sourate (1-114)
 * @param translationEdition L'édition de traduction (ex: 'fr.hameedullah')
 * @param audioEdition L'édition audio (ex: 'ar.alafasy')
 */
export async function getSurahData(
  surahNumber: number,
  translationEdition = "fr.hamidullah",
  audioEdition = "ar.alafasy"
) {
  // On demande 3 éditions en même temps : Arabe Uthmani, Traduction, Audio
  const editions = `quran-uthmani,${translationEdition},${audioEdition}`;
  const url = `https://api.alquran.cloud/v1/surah/${surahNumber}/editions/${editions}`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Erreur lors de la récupération de la sourate ${surahNumber}`);
  }

  const json: QuranCloudResponse<QuranCloudSurah[]> = await res.json();
  const [arabicData, translationData, audioData] = json.data;

  // On fusionne les données pour avoir un format propre
  const verses = arabicData.ayahs.map((ayah, index) => {
    return {
      surahNumber: arabicData.number,
      verseNumber: ayah.numberInSurah,
      juzNumber: ayah.juz,
      arabic: ayah.text,
      translation: translationData.ayahs[index].text,
      audioUrl: audioData.ayahs[index].audio,
    };
  });

  return {
    surah: {
      number: arabicData.number,
      name: arabicData.name,
      englishName: arabicData.englishName,
      englishNameTranslation: arabicData.englishNameTranslation,
    },
    verses,
  };
}
