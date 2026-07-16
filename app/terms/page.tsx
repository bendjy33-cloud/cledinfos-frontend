import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conditions d'utilisation",
  description: "Conditions d'utilisation de Clé d'Infos.",
};

export default function TermsPage() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-5xl font-bold mb-10">
        Conditions d'utilisation
      </h1>

      <div className="prose lg:prose-lg max-w-none">

        <p>
          Bienvenue sur Clé d'Infos. En utilisant ce site, vous acceptez les
          présentes conditions d'utilisation.
        </p>

        <h2>Utilisation du site</h2>

        <p>
          Les informations publiées sur Clé d'Infos sont destinées à informer le
          public. Elles ne doivent pas être utilisées à des fins illégales.
        </p>

        <h2>Propriété intellectuelle</h2>

        <p>
          Les textes, images, logos et autres contenus publiés sur ce site sont
          protégés par les lois relatives à la propriété intellectuelle. Toute
          reproduction sans autorisation est interdite.
        </p>

        <h2>Responsabilité</h2>

        <p>
          Clé d'Infos s'efforce de fournir des informations fiables, mais ne
          garantit pas l'absence totale d'erreurs ou d'omissions.
        </p>

        <h2>Liens externes</h2>

        <p>
          Notre site peut contenir des liens vers d'autres sites. Nous ne sommes
          pas responsables de leur contenu ni de leurs politiques.
        </p>

        <h2>Modification des conditions</h2>

        <p>
          Ces conditions peuvent être modifiées à tout moment afin de tenir
          compte des évolutions du site ou de la législation.
        </p>

        <h2>Contact</h2>

        <p>
          Pour toute question concernant ces conditions, veuillez utiliser notre
          page Contact.
        </p>

      </div>
    </main>
  );
}