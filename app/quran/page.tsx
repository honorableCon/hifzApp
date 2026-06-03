import { PageFrame, PageHero } from "../components/app-shell";
import { Panel, SectionTitle } from "../components/cards";
import { sampleVerses } from "../data";

export default function QuranPage() {
  return (
    <PageFrame>
      <main>
        <PageHero
          eyebrow="Mushaf"
          title="Lecture arabe RTL avec repères pédagogiques."
          description="Un écran pour rechercher, lire, écouter et envoyer un passage vers mémorisation ou révision."
        />

        <section className="mx-auto max-w-7xl px-5 pb-20 lg:px-8">
          <Panel>
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <SectionTitle
                kicker="Sourate"
                title="Al-Mulk"
                description="Extrait de démonstration pour le prototype."
              />
              <label className="sr-only" htmlFor="quran-search">
                Rechercher un verset
              </label>
              <input
                id="quran-search"
                className="rounded-full border border-emerald-950/10 bg-white px-5 py-4 text-sm font-semibold outline-none transition focus:border-emerald-800"
                placeholder="Rechercher sourate, juz, mot-clé…"
              />
            </div>

            <div className="space-y-5">
              {sampleVerses.map((verse) => (
                <article
                  key={verse.number}
                  className="rounded-[2rem] border border-emerald-950/10 bg-[#fbfaf3] p-6"
                >
                  <div className="flex items-start justify-between gap-5">
                    <span className="grid size-10 shrink-0 place-items-center rounded-full bg-emerald-950 text-sm font-black text-emerald-50">
                      {verse.number}
                    </span>
                    <p className="font-arabic text-right text-4xl leading-[2] text-emerald-950">
                      {verse.arabic}
                    </p>
                  </div>
                  <p className="mt-5 text-base leading-7 text-emerald-950/70">
                    {verse.translation}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-3">
                    {["Écouter", "Mémoriser", "Ajouter SRS"].map((action) => (
                      <button
                        key={action}
                        className="rounded-full bg-white px-4 py-2 text-sm font-black text-emerald-950 transition hover:bg-emerald-950 hover:text-white"
                        type="button"
                      >
                        {action}
                      </button>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </Panel>
        </section>
      </main>
    </PageFrame>
  );
}
