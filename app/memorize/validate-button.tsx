"use client";

import { useTransition } from "react";
import { markAsLearned } from "../actions/learning";
import { useRouter } from "next/navigation";

export function ValidateMemorizationButton({ memorizationId }: { memorizationId: string }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleValidate = () => {
    startTransition(async () => {
      try {
        const result = await markAsLearned(memorizationId);
        if (result.success) {
          alert("Félicitations ! Verset maîtrisé. Il a été ajouté à vos révisions (SRS).");
          router.push("/dashboard");
        }
      } catch (error) {
        alert("Erreur lors de la validation.");
      }
    });
  };

  return (
    <button
      onClick={handleValidate}
      disabled={isPending}
      className="rounded-full bg-emerald-900 px-5 py-3 text-sm font-black text-white transition hover:bg-emerald-800 disabled:opacity-50"
      type="button"
    >
      {isPending ? "Validation..." : "Valider (Ajouter SRS)"}
    </button>
  );
}
