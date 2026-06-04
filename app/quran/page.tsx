import { PageFrame, PageHero } from "../components/app-shell";
import { Panel, SectionTitle } from "../components/cards";
import { db } from "@/lib/db";
import { AddToPlanButton } from "./add-button";
import { AudioButton } from "../components/audio-button";
import Link from "next/link";
import { getAllSurahsMeta, JUZ_COUNT } from "@/lib/quran-meta";
import { QuranIndex } from "./quran-index";
import { FullSurahPlayer } from "./full-surah-player";

export default async function QuranPage(props: {
  searchParams: Promise<{ surah?: string; juz?: string }>;
}) {
  const searchParams = await props.searchParams;
  const currentSurah = searchParams.surah ? parseInt(searchParams.surah) : null;
  const currentJuz = searchParams.juz ? parseInt(searchParams.juz) : null;

  const isIndex = !currentSurah && !currentJuz;

  // Si c'est l'index, on affiche la grille des sourates/juz
  if (isIndex) {
    const surahsMeta = await getAllSurahsMeta();
    return (
      <PageFrame>
        <main className="pb-20">
          <PageHero
            eyebrow="Mushaf"
            title="Le Saint Coran"
            description="Explorez, lisez et ajoutez des passages à votre plan de mémorisation."
          />
          <section className="mx-auto max-w-7xl px-5 lg:px-8 mt-8">
            <QuranIndex surahs={surahsMeta} juzCount={JUZ_COUNT} />
          </section>
        </main>
      </PageFrame>
    );
  }

  // Sinon, on affiche le mode lecture (Reader)
  let verses: any[] = [];
  let title = "";
  let description = "";

  if (currentSurah) {
    verses = await db.verse.findMany({
      where: { surahNumber: currentSurah },
      orderBy: { verseNumber: 'asc' }
    });
    const surahsMeta = await getAllSurahsMeta();
    const meta = surahsMeta.find(s => s.number === currentSurah);
    title = meta ? `${meta.number}. ${meta.englishName}` : `Sourate ${currentSurah}`;
    description = meta ? `${meta.name} • ${meta.numberOfAyahs} versets` : `${verses.length} versets`;
  } else if (currentJuz) {
    verses = await db.verse.findMany({
      where: { juzNumber: currentJuz },
      orderBy: [
        { surahNumber: 'asc' },
        { verseNumber: 'asc' }
      ]
    });
    title = `Juz ${currentJuz}`;
    description = `${verses.length} versets`;
  }

  return (
    <PageFrame>
      <main className="pb-20">
        <PageHero
          eyebrow="Lecture"
          title={title}
          description={description}
        />

        <section className="mx-auto max-w-4xl px-5 lg:px-8 mt-8">
          <div className="mb-6">
            <Link 
              href="/quran" 
              className="inline-flex items-center gap-2 text-emerald-800 font-bold hover:text-emerald-950 transition bg-white/50 px-4 py-2 rounded-full shadow-sm"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Retour à l'index
            </Link>
          </div>

          {/* LECTEUR CONTINU DE LA SOURATE */}
          {verses.length > 0 && (
            <FullSurahPlayer verses={verses} />
          )}

          <Panel>
            <div className="space-y-12">
              {verses.length === 0 ? (
                <p className="text-emerald-900 text-center py-10 font-medium">Les versets sont en cours d'importation dans la base de données... Revenez dans quelques instants.</p>
              ) : (
                verses.map((verse: any) => (
                  <article
                    key={verse.id}
                    className="relative group border-b border-emerald-950/5 pb-12 last:border-0 last:pb-0"
                  >
                    <div className="flex items-start justify-between gap-5 mb-6">
                      <span className="grid size-10 shrink-0 place-items-center rounded-full bg-emerald-100 text-sm font-black text-emerald-950">
                        {verse.verseNumber}
                      </span>
                      <p className="font-arabic text-right text-4xl md:text-5xl leading-[2.2] text-emerald-950" dir="rtl">
                        {verse.arabic}
                      </p>
                    </div>
                    <p className="text-base leading-7 text-emerald-950/70 pl-12">
                      {verse.translation}
                    </p>
                    <div className="mt-5 flex flex-wrap items-center gap-3 pl-12 opacity-50 group-hover:opacity-100 transition-opacity">
                      <AudioButton src={verse.audioUrl} />
                      <AddToPlanButton verseId={verse.id} />
                    </div>
                  </article>
                ))
              )}
            </div>
          </Panel>
        </section>
      </main>
    </PageFrame>
  );
}
