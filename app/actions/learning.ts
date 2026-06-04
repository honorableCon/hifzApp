"use server";

import { db } from "@/lib/db";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export async function addToPlan(verseId: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const profile = await db.profile.findFirst({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  if (!profile) throw new Error("Profil introuvable. Veuillez compléter l'onboarding.");

  // Vérifier si le verset est déjà dans le plan
  const existing = await db.memorization.findUnique({
    where: {
      profileId_verseId: {
        profileId: profile.id,
        verseId,
      },
    },
  });

  if (existing) {
    return { error: "Ce verset est déjà dans votre plan." };
  }

  // Ajouter au plan
  await db.memorization.create({
    data: {
      profileId: profile.id,
      verseId,
      status: "PLANNED",
    },
  });

  revalidatePath("/quran");
  revalidatePath("/dashboard");
  revalidatePath("/memorize");

  return { success: true };
}

export async function markAsLearned(memorizationId: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const memorization = await db.memorization.findUnique({
    where: { id: memorizationId },
    include: { profile: true },
  });

  if (!memorization || memorization.profile.userId !== session.user.id) {
    throw new Error("Mémorisation introuvable ou non autorisée");
  }

  // Mettre à jour le statut et créer la carte SRS
  const now = new Date();
  const nextReviewDate = new Date();
  nextReviewDate.setDate(nextReviewDate.getDate() + 1); // 1ère révision demain

  await db.$transaction([
    db.memorization.update({
      where: { id: memorizationId },
      data: {
        status: "REVIEWING",
        masteredAt: now,
      },
    }),
    db.srsCard.create({
      data: {
        profileId: memorization.profileId,
        verseId: memorization.verseId,
        memorizationId: memorization.id,
        strength: "FRAGILE",
        intervalDays: 1,
        easeFactor: 2.5,
        dueAt: nextReviewDate,
      },
    }),
  ]);

  // Vérifier si on doit attribuer le badge "Premier Pas"
  const totalLearningOrMastered = await db.memorization.count({
    where: { profileId: memorization.profileId, status: { in: ["REVIEWING", "MASTERED"] } }
  });

  if (totalLearningOrMastered === 1) {
    const firstVerseBadge = await db.badge.findUnique({ where: { slug: "first-verse" } });
    if (firstVerseBadge) {
      await db.userBadge.create({
        data: {
          userId: session.user.id,
          badgeId: firstVerseBadge.id,
        }
      }).catch(() => {}); // Ignore si déjà attribué
    }
  }

  revalidatePath("/memorize");
  revalidatePath("/dashboard");
  revalidatePath("/review");
  revalidatePath("/progress");

  return { success: true };
}
