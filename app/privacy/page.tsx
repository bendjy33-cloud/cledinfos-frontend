import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de Confidentialité",
  description: "Politique de confidentialité de Clé d'Infos.",
};

export default function PrivacyPage() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-5xl font-bold mb-10">
        Politique de Confidentialité
      </h1>

      <div className="prose lg:prose-lg max-w-none">

        <p>
          Chez <strong>Clé d'Infos</strong>, nous accordons une grande importance
          à la protection de votre vie privée.
        </p>

        <h2>Informations collectées</h2>

        <p>
          Nous pouvons collecter certaines informations telles que votre nom,
          votre adresse e-mail ainsi que des données de navigation lorsque vous
          utilisez notre site.
        </p>

        <h2>Cookies</h2>

        <p>
          Notre site utilise des cookies afin d'améliorer votre expérience,
          mesurer l'audience et personnaliser certains contenus.
        </p>

        <h2>Google Analytics</h2>

        <p>
          Nous utilisons Google Analytics afin d'analyser le trafic du site et
          améliorer nos services. Google peut collecter certaines informations
          anonymes concernant votre navigation.
        </p>

        <h2>Publicités</h2>

        <p>
          À l'avenir, notre site pourra utiliser Google AdSense afin d'afficher
          des publicités personnalisées.
        </p>

        <h2>Protection des données</h2>

        <p>
          Nous mettons en œuvre des mesures raisonnables afin de protéger vos
          informations contre tout accès non autorisé.
        </p>

        <h2>Nous contacter</h2>

        <p>
          Pour toute question concernant cette politique, veuillez utiliser la
          page Contact du site.
        </p>

      </div>
    </main>
  );
}