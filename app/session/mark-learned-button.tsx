"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { markVerseAsLearned } from "../actions/session";

export function MarkLearnedButton({ verseId }: { verseId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleMarkLearned() {
    setLoading(true);
    try {
      await markVerseAsLearned(verseId);
      router.refresh(); // Rafraîchir la page pour mettre à jour la liste des versets de la session
    } catch (error) {
      console.error(error);
      alert("Une erreur est survenue.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleMarkLearned}
      disabled={loading}
      className="w-fit flex items-center gap-2 rounded-full bg-emerald-900 px-6 py-3 text-sm font-bold text-white shadow-xl shadow-emerald-950/15 transition hover:-translate-y-0.5 hover:bg-emerald-800 disabled:opacity-50"
    >
      {loading ? (
        <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      )}
      {loading ? "Enregistrement..." : "Marquer appris"}
    </button>
  );
}
