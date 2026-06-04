"use server";

import { db } from "@/lib/db";
import { auth } from "@/auth";

export async function getDailySession() {
  const session = await auth();
  if (!session?.user?.id) return { error: "Unauthorized" };

  const profile = await db.profile.findFirst({
    where: { userId: session.user.id },
    include: {
      learningPlans: true,
    },
  });

  if (!profile) return { error: "Profile not found" };
  const plan = profile.learningPlans[0];
  if (!plan) return { error: "Learning plan not found" };

  // 1. Récupérer les révisions du jour (SRS)
  const dueReviews = await db.srsCard.findMany({
    where: {
      profileId: profile.id,
      dueAt: { lte: new Date() },
    },
    include: { verse: true },
    orderBy: { dueAt: "asc" },
  });

  // 2. Déterminer les NOUVEAUX versets à apprendre
  // Pour faire simple dans ce MVP, on cible la sourate 78 (An-Naba, début du Juz 30)
  // On prend les N prochains versets qui n'ont pas encore de Memorization
  const versesPerDay = plan.versesPerDay || 5;

  const existingMemorizations = await db.memorization.findMany({
    where: { profileId: profile.id },
    select: { verseId: true },
  });
  const learnedVerseIds = existingMemorizations.map((m: any) => m.verseId);

  // Trouver les prochains versets de la sourate 78 (An-Naba) par défaut pour le Juz 30
  const nextVerses = await db.verse.findMany({
    where: {
      surahNumber: 78,
      id: { notIn: learnedVerseIds },
    },
    orderBy: { verseNumber: "asc" },
    take: versesPerDay,
  });

  return {
    reviews: dueReviews,
    newVerses: nextVerses,
    totalToday: dueReviews.length + nextVerses.length,
  };
}

export async function markVerseAsLearned(verseId: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const profile = await db.profile.findFirst({
    where: { userId: session.user.id },
  });
  if (!profile) throw new Error("Profile not found");

  // 1. Créer l'entrée de mémorisation
  const memorization = await db.memorization.create({
    data: {
      profileId: profile.id,
      verseId,
      status: "LEARNING",
      repetitions: 1,
      startedAt: new Date(),
    },
  });

  // 2. Créer la carte SRS pour les futures révisions
  // On fixe la prochaine révision à demain par défaut
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  await db.srsCard.create({
    data: {
      profileId: profile.id,
      verseId,
      memorizationId: memorization.id,
      strength: "FRAGILE",
      intervalDays: 1,
      easeFactor: 2.5,
      dueAt: tomorrow,
    },
  });

  return { success: true };
}
