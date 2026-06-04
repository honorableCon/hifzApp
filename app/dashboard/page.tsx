import Link from "next/link";
import { redirect } from "next/navigation";
import { PageFrame, PageHero } from "../components/app-shell";
import { MetricCard, Panel, SectionTitle } from "../components/cards";
import { getDashboardData } from "../actions/dashboard";
import { getDailySession } from "../actions/session";
import { weeklyHeatmap } from "../data";
import { auth } from "@/auth";
import { AiDashboardMotivation } from "../components/ai-dashboard-motivation";

export default async function DashboardPage() {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) return null;

  const data = await getDashboardData();
  const dailySession = await getDailySession();

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
    { label: "Série en cours", value: `${data.metrics?.streak ?? 0} j`, trend: "flame", helper: "Mémorisation ou révision." },
    { label: "Temps aujourd'hui", value: `${data.metrics?.minutesToday ?? 0} min`, trend: `Objectif: ${data.profile.dailyMinutes}`, helper: "Sur la base du PMP." },
    { label: "Versets maîtrisés", value: (data.metrics?.versesMastered ?? 0).toString(), trend: "trophy", helper: "Status MASTERED atteint." },
    { label: "Rétention", value: `${data.metrics?.retentionRate ?? 0}%`, trend: "chart", helper: "Force globale du profil." },
  ];

  return (
    <PageFrame session={session}>
      <main className="pb-24 lg:pb-10"> {/* Extra padding for mobile bottom bar */}
        <PageHero
          eyebrow="Dashboard"
          title={`Salam, ${session?.user?.name || "Apprenant"}`}
          description="Votre vue d'ensemble sur votre progression de mémorisation."
        />

        <section className="mx-auto max-w-7xl px-5 lg:px-8 pb-14">
          {/* AI MOTIVATION WIDGET */}
          <AiDashboardMotivation userName={session?.user?.name || "Apprenant"} streak={data.metrics?.streak ?? 0} />

          {/* DAILY SESSION CALL TO ACTION - LE COEUR DE L'APP */}
          <div className="mb-10 rounded-[2.5rem] bg-emerald-900 p-8 text-center shadow-xl shadow-emerald-950/20 md:p-12 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')" }}></div>
            
            <div className="relative z-10">
              <h2 className="text-2xl md:text-4xl font-black text-amber-200 mb-4">
                Prêt pour aujourd'hui ?
              </h2>
              <p className="text-emerald-50 max-w-xl mx-auto mb-8 text-lg">
                Votre plan est généré. Vous avez <strong>{dailySession.reviews?.length || 0} révisions</strong> en attente et <strong>{dailySession.newVerses?.length || 0} nouveaux versets</strong> à apprendre.
              </p>
              
              <Link 
                href="/session"
                className="inline-flex items-center gap-3 rounded-full bg-amber-200 px-8 py-4 text-lg font-black text-emerald-950 transition hover:bg-white hover:-translate-y-1 hover:shadow-xl"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Commencer ma session
              </Link>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4 mb-10">
            {metrics.map((metric) => (
              <MetricCard key={metric.label} metric={metric} />
            ))}
          </div>

          {/* AI GENERATED PLAN MILESTONES */}
          {data.profile.learningPlans && data.profile.learningPlans.length > 0 && (
            <div className="rounded-[2.5rem] border border-emerald-950/10 bg-white/75 p-8 shadow-xl shadow-emerald-950/5">
              <h3 className="text-xl font-black text-emerald-950 mb-6 flex items-center gap-2">
                <svg className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Votre Plan IA (PMP)
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-100">
                  <p className="text-sm font-bold text-emerald-900/60 mb-2">Objectif 30 Jours</p>
                  <p className="font-medium text-emerald-950">{data.profile.learningPlans[0].milestone30}</p>
                </div>
                <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-100">
                  <p className="text-sm font-bold text-emerald-900/60 mb-2">Objectif 90 Jours</p>
                  <p className="font-medium text-emerald-950">{data.profile.learningPlans[0].milestone90}</p>
                </div>
                <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-100">
                  <p className="text-sm font-bold text-emerald-900/60 mb-2">Objectif 6 Mois</p>
                  <p className="font-medium text-emerald-950">{data.profile.learningPlans[0].milestone180}</p>
                </div>
              </div>
              <p className="mt-6 text-sm text-center text-emerald-900/60">
                Rythme recommandé par l'Ustadh IA : <strong>{data.profile.learningPlans[0].versesPerDay} versets / jour</strong> via la méthode <strong>{data.profile.learningPlans[0].recommendedMethods[0]}</strong>.
              </p>
            </div>
          )}
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
