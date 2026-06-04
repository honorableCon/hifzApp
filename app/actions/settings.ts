"use server";

import { db } from "@/lib/db";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export async function updateProfileSettings(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const dailyMinutes = Number(formData.get("dailyMinutes"));
  const objective = formData.get("objective") as string;
  const preferredMethod = formData.get("preferredMethod") as string;
  const preferredReciter = formData.get("preferredReciter") as string;

  const currentProfile = await db.profile.findFirst({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  if (!currentProfile) throw new Error("Profil introuvable");

  await db.profile.update({
    where: { id: currentProfile.id },
    data: {
      dailyMinutes,
      objective,
      preferredMethod,
      preferredReciter,
    },
  });

  // Mettre à jour aussi le LearningPlan associé
  const learningPlan = await db.learningPlan.findFirst({
    where: { profileId: currentProfile.id },
  });

  if (learningPlan) {
    await db.learningPlan.update({
      where: { id: learningPlan.id },
      data: {
        targetLabel: objective,
        versesPerDay: Math.max(1, Math.floor(dailyMinutes / 10)),
        recommendedMethods: [preferredMethod, "SRS"],
      },
    });
  }

  revalidatePath("/settings");
  revalidatePath("/dashboard");

  return { success: true };
}
