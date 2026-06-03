export default function Loading() {
  return (
    <main className="grid min-h-screen place-items-center bg-[#f7f3e8] px-5 text-center text-emerald-950">
      <div>
        <div className="mx-auto size-12 animate-pulse rounded-2xl bg-emerald-900" />
        <p className="mt-5 text-sm font-black uppercase tracking-[0.28em] text-amber-700">
          Chargement du parcours
        </p>
      </div>
    </main>
  );
}
