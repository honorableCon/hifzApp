import { PageFrame, PageHero } from "../components/app-shell";
import { Panel, SectionTitle } from "../components/cards";
import { db } from "@/lib/db";
import { auth } from "@/auth";
import Link from "next/link";
import { SrsRatingButtons } from "./srs-buttons";

export default async function ReviewPage() {
  const session = await auth();
  
  if (!session?.user?.id) {
    return (
      <PageFrame>
        <main className="grid min-h-[60vh] place-items-center">
          <p>Veuillez vous connecter.</p>
        </main>
      </PageFrame>
    );
  }

  const profile = await db.profile.findFirst({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  if (!profile) return null;

  const reviewQueue = await db.srsCard.findMany({
    where: {
      profileId: profile.id,
      dueAt: { lte: new Date() },
    },
    include: { verse: true },
    orderBy: { dueAt: "asc" },
  });

  const activeCard = reviewQueue[0];

  return (
    <PageFrame>
      <main>
        <PageHero
          eyebrow="SRS"
          title="Réviser au bon moment, pas au hasard."
          description="La file quotidienne priorise les cartes fragiles et ajuste la prochaine échéance selon la note mémoire."
        />

        <section className="mx-auto grid max-w-7xl gap-6 px-5 pb-20 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <Panel>
            <SectionTitle
              kicker="File"
              title="Cartes dues"
              description={`Il vous reste ${reviewQueue.length} révision(s) aujourd'hui.`}
            />
            <div className="space-y-4">
              {reviewQueue.length === 0 && (
                <div className="rounded-3xl border border-emerald-950/10 bg-emerald-50 p-5 text-center text-emerald-900 font-bold">
                  Aucune révision pour le moment ! 🎉
                </div>
              )}
              {reviewQueue.map((card: any) => (
                <article
                  key={card.id}
                  className={`rounded-3xl border ${activeCard?.id === card.id ? 'border-amber-500 ring-2 ring-amber-200' : 'border-emerald-950/10'} bg-white p-5`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-black">Sourate {card.verse.surahNumber}</h3>
                      <p className="mt-1 font-semibold text-emerald-800">
                        Verset {card.verse.verseNumber}
                      </p>
                    </div>
                    <span className="rounded-full bg-amber-100 px-3 py-2 text-xs font-black text-amber-900">
                      {card.strength}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </Panel>

          <Panel>
            <SectionTitle
              kicker="Notation"
              title="Comment était ta récitation ?"
              description="Ces boutons alimentent l’algorithme SRS et le dashboard rétention."
            />
            {activeCard ? (
              <div className="rounded-[2rem] bg-emerald-950 p-6 text-emerald-50">
                <p className="text-sm font-bold text-emerald-50/65">
                  Carte active
                </p>
                <h2 className="mt-3 text-3xl font-black">Sourate {activeCard.verse.surahNumber} : Verset {activeCard.verse.verseNumber}</h2>
                <p className="mt-4 text-sm leading-6 text-emerald-50/70">
                  Récite sans regarder, puis choisis une note. Une note basse
                  rapproche la prochaine révision; une note haute l’espace.
                </p>
                
                <SrsRatingButtons cardId={activeCard.id} />
                
                <div className="mt-6 border-t border-emerald-50/10 pt-4">
                  <details className="text-sm">
                    <summary className="cursor-pointer text-emerald-50/60 hover:text-emerald-50">Voir le verset (Triche)</summary>
                    <p className="mt-4 font-arabic text-right text-2xl">{activeCard.verse.arabic}</p>
                  </details>
                </div>
              </div>
            ) : (
              <div className="rounded-[2rem] bg-emerald-50 p-6 text-emerald-900 text-center font-bold">
                Vous avez terminé toutes vos révisions. Bon travail !
              </div>
            )}
          </Panel>
        </section>
      </main>
    </PageFrame>
  );
}
