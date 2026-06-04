"use client";

import { useState } from "react";
import { getVerseAITips } from "../actions/ai";

export function AiVerseTips({ arabic, translation }: { arabic: string; translation: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tips, setTips] = useState<string | null>(null);

  async function handleToggle() {
    if (!isOpen && !tips && !loading) {
      setLoading(true);
      setIsOpen(true);
      const res = await getVerseAITips(arabic, translation);
      if (res.text) {
        setTips(res.text);
      } else {
        setTips("Désolé, l'Ustadh IA est en pause. Réessayez plus tard.");
      }
      setLoading(false);
    } else {
      setIsOpen(!isOpen);
    }
  }

  return (
    <div className="mt-4 w-full">
      <button
        onClick={handleToggle}
        className="flex items-center gap-2 text-sm font-bold text-amber-600 hover:text-amber-700 transition"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        {isOpen ? "Masquer les astuces" : "Demander une astuce à l'IA ✨"}
      </button>

      {isOpen && (
        <div className="mt-3 p-4 rounded-2xl bg-amber-50 border border-amber-200/50">
          <div className="flex gap-3">
            <div className="text-amber-600 mt-0.5">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <div className="flex-1 text-sm text-amber-900 leading-relaxed">
              {loading ? (
                <span className="flex items-center gap-2 animate-pulse">
                  <div className="w-2 h-2 rounded-full bg-amber-400"></div>
                  <div className="w-2 h-2 rounded-full bg-amber-400"></div>
                  <div className="w-2 h-2 rounded-full bg-amber-400"></div>
                  L'Ustadh réfléchit...
                </span>
              ) : (
                <p>{tips}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
