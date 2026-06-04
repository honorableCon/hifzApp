import { PageFrame, PageHero } from "../components/app-shell";
import { RegisterForm } from "./client-form";

export default function RegisterPage() {
  return (
    <PageFrame>
      <main className="pb-20">
        <PageHero
          eyebrow="Bienvenue"
          title="Créer un compte"
          description="Rejoignez HifzApp pour commencer votre mémorisation du Coran de manière structurée."
        />

        <section className="mx-auto mt-8 max-w-xl px-5 lg:px-8">
          <div className="rounded-[2.5rem] border border-emerald-950/10 bg-emerald-50/50 p-8 lg:p-12">
            <RegisterForm />
          </div>
        </section>
      </main>
    </PageFrame>
  );
}
