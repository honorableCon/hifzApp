import { PageFrame, PageHero } from "../components/app-shell";
import { getDailySession } from "../actions/session";
import { auth } from "@/auth";
import Link from "next/link";
import { AudioButton } from "../components/audio-button";
import { AiVerseTips } from "../components/ai-verse-tips";
import { MosaiqueText } from "../memorize/mosaique-text";
import { SrsRatingButtons } from "../review/srs-buttons";
import { MarkLearnedButton } from "./mark-learned-button";

export default async function SessionPage() {
  const sessionUser = await auth();
  if (!sessionUser?.user?.id) return null;

  const session = await getDailySession();

  if ("error" in session) {
    return (
      <PageFrame>
        <main className="grid min-h-[60vh] place-items-center">
          <p>Erreur: {session.error}</p>
        </main>
      </PageFrame>
    );
  }

  const hasReviews = session.reviews && session.reviews.length > 0;
  const hasNew = session.newVerses && session.newVerses.length > 0;

  if (!hasReviews && !hasNew) {
    return (
      <PageFrame>
        <main className="pb-20">
          <PageHero
            eyebrow="Session terminée"
            title="Félicitations ! 🎉"
            description="Vous avez terminé votre plan pour aujourd'hui."
          />
          <div className="mx-auto max-w-xl text-center mt-10">
            <Link href="/dashboard" className="inline-block rounded-full bg-emerald-900 px-8 py-4 font-bold text-white transition hover:bg-emerald-800">
              Retour au Dashboard
            </Link>
          </div>
        </main>
      </PageFrame>
    );
  }

  return (
    <PageFrame>
      <main className="pb-24 lg:pb-10">
        <PageHero
          eyebrow="Mode Autopilote"
          title="Session du Jour"
          description={`Étape 1: Révisions (${session.reviews?.length}) • Étape 2: Apprentissage (${session.newVerses?.length})`}
        />

        <section className="mx-auto max-w-4xl px-5 lg:px-8 mt-8 space-y-10">
          {/* Section Révisions */}
          {hasReviews && (
            <div>
              <h2 className="text-xl font-black text-emerald-950 mb-4 flex items-center gap-2">
                <span className="grid size-8 place-items-center rounded-full bg-amber-200 text-sm">1</span>
                Révisions en attente
              </h2>
              <div className="space-y-4">
                {session.reviews.map((card: any) => (
                  <article key={card.id} className="rounded-[2rem] border border-emerald-950/10 bg-[#fbfaf3] p-6 shadow-sm opacity-95 hover:opacity-100 transition">
                    <div className="flex items-start justify-between gap-5">
                      <span className="grid size-10 shrink-0 place-items-center rounded-full bg-emerald-950 text-sm font-black text-emerald-50">
                        {card.verse.surahNumber}:{card.verse.verseNumber}
                      </span>
                      <span className="rounded-full bg-amber-100 px-3 py-2 text-xs font-black text-amber-900">
                        {card.strength}
                      </span>
                    </div>

                    <div className="mt-6 border-t border-emerald-50/10 pt-4">
                      <details className="text-sm group">
                        <summary className="cursor-pointer font-bold text-emerald-900/60 hover:text-emerald-900 list-none flex items-center gap-2">
                          <svg className="w-4 h-4 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                          Voir le verset (Indice)
                        </summary>
                        <div className="mt-4 pt-4 border-t border-emerald-900/10">
                          <p className="font-arabic text-right text-3xl leading-[2] text-emerald-950" dir="rtl">
                            {card.verse.arabic}
                          </p>
                          <p className="mt-2 text-sm text-emerald-950/70">{card.verse.translation}</p>
                        </div>
                      </details>
                    </div>

                    <div className="mt-5 border-t border-emerald-900/10 pt-5">
                      <p className="text-xs text-center font-bold text-emerald-950/50 mb-3 uppercase tracking-wider">Notez votre récitation</p>
                      <SrsRatingButtons cardId={card.id} />
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}

          {/* Section Nouveaux versets */}
          {hasNew && (
            <div>
              <h2 className="text-xl font-black text-emerald-950 mb-4 flex items-center gap-2">
                <span className="grid size-8 place-items-center rounded-full bg-emerald-200 text-sm">2</span>
                Nouveaux Versets
              </h2>
              <div className="space-y-4">
                {session.newVerses.map((verse: any) => (
                  <article key={verse.id} className="rounded-[2rem] border border-emerald-950/10 bg-white p-6 shadow-md border-l-4 border-l-emerald-500">
                    <div className="flex items-start justify-between gap-5">
                      <span className="grid size-10 shrink-0 place-items-center rounded-full bg-emerald-500 text-sm font-black text-white">
                        {verse.surahNumber}:{verse.verseNumber}
                      </span>
                    </div>

                    <div className="mt-6 mb-4">
                      <p className="text-xs font-bold text-emerald-950/50 mb-3 uppercase tracking-wider">Mémorisation Mosaïque</p>
                      <div className="rounded-[2rem] bg-[#fbfaf3] p-6 border border-emerald-900/10">
                        <MosaiqueText text={verse.arabic} />
                      </div>
                    </div>

                    <p className="mt-5 text-base leading-7 text-emerald-950/70">
                      {verse.translation}
                    </p>

                    {/* AI ASSISTANT FOR THIS VERSE */}
                    <AiVerseTips arabic={verse.arabic} translation={verse.translation} />

                    <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-emerald-900/10 pt-5">
                      <AudioButton src={verse.audioUrl} allowControls={true} />
                      <MarkLearnedButton verseId={verse.id} />
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}
        </section>
      </main>
    </PageFrame>
  );
}
