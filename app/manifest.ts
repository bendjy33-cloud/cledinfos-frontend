import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",

    name: "Clé d'Infos",

    short_name: "Clé d'Infos",

    description:
      "Toute l'actualité en temps réel : politique, sport, économie, culture et société.",

    start_url: "/",

    scope: "/",

    display: "standalone",

    orientation: "portrait",

    lang: "fr",

    background_color: "#ffffff",

    theme_color: "#dc2626",

    categories: [
      "news",
      "magazine",
      "media",
    ],

    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}