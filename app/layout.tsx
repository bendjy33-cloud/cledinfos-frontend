import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import BackToTop from "@/components/BackToTop";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getSettings } from "@/lib/api";
import { GoogleAnalytics } from "@next/third-parties/google";
import CookieBanner from "@/components/CookieBanner";
import ThemeProvider from "@/components/ThemeProvider";
import BreakingNews from "@/components/BreakingNews";
import { getBreakingNews } from "@/lib/api";
import OrganizationSchema from "@/components/SEO/OrganizationSchema";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "http://localhost:3000";


export const metadata: Metadata = {

  title: {
    default: "Clé d'Infos - Actualités nationales et internationales",
    template: "%s | Clé d'Infos",
  },


  description:
    "Clé d'Infos vous informe avec des actualités fiables, rapides et vérifiées.",


  keywords: [
    "actualité",
    "information",
    "politique",
    "sport",
    "culture",
    "international",
    "Clé d'Infos",
  ],


  metadataBase:
    new URL(SITE_URL),


  openGraph: {

    title:
      "Clé d'Infos - Actualités",

    description:
      "Les dernières informations nationales et internationales.",

    url:
      SITE_URL,

    siteName:
      "Clé d'Infos",

    locale:
      "fr_FR",

    type:
      "website",

    images: [
      {
        url:
          "/og-image.png",

        width:
          1200,

        height:
          630,

        alt:
          "Clé d'Infos",
      },
    ],

  },


  twitter: {

    card:
      "summary_large_image",

    title:
      "Clé d'Infos",

    description:
      "Actualités nationales et internationales.",

    images:
      ["/og-image.png"],

  },


  icons: {

    icon:
      "/favicon.ico",

  },

};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSettings();
  const breakingResponse = await getBreakingNews();

  const breakingNews = breakingResponse.data ?? [];

  return (
   <html
      lang="fr"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-screen flex flex-col">

        <OrganizationSchema settings={settings} />

        <ThemeProvider>

          <BreakingNews news={breakingNews} />

          <Header />

          <main className="flex-1">
            {children}
          </main>

          <Footer settings={settings} />

          <BackToTop />

          <CookieBanner />

          <GoogleAnalytics gaId="G-JEC19CYXG1" />

        </ThemeProvider>

      </body>
    </html>
  );
}