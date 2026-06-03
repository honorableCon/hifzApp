import { PageFrame, PageHero } from "../components/app-shell";
import { Panel, SectionTitle } from "../components/cards";

const circles = [
  "Famille · objectifs partagés",
  "Classe · suivi enseignant",
  "Hafiz · révision intensive",
];

export default function CommunityPage() {
  return (
    <PageFrame>
      <main>
        <PageHero
          eyebrow="Community"
          title="Encourager sans exposer inutilement."
          description="La communauté reste volontaire, modérée et compatible avec la protection des enfants."
        />

        <section className="mx-auto grid max-w-7xl gap-6 px-5 pb-20 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <Panel>
            <SectionTitle
              kicker="Cercles"
              title="Groupes privés"
              description="Pour familles, classes et programmes de Hifz."
            />
            <div className="space-y-3">
              {circles.map((circle) => (
                <div
                  key={circle}
                  className="rounded-3xl border border-emerald-950/10 bg-white p-5 font-black"
                >
                  {circle}
                </div>
              ))}
            </div>
          </Panel>

          <Panel>
            <SectionTitle
              kicker="Défis"
              title="Objectifs collectifs"
              description="Défis configurables, sans classement public obligatoire."
            />
            <div className="rounded-[2rem] bg-emerald-950 p-6 text-emerald-50">
              <p className="text-sm font-bold text-emerald-50/65">
                Défi du mois
              </p>
              <h2 className="mt-3 text-3xl font-black">
                30 versets révisés avec constance
              </h2>
              <div className="mt-6 h-3 rounded-full bg-emerald-50/10">
                <div className="h-full w-3/4 rounded-full bg-amber-300" />
              </div>
              <p className="mt-4 text-sm font-bold text-emerald-50/70">
                Progression du cercle : 74%
              </p>
            </div>
          </Panel>
        </section>
      </main>
    </PageFrame>
  );
}
