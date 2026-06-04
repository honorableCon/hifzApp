"use server";

import { db } from "@/lib/db";
import { auth } from "@/auth";
import { calculateNextReview, type SrsReviewQuality } from "@/lib/srs/algorithm";

export async function submitReview(cardId: string, quality: SrsReviewQuality) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const card = await db.srsCard.findUnique({
    where: { id: cardId },
    include: { memorization: true },
  });

  if (!card) throw new Error("Card not found");

  const { intervalDays, easeFactor, strength } = calculateNextReview(
    quality,
    card.intervalDays,
    card.easeFactor
  );

  const nextDueDate = new Date();
  nextDueDate.setDate(nextDueDate.getDate() + intervalDays);

  await db.$transaction([
    db.srsCard.update({
      where: { id: cardId },
      data: {
        intervalDays,
        easeFactor,
        strength,
        dueAt: nextDueDate,
        lastReviewedAt: new Date(),
      },
    }),
    db.memorization.update({
      where: { id: card.memorizationId },
      data: {
        repetitions: { increment: 1 },
        status: strength === "SOLID" ? "MASTERED" : "REVIEWING",
      },
    }),
  ]);

  return { success: true };
}
