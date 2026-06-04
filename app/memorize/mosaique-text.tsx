"use client";

import { useState } from "react";

export function MosaiqueText({ text }: { text: string }) {
  // Découper le texte arabe par espaces (mots)
  const words = text.split(" ").filter((w) => w.trim().length > 0);
  
  // Tableau de booléens indiquant si le mot est caché (true) ou visible (false)
  const [hiddenWords, setHiddenWords] = useState<boolean[]>(new Array(words.length).fill(false));

  const toggleWord = (index: number) => {
    const newHidden = [...hiddenWords];
    newHidden[index] = !newHidden[index];
    setHiddenWords(newHidden);
  };

  const hideAll = () => setHiddenWords(new Array(words.length).fill(true));
  const showAll = () => setHiddenWords(new Array(words.length).fill(false));

  const hideRandomPercentage = (percentage: number) => {
    const countToHide = Math.round((words.length * percentage) / 100);
    const newHidden = new Array(words.length).fill(false);
    
    // Créer un tableau d'index et le mélanger (algorithme de Fisher-Yates)
    const indices = Array.from({ length: words.length }, (_, i) => i);
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    
    // Cacher le nombre calculé de mots
    for (let i = 0; i < countToHide; i++) {
      newHidden[indices[i]] = true;
    }
    
    setHiddenWords(newHidden);
  };

  return (
    <div>
      <div className="flex flex-wrap justify-end gap-2 mb-4">
        <button 
          onClick={showAll}
          className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full hover:bg-emerald-100 transition-colors"
        >
          Tout afficher
        </button>
        <button 
          onClick={() => hideRandomPercentage(50)}
          className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full hover:bg-emerald-100 transition-colors"
        >
          Masquer 50%
        </button>
        <button 
          onClick={() => hideRandomPercentage(75)}
          className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full hover:bg-emerald-100 transition-colors"
        >
          Masquer 75%
        </button>
        <button 
          onClick={hideAll}
          className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full hover:bg-emerald-100 transition-colors"
        >
          Tout masquer
        </button>
      </div>
      <p className="font-arabic text-right text-3xl leading-[2] md:text-5xl" style={{ direction: "rtl" }}>
        {words.map((word, i) => (
          <span
            key={`${i}-${word}`}
            onClick={() => toggleWord(i)}
            className={`inline-block mx-1 cursor-pointer transition-all duration-300 select-none ${
              hiddenWords[i] 
                ? "text-transparent bg-emerald-950/20 rounded-md" 
                : "text-emerald-950 hover:opacity-70"
            }`}
          >
            {word}
          </span>
        ))}
      </p>
    </div>
  );
}
