"use client";

import { useState, useRef, useEffect } from "react";

export function FullSurahPlayer({ verses }: { verses: any[] }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentVerseIndex, setCurrentVerseIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Gérer la fin d'un verset pour passer au suivant
  const handleEnded = () => {
    if (currentVerseIndex < verses.length - 1) {
      setCurrentVerseIndex(prev => prev + 1);
    } else {
      setIsPlaying(false);
      setCurrentVerseIndex(0); // Remettre au début à la fin de la sourate
    }
  };

  // Jouer l'audio quand l'index change ou quand on clique sur Play
  useEffect(() => {
    if (isPlaying && audioRef.current) {
      audioRef.current.play().catch(err => {
        console.error("Erreur de lecture audio:", err);
        setIsPlaying(false);
      });
    }
  }, [currentVerseIndex, isPlaying]);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
    }
  };

  const skipTo = (index: number) => {
    setCurrentVerseIndex(index);
    if (!isPlaying) setIsPlaying(true);
  };

  if (!verses || verses.length === 0) return null;

  return (
    <div className="sticky top-20 z-40 mb-8 rounded-[2rem] bg-emerald-950 p-6 text-emerald-50 shadow-xl">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex-1 w-full">
          <p className="text-sm font-bold text-emerald-50/65 mb-2 uppercase tracking-widest">
            Lecture Continue
          </p>
          <div className="flex items-center gap-4">
            <button
              onClick={togglePlay}
              className="flex items-center justify-center size-14 rounded-full bg-amber-400 text-emerald-950 transition hover:bg-amber-300 shrink-0 shadow-lg"
            >
              {isPlaying ? (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                </svg>
              ) : (
                <svg className="w-6 h-6 ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>
            <div className="flex-1">
              <p className="font-arabic text-xl text-right text-amber-200 truncate" dir="rtl">
                {verses[currentVerseIndex].arabic}
              </p>
              <p className="text-xs text-emerald-50/70 truncate mt-1">
                Verset {verses[currentVerseIndex].verseNumber} / {verses.length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Barre de progression invisible mais fonctionnelle */}
      <audio 
        ref={audioRef}
        src={verses[currentVerseIndex].audioUrl} 
        onEnded={handleEnded}
        className="hidden"
      />
    </div>
  );
}
