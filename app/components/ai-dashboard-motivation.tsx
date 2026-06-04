"use client";

import { useState, useEffect } from "react";
import { getDailyMotivation } from "../actions/ai";

export function AiDashboardMotivation({ userName, streak }: { userName: string; streak: number }) {
  const [motivation, setMotivation] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMotivation() {
      // Clé de cache basée sur la date du jour (YYYY-MM-DD)
      const today = new Date().toISOString().split("T")[0];
      const cacheKey = `hifzapp_motivation_${today}`;
      
      // 1. Vérifier si on a déjà une motivation en cache pour aujourd'hui
      const cachedData = localStorage.getItem(cacheKey);
      if (cachedData) {
        setMotivation(cachedData);
        return;
      }

      // 2. Sinon, on appelle l'IA
      const res = await getDailyMotivation(userName, streak);
      if (res.text) {
        setMotivation(res.text);
        // 3. Et on sauvegarde dans le LocalStorage pour la journée
        localStorage.setItem(cacheKey, res.text);
      }
    }
    fetchMotivation();
  }, [userName, streak]);

  if (!motivation) return null;

  return (
    <div className="mb-8 rounded-2xl bg-gradient-to-r from-emerald-50 to-amber-50 border border-emerald-100 p-5 shadow-sm">
      <div className="flex items-start gap-4">
        <div className="text-emerald-600 shrink-0 mt-1">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
        </div>
        <div className="flex-1">
          <p className="text-sm font-bold text-emerald-900 mb-1">Mot du jour de l'Ustadh IA</p>
          <p className="text-sm text-emerald-800 italic leading-relaxed">
            "{motivation}"
          </p>
        </div>
      </div>
    </div>
  );
}
