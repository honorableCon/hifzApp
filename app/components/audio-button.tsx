"use client";

import { useState, useRef, useEffect } from "react";

export function AudioButton({ 
  src, 
  label = "Écouter",
  allowControls = false // Permet d'afficher vitesse et boucle si true
}: { 
  src?: string | null; 
  label?: string;
  allowControls?: boolean;
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isLooping, setIsLooping] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (src) {
      audioRef.current = new Audio(src);
      audioRef.current.onended = () => {
        if (!audioRef.current?.loop) {
          setIsPlaying(false);
        }
      };
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [src]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackRate;
      audioRef.current.loop = isLooping;
    }
  }, [playbackRate, isLooping]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch((e) => console.error("Erreur de lecture audio:", e));
      setIsPlaying(true);
    }
  };

  const cycleSpeed = () => {
    setPlaybackRate(prev => {
      if (prev === 1) return 0.75;
      if (prev === 0.75) return 0.5;
      return 1;
    });
  };

  if (!src) {
    return (
      <button
        disabled
        className="rounded-full border border-emerald-950/10 bg-gray-100 px-5 py-3 text-sm font-black text-gray-400 opacity-50 cursor-not-allowed"
        type="button"
      >
        Audio indisponible
      </button>
    );
  }

  return (
    <div className="flex items-center gap-3 bg-emerald-50 rounded-full pr-4 p-1 border border-emerald-900/10">
      <button
        onClick={togglePlay}
        disabled={!src}
        className="flex items-center justify-center size-10 rounded-full bg-emerald-900 text-white transition hover:bg-emerald-800 disabled:opacity-50"
        title={label}
        type="button"
      >
        {isPlaying ? (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
          </svg>
        ) : (
          <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </button>

      {allowControls && (
        <div className="flex items-center gap-1 text-emerald-950/60">
          <button 
            onClick={cycleSpeed}
            className="px-2 py-1 hover:text-emerald-950 hover:bg-emerald-900/10 rounded font-bold text-xs"
            title="Changer la vitesse"
            type="button"
          >
            {playbackRate}x
          </button>
          
          <button 
            onClick={() => setIsLooping(!isLooping)}
            className={`px-2 py-1 rounded transition ${isLooping ? 'bg-emerald-200 text-emerald-900' : 'hover:bg-emerald-900/10 hover:text-emerald-950'}`}
            title="Répéter en boucle"
            type="button"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
