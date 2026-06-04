import { PageFrame, PageHero } from "../components/app-shell";
import { OnboardingForm } from "./client-form";

export default function OnboardingPage() {
  return (
    <PageFrame>
      <main className="pb-20">
        <PageHero
          eyebrow="Onboarding"
          title="Votre Plan de Mémorisation Personnalisé"
          description="Afin de générer votre PMP (Plan de Mémorisation Personnalisé) et configurer votre SRS, nous avons besoin de quelques informations."
        />

        <section className="mx-auto max-w-7xl px-5 lg:px-8 mt-8">
          <div className="rounded-[2.5rem] bg-emerald-50/50 border border-emerald-950/10 p-8 lg:p-12">
            <OnboardingForm />
          </div>
        </section>
      </main>
    </PageFrame>
  );
}
