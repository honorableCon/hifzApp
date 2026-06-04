"use client";

import { useState } from "react";
import Link from "next/link";
import type { SurahMeta } from "@/lib/quran-meta";

export function QuranIndex({
  surahs,
  juzCount,
}: {
  surahs: SurahMeta[];
  juzCount: number;
}) {
  const [activeTab, setActiveTab] = useState<"surahs" | "juzs" | "hizbs" | "manzils">("surahs");

  return (
    <div className="space-y-8">
      {/* Tabs */}
      <div className="flex flex-wrap p-1 gap-1 bg-emerald-900/10 rounded-2xl max-w-2xl mx-auto">
        <button
          onClick={() => setActiveTab("surahs")}
          className={`flex-1 min-w-[100px] py-2.5 text-sm font-bold rounded-xl transition ${
            activeTab === "surahs"
              ? "bg-white text-emerald-950 shadow-sm"
              : "text-emerald-800 hover:bg-white/50"
          }`}
        >
          Sourates
        </button>
        <button
          onClick={() => setActiveTab("juzs")}
          className={`flex-1 min-w-[100px] py-2.5 text-sm font-bold rounded-xl transition ${
            activeTab === "juzs"
              ? "bg-white text-emerald-950 shadow-sm"
              : "text-emerald-800 hover:bg-white/50"
          }`}
        >
          Juzs
        </button>
        <button
          onClick={() => setActiveTab("hizbs")}
          className={`flex-1 min-w-[100px] py-2.5 text-sm font-bold rounded-xl transition ${
            activeTab === "hizbs"
              ? "bg-white text-emerald-950 shadow-sm"
              : "text-emerald-800 hover:bg-white/50"
          }`}
        >
          Hizbs
        </button>
        <button
          onClick={() => setActiveTab("manzils")}
          className={`flex-1 min-w-[100px] py-2.5 text-sm font-bold rounded-xl transition ${
            activeTab === "manzils"
              ? "bg-white text-emerald-950 shadow-sm"
              : "text-emerald-800 hover:bg-white/50"
          }`}
        >
          Manzils
        </button>
      </div>

      {/* Surahs Grid */}
      {activeTab === "surahs" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {surahs.map((surah) => (
            <Link
              key={surah.number}
              href={`/quran?surah=${surah.number}`}
              className="flex items-center gap-4 p-4 rounded-2xl border border-emerald-950/10 bg-white/60 hover:bg-white hover:shadow-lg hover:-translate-y-0.5 transition"
            >
              <div className="grid size-12 shrink-0 place-items-center rounded-xl bg-emerald-100 text-emerald-950 font-black text-sm">
                {surah.number}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-emerald-950 truncate">
                  {surah.englishName}
                </h3>
                <p className="text-xs text-emerald-950/60 truncate">
                  {surah.englishNameTranslation} • {surah.numberOfAyahs} versets
                </p>
              </div>
              <div className="font-arabic text-xl text-emerald-900 text-right">
                {surah.name.replace("سُورَةُ ", "")}
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Juzs Grid */}
      {activeTab === "juzs" && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {Array.from({ length: juzCount }).map((_, i) => {
            const juzNumber = i + 1;
            return (
              <Link
                key={juzNumber}
                href={`/quran?juz=${juzNumber}`}
                className="flex flex-col items-center justify-center gap-2 p-6 rounded-2xl border border-emerald-950/10 bg-white/60 hover:bg-white hover:shadow-lg hover:-translate-y-0.5 transition"
              >
                <div className="text-3xl font-black text-emerald-900">
                  {juzNumber}
                </div>
                <div className="text-sm font-bold text-emerald-950/60 uppercase tracking-widest">
                  Juz
                </div>
              </Link>
            );
          })}
        </div>
      )}

      {/* Hizbs Grid */}
      {activeTab === "hizbs" && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {Array.from({ length: 60 }).map((_, i) => {
            const hizbNumber = i + 1;
            return (
              <Link
                key={hizbNumber}
                href={`/quran?hizb=${hizbNumber}`}
                className="flex flex-col items-center justify-center gap-2 p-6 rounded-2xl border border-emerald-950/10 bg-white/60 hover:bg-white hover:shadow-lg hover:-translate-y-0.5 transition"
              >
                <div className="text-3xl font-black text-emerald-900">
                  {hizbNumber}
                </div>
                <div className="text-sm font-bold text-emerald-950/60 uppercase tracking-widest">
                  Hizb
                </div>
              </Link>
            );
          })}
        </div>
      )}

      {/* Manzils Grid */}
      {activeTab === "manzils" && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 7 }).map((_, i) => {
            const manzilNumber = i + 1;
            return (
              <Link
                key={manzilNumber}
                href={`/quran?manzil=${manzilNumber}`}
                className="flex flex-col items-center justify-center gap-2 p-6 rounded-2xl border border-emerald-950/10 bg-white/60 hover:bg-white hover:shadow-lg hover:-translate-y-0.5 transition"
              >
                <div className="text-3xl font-black text-emerald-900">
                  {manzilNumber}
                </div>
                <div className="text-sm font-bold text-emerald-950/60 uppercase tracking-widest">
                  Manzil
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
