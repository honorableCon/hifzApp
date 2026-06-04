import { db } from "@/lib/db";
import { Resend } from "resend";

// Vous devrez définir cette variable d'environnement sur Vercel
const resend = new Resend(process.env.RESEND_API_KEY || "re_test_key");

export async function GET(request: Request) {
  try {
    // Vérifier l'authentification (Vercel Cron ajoute automatiquement un header d'autorisation)
    const authHeader = request.headers.get("authorization");
    if (
      process.env.NODE_ENV === "production" &&
      authHeader !== `Bearer ${process.env.CRON_SECRET}`
    ) {
      return new Response("Unauthorized", { status: 401 });
    }

    // 1. Trouver toutes les cartes SRS qui sont dues
    const pendingCards = await db.srsCard.findMany({
      where: {
        dueAt: { lte: new Date() },
      },
      include: {
        memorization: {
          include: {
            profile: {
              include: {
                user: true,
              },
            },
          },
        },
      },
    });

    // 2. Grouper par utilisateur
    const usersToRemind = new Map<string, { email: string; name: string; pendingCount: number }>();

    for (const card of pendingCards) {
      const user = card.memorization?.profile?.user;
      if (!user?.email) continue;
      
      const userId = card.memorization.profile.userId;
      if (usersToRemind.has(userId)) {
        usersToRemind.get(userId)!.pendingCount++;
      } else {
        usersToRemind.set(userId, {
          email: user.email,
          name: user.name || "Apprenant",
          pendingCount: 1,
        });
      }
    }

    // 3. Envoyer les emails
    const emailsToSend = Array.from(usersToRemind.values()).map((user) => ({
      from: "HifzApp <onboarding@resend.dev>", // À remplacer par votre domaine vérifié
      to: [user.email],
      subject: "C'est l'heure de votre révision ! 📖",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #064e3b;">As-salamu alaykum ${user.name},</h1>
          <p>Vous avez <strong>${user.pendingCount} verset(s)</strong> en attente de révision dans votre file SRS aujourd'hui.</p>
          <p>La régularité est la clé de la mémorisation (Hifz). Ne brisez pas votre série !</p>
          <a href="${process.env.NEXT_PUBLIC_APP_URL}/review" style="display: inline-block; background-color: #064e3b; color: white; padding: 12px 24px; text-decoration: none; border-radius: 99px; margin-top: 20px; font-weight: bold;">
            Commencer mes révisions
          </a>
        </div>
      `,
    }));

    if (emailsToSend.length > 0) {
      // Note: Avec la clé de test Resend, on ne peut envoyer qu'à son propre email
      // Pour la production, il faudra utiliser resend.batch.send() si vous êtes sur un plan pro
      for (const email of emailsToSend) {
        await resend.emails.send(email);
      }
    }

    return Response.json({
      success: true,
      notifiedUsers: emailsToSend.length,
    });
  } catch (error) {
    console.error("Cron Error:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
