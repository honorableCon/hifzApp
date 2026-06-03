import { PageFrame, PageHero } from "../components/app-shell";
import { Panel, SectionTitle } from "../components/cards";

const reciters = ["Mishary Alafasy", "Abdul Basit", "Husary", "Minshawi"];

export default function ListenPage() {
  return (
    <PageFrame>
      <main>
        <PageHero
          eyebrow="Audio"
          title="Écouter, boucler, ralentir, mémoriser."
          description="Interface audio prévue pour récitateurs multiples, vitesse variable, boucle de verset et cache offline."
        />

        <section className="mx-auto grid max-w-7xl gap-6 px-5 pb-20 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
          <Panel>
            <SectionTitle
              kicker="Lecteur"
              title="Al-Mulk 67:1–3"
              description="Mock UI du lecteur; le branchement réel pourra utiliser R2/S3 et le cache PWA."
            />
            <div className="rounded-[2rem] bg-emerald-950 p-6 text-emerald-50">
              <div className="flex items-center justify-between gap-4">
                <button
                  className="grid size-16 place-items-center rounded-full bg-amber-300 text-2xl text-emerald-950"
                  type="button"
                  aria-label="Lire"
                >
                  ▶
                </button>
                <div className="flex-1">
                  <div className="h-3 rounded-full bg-emerald-50/10">
                    <div className="h-full w-1/2 rounded-full bg-amber-300" />
                  </div>
                  <div className="mt-3 flex justify-between text-xs font-bold text-emerald-50/60">
                    <span>01:24</span>
                    <span>02:48</span>
                  </div>
                </div>
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {["0.75×", "1.0×", "Boucle verset"].map((control) => (
                  <button
                    key={control}
                    className="rounded-full bg-emerald-50/10 px-4 py-3 text-sm font-black text-emerald-50 transition hover:bg-emerald-50 hover:text-emerald-950"
                    type="button"
                  >
                    {control}
                  </button>
                ))}
              </div>
            </div>
          </Panel>

          <Panel>
            <SectionTitle
              kicker="Récitateurs"
              title="Préférences"
              description="Le choix est sauvegardé dans le profil utilisateur."
            />
            <div className="space-y-3">
              {reciters.map((reciter, index) => (
                <div
                  key={reciter}
                  className="flex items-center justify-between rounded-3xl border border-emerald-950/10 bg-white p-4"
                >
                  <span className="font-bold">{reciter}</span>
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-800">
                    {index === 0 ? "Actif" : "Disponible"}
                  </span>
                </div>
              ))}
            </div>
          </Panel>
        </section>
      </main>
    </PageFrame>
  );
}
