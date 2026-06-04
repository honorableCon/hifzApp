import { PageFrame, PageHero } from "../components/app-shell";
import { Panel, SectionTitle } from "../components/cards";

const controls = [
  "Temps maximum : 30 min / jour",
  "Communauté : cercles approuvés uniquement",
  "Audio : récitateurs validés",
  "Rapport : chaque vendredi",
];

export default function ParentPage() {
  return (
    <PageFrame>
      <main className="pb-24 lg:pb-10">
        <PageHero
          eyebrow="Mode enfant"
          title="Un cadre simple pour les enfants et rassurant pour les parents."
          description="Interface simplifiée, mascotte, permissions, rapports et protection des données mineures."
        />

        <section className="mx-auto grid max-w-7xl gap-6 px-5 pb-20 lg:grid-cols-[1fr_1fr] lg:px-8">
          <Panel>
            <SectionTitle
              kicker="Enfant"
              title="Session guidée"
              description="Un parcours visuel court pour encourager la régularité."
            />
            <div className="rounded-[2rem] bg-amber-100 p-6 text-center">
              <div className="mx-auto flex size-24 items-center justify-center rounded-full bg-white text-emerald-600 shadow-sm">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="mt-5 text-3xl font-black text-amber-950">
                Sami a révisé 12 minutes
              </h2>
              <p className="mt-3 text-sm font-bold text-amber-900/75">
                Mascotte calme, consignes courtes, badges non compétitifs.
              </p>
            </div>
          </Panel>

          <Panel>
            <SectionTitle
              kicker="Contrôle parental"
              title="Règles actives"
              description="Préfiguration du module Parent + RGPD enfants."
            />
            <div className="space-y-3">
              {controls.map((control) => (
                <p
                  key={control}
                  className="rounded-3xl border border-emerald-950/10 bg-white p-4 text-sm font-black"
                >
                  {control}
                </p>
              ))}
            </div>
          </Panel>
        </section>
      </main>
    </PageFrame>
  );
}
