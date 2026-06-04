"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createInitialProfile } from "../actions/dashboard";

export function OnboardingForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    
    try {
      await createInitialProfile({
        type: formData.get("type") as any,
        ageRange: formData.get("ageRange") as string,
        dailyMinutes: Number(formData.get("dailyMinutes")),
        level: formData.get("level") as string,
        objective: formData.get("objective") as string,
        preferredMethod: formData.get("preferredMethod") as string,
        preferredReciter: formData.get("preferredReciter") as string,
      });

      router.push("/dashboard");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Erreur lors de la création du profil");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-xl mx-auto">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-bold text-emerald-950">Qui êtes-vous ?</label>
          <select name="type" required className="mt-1 block w-full rounded-xl border border-emerald-900/20 px-4 py-3 bg-white text-emerald-900 focus:border-emerald-500 focus:ring-emerald-500 outline-none">
            <option value="ACTIVE_ADULT">Adulte Actif</option>
            <option value="CHILD">Enfant</option>
            <option value="TEEN">Adolescent</option>
            <option value="INTENSIVE_STUDENT">Étudiant Intensif</option>
            <option value="SENIOR">Senior</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-emerald-950">Âge</label>
            <input type="text" name="ageRange" placeholder="ex: 25-35" required className="mt-1 block w-full rounded-xl border border-emerald-900/20 px-4 py-3 bg-white text-emerald-900 outline-none" />
          </div>
          <div>
            <label className="block text-sm font-bold text-emerald-950">Temps / jour (min)</label>
            <input type="number" name="dailyMinutes" defaultValue={25} required className="mt-1 block w-full rounded-xl border border-emerald-900/20 px-4 py-3 bg-white text-emerald-900 outline-none" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-emerald-950">Niveau Actuel</label>
          <select name="level" required className="mt-1 block w-full rounded-xl border border-emerald-900/20 px-4 py-3 bg-white text-emerald-900 outline-none">
            <option value="BEGINNER">Débutant (Sait lire)</option>
            <option value="INTERMEDIATE">Intermédiaire (Quelques Hizb)</option>
            <option value="ADVANCED">Avancé (Plus de 10 Juz)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-bold text-emerald-950">Objectif (PMP)</label>
          <input type="text" name="objective" placeholder="ex: Juz Amma" required className="mt-1 block w-full rounded-xl border border-emerald-900/20 px-4 py-3 bg-white text-emerald-900 outline-none" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-emerald-950">Méthode préférée</label>
            <select name="preferredMethod" required className="mt-1 block w-full rounded-xl border border-emerald-900/20 px-4 py-3 bg-white text-emerald-900 outline-none">
              <option value="TIKRAR">Tikrar (Répétition)</option>
              <option value="SAMAA">Samaa (Écoute)</option>
              <option value="KITABA">Kitaba (Écriture)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold text-emerald-950">Récitateur favori</label>
            <input type="text" name="preferredReciter" defaultValue="Mishary Rashid" required className="mt-1 block w-full rounded-xl border border-emerald-900/20 px-4 py-3 bg-white text-emerald-900 outline-none" />
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-full bg-emerald-900 px-5 py-4 text-center text-sm font-bold text-white shadow-xl shadow-emerald-950/15 transition hover:bg-emerald-800 disabled:opacity-50"
      >
        {loading ? "Création du profil..." : "Générer mon Plan de Mémorisation"}
      </button>
    </form>
  );
}
