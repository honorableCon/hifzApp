import { db as prisma } from '../lib/db';
import bcrypt from 'bcryptjs';
import { getSurahData } from '../lib/quran-api';

async function main() {
  console.log('Start seeding...');

  // Vérifier si le Coran est déjà en base de données
  const verseCount = await prisma.verse.count();
  
  if (verseCount < 6236) {
    console.log(`Il y a actuellement ${verseCount} versets en base. Importation des 114 sourates...`);
    
    for (let i = 1; i <= 114; i++) {
      console.log(`Fetching Surah ${i}/114...`);
      try {
        const surah = await getSurahData(i);
        
        const versesData = surah.verses.map(v => ({
          surahNumber: v.surahNumber,
          verseNumber: v.verseNumber,
          juzNumber: v.juzNumber,
          arabic: v.arabic,
          translation: v.translation,
          audioUrl: v.audioUrl,
        }));

        await prisma.verse.createMany({
          data: versesData,
          skipDuplicates: true,
        });

        // Pause de courtoisie pour ne pas surcharger l'API (Rate Limit)
        await new Promise(resolve => setTimeout(resolve, 300));
      } catch (err) {
        console.error(`Erreur lors de l'importation de la sourate ${i}:`, err);
      }
    }
    console.log('Importation du Coran terminée avec succès !');
  } else {
    console.log('Le Coran est déjà complètement importé (6236 versets).');
  }

  // Seed Users
  const passwordHash = await bcrypt.hash("password123", 10);

  const testUsers = [
    {
      email: "tariq@example.com",
      name: "Tariq (Débutant)",
      password: passwordHash,
      role: "LEARNER" as const,
    },
    {
      email: "hafiz@example.com",
      name: "Ahmed (Hafiz)",
      password: passwordHash,
      role: "LEARNER" as const,
    }
  ];

  for (const user of testUsers) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: user,
    });
  }

  // Seed Badges
  const baseBadges = [
    { slug: "first-verse", name: "Premier Pas", description: "A mémorisé son premier verset.", icon: "🌱" },
    { slug: "streak-3", name: "Régulier (3j)", description: "A révisé 3 jours de suite.", icon: "🔥" },
    { mastered_10: "mastered-10", name: "Dizaine", description: "10 versets maîtrisés parfaitement.", icon: "🌟" },
  ];

  for (const badge of baseBadges) {
    await prisma.badge.upsert({
      where: { slug: badge.slug || badge.mastered_10 },
      update: {},
      create: {
        slug: badge.slug || badge.mastered_10 as string,
        name: badge.name,
        description: badge.description,
        icon: badge.icon,
      },
    });
  }

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
