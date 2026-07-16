import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Questions fréquemment posées sur Clé d'Infos.",
};

export default function FAQPage() {
  const faqs = [
    {
      question: "Qu'est-ce que Clé d'Infos ?",
      answer:
        "Clé d'Infos est un média numérique qui publie des actualités nationales et internationales.",
    },
    {
      question: "Les informations sont-elles vérifiées ?",
      answer:
        "Oui. Toutes nos informations sont vérifiées avant publication.",
    },
    {
      question: "Puis-je partager les articles ?",
      answer:
        "Oui. Vous pouvez partager nos articles via Facebook, WhatsApp ou X.",
    },
    {
      question: "Comment contacter la rédaction ?",
      answer:
        "Vous pouvez utiliser notre page Contact pour nous écrire.",
    },
    {
      question: "Comment recevoir les dernières actualités ?",
      answer:
        "Abonnez-vous gratuitement à notre newsletter.",
    },
  ];

  return (
    <main className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-5xl font-bold mb-4">
        Questions fréquentes
      </h1>

      <p className="text-gray-600 mb-12">
        Retrouvez les réponses aux questions les plus posées.
      </p>

      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <details
            key={index}
            className="rounded-xl border p-6 bg-white shadow-sm"
          >
            <summary className="cursor-pointer text-xl font-semibold">
              {faq.question}
            </summary>

            <p className="mt-4 text-gray-600 leading-7">
              {faq.answer}
            </p>
          </details>
        ))}
      </div>
    </main>
  );
}