import { PageFrame, PageHero } from "../components/app-shell";
import { Panel, SectionTitle } from "../components/cards";

const settings = [
  ["Langue", "Français · arabe activé"],
  ["Thème", "Clair avec support sombre système"],
  ["Confidentialité", "Données exportables et supprimables"],
  ["Sécurité", "Prévu : NextAuth, rate limiting, OWASP"],
  ["Offline", "Prévu : PWA + cache audio"],
  ["Stockage", "Prévu : PostgreSQL, Redis, R2/S3"],
];

export default function SettingsPage() {
  return (
    <PageFrame>
      <main>
        <PageHero
          eyebrow="Settings"
          title="Préférences, sécurité et architecture cible."
          description="Cette page rend visibles les contraintes techniques du CDC et les options utilisateur attendues."
        />

        <section className="mx-auto max-w-7xl px-5 pb-20 lg:px-8">
          <Panel>
            <SectionTitle
              kicker="Configuration"
              title="Paramètres du prototype"
              description="Les valeurs sont statiques aujourd’hui; elles deviendront persistantes avec Profile et User."
            />
            <div className="grid gap-4 md:grid-cols-2">
              {settings.map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-3xl border border-emerald-950/10 bg-white p-5"
                >
                  <p className="text-sm font-black uppercase tracking-[0.2em] text-amber-700">
                    {label}
                  </p>
                  <p className="mt-3 text-lg font-black text-emerald-950">
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </Panel>
        </section>
      </main>
    </PageFrame>
  );
}
