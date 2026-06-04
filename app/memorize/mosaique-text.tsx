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

  return (
    <div>
      <div className="flex justify-end gap-2 mb-4">
        <button 
          onClick={showAll}
          className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full hover:bg-emerald-100"
        >
          Tout afficher
        </button>
        <button 
          onClick={hideAll}
          className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full hover:bg-emerald-100"
        >
          Tout masquer
        </button>
      </div>
      <p className="font-arabic text-right text-4xl leading-[2] md:text-5xl" style={{ direction: "rtl" }}>
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
