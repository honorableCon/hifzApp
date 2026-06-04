"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { registerUser } from "../actions/auth";

export function RegisterForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const res = await registerUser(formData);

    if (res?.error) {
      setError(res.error);
      setLoading(false);
    } else {
      router.push("/login?registered=true");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="rounded-xl bg-red-100 p-4 text-sm font-bold text-red-900">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-bold text-emerald-950">Prénom ou Pseudo</label>
        <input
          type="text"
          name="name"
          required
          className="mt-1 block w-full rounded-xl border border-emerald-900/20 bg-white px-4 py-3 text-emerald-900 outline-none focus:border-emerald-500 focus:ring-emerald-500"
          placeholder="Tariq"
        />
      </div>

      <div>
        <label className="block text-sm font-bold text-emerald-950">Email</label>
        <input
          type="email"
          name="email"
          required
          className="mt-1 block w-full rounded-xl border border-emerald-900/20 bg-white px-4 py-3 text-emerald-900 outline-none focus:border-emerald-500 focus:ring-emerald-500"
          placeholder="tariq@exemple.com"
        />
      </div>

      <div>
        <label className="block text-sm font-bold text-emerald-950">Mot de passe</label>
        <input
          type="password"
          name="password"
          required
          minLength={6}
          className="mt-1 block w-full rounded-xl border border-emerald-900/20 bg-white px-4 py-3 text-emerald-900 outline-none focus:border-emerald-500 focus:ring-emerald-500"
          placeholder="••••••••"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-full bg-emerald-900 px-5 py-4 text-center text-sm font-bold text-white shadow-xl shadow-emerald-950/15 transition hover:bg-emerald-800 disabled:opacity-50"
      >
        {loading ? "Création du compte..." : "S'inscrire"}
      </button>

      <p className="text-center text-sm text-emerald-950/70">
        Vous avez déjà un compte ?{" "}
        <Link href="/login" className="font-bold text-emerald-800 hover:underline">
          Connectez-vous
        </Link>
      </p>
    </form>
  );
}
