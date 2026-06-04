import { PageFrame, PageHero } from "../components/app-shell";
import { MetricCard, Panel, SectionTitle } from "../components/cards";
import { weeklyHeatmap } from "../data";
import { db } from "@/lib/db";
import { auth } from "@/auth";
import Link from "next/link";

export default async function ProgressPage() {
  const session = await auth();
  
  if (!session?.user?.id) {
    return (
      <PageFrame>
        <main className="grid min-h-[60vh] place-items-center">
          <p>Veuillez vous connecter pour voir vos statistiques.</p>
        </main>
      </PageFrame>
    );
  }

  const profile = await db.profile.findFirst({
    where: { userId: session.user.id },
  });

  if (!profile) return null;

  // Calcul des statistiques réelles
  const totalMastered = await db.memorization.count({
    where: { profileId: profile.id, status: "MASTERED" },
  });

  const totalLearning = await db.memorization.count({
    where: { profileId: profile.id, status: "LEARNING" },
  });

  const totalReviewing = await db.memorization.count({
    where: { profileId: profile.id, status: "REVIEWING" },
  });

  const srsCards = await db.srsCard.findMany({
    where: { profileId: profile.id },
  });

  // Calcul basique de la rétention moyenne (EaseFactor moyen converti en %)
  const averageEaseFactor = srsCards.length > 0 
    ? srsCards.reduce((acc: number, card: any) => acc + card.easeFactor, 0) / srsCards.length 
    : 2.5; // Par défaut
  const retentionRate = Math.min(100, Math.round((averageEaseFactor / 2.5) * 85));

  // Récupération des badges de l'utilisateur
  const userBadges = await db.userBadge.findMany({
    where: { userId: session.user.id },
    include: { badge: true },
  });

  const metrics = [
    { label: "Versets Maîtrisés", value: totalMastered.toString(), trend: "trophy", helper: "Mémorisation solide" },
    { label: "En cours d'apprentissage", value: totalLearning.toString(), trend: "book", helper: "Nouvelles mémorisations" },
    { label: "En révision (SRS)", value: totalReviewing.toString(), trend: "refresh", helper: "Entretien de la mémoire" },
    { label: "Rétention globale", value: `${retentionRate}%`, trend: "chart", helper: "Efficacité des révisions" },
  ];

  return (
    <PageFrame>
      <main className="pb-24 lg:pb-10"> {/* Padding for mobile bottom bar */}
        <PageHero
          eyebrow="Analytics"
          title="Mon Suivi & Progression"
          description="Mesurez votre régularité, votre rétention et vos efforts de mémorisation."
        />

        <section className="mx-auto grid max-w-7xl gap-5 px-5 pb-14 lg:grid-cols-4 lg:px-8">
          {metrics.map((metric) => (
            <MetricCard key={metric.label} metric={metric} />
          ))}
        </section>

        <section className="mx-auto grid max-w-7xl gap-6 px-5 pb-20 lg:grid-cols-[1fr_1fr] lg:px-8">
          <Panel>
            <SectionTitle
              kicker="Heatmap"
              title="Activité hebdomadaire"
              description="Base UX pour une heatmap mensuelle complète."
            />
            <div className="grid grid-cols-7 gap-3">
              {weeklyHeatmap.map(([day, minutes]) => (
                <div key={day} className="text-center">
                  <div
                    className="rounded-2xl bg-emerald-800 text-xs font-black text-white"
                    style={{ paddingBlock: `${Math.max(12, Number(minutes) / 2)}px` }}
                  >
                    {minutes}
                  </div>
                  <p className="mt-2 text-xs font-black text-emerald-950/55">
                    {day}
                  </p>
                </div>
              ))}
            </div>
          </Panel>

          <Panel>
            <SectionTitle
              kicker="Badges"
              title="Récompenses débloquées"
              description="Les badges restent alignés avec la régularité réelle."
            />
            <div className="space-y-3">
              {userBadges.length === 0 && (
                <p className="rounded-3xl border border-emerald-950/10 bg-emerald-50 p-4 text-sm font-bold text-emerald-900 text-center">
                  Vous n'avez pas encore de badges. Continuez vos efforts !
                </p>
              )}
              {userBadges.map(({ badge }: any) => (
                <div
                  key={badge.id}
                  className="rounded-3xl bg-amber-100 p-4 flex items-center gap-4"
                >
                  <span className="text-2xl">{badge.icon}</span>
                  <div>
                    <h4 className="text-sm font-black text-amber-900">{badge.name}</h4>
                    <p className="text-xs text-amber-800/70 mt-1">{badge.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </Panel>
        </section>
      </main>
    </PageFrame>
  );
}
