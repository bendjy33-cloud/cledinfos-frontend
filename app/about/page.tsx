import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "Découvrez Clé d'Infos, notre mission, nos valeurs et notre équipe.",
};

export default function AboutPage() {
  return (
    <main className="max-w-7xl mx-auto px-6 py-12">

      {/* Hero */}
      <section className="text-center mb-20">

        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          À propos de Clé d'Infos
        </h1>

        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-8">
          Clé d'Infos est un média numérique indépendant qui informe
          ses lecteurs avec rapidité, impartialité et professionnalisme.
        </p>

      </section>

      {/* Qui sommes-nous */}
      <section className="mb-20">

        <h2 className="text-4xl font-bold mb-6">
          Qui sommes-nous ?
        </h2>

        <p className="text-gray-700 leading-8 text-lg">
          Clé d'Infos est une plateforme d'information moderne couvrant
          l'actualité nationale et internationale.
          Nous publions chaque jour des informations fiables sur
          la politique, l'économie, le sport, la culture,
          la technologie et bien d'autres sujets.
        </p>

      </section>

      {/* Mission */}
      <section className="mb-20">

        <h2 className="text-4xl font-bold mb-6">
          Notre mission
        </h2>

        <p className="text-gray-700 leading-8 text-lg">
          Notre mission est de fournir une information claire,
          fiable et accessible à tous afin d'aider chaque lecteur
          à mieux comprendre l'actualité et les enjeux du monde.
        </p>

      </section>

      {/* Vision */}
      <section className="mb-20">

        <h2 className="text-4xl font-bold mb-6">
          Notre vision
        </h2>

        <p className="text-gray-700 leading-8 text-lg">
          Devenir une référence de l'information numérique en Haïti
          et dans la Caraïbe en proposant un journalisme moderne,
          indépendant et proche de ses lecteurs.
        </p>

      </section>

      {/* Valeurs */}

      <section className="mb-20">

        <h2 className="text-4xl font-bold text-center mb-10">
          Nos Valeurs
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">

            <div className="text-5xl mb-4">✔️</div>

            <h3 className="text-2xl font-bold mb-3">
              Vérité
            </h3>

            <p className="text-gray-600">
              Des informations vérifiées avant toute publication.
            </p>

          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">

            <div className="text-5xl mb-4">🤝</div>

            <h3 className="text-2xl font-bold mb-3">
              Transparence
            </h3>

            <p className="text-gray-600">
              Un travail honnête, responsable et indépendant.
            </p>

          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">

            <div className="text-5xl mb-4">🎯</div>

            <h3 className="text-2xl font-bold mb-3">
              Professionnalisme
            </h3>

            <p className="text-gray-600">
              Nous respectons les meilleures pratiques journalistiques.
            </p>

          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">

            <div className="text-5xl mb-4">❤️</div>

            <h3 className="text-2xl font-bold mb-3">
              Respect
            </h3>

            <p className="text-gray-600">
              Respect de nos lecteurs, de nos sources et des faits.
            </p>

          </div>

        </div>

      </section>

      {/* Nos chiffres */}

      <section className="mb-24">

        <h2 className="text-4xl font-bold text-center mb-10">
          Clé d'Infos en chiffres
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          <div className="bg-red-600 text-white rounded-2xl p-8 text-center">

            <h3 className="text-5xl font-bold">
              500+
            </h3>

            <p className="mt-4 text-lg">
              Articles publiés
            </p>

          </div>

          <div className="bg-red-600 text-white rounded-2xl p-8 text-center">

            <h3 className="text-5xl font-bold">
              10+
            </h3>

            <p className="mt-4 text-lg">
              Catégories
            </p>

          </div>

          <div className="bg-red-600 text-white rounded-2xl p-8 text-center">

            <h3 className="text-5xl font-bold">
              24/7
            </h3>

            <p className="mt-4 text-lg">
              Actualités
            </p>

          </div>

          <div className="bg-red-600 text-white rounded-2xl p-8 text-center">

            <h3 className="text-5xl font-bold">
              100%
            </h3>

            <p className="mt-4 text-lg">
              Informations vérifiées
            </p>

          </div>

        </div>

      </section>

      {/* Notre équipe */}

      <section>

        <h2 className="text-4xl font-bold text-center mb-4">
          Notre Équipe
        </h2>

        <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
          Une équipe passionnée qui travaille chaque jour pour offrir
          une information fiable et de qualité.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">

          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition p-6 text-center">

            <Image
              src="/team-placeholder.jpeg"
              alt="Claude Bernard FRANÇOIS"
              width={150}
              height={150}
              className="rounded-full mx-auto border-4 border-red-600 object-cover"
            />

            <h3 className="text-xl font-bold mt-5">
              Claude Bernard FRANÇOIS
            </h3>

            <p className="text-red-600 font-semibold mt-2">
              CEO || HOST
            </p>

          </div>

          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition p-6 text-center">

            <Image
              src="/team-placeholder.jpeg"
              alt="Marc-Rock Bendjy JEAN"
              width={150}
              height={150}
              className="rounded-full mx-auto border-4 border-red-600 object-cover"
            />

            <h3 className="text-xl font-bold mt-5">
              Marc-Rock Bendjy JEAN
            </h3>

            <p className="text-red-600 font-semibold mt-2">
              Informaticien || Web Developer
            </p>

          </div>

          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition p-6 text-center">

            <Image
              src="/team-placeholder.jpeg"
              alt="Storly MARSEILLE"
              width={150}
              height={150}
              className="rounded-full mx-auto border-4 border-red-600 object-cover"
            />

            <h3 className="text-xl font-bold mt-5">
              Storly MARSEILLE
            </h3>

            <p className="text-red-600 font-semibold mt-2">
              Assistant Vidéaste || Photographer
            </p>

          </div>

          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition p-6 text-center">

            <Image
              src="/team-placeholder.jpeg"
              alt="Zacharie MORLAN"
              width={150}
              height={150}
              className="rounded-full mx-auto border-4 border-red-600 object-cover"
            />

            <h3 className="text-xl font-bold mt-5">
              Zacharie MORLAN
            </h3>

            <p className="text-red-600 font-semibold mt-2">
              Designer
            </p>

          </div>

        </div>

      </section>

    </main>
  );
}