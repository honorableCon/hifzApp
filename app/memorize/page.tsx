import { PageFrame, PageHero } from "../components/app-shell";
import { Panel, SectionTitle } from "../components/cards";
import { methods, sampleVerses } from "../data";

export default function MemorizePage() {
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
                  Sourate 67
                </p>
                <h2 className="mt-3 text-3xl font-black">Al-Mulk · verset 1</h2>
              </div>
              <span className="rounded-full bg-emerald-950 px-5 py-3 text-sm font-black text-emerald-50">
                Tikrar 8 / 12
              </span>
            </div>

            <div className="mt-8 rounded-[2rem] bg-[#fbfaf3] p-6">
              <p className="font-arabic text-right text-4xl leading-[2] md:text-5xl">
                {sampleVerses[0].arabic}
              </p>
              <div className="mt-6 grid gap-3 md:grid-cols-3">
                <span className="rounded-2xl bg-emerald-100 px-4 py-3 text-center text-sm font-black text-emerald-900">
                  Segment 1 maîtrisé
                </span>
                <span className="rounded-2xl bg-amber-100 px-4 py-3 text-center text-sm font-black text-amber-900">
                  Segment 2 en cours
                </span>
                <span className="rounded-2xl bg-stone-100 px-4 py-3 text-center text-sm font-black text-stone-600">
                  Segment 3 masqué
                </span>
              </div>
            </div>

            <div className="mt-6 grid gap-3 md:grid-cols-4">
              {["Répéter", "Masquer 30%", "Écouter", "Valider"].map(
                (action) => (
                  <button
                    key={action}
                    className="rounded-full border border-emerald-950/10 bg-white px-5 py-3 text-sm font-black text-emerald-950 transition hover:bg-emerald-950 hover:text-white"
                    type="button"
                  >
                    {action}
                  </button>
                ),
              )}
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
                Commence par écouter 3 fois le verset complet avant Tikrar.
              </p>
              <p className="rounded-3xl bg-amber-100 p-4 font-bold text-amber-900">
                {sampleVerses[0].tajwidHint}
              </p>
              <p className="rounded-3xl bg-emerald-50 p-4">
                Termine par une récitation sans regarder, puis note ta mémoire.
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
