import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "HifzApp — Plateforme de mémorisation du Coran",
    short_name: "HifzApp",
    description:
      "Plan personnalisé, SRS, audio et progression pour la mémorisation du Coran.",
    start_url: "/",
    display: "standalone",
    background_color: "#f7f3e8",
    theme_color: "#052e24",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
