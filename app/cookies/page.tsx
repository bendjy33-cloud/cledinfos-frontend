import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique relative aux Cookies",
  description: "Politique relative aux cookies de Clé d'Infos.",
};

export default function CookiesPage() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-5xl font-bold mb-10">
        Politique relative aux Cookies
      </h1>

      <div className="prose lg:prose-lg max-w-none">

        <p>
          Clé d'Infos utilise des cookies afin d'améliorer votre expérience de
          navigation et de fournir certains services.
        </p>

        <h2>Que sont les cookies ?</h2>

        <p>
          Les cookies sont de petits fichiers enregistrés sur votre appareil
          lorsque vous visitez notre site.
        </p>

        <h2>Pourquoi utilisons-nous des cookies ?</h2>

        <ul>
          <li>Améliorer les performances du site.</li>
          <li>Mesurer l'audience grâce à Google Analytics.</li>
          <li>Mémoriser certaines préférences.</li>
          <li>Afficher des contenus et publicités adaptés.</li>
        </ul>

        <h2>Gestion des cookies</h2>

        <p>
          Vous pouvez accepter, refuser ou supprimer les cookies directement
          depuis les paramètres de votre navigateur.
        </p>

        <h2>Modification de cette politique</h2>

        <p>
          Cette politique peut être mise à jour à tout moment afin de respecter
          les évolutions légales ou techniques.
        </p>

      </div>
    </main>
  );
}