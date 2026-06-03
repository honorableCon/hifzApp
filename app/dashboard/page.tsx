import Link from "next/link";
import { PageFrame, PageHero } from "../components/app-shell";
import { MetricCard, Panel, SectionTitle } from "../components/cards";
import {
  badges,
  dashboardMetrics,
  profileAnswers,
  reviewQueue,
  sampleVerses,
  weeklyHeatmap,
} from "../data";

export default function DashboardPage() {
  return (
    <PageFrame>
      <main>
        <PageHero
          eyebrow="Dashboard"
          title="Un cockpit quotidien pour garder le Hifz vivant."
          description="Vue synthétique du plan personnalisé, de la file SRS, des streaks, des badges et du prochain passage à mémoriser."
        />

        <section className="mx-auto grid max-w-7xl gap-5 px-5 pb-14 lg:grid-cols-4 lg:px-8">
          {dashboardMetrics.map((metric) => (
            <MetricCard key={metric.label} metric={metric} />
          ))}
        </section>

        <section className="mx-auto grid max-w-7xl gap-6 px-5 pb-16 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
          <Panel>
            <SectionTitle
              kicker="Aujourd’hui"
              title="Plan de mémorisation"
              description="Objectif réaliste : 25 minutes, un nouveau verset, deux révisions courtes."
            />
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-3xl bg-emerald-950 p-5 text-emerald-50">
                <p className="text-sm font-bold text-emerald-50/65">Nouveau</p>
                <p className="mt-3 text-2xl font-black">Al-Mulk 67:8</p>
                <Link
                  href="/memorize"
                  className="mt-5 inline-flex rounded-full bg-amber-300 px-4 py-2 text-sm font-black text-emerald-950"
                >
                  Mémoriser
                </Link>
              </div>
              {reviewQueue.slice(0, 2).map((card) => (
                <div
                  key={`${card.surah}-${card.range}`}
                  className="rounded-3xl border border-emerald-950/10 bg-emerald-50 p-5"
                >
                  <p className="text-sm font-bold text-emerald-950/55">
                    Révision · {card.due}
                  </p>
                  <p className="mt-3 text-2xl font-black">{card.surah}</p>
                  <p className="mt-1 font-semibold text-emerald-800">
                    {card.range}
                  </p>
                </div>
              ))}
            </div>
          </Panel>

          <Panel>
            <SectionTitle
              kicker="PMP"
              title="Profil actif"
              description="Ce bloc préfigure les données Profile + Memorization."
            />
            <div className="space-y-3">
              {profileAnswers.map((answer) => (
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
                    style={{ height: `${minutes * 3}px` }}
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
              description="Affichage RTL avec traduction et indication Tajwid."
            />
            <p className="font-arabic text-right text-4xl leading-[1.9]">
              {sampleVerses[1].arabic}
            </p>
            <p className="mt-5 text-base leading-7 text-emerald-950/70">
              {sampleVerses[1].translation}
            </p>
            <p className="mt-4 rounded-2xl bg-amber-100 px-4 py-3 text-sm font-bold text-amber-800">
              {sampleVerses[1].tajwidHint}
            </p>
          </Panel>
        </section>

        <section className="mx-auto max-w-7xl px-5 pb-20 lg:px-8">
          <Panel>
            <SectionTitle
              kicker="Badges"
              title="Motivation douce"
              description="Récompenses pensées comme encouragements, pas comme pression."
            />
            <div className="grid gap-3 md:grid-cols-4">
              {badges.map((badge) => (
                <div
                  key={badge}
                  className="rounded-3xl bg-amber-100 p-5 text-sm font-black text-amber-900"
                >
                  🏅 {badge}
                </div>
              ))}
            </div>
          </Panel>
        </section>
      </main>
    </PageFrame>
  );
}
