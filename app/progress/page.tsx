import { PageFrame, PageHero } from "../components/app-shell";
import { MetricCard, Panel, SectionTitle } from "../components/cards";
import { badges, dashboardMetrics, weeklyHeatmap } from "../data";

export default function ProgressPage() {
  return (
    <PageFrame>
      <main>
        <PageHero
          eyebrow="Analytics"
          title="Mesurer sans écraser: progression, rétention, régularité."
          description="Rapports destinés à l’apprenant, aux parents et aux enseignants, avec indicateurs lisibles."
        />

        <section className="mx-auto grid max-w-7xl gap-5 px-5 pb-14 lg:grid-cols-4 lg:px-8">
          {dashboardMetrics.map((metric) => (
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
                    style={{ paddingBlock: `${Math.max(12, minutes / 2)}px` }}
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
              {badges.map((badge) => (
                <p
                  key={badge}
                  className="rounded-3xl bg-amber-100 p-4 text-sm font-black text-amber-900"
                >
                  🏅 {badge}
                </p>
              ))}
            </div>
          </Panel>
        </section>
      </main>
    </PageFrame>
  );
}
