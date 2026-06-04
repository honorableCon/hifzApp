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
          <div className="flex items-center gap-3">
              <span>
                <span className="block text-lg font-black tracking-tight text-emerald-950">
                  HifzApp
                </span>
                <span className="block text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
                  Memorisation
                </span>
              </span>
              <span className="hidden md:inline-block rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">
                V1.0
              </span>
            </div>
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
    <>
      <footer className="hidden lg:block border-t border-emerald-950/10 bg-emerald-950 px-5 py-10 text-emerald-50">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-lg font-black">HifzApp</p>
            <p className="mt-2 max-w-xl text-sm leading-6 text-emerald-50/70">
                Application complète pour la mémorisation du Coran avec un système de répétition espacée, parcours personnalisé et motivation IA.
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

      {/* Mobile Bottom Tab Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#f7f3e8]/90 backdrop-blur-xl border-t border-emerald-950/10 pb-safe">
        <div className="flex justify-around items-center h-16 px-2">
          <Link href="/dashboard" className="flex flex-col items-center justify-center w-full h-full text-emerald-950 hover:text-emerald-700 transition">
            <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span className="text-[10px] font-bold">Accueil</span>
          </Link>
          
          <Link href="/session" className="flex flex-col items-center justify-center w-full h-full text-emerald-950 hover:text-emerald-700 transition relative">
            <div className="absolute -top-4 bg-emerald-900 text-amber-200 p-3 rounded-full shadow-lg border-4 border-[#f7f3e8]">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-[10px] font-bold mt-7">Session</span>
          </Link>

          <Link href="/quran" className="flex flex-col items-center justify-center w-full h-full text-emerald-950 hover:text-emerald-700 transition">
            <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <span className="text-[10px] font-bold">Mushaf</span>
          </Link>

          <Link href="/progress" className="flex flex-col items-center justify-center w-full h-full text-emerald-950 hover:text-emerald-700 transition">
            <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <span className="text-[10px] font-bold">Suivi</span>
          </Link>
        </div>
      </nav>
    </>
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
