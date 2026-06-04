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
    <div className="flex flex-wrap items-center gap-2">
      <button
        onClick={togglePlay}
        className={`rounded-full border px-5 py-3 text-sm font-black transition ${
          isPlaying
            ? "bg-amber-300 border-amber-400 text-amber-950"
            : "border-emerald-950/10 bg-white text-emerald-950 hover:bg-emerald-950 hover:text-white"
        }`}
        type="button"
      >
        {isPlaying ? "⏸ En pause" : `▶ ${label}`}
      </button>

      {allowControls && (
        <>
          <button
            onClick={cycleSpeed}
            className="rounded-full border border-emerald-950/10 bg-emerald-50 px-4 py-3 text-xs font-black text-emerald-950 transition hover:bg-emerald-100"
            title="Changer la vitesse"
            type="button"
          >
            {playbackRate}x
          </button>
          
          <button
            onClick={() => setIsLooping(!isLooping)}
            className={`rounded-full border px-4 py-3 text-xs font-black transition ${
              isLooping 
                ? "bg-emerald-950 border-emerald-950 text-white" 
                : "border-emerald-950/10 bg-emerald-50 text-emerald-950 hover:bg-emerald-100"
            }`}
            title="Répéter en boucle"
            type="button"
          >
            🔁 Boucle
          </button>
        </>
      )}
    </div>
  );
}
