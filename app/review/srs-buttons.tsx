"use client";

import { useTransition } from "react";
import { submitReview } from "../actions/srs";
import { type SrsReviewQuality } from "@/lib/srs/algorithm";
import { useRouter } from "next/navigation";

const RATINGS: { label: string; value: SrsReviewQuality; bg: string }[] = [
  { label: "Oubli total", value: 0, bg: "hover:bg-red-300" },
  { label: "Difficile", value: 2, bg: "hover:bg-orange-300" },
  { label: "Correct", value: 4, bg: "hover:bg-emerald-300" },
  { label: "Parfait", value: 5, bg: "hover:bg-teal-400" },
];

export function SrsRatingButtons({ cardId }: { cardId: string }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleRate = (quality: SrsReviewQuality) => {
    startTransition(async () => {
      try {
        const result = await submitReview(cardId, quality);
        if (result.success) {
          router.refresh();
        }
      } catch (error) {
        alert("Erreur lors de la soumission de la note.");
      }
    });
  };

  return (
    <div className="mt-6 grid gap-3 sm:grid-cols-4">
      {RATINGS.map((rating) => (
        <button
          key={rating.label}
          onClick={() => handleRate(rating.value)}
          disabled={isPending}
          className={`rounded-full bg-emerald-50 px-4 py-3 text-sm font-black text-emerald-950 transition disabled:opacity-50 ${rating.bg}`}
          type="button"
        >
          {rating.label}
        </button>
      ))}
    </div>
  );
}
