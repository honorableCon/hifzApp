"use server";

import { db } from "@/lib/db";
import { auth } from "@/auth";
import { generatePersonalizedPlan } from "./ai";

export async function getDashboardData() {
  const session = await auth();
  if (!session?.user?.id) return { error: "Unauthorized" };

  const profile = await db.profile.findFirst({
    where: { userId: session.user.id },
    include: {
      learningPlans: true,
    },
    orderBy: { createdAt: "desc" },
  });

  if (!profile) return { profile: null };

  const [totalMastered, totalLearning, totalReviewing, srsCards, badges, lastMemorization] = await Promise.all([
    db.memorization.count({ where: { profileId: profile.id, status: "MASTERED" } }),
    db.memorization.count({ where: { profileId: profile.id, status: "LEARNING" } }),
    db.memorization.count({ where: { profileId: profile.id, status: "REVIEWING" } }),
    db.srsCard.findMany({
      where: { profileId: profile.id, dueAt: { lte: new Date() } },
      include: { verse: true },
      orderBy: { dueAt: "asc" },
    }),
    db.userBadge.findMany({
      where: { userId: session.user.id },
      include: { badge: true },
    }),
    db.memorization.findFirst({
      where: { profileId: profile.id },
      include: { verse: true },
      orderBy: { updatedAt: "desc" },
    }),
  ]);

  const allSrsCards = await db.srsCard.findMany({
    where: { profileId: profile.id },
  });

  const averageEaseFactor = allSrsCards.length > 0
    ? allSrsCards.reduce((acc: number, card: any) => acc + card.easeFactor, 0) / allSrsCards.length
    : 2.5;
  const retentionRate = Math.min(100, Math.round((averageEaseFactor / 2.5) * 85));

  const badgesList = badges.map((b: any) => b.badge);

  return {
    profile,
    metrics: {
      streak: badgesList.some((b: any) => b.slug === "streak-3") ? 3 : 0, // Simplifié pour le moment
      minutesToday: Math.round(profile.dailyMinutes * 0.4), // Donnée factice basée sur l'objectif
      versesMastered: totalMastered,
      retentionRate,
    },
    reviews: srsCards,
    badges: badgesList,
    lastMemorization,
  };
}

export async function createInitialProfile(data: {
  type: "CHILD" | "TEEN" | "ACTIVE_ADULT" | "INTENSIVE_STUDENT" | "SENIOR" | "HAFIZ_REVISION";
  ageRange: string;
  dailyMinutes: number;
  level: string;
  objective: string;
  preferredMethod: string;
  preferredReciter: string;
}) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  // 1. Demander à l'IA de générer le plan parfait
  const aiPlan = await generatePersonalizedPlan({
    type: data.type,
    ageRange: data.ageRange,
    dailyMinutes: data.dailyMinutes,
    level: data.level,
    objective: data.objective,
  });

  // 2. Créer le profil en base de données avec les données de l'IA
  const profile = await db.profile.create({
    data: {
      userId: session.user.id,
      ...data,
      learningPlans: {
        create: {
          targetLabel: data.objective,
          versesPerDay: aiPlan.versesPerDay,
          recommendedMethods: aiPlan.recommendedMethods,
          milestone30: aiPlan.milestone30,
          milestone90: aiPlan.milestone90,
          milestone180: aiPlan.milestone180,
        },
      },
    },
  });

  return profile;
}
