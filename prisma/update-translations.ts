import { db as prisma } from '../lib/db';
import { getSurahData } from '../lib/quran-api';

async function main() {
  console.log('Début de la mise à jour des traductions...');

  for (let i = 1; i <= 114; i++) {
    console.log(`Mise à jour de la sourate ${i}/114...`);
    try {
      const surah = await getSurahData(i);
      
      // On met à jour chaque verset un par un
      for (const verse of surah.verses) {
        await prisma.verse.updateMany({
          where: {
            surahNumber: verse.surahNumber,
            verseNumber: verse.verseNumber,
          },
          data: {
            translation: verse.translation,
          },
        });
      }

      // Petite pause pour ne pas surcharger l'API
      await new Promise(resolve => setTimeout(resolve, 200));
    } catch (err) {
      console.error(`Erreur lors de la mise à jour de la sourate ${i}:`, err);
    }
  }
  
  console.log('Mise à jour des traductions terminée avec succès !');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
