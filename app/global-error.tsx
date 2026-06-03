"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="fr">
      <body>
        <main className="grid min-h-screen place-items-center bg-[#f7f3e8] px-5 text-center text-emerald-950">
          <div className="max-w-2xl rounded-[2rem] border border-emerald-950/10 bg-white p-8 shadow-xl shadow-emerald-950/5">
            <p className="text-sm font-black uppercase tracking-[0.32em] text-amber-700">
              Erreur
            </p>
            <h1 className="mt-4 text-4xl font-black tracking-tight">
              Une erreur inattendue est survenue.
            </h1>
            <p className="mt-4 text-base leading-7 text-emerald-950/70">
              Le système a gardé la trace technique de l’incident. Tu peux
              relancer l’écran sans perdre le cap.
            </p>
            {error.digest ? (
              <p className="mt-4 rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-800">
                Référence : {error.digest}
              </p>
            ) : null}
            <button
              type="button"
              onClick={reset}
              className="mt-7 rounded-full bg-emerald-900 px-7 py-4 text-sm font-black text-white"
            >
              Réessayer
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}
