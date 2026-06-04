"use server";

export async function getVerseAITips(arabic: string, translation: string) {
  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "HTTP-Referer": "http://localhost:3000", 
        "X-Title": "HifzApp",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-lite",
        messages: [
          {
            role: "system",
            content: "Tu es un professeur de Coran (Ustadh) bienveillant, expert en mémorisation (Hifz) et en Tafsir. Ton but est d'aider l'utilisateur à comprendre et mémoriser le Coran. Tu dois répondre UNIQUEMENT en français, de manière très concise (3 phrases maximum) et utiliser un ton encourageant."
          },
          {
            role: "user",
            content: `Aide-moi à mémoriser ce verset. Donne-moi une très brève explication (contexte/tafsir) et une petite astuce mnémotechnique (par exemple sur les mots clés arabes).\n\nArabe : ${arabic}\nTraduction : ${translation}`
          }
        ]
      })
    });

    if (!response.ok) {
      throw new Error(`Erreur API OpenRouter: ${response.status}`);
    }

    const data = await response.json();
    return { text: data.choices[0].message.content };
  } catch (error) {
    console.error("Erreur getVerseAITips:", error);
    return { error: "L'assistant IA est temporairement indisponible." };
  }
}

export async function getDailyMotivation(userName: string, streak: number) {
  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "HTTP-Referer": "http://localhost:3000",
        "X-Title": "HifzApp",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-lite",
        messages: [
          {
            role: "system",
            content: "Tu es un mentor spirituel musulman. Ton rôle est de motiver l'utilisateur pour sa session de mémorisation du Coran du jour. Réponds en 2 phrases maximum, avec beaucoup d'enthousiasme."
          },
          {
            role: "user",
            content: `L'utilisateur s'appelle ${userName} et il a une série (streak) de ${streak} jours consécutifs. Donne-lui un message de motivation personnalisé pour l'encourager à faire sa session d'aujourd'hui.`
          }
        ]
      })
    });

    if (!response.ok) {
      throw new Error(`Erreur API OpenRouter: ${response.status}`);
    }

    const data = await response.json();
    return { text: data.choices[0].message.content };
  } catch (error) {
    console.error("Erreur getDailyMotivation:", error);
    return { error: "Motivation non disponible" };
  }
}

export async function generatePersonalizedPlan(profileData: {
  type: string;
  ageRange: string;
  dailyMinutes: number;
  level: string;
  objective: string;
}) {
  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "HTTP-Referer": "http://localhost:3000",
        "X-Title": "HifzApp",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-lite",
        response_format: { type: "json_object" },
        messages: [
          {
            role: "system",
            content: `Tu es un expert en pédagogie coranique (Hifz). Ton rôle est d'analyser le profil d'un étudiant et de générer un plan de mémorisation (PMP) sur-mesure et réaliste. 
Tu DOIS répondre UNIQUEMENT avec un objet JSON valide ayant exactement cette structure :
{
  "versesPerDay": nombre (combien de versets par jour),
  "recommendedMethods": tableau de chaines (choisir parmi: "TIKRAR", "SAMAA", "KITABA", "SRS"),
  "milestone30": chaine (objectif réaliste à 30 jours, ex: "Moitié de Juz Amma"),
  "milestone90": chaine (objectif réaliste à 90 jours),
  "milestone180": chaine (objectif réaliste à 6 mois)
}`
          },
          {
            role: "user",
            content: `Génère le plan pour ce profil :
- Type : ${profileData.type}
- Âge : ${profileData.ageRange}
- Temps disponible : ${profileData.dailyMinutes} minutes/jour
- Niveau actuel : ${profileData.level}
- Objectif principal : ${profileData.objective}`
          }
        ]
      })
    });

    if (!response.ok) {
      throw new Error(`Erreur API OpenRouter: ${response.status}`);
    }

    const data = await response.json();
    const plan = JSON.parse(data.choices[0].message.content);
    return plan;
  } catch (error) {
    console.error("Erreur generatePersonalizedPlan:", error);
    // Fallback de sécurité si l'IA échoue
    return {
      versesPerDay: Math.max(1, Math.floor(profileData.dailyMinutes / 10)),
      recommendedMethods: ["TIKRAR", "SRS"],
      milestone30: "Début des objectifs",
      milestone90: "Progression intermédiaire",
      milestone180: "Progression avancée"
    };
  }
}
