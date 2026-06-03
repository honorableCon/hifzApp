import Link from "next/link";
import { FeatureCard, Panel, SectionTitle } from "./components/cards";
import { PageFrame } from "./components/app-shell";
import { methods, profileAnswers, roadmap, sampleVerses } from "./data";

const features = [
  {
    icon: "🧭",
    title: "Plan personnalisé",
    description:
      "Un PMP calcule versets/jour, méthode dominante, réciteur et jalons 30/90/180 jours.",
  },
  {
    icon: "🧠",
    title: "SRS intelligent",
    description:
      "Chaque passage revient au bon moment selon la note mémoire : fragile, stable ou solide.",
  },
  {
    icon: "🎧",
    title: "Audio guidé",
    description:
      "Boucles, vitesse variable et récitateurs multiples pour les profils auditifs.",
  },
  {
    icon: "🏆",
    title: "Gamification saine",
    description:
      "Hasanat, badges, streaks et défis encouragent sans transformer le Hifz en course.",
  },
  {
    icon: "🧒",
    title: "Mode enfant",
    description:
      "Interface simplifiée, mascotte douce et contrôle parental pour un cadre sécurisé.",
  },
  {
    icon: "🌙",
    title: "Mushaf accessible",
    description:
      "RTL arabe, traduction, indices Tajwid et expérience lisible en clair ou sombre.",
  },
];

export default function Home() {
  return (
    <PageFrame>
      <main>
        <section className="relative overflow-hidden px-5 py-16 lg:px-8 lg:py-24">
          <div className="absolute left-1/2 top-0 -z-10 size-[44rem] -translate-x-1/2 rounded-full bg-amber-200/35 blur-3xl" />
          <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.32em] text-amber-700">
                HifzApp · MVP 2025–2026
              </p>
              <h1 className="mt-5 text-5xl font-black tracking-tight text-emerald-950 md:text-7xl">
                Mémoriser le Coran avec méthode, douceur et régularité.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-emerald-950/70">
                Une plateforme de Hifz qui combine plan personnalisé, révision
                espacée, audio, gamification et suivi familial dans une
                expérience accessible.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/dashboard"
                  className="rounded-full bg-emerald-900 px-7 py-4 text-center text-sm font-black text-white shadow-2xl shadow-emerald-950/20 transition hover:-translate-y-0.5 hover:bg-emerald-800"
                >
                  Voir le dashboard
                </Link>
                <Link
                  href="/memorize"
                  className="rounded-full border border-emerald-950/15 bg-white/70 px-7 py-4 text-center text-sm font-black text-emerald-950 transition hover:-translate-y-0.5 hover:bg-white"
                >
                  Tester une session
                </Link>
              </div>
            </div>

            <Panel className="relative overflow-hidden">
              <div className="absolute right-6 top-6 rounded-full bg-amber-100 px-4 py-2 text-xs font-black text-amber-800">
                Session active
              </div>
              <p className="font-arabic mt-10 text-right text-4xl leading-[1.9] text-emerald-950 md:text-5xl">
                {sampleVerses[0].arabic}
              </p>
              <div className="mt-6 rounded-3xl bg-emerald-950 p-5 text-emerald-50">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-emerald-50/70">
                    Tikrar · verset 1
                  </span>
                  <span className="rounded-full bg-amber-300 px-3 py-1 text-xs font-black text-emerald-950">
                    8 / 12
                  </span>
                </div>
                <div className="mt-4 h-3 rounded-full bg-emerald-50/10">
                  <div className="h-full w-2/3 rounded-full bg-amber-300" />
                </div>
                <p className="mt-4 text-sm leading-6 text-emerald-50/75">
                  Indice Tajwid : {sampleVerses[0].tajwidHint}
                </p>
              </div>
            </Panel>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
          <SectionTitle
            kicker="Fonctionnalités"
            title="Le CDC transformé en parcours produit"
            description="Cette première version pose les écrans et la logique UX nécessaires avant branchement PostgreSQL, Redis, Prisma et NextAuth."
          />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-6 px-5 py-14 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <Panel>
            <SectionTitle
              kicker="Onboarding"
              title="Profil → PMP"
              description="Le plan personnalisé part des contraintes réelles de l’apprenant."
            />
            <div className="space-y-3">
              {profileAnswers.map((answer) => (
                <div
                  key={answer}
                  className="rounded-2xl border border-emerald-950/10 bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-950/75"
                >
                  {answer}
                </div>
              ))}
            </div>
          </Panel>
          <Panel>
            <SectionTitle
              kicker="Méthodes"
              title="Sept méthodes pédagogiques"
              description="Le moteur hybride choisira la bonne méthode selon le passage et le profil."
            />
            <div className="grid gap-3 sm:grid-cols-2">
              {methods.map((method) => (
                <article
                  key={method.name}
                  className="rounded-3xl border border-emerald-950/10 bg-white p-5"
                >
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="font-black">{method.name}</h3>
                    <span className="font-arabic text-xl text-amber-700">
                      {method.arabicName}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-emerald-950/65">
                    {method.description}
                  </p>
                </article>
              ))}
            </div>
          </Panel>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
          <Panel className="bg-emerald-950 text-emerald-50">
            <SectionTitle
              kicker="Roadmap"
              title="Architecture cible"
              description="Le prototype est prêt à recevoir Auth, Prisma/PostgreSQL, Redis pour la file SRS et stockage audio R2/S3."
              inverted
            />
            <div className="grid gap-3 md:grid-cols-5">
              {roadmap.map((item) => (
                <div
                  key={item}
                  className="rounded-3xl border border-emerald-50/10 bg-emerald-50/10 p-5 text-sm font-bold text-emerald-50"
                >
                  {item}
                </div>
              ))}
            </div>
          </Panel>
        </section>
      </main>
    </PageFrame>
  );
}
