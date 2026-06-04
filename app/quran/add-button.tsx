"use client";

import { useTransition } from "react";
import { addToPlan } from "../actions/learning";

export function AddToPlanButton({ verseId }: { verseId: string }) {
  const [isPending, startTransition] = useTransition();

  const handleAdd = () => {
    startTransition(async () => {
      const result = await addToPlan(verseId);
      if (result.error) {
        alert(result.error);
      } else {
        alert("Ajouté au plan de mémorisation avec succès !");
      }
    });
  };

  return (
    <button
      onClick={handleAdd}
      disabled={isPending}
      className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-black text-emerald-950 transition hover:bg-emerald-200 disabled:opacity-50"
      type="button"
    >
      {isPending ? "Ajout..." : "Mémoriser"}
    </button>
  );
}
