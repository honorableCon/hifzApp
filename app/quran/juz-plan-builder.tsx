"use client";

import { useState } from "react";

type Level = "beginner" | "intermediate" | "advanced" | "hafiz";

const LEVEL_SETTINGS = {
  beginner: { label: "Débutant", versesPerDay: 3, desc: "Tranquille et régulier", color: "bg-blue-100 text-blue-800 border-blue-200" },
  intermediate: { label: "Intermédiaire", versesPerDay: 5, desc: "Rythme standard", color: "bg-emerald-100 text-emerald-800 border-emerald-200" },
  advanced: { label: "Avancé", versesPerDay: 10, desc: "Pour les plus motivés", color: "bg-amber-100 text-amber-800 border-amber-200" },
  hafiz: { label: "Hafiz (Révision)", versesPerDay: 20, desc: "Révision intensive", color: "bg-purple-100 text-purple-800 border-purple-200" },
};

export function JuzPlanBuilder({ juz, verses }: { juz: number, verses: any[] }) {
  const [level, setLevel] = useState<Level>("intermediate");
  const [showCalendar, setShowCalendar] = useState(false);

  const versesPerDay = LEVEL_SETTINGS[level].versesPerDay;

  const generatePlan = () => {
    const days = [];
    for (let i = 0; i < verses.length; i += versesPerDay) {
      const dayVerses = verses.slice(i, i + versesPerDay);
      days.push({
        dayNumber: Math.floor(i / versesPerDay) + 1,
        verses: dayVerses,
        startSurah: dayVerses[0].surahNumber,
        startVerse: dayVerses[0].verseNumber,
        endSurah: dayVerses[dayVerses.length - 1].surahNumber,
        endVerse: dayVerses[dayVerses.length - 1].verseNumber,
      });
    }
    return days;
  };

  const planDays = showCalendar ? generatePlan() : [];

  return (
    <div className="mb-10 bg-white rounded-3xl shadow-sm border border-emerald-950/5 overflow-hidden">
      <div className="p-6 md:p-8 border-b border-emerald-950/5 bg-emerald-50/30">
        <div className="flex items-center gap-3 mb-2">
          <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <h2 className="text-xl font-bold text-emerald-950">Plan de Mémorisation (Juz {juz})</h2>
        </div>
        <p className="text-emerald-950/60 text-sm">
          Générez un calendrier d'apprentissage adapté à votre rythme pour mémoriser les {verses.length} versets de ce Juz.
        </p>

        {!showCalendar ? (
          <div className="mt-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(Object.keys(LEVEL_SETTINGS) as Level[]).map((key) => {
                const setting = LEVEL_SETTINGS[key];
                const isActive = level === key;
                return (
                  <button
                    key={key}
                    onClick={() => setLevel(key)}
                    className={`flex flex-col items-start p-4 rounded-2xl border-2 transition-all text-left ${
                      isActive 
                        ? `border-emerald-500 bg-emerald-50 ring-4 ring-emerald-500/10` 
                        : `border-transparent bg-gray-50 hover:bg-gray-100`
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-1">
                      <span className="font-bold text-emerald-950">{setting.label}</span>
                      <span className={`text-xs font-bold px-2 py-1 rounded-full border ${setting.color}`}>
                        {setting.versesPerDay} v/jour
                      </span>
                    </div>
                    <span className="text-sm text-emerald-950/60">{setting.desc}</span>
                  </button>
                );
              })}
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setShowCalendar(true)}
                className="bg-emerald-600 text-white px-6 py-3 rounded-full font-bold shadow-md hover:bg-emerald-700 transition flex items-center gap-2"
              >
                Générer le calendrier
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-6 flex items-center justify-between bg-emerald-100/50 p-4 rounded-2xl border border-emerald-200">
            <div>
              <p className="font-bold text-emerald-950">Rythme : {LEVEL_SETTINGS[level].label}</p>
              <p className="text-sm text-emerald-900/70">{LEVEL_SETTINGS[level].versesPerDay} versets par jour • Fin dans {planDays.length} jours</p>
            </div>
            <button
              onClick={() => setShowCalendar(false)}
              className="text-emerald-700 hover:text-emerald-900 text-sm font-bold bg-white px-4 py-2 rounded-full shadow-sm"
            >
              Modifier
            </button>
          </div>
        )}
      </div>

      {showCalendar && (
        <div className="p-6 md:p-8 bg-white max-h-[600px] overflow-y-auto custom-scrollbar">
          <div className="relative border-l-2 border-emerald-100 ml-3 md:ml-4 space-y-8 pb-4">
            {planDays.map((day) => (
              <div key={day.dayNumber} className="relative pl-6 md:pl-8">
                {/* Timeline dot */}
                <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-emerald-500 ring-4 ring-emerald-50"></div>
                
                <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 hover:shadow-md transition-shadow">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3">
                    <h3 className="font-black text-emerald-900 text-lg">Jour {day.dayNumber}</h3>
                    <div className="text-sm font-medium text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full inline-flex w-fit">
                      {day.verses.length} versets
                    </div>
                  </div>
                  
                  <p className="text-emerald-950/70">
                    {day.startSurah === day.endSurah ? (
                      <span>Sourate {day.startSurah}, versets <strong className="text-emerald-950">{day.startVerse} à {day.endVerse}</strong></span>
                    ) : (
                      <span>De S.{day.startSurah} v.{day.startVerse} à S.{day.endSurah} v.{day.endVerse}</span>
                    )}
                  </p>

                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="font-arabic text-right text-xl text-emerald-950/40 line-clamp-2" dir="rtl">
                      {day.verses[0].arabic} ...
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}