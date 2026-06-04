import { PageFrame, PageHero } from "../components/app-shell";
import { Panel, SectionTitle } from "../components/cards";
import { db } from "@/lib/db";
import { AddToPlanButton } from "./add-button";
import { AudioButton } from "../components/audio-button";
import Link from "next/link";

export default async function QuranPage(props: {
  searchParams: Promise<{ surah?: string }>;
}) {
  const searchParams = await props.searchParams;
  const currentSurah = searchParams.surah ? parseInt(searchParams.surah) : 67; // Al-Mulk par défaut

  // Récupérer les versets de la sourate sélectionnée
  const verses = await db.verse.findMany({
    where: { surahNumber: currentSurah },
    orderBy: { verseNumber: 'asc' }
  });

  // Liste des sourates disponibles (celles en BDD)
  const availableSurahs = await db.verse.findMany({
    select: { surahNumber: true },
    distinct: ['surahNumber'],
    orderBy: { surahNumber: 'asc' }
  });

  return (
    <PageFrame>
      <main>
        <PageHero
          eyebrow="Mushaf"
          title="Lecture arabe RTL avec repères pédagogiques."
          description="Un écran pour rechercher, lire, écouter et envoyer un passage vers mémorisation ou révision."
        />

        <section className="mx-auto max-w-7xl px-5 pb-20 lg:px-8 flex flex-col md:flex-row gap-6">
          {/* Sidebar de navigation */}
          <div className="md:w-64 shrink-0">
            <Panel className="sticky top-24 p-4">
              <h3 className="font-black text-emerald-950 mb-4">Sourates disponibles</h3>
              <div className="flex flex-col gap-2">
                {availableSurahs.map(({ surahNumber }: any) => (
                  <Link
                    key={surahNumber}
                    href={`/quran?surah=${surahNumber}`}
                    className={`px-4 py-2 rounded-xl text-sm font-bold transition ${
                      currentSurah === surahNumber 
                        ? "bg-emerald-900 text-white" 
                        : "bg-white text-emerald-900 hover:bg-emerald-50 border border-emerald-950/10"
                    }`}
                  >
                    Sourate {surahNumber}
                  </Link>
                ))}
              </div>
            </Panel>
          </div>

          <div className="flex-1">
            <Panel>
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
                <SectionTitle
                  kicker="Lecture"
                  title={`Sourate ${currentSurah}`}
                  description={`${verses.length} versets`}
                />
              </div>

              <div className="space-y-5">
                {verses.length === 0 ? (
                  <p className="text-emerald-900">Aucun verset disponible pour cette sourate dans la base de données.</p>
                ) : (
                  verses.map((verse: any) => (
                    <article
                      key={verse.id}
                      className="rounded-[2rem] border border-emerald-950/10 bg-[#fbfaf3] p-6"
                    >
                      <div className="flex items-start justify-between gap-5">
                        <span className="grid size-10 shrink-0 place-items-center rounded-full bg-emerald-950 text-sm font-black text-emerald-50">
                          {verse.verseNumber}
                        </span>
                        <p className="font-arabic text-right text-4xl leading-[2] text-emerald-950">
                          {verse.arabic}
                        </p>
                      </div>
                      <p className="mt-5 text-base leading-7 text-emerald-950/70">
                        {verse.translation}
                      </p>
                      <div className="mt-5 flex flex-wrap gap-3">
                        <AudioButton src={verse.audioUrl} />
                        <AddToPlanButton verseId={verse.id} />
                      </div>
                    </article>
                  ))
                )}
              </div>
            </Panel>
          </div>
        </section>
      </main>
    </PageFrame>
  );
}
