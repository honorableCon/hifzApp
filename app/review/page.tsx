import { PageFrame, PageHero } from "../components/app-shell";
import { Panel, SectionTitle } from "../components/cards";
import { reviewQueue } from "../data";

const ratings = ["Difficile", "Hésitant", "Correct", "Parfait"];

export default function ReviewPage() {
  return (
    <PageFrame>
      <main>
        <PageHero
          eyebrow="SRS"
          title="Réviser au bon moment, pas au hasard."
          description="La file quotidienne priorise les cartes fragiles et ajuste la prochaine échéance selon la note mémoire."
        />

        <section className="mx-auto grid max-w-7xl gap-6 px-5 pb-20 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <Panel>
            <SectionTitle
              kicker="File"
              title="Cartes dues"
              description="Prototype des SRS Cards du modèle de données."
            />
            <div className="space-y-4">
              {reviewQueue.map((card) => (
                <article
                  key={`${card.surah}-${card.range}`}
                  className="rounded-3xl border border-emerald-950/10 bg-white p-5"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-black">{card.surah}</h3>
                      <p className="mt-1 font-semibold text-emerald-800">
                        {card.range}
                      </p>
                    </div>
                    <span className="rounded-full bg-amber-100 px-3 py-2 text-xs font-black text-amber-900">
                      {card.strength}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </Panel>

          <Panel>
            <SectionTitle
              kicker="Notation"
              title="Comment était ta récitation ?"
              description="Ces boutons alimenteront l’algorithme SRS et le dashboard rétention."
            />
            <div className="rounded-[2rem] bg-emerald-950 p-6 text-emerald-50">
              <p className="text-sm font-bold text-emerald-50/65">
                Carte active
              </p>
              <h2 className="mt-3 text-3xl font-black">Al-Mulk 67:1–7</h2>
              <p className="mt-4 text-sm leading-6 text-emerald-50/70">
                Récite sans regarder, puis choisis une note. Une note basse
                rapproche la prochaine révision; une note haute l’espace.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-4">
                {ratings.map((rating) => (
                  <button
                    key={rating}
                    className="rounded-full bg-emerald-50 px-4 py-3 text-sm font-black text-emerald-950 transition hover:bg-amber-300"
                    type="button"
                  >
                    {rating}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {[
                ["Prochaine", "3 jours"],
                ["Rétention", "86%"],
                ["Charge", "11 cartes"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-3xl bg-emerald-50 p-5 text-center"
                >
                  <p className="text-sm font-bold text-emerald-950/55">
                    {label}
                  </p>
                  <p className="mt-2 text-2xl font-black">{value}</p>
                </div>
              ))}
            </div>
          </Panel>
        </section>
      </main>
    </PageFrame>
  );
}
