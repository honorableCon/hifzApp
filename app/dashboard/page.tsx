import Link from "next/link";
import { redirect } from "next/navigation";
import { PageFrame, PageHero } from "../components/app-shell";
import { MetricCard, Panel, SectionTitle } from "../components/cards";
import { getDashboardData } from "../actions/dashboard";
import { weeklyHeatmap } from "../data";
import { auth } from "@/auth";

export default async function DashboardPage() {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) return null;

  const data = await getDashboardData();

  if (!data.profile) {
    // Si l'utilisateur n'a pas de profil, on devrait le rediriger vers l'onboarding
    // Pour l'instant on affiche un message, on créera l'onboarding juste après
    return (
      <PageFrame session={session}>
        <main className="grid min-h-[60vh] place-items-center px-5">
          <div className="text-center">
            <h1 className="text-3xl font-black text-emerald-950">Bienvenue sur HifzApp !</h1>
            <p className="mt-4 text-emerald-800">Commençons par configurer votre plan de mémorisation.</p>
            <Link href="/onboarding" className="mt-6 inline-block rounded-full bg-emerald-900 px-6 py-3 font-bold text-white shadow-lg transition hover:bg-emerald-800">
              Créer mon profil
            </Link>
          </div>
        </main>
      </PageFrame>
    );
  }

  const metrics = [
    { label: "Série en cours", value: `${data.metrics?.streak ?? 0} j`, trend: "🔥", helper: "Mémorisation ou révision." },
    { label: "Temps aujourd'hui", value: `${data.metrics?.minutesToday ?? 0} min`, trend: `Objectif: ${data.profile.dailyMinutes}`, helper: "Sur la base du PMP." },
    { label: "Versets maîtrisés", value: (data.metrics?.versesMastered ?? 0).toString(), trend: "🏆", helper: "Status MASTERED atteint." },
    { label: "Rétention", value: `${data.metrics?.retentionRate ?? 0}%`, trend: "📈", helper: "Force globale du profil." },
  ];

  return (
    <PageFrame session={session}>
      <main>
        <PageHero
          eyebrow="Dashboard"
          title={`Salam, ${session?.user?.name || "Apprenant"}`}
          description="Votre vue d'ensemble sur votre progression de mémorisation."
        />

        <section className="mx-auto grid max-w-7xl gap-5 px-5 pb-14 lg:grid-cols-4 lg:px-8">
          {metrics.map((metric) => (
            <MetricCard key={metric.label} metric={metric} />
          ))}
        </section>

        <section className="mx-auto grid max-w-7xl gap-6 px-5 pb-16 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
          <Panel>
            <SectionTitle
              kicker="Aujourd’hui"
              title="Plan de mémorisation"
              description={`Objectif : ${data.profile.dailyMinutes} minutes, ${data.reviews.length} révisions.`}
            />
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-3xl bg-emerald-950 p-5 text-emerald-50">
                <p className="text-sm font-bold text-emerald-50/65">Prochaine tâche</p>
                <p className="mt-3 text-2xl font-black">Mémorisation</p>
                <Link
                  href="/memorize"
                  className="mt-5 inline-flex rounded-full bg-amber-300 px-4 py-2 text-sm font-black text-emerald-950"
                >
                  Ouvrir
                </Link>
              </div>
              {data.reviews.slice(0, 2).map((card: any) => (
                <div
                  key={`${card.id}`}
                  className="rounded-3xl border border-emerald-950/10 bg-emerald-50 p-5"
                >
                  <p className="text-sm font-bold text-emerald-950/55">
                    Révision · Aujourd'hui
                  </p>
                  <p className="mt-3 text-2xl font-black">Sourate {card.verse.surahNumber}</p>
                  <p className="mt-1 font-semibold text-emerald-800">
                    Verset {card.verse.verseNumber} · {card.strength}
                  </p>
                </div>
              ))}
            </div>
          </Panel>

          <Panel>
            <SectionTitle
              kicker="PMP"
              title="Profil actif"
              description="Vos paramètres actuels d'apprentissage."
            />
            <div className="space-y-3">
              {[
                `Profil: ${data.profile.type}`,
                `Objectif: ${data.profile.objective}`,
                `Méthode: ${data.profile.preferredMethod}`,
                `Récitateur: ${data.profile.preferredReciter}`,
              ].map((answer) => (
                <p
                  key={answer}
                  className="rounded-2xl bg-white px-4 py-3 text-sm font-bold text-emerald-950/70"
                >
                  {answer}
                </p>
              ))}
            </div>
          </Panel>
        </section>

        <section className="mx-auto grid max-w-7xl gap-6 px-5 pb-16 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <Panel>
            <SectionTitle
              kicker="Heatmap"
              title="Régularité"
              description="Minutes de Hifz enregistrées cette semaine."
            />
            <div className="flex items-end gap-3">
              {weeklyHeatmap.map(([day, minutes]) => (
                <div key={day} className="flex flex-1 flex-col items-center">
                  <div
                    className="w-full rounded-t-2xl bg-emerald-800"
                    style={{ height: `${Number(minutes) * 3}px` }}
                  />
                  <span className="mt-3 text-xs font-black text-emerald-950/55">
                    {day}
                  </span>
                </div>
              ))}
            </div>
          </Panel>

          <Panel>
            <SectionTitle
              kicker="Passage"
              title="Dernier verset travaillé"
              description="Aperçu du dernier verset que vous avez appris ou révisé."
            />
            {data.lastMemorization ? (
              <>
                <p className="font-arabic text-right text-4xl leading-[1.9]">
                  {data.lastMemorization.verse.arabic}
                </p>
                <p className="mt-5 text-base leading-7 text-emerald-950/70">
                  {data.lastMemorization.verse.translation}
                </p>
                <div className="mt-4 flex gap-2">
                  <span className="rounded-2xl bg-amber-100 px-4 py-3 text-sm font-bold text-amber-800">
                    Sourate {data.lastMemorization.verse.surahNumber}
                  </span>
                  <span className="rounded-2xl bg-emerald-100 px-4 py-3 text-sm font-bold text-emerald-800">
                    Verset {data.lastMemorization.verse.verseNumber}
                  </span>
                </div>
              </>
            ) : (
              <div className="mt-8 text-center text-emerald-900/60 font-bold">
                Aucun verset travaillé pour le moment.
              </div>
            )}
          </Panel>
        </section>

        <section className="mx-auto max-w-7xl px-5 pb-20 lg:px-8">
          <Panel>
            <SectionTitle
              kicker="Badges"
              title="Motivation douce"
              description="Récompenses pensées comme encouragements, pas comme pression."
            />
            <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
              {data.badges.length === 0 && (
                <div className="rounded-3xl border border-emerald-950/10 bg-white p-5 text-sm font-black text-emerald-900/60 col-span-4 text-center">
                  Vous n'avez pas encore de badge. Continuez d'apprendre !
                </div>
              )}
              {data.badges.map((badge: any) => (
                <div
                  key={badge.id}
                  className="rounded-3xl bg-amber-100 p-5 text-sm font-black text-amber-900 flex items-center gap-3"
                >
                  <span className="text-2xl">{badge.icon}</span>
                  <span>{badge.name}</span>
                </div>
              ))}
            </div>
          </Panel>
        </section>
      </main>
    </PageFrame>
  );
}
