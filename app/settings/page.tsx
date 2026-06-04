import { PageFrame, PageHero } from "../components/app-shell";
import { Panel, SectionTitle } from "../components/cards";
import { db } from "@/lib/db";
import { auth } from "@/auth";
import { SettingsForm } from "./client-form";

export default async function SettingsPage() {
  const session = await auth();

  if (!session?.user?.id) {
    return (
      <PageFrame>
        <main className="grid min-h-[60vh] place-items-center">
          <p>Veuillez vous connecter.</p>
        </main>
      </PageFrame>
    );
  }

  const profile = await db.profile.findFirst({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <PageFrame>
      <main>
        <PageHero
          eyebrow="Settings"
          title="Préférences et profil"
          description="Ajustez vos paramètres de mémorisation, votre méthode préférée et votre objectif."
        />

        <section className="mx-auto max-w-7xl px-5 pb-20 lg:px-8">
          <Panel>
            <SectionTitle
              kicker="Plan de Mémorisation"
              title="Paramètres de votre PMP"
              description="Modifiez ces valeurs pour ajuster la charge de travail calculée par l'algorithme."
            />
            
            {profile ? (
              <div className="mt-8 rounded-3xl border border-emerald-950/10 bg-[#fbfaf3] p-8">
                <SettingsForm initialData={profile} />
              </div>
            ) : (
              <p className="text-emerald-900 mt-4">Aucun profil configuré. Veuillez passer par l'Onboarding.</p>
            )}
          </Panel>

          <div className="mt-8">
            <Panel>
              <SectionTitle
                kicker="Système"
                title="Informations techniques"
                description="Configuration actuelle de votre compte."
              />
              <div className="grid gap-4 md:grid-cols-2 mt-6">
                {[
                  ["Compte", session.user.email],
                  ["Thème", "Clair avec support sombre système"],
                  ["Stockage", "PostgreSQL (Neon)"],
                  ["Authentification", "NextAuth v5 + Bcrypt"],
                ].map(([label, value]) => (
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
          </div>
        </section>
      </main>
    </PageFrame>
  );
}
