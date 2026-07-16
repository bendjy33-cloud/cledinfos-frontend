import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactez l'équipe de Clé d'Infos pour toute question, suggestion, partenariat ou demande d'information.",

  openGraph: {
    title: "Contact | Clé d'Infos",
    description:
      "Contactez l'équipe de Clé d'Infos.",
    type: "website",
  },
};

export default function ContactPage() {
  return <ContactClient />;
}