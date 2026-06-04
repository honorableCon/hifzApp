import { type SrsStrength } from "@prisma/client";

/**
 * SuperMemo-2 (SM-2) inspired Spaced Repetition Algorithm
 * Adapté pour la mémorisation du Coran
 */

export type SrsReviewQuality = 0 | 1 | 2 | 3 | 4 | 5;
// 0: Blackout complet (Oubli total)
// 1: Faux, mais le bon verset semble familier
// 2: Faux, mais il a fallu beaucoup d'indices (Tajwid/Traduction)
// 3: Correct, mais avec beaucoup d'hésitations
// 4: Correct, avec un peu d'hésitation
// 5: Parfait (Mémorisation fluide)

interface SrsCalculationResult {
  intervalDays: number;
  easeFactor: number;
  strength: SrsStrength;
}

export function calculateNextReview(
  quality: SrsReviewQuality,
  currentIntervalDays: number,
  currentEaseFactor: number
): SrsCalculationResult {
  let nextIntervalDays: number;
  let nextEaseFactor: number;

  // Calcul du nouveau Ease Factor (Facteur de facilité)
  nextEaseFactor =
    currentEaseFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
  
  if (nextEaseFactor < 1.3) {
    nextEaseFactor = 1.3; // Plancher minimum (Ne jamais descendre en dessous)
  }

  // Calcul du prochain intervalle
  if (quality < 3) {
    // Si la qualité est < 3 (Échec), on réinitialise l'intervalle
    nextIntervalDays = 1;
  } else {
    if (currentIntervalDays === 0) {
      nextIntervalDays = 1;
    } else if (currentIntervalDays === 1) {
      nextIntervalDays = 3; // Souvent 6 dans SM-2, mais 3 est mieux pour le Hifz
    } else {
      nextIntervalDays = Math.round(currentIntervalDays * currentEaseFactor);
    }
  }

  // Détermination de la force de la carte
  let strength: SrsStrength = "FRAGILE";
  if (nextIntervalDays > 21) {
    strength = "SOLID";
  } else if (nextIntervalDays > 7) {
    strength = "STABLE";
  }

  return {
    intervalDays: nextIntervalDays,
    easeFactor: nextEaseFactor,
    strength,
  };
}
