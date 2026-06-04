"use client";

import { useActionState } from "react";
import Link from "next/link";
import { authenticate } from "../actions/auth";

export function LoginForm() {
  const [errorMessage, dispatch, isPending] = useActionState(authenticate, undefined);

  return (
    <form action={dispatch} className="space-y-6">
      {errorMessage && (
        <div className="rounded-xl bg-red-100 p-4 text-sm font-bold text-red-900">
          {errorMessage}
        </div>
      )}

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
          className="mt-1 block w-full rounded-xl border border-emerald-900/20 bg-white px-4 py-3 text-emerald-900 outline-none focus:border-emerald-500 focus:ring-emerald-500"
          placeholder="••••••••"
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-full bg-emerald-900 px-5 py-4 text-center text-sm font-bold text-white shadow-xl shadow-emerald-950/15 transition hover:bg-emerald-800 disabled:opacity-50"
      >
        {isPending ? "Connexion en cours..." : "Se connecter"}
      </button>

      <p className="text-center text-sm text-emerald-950/70">
        Pas encore de compte ?{" "}
        <Link href="/register" className="font-bold text-emerald-800 hover:underline">
          Inscrivez-vous
        </Link>
      </p>
    </form>
  );
}
