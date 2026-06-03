import Link from "next/link";
import { PageFrame } from "./components/app-shell";

export default function NotFound() {
  return (
    <PageFrame>
      <main className="mx-auto grid min-h-[70vh] max-w-3xl place-items-center px-5 py-20 text-center">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.32em] text-amber-700">
            404
          </p>
          <h1 className="mt-4 text-5xl font-black tracking-tight text-emerald-950">
            Cette page n’existe pas encore.
          </h1>
          <p className="mt-5 text-lg leading-8 text-emerald-950/70">
            Le parcours Hifz continue ailleurs. Retourne au dashboard pour
            reprendre ta session ou ta file SRS.
          </p>
          <Link
            href="/dashboard"
            className="mt-8 inline-flex rounded-full bg-emerald-900 px-7 py-4 text-sm font-black text-white shadow-2xl shadow-emerald-950/20"
          >
            Retour au dashboard
          </Link>
        </div>
      </main>
    </PageFrame>
  );
}
