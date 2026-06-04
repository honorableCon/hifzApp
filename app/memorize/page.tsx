import { PageFrame, PageHero } from "../components/app-shell";
import { Panel, SectionTitle } from "../components/cards";
import { methods } from "../data";
import { db } from "@/lib/db";
import { auth } from "@/auth";
import Link from "next/link";
import { ValidateMemorizationButton } from "./validate-button";
import { AudioButton } from "../components/audio-button";
import { MosaiqueText } from "./mosaique-text";

export default async function MemorizePage() {
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

  // On récupère le profil actif
  const profile = await db.profile.findFirst({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  if (!profile) {
    return (
      <PageFrame>
        <main className="grid min-h-[60vh] place-items-center text-center">
          <div>
            <p className="text-xl font-bold">Aucun profil de mémorisation.</p>
            <Link href="/onboarding" className="mt-4 inline-block text-emerald-600 underline">Créer mon profil</Link>
          </div>
        </main>
      </PageFrame>
    );
  }

  // On cherche le prochain verset à mémoriser (PLANNED ou LEARNING)
  const currentLearning = await db.memorization.findFirst({
    where: {
      profileId: profile.id,
      status: { in: ["PLANNED", "LEARNING"] },
    },
    include: {
      verse: true,
    },
    orderBy: { createdAt: "asc" },
  });

  if (!currentLearning) {
    return (
      <PageFrame>
        <main className="grid min-h-[60vh] place-items-center text-center px-5">
          <div className="max-w-md">
            <h2 className="text-3xl font-black text-emerald-950">Aucun verset en attente</h2>
            <p className="mt-4 text-emerald-800">Votre file d'apprentissage est vide. Allez dans le Mushaf pour ajouter de nouveaux versets à votre plan.</p>
            <Link href="/quran" className="mt-6 inline-block rounded-full bg-emerald-900 px-6 py-3 font-bold text-white shadow-lg transition hover:bg-emerald-800">
              Ouvrir le Mushaf
            </Link>
          </div>
        </main>
      </PageFrame>
    );
  }

  const { verse } = currentLearning;

  return (
    <PageFrame>
      <main>
        <PageHero
          eyebrow="Mémorisation"
          title="Une session guidée, verset par verset."
          description="Sélection sourate/Juz, masquage progressif, compteur Tikrar, segments Mosaïque et mode plein écran sont représentés dans cette interface."
        />

        <section className="mx-auto grid max-w-7xl gap-6 px-5 pb-16 lg:grid-cols-[1.15fr_0.85fr] lg:px-8">
          <Panel>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.28em] text-amber-700">
                  Sourate {verse.surahNumber}
                </p>
                <h2 className="mt-3 text-3xl font-black">Verset {verse.verseNumber}</h2>
              </div>
              <span className="rounded-full bg-emerald-950 px-5 py-3 text-sm font-black text-emerald-50">
                En cours
              </span>
            </div>

            <div className="mt-8 rounded-[2rem] bg-[#fbfaf3] p-6">
              <MosaiqueText text={verse.arabic} />
              
              <div className="mt-6 border-t border-emerald-950/10 pt-6">
                <p className="text-lg text-emerald-950/80">{verse.translation}</p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <AudioButton src={verse.audioUrl} label="Écouter la récitation" allowControls={true} />
              <ValidateMemorizationButton memorizationId={currentLearning.id} />
            </div>
          </Panel>

          <Panel>
            <SectionTitle
              kicker="Coach"
              title="Conseils de session"
              description="Des micro-consignes pour garder l’effort clair."
            />
            <div className="space-y-4 text-sm leading-6 text-emerald-950/70">
              <p className="rounded-3xl bg-emerald-50 p-4">
                Commence par écouter 3 fois le verset complet avant de le répéter.
              </p>
              {verse.tajwidHints && (
                <p className="rounded-3xl bg-amber-100 p-4 font-bold text-amber-900">
                  {verse.tajwidHints}
                </p>
              )}
              <p className="rounded-3xl bg-emerald-50 p-4">
                Termine par une récitation sans regarder, puis valide pour l'envoyer dans tes révisions (SRS).
              </p>
            </div>
          </Panel>
        </section>

        <section className="mx-auto max-w-7xl px-5 pb-20 lg:px-8">
          <Panel>
            <SectionTitle
              kicker="Méthodes disponibles"
              title="Choisis l’approche adaptée au passage"
              description="La version backend pourra automatiser ce choix selon l’historique SRS."
            />
            <div className="grid gap-4 md:grid-cols-3">
              {methods.map((method) => (
                <article
                  key={method.name}
                  className="rounded-3xl border border-emerald-950/10 bg-white p-5"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-black">{method.name}</h3>
                    <span className="font-arabic text-xl text-amber-700">
                      {method.arabicName}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-emerald-950/65">
                    {method.description}
                  </p>
                  <p className="mt-4 text-xs font-black uppercase tracking-[0.18em] text-emerald-700">
                    {method.bestFor}
                  </p>
                </article>
              ))}
            </div>
          </Panel>
        </section>
      </main>
    </PageFrame>
  );
}
