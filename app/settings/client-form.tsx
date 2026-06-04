"use client";

import { useState } from "react";
import { updateProfileSettings } from "../actions/settings";
import { useRouter } from "next/navigation";

type ProfileData = {
  dailyMinutes: number;
  objective: string;
  preferredMethod: string;
  preferredReciter: string;
};

export function SettingsForm({ initialData }: { initialData: ProfileData }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    try {
      await updateProfileSettings(formData);
      alert("Paramètres mis à jour avec succès !");
      router.refresh();
    } catch (error) {
      alert("Erreur lors de la mise à jour.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="block text-sm font-bold text-emerald-950">Temps quotidien (min)</label>
          <input
            type="number"
            name="dailyMinutes"
            defaultValue={initialData.dailyMinutes}
            required
            className="mt-1 block w-full rounded-xl border border-emerald-900/20 bg-white px-4 py-3 text-emerald-900 outline-none focus:border-emerald-500"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-emerald-950">Objectif principal</label>
          <input
            type="text"
            name="objective"
            defaultValue={initialData.objective}
            required
            className="mt-1 block w-full rounded-xl border border-emerald-900/20 bg-white px-4 py-3 text-emerald-900 outline-none focus:border-emerald-500"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-emerald-950">Méthode de mémorisation</label>
          <select
            name="preferredMethod"
            defaultValue={initialData.preferredMethod}
            required
            className="mt-1 block w-full rounded-xl border border-emerald-900/20 bg-white px-4 py-3 text-emerald-900 outline-none focus:border-emerald-500"
          >
            <option value="TIKRAR">Tikrar (Répétition)</option>
            <option value="SAMAA">Samaa (Écoute)</option>
            <option value="KITABA">Kitaba (Écriture)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-bold text-emerald-950">Récitateur favori</label>
          <input
            type="text"
            name="preferredReciter"
            defaultValue={initialData.preferredReciter}
            required
            className="mt-1 block w-full rounded-xl border border-emerald-900/20 bg-white px-4 py-3 text-emerald-900 outline-none focus:border-emerald-500"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="rounded-full bg-emerald-900 px-8 py-3 text-sm font-bold text-white transition hover:bg-emerald-800 disabled:opacity-50"
      >
        {loading ? "Sauvegarde..." : "Sauvegarder les modifications"}
      </button>
    </form>
  );
}
