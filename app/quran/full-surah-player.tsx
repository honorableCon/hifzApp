"use client";

import { useState, useRef, useEffect } from "react";

export function FullSurahPlayer({ verses }: { verses: any[] }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentVerseIndex, setCurrentVerseIndex] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isLooping, setIsLooping] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Gérer la fin d'un verset pour passer au suivant
  const handleEnded = () => {
    if (isLooping) {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(console.error);
      }
    } else if (currentVerseIndex < verses.length - 1) {
      setCurrentVerseIndex(prev => prev + 1);
    } else {
      setIsPlaying(false);
      setCurrentVerseIndex(0); // Remettre au début à la fin de la sourate
    }
  };

  // Jouer l'audio quand l'index change ou quand on clique sur Play
  useEffect(() => {
    if (isPlaying && audioRef.current) {
      audioRef.current.playbackRate = playbackRate;
      audioRef.current.play().catch(err => {
        console.error("Erreur de lecture audio:", err);
        setIsPlaying(false);
      });
    }
  }, [currentVerseIndex, isPlaying]);

  // Appliquer la vitesse de lecture quand elle change
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackRate;
    }
  }, [playbackRate]);

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

  const nextVerse = () => {
    if (currentVerseIndex < verses.length - 1) {
      setCurrentVerseIndex(prev => prev + 1);
    }
  };

  const prevVerse = () => {
    if (currentVerseIndex > 0) {
      setCurrentVerseIndex(prev => prev - 1);
    }
  };

  const cycleSpeed = () => {
    setPlaybackRate(prev => {
      if (prev === 1) return 0.75;
      if (prev === 0.75) return 0.5;
      return 1;
    });
  };

  if (!verses || verses.length === 0) return null;

  return (
    <div className="sticky top-20 z-40 mb-8 rounded-[2rem] bg-emerald-950 p-6 text-emerald-50 shadow-xl">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex-1 w-full">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-bold text-emerald-50/65 uppercase tracking-widest">
              Lecture Continue
            </p>
            <div className="flex items-center gap-2 text-emerald-50/60">
              <button 
                onClick={cycleSpeed}
                className="px-2 py-1 hover:text-emerald-50 hover:bg-emerald-900/50 rounded font-bold text-xs transition"
                title="Changer la vitesse"
              >
                {playbackRate}x
              </button>
              
              <button 
                onClick={() => setIsLooping(!isLooping)}
                className={`p-1.5 rounded transition ${isLooping ? 'bg-amber-400 text-emerald-950' : 'hover:bg-emerald-900/50 hover:text-emerald-50'}`}
                title="Répéter le verset en boucle"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={prevVerse}
                disabled={currentVerseIndex === 0}
                className="flex items-center justify-center size-10 rounded-full bg-emerald-900 text-emerald-50 transition hover:bg-emerald-800 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hidden md:flex"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button
                onClick={togglePlay}
                className="flex items-center justify-center size-14 rounded-full bg-amber-400 text-emerald-950 transition hover:bg-amber-300 shadow-lg"
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

              <button
                onClick={nextVerse}
                disabled={currentVerseIndex === verses.length - 1}
                className="flex items-center justify-center size-10 rounded-full bg-emerald-900 text-emerald-50 transition hover:bg-emerald-800 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hidden md:flex"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            <div className="flex-1 min-w-0">
              <p className="font-arabic text-xl leading-relaxed text-right text-amber-200 break-words" dir="rtl">
                {verses[currentVerseIndex].arabic}
              </p>
              <div className="flex items-center justify-between mt-2">
                <div className="flex md:hidden items-center gap-2">
                  <button onClick={prevVerse} disabled={currentVerseIndex === 0} className="p-1 text-emerald-50/50 hover:text-emerald-50 disabled:opacity-30">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                  </button>
                  <button onClick={nextVerse} disabled={currentVerseIndex === verses.length - 1} className="p-1 text-emerald-50/50 hover:text-emerald-50 disabled:opacity-30">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </button>
                </div>
                <p className="text-xs text-emerald-50/70 truncate text-right flex-1">
                  Verset {verses[currentVerseIndex].verseNumber} / {verses.length}
                </p>
              </div>
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
