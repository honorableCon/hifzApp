import { PageFrame, PageHero } from "../components/app-shell";
import { LoginForm } from "./client-form";

export default function LoginPage() {
  return (
    <PageFrame>
      <main className="pb-20">
        <PageHero
          eyebrow="Connexion"
          title="Bon retour"
          description="Connectez-vous pour retrouver votre Plan de Mémorisation Personnalisé et vos statistiques."
        />

        <section className="mx-auto mt-8 max-w-xl px-5 lg:px-8">
          <div className="rounded-[2.5rem] border border-emerald-950/10 bg-emerald-50/50 p-8 lg:p-12">
            <LoginForm />
          </div>
        </section>
      </main>
    </PageFrame>
  );
}
