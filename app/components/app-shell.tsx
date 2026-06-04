"use client";

import Link from "next/link";
import { navigation } from "../data";
import { useState } from "react";

export function AppHeader({ session }: { session: any }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-emerald-950/10 bg-[#f7f3e8]/85 backdrop-blur-xl">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-4 lg:px-8"
        aria-label="Navigation principale"
      >
        <Link href="/" className="flex items-center gap-3">
          <span className="grid size-11 place-items-center rounded-2xl bg-emerald-900 text-xl text-amber-200 shadow-lg shadow-emerald-950/15">
            ح
          </span>
          <span>
            <span className="block text-lg font-black tracking-tight text-emerald-950">
              HifzApp
            </span>
            <span className="block text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
              Memorisation
            </span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-1 rounded-full border border-emerald-950/10 bg-white/65 p-1 shadow-sm lg:flex">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm font-semibold text-emerald-950/75 transition hover:bg-emerald-900 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2 text-emerald-950"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Desktop Auth Buttons */}
        <div className="hidden lg:flex items-center gap-4">
          {session ? (
            <>
              <Link
                href="/dashboard"
                className="rounded-full bg-emerald-100 px-5 py-3 text-sm font-bold text-emerald-950 transition hover:bg-emerald-200"
              >
                Dashboard
              </Link>
              <form action="/api/auth/signout" method="POST">
                <button
                  type="submit"
                  className="rounded-full bg-emerald-900 px-5 py-3 text-sm font-bold text-white shadow-xl shadow-emerald-950/15 transition hover:-translate-y-0.5 hover:bg-emerald-800"
                >
                  Déconnexion
                </button>
              </form>
            </>
          ) : (
            <Link
              href="/login"
              className="rounded-full bg-emerald-900 px-5 py-3 text-sm font-bold text-white shadow-xl shadow-emerald-950/15 transition hover:-translate-y-0.5 hover:bg-emerald-800"
            >
              Connexion
            </Link>
          )}
        </div>
      </nav>

      {/* Mobile Navigation Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-[#f7f3e8] border-b border-emerald-950/10 shadow-lg py-4 px-5 flex flex-col gap-4">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block font-bold text-emerald-950 text-lg py-2"
            >
              {item.label}
            </Link>
          ))}
          <hr className="border-emerald-950/10 my-2" />
          {session ? (
            <>
              <Link
                href="/dashboard"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-center rounded-full bg-emerald-100 px-5 py-3 text-sm font-bold text-emerald-950"
              >
                Dashboard
              </Link>
              <form action="/api/auth/signout" method="POST">
                <button
                  type="submit"
                  className="w-full rounded-full bg-emerald-900 px-5 py-3 text-sm font-bold text-white"
                >
                  Déconnexion
                </button>
              </form>
            </>
          ) : (
            <Link
              href="/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-center rounded-full bg-emerald-900 px-5 py-3 text-sm font-bold text-white"
            >
              Connexion
            </Link>
          )}
        </div>
      )}
    </header>
  );
}

export function AppFooter() {
  return (
    <footer className="border-t border-emerald-950/10 bg-emerald-950 px-5 py-10 text-emerald-50">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-lg font-black">HifzApp</p>
          <p className="mt-2 max-w-xl text-sm leading-6 text-emerald-50/70">
            Prototype MVP basé sur le CDC : plan personnalisé, SRS,
            gamification, parcours enfant et expérience RTL/LTR.
          </p>
        </div>
        <Link
          href="/settings"
          className="w-fit rounded-full border border-emerald-50/20 px-5 py-3 text-sm font-bold text-emerald-50 transition hover:bg-emerald-50 hover:text-emerald-950"
        >
          Paramètres
        </Link>
      </div>
    </footer>
  );
}

export function PageFrame({ children, session }: { children: React.ReactNode, session?: any }) {
  return (
    <div className="min-h-screen bg-[#f7f3e8] text-emerald-950">
      <AppHeader session={session} />
      {children}
      <AppFooter />
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <section className="mx-auto max-w-7xl px-5 pb-8 pt-12 lg:px-8 lg:pt-16">
      <p className="text-sm font-black uppercase tracking-[0.32em] text-amber-700">
        {eyebrow}
      </p>
      <h1 className="mt-4 max-w-4xl text-4xl font-black tracking-tight text-emerald-950 md:text-6xl">
        {title}
      </h1>
      <p className="mt-5 max-w-3xl text-lg leading-8 text-emerald-950/70">
        {description}
      </p>
    </section>
  );
}
