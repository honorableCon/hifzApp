import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  ),
  title: {
    default: "HifzApp — Plateforme de mémorisation du Coran",
    template: "%s · HifzApp",
  },
  description:
    "Plan personnalisé, SRS, audio, gamification et suivi familial pour structurer la mémorisation du Coran.",
  applicationName: "HifzApp",
  keywords: [
    "Hifz",
    "Coran",
    "mémorisation",
    "SRS",
    "tajwid",
    "mushaf",
  ],
  authors: [{ name: "HifzApp" }],
  creator: "HifzApp",
  publisher: "HifzApp",
  openGraph: {
    title: "HifzApp — Plateforme de mémorisation du Coran",
    description:
      "Plan personnalisé, SRS, audio, gamification et suivi familial pour structurer la mémorisation du Coran.",
    url: "/",
    siteName: "HifzApp",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HifzApp — Plateforme de mémorisation du Coran",
    description:
      "Plan personnalisé, SRS, audio, gamification et suivi familial pour structurer la mémorisation du Coran.",
  },
  appleWebApp: {
    capable: true,
    title: "HifzApp",
    statusBarStyle: "black-translucent",
  },
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className="h-full scroll-smooth antialiased"
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
