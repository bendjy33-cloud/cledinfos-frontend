import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";

import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";

import { routing } from "@/i18n/routing";

import BackToTop from "@/components/BackToTop";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getSettings, getBreakingNews } from "@/lib/api";

import { GoogleAnalytics } from "@next/third-parties/google";

import CookieBanner from "@/components/CookieBanner";
import BreakingNews from "@/components/BreakingNews";
import OrganizationSchema from "@/components/SEO/OrganizationSchema";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const t = await getTranslations({
    locale,
    namespace: "Layout",
  });

  return {
    title: {
      default: t("defaultTitle"),
      template: "%s | Clé d'Infos",
    },
    description: t("description"),
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;

  params: Promise<{
    locale: string;
  }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  const settings = await getSettings();

  const breakingResponse = await getBreakingNews(locale);

  const breakingNews =
    breakingResponse.data ?? [];

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full`}
    >
      <body
        className="
          min-h-screen
          flex
          flex-col
          antialiased
          overflow-x-hidden
        "
      >
        <NextIntlClientProvider messages={messages}>

          <OrganizationSchema settings={settings} />

          <BreakingNews news={breakingNews} />

          <Header />

          <main className="flex-1">
            {children}
          </main>

          <Footer settings={settings} />

          <BackToTop />

          <CookieBanner />

          <GoogleAnalytics
            gaId="G-JEC19CYXG1"
          />

        </NextIntlClientProvider>
      </body>
    </html>
  );
}