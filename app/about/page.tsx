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
          Clé d'Infos est un média numérique engagé à apporter une information claire,
           fiable et rapide au public. Voici une présentation 
           détaillée de notre identité, de notre mission et de notre vision.
        </p>

      </section>

      {/* Qui sommes-nous */}
      <section className="mb-20">

        <h2 className="text-4xl font-bold mb-6">
          Qui sommes-nous ?
        </h2>

        <p className="text-gray-700 leading-8 text-lg">
          Clé d'Infos est une plateforme médiatique moderne, indépendante et dynamique. Porté par 
          une équipe de journalistes et de créateurs de contenu passionnés, notre média croit 
          fermement au pouvoir d'une information de qualité. Dans un monde saturé par les rumeurs 
          et les fausses informations (fake news), nous nous positionnons comme la « clé » qui ouvre 
          la porte de la vérité, en offrant des faits vérifiés, objectifs et utiles au quotidien. 
        </p>

      </section>

      {/* Mission */}
      <section className="mb-20">

        <h2 className="text-4xl font-bold mb-6">
          Notre mission 🎯
           
          « Éclairer les esprits grâce à une information à forte valeur ajoutée. »
        </h2>

        <p className="text-gray-700 leading-8 text-lg">
        Notre mission principale s'articule autour de trois grands axes : 

        ● Informer et éduquer : Diffuser l'actualité locale et internationale, tout en abordant 
        des sujets liés à l'éducation, la technologie, la culture et l'économie. 
        ● Lutter contre la désinformation : Traquer les fausses rumeurs et vérifier 
        rigoureusement les faits afin de garantir la publication d'une information 
        exclusivement véridique. 
        ● Donner de la voix aux citoyens : Servir de canal d'expression pour la population 
        afin de relayer ses réalités, ses défis et ses aspirations.
        </p>

      </section>

      {/* Vision */}
      <section className="mb-20">

        <h2 className="text-4xl font-bold mb-6">
          Notre vision
        </h2>

        <p className="text-gray-700 leading-8 text-lg">
         Notre ambition pour l'avenir est de : 
          ● Devenir la référence absolue : S'imposer comme la source d'information 
          incontournable vers laquelle le public se tourne naturellement pour obtenir des faits 
          authentiques. 
          ● Bâtir une société mieux informée : Favoriser l'émergence d'un citoyen conscient et 
          éclairé, capable de prendre les meilleures décisions pour son avenir. 
          ● Innover dans le traitement de l'information : Utiliser les nouvelles technologies et 
          les formats modernes (vidéos dynamiques, podcasts, réseaux sociaux) pour rendre 
          l'information plus accessible, interactive et captivante.
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
              L'Intégrité 
            </h3>

            <p className="text-gray-600">
               Nous recherchons la vérité et la restituons de manière honnête. 

            </p>

          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">

            <div className="text-5xl mb-4">🤝</div>

            <h3 className="text-2xl font-bold mb-3">
              L'Objectivité
            </h3>

            <p className="text-gray-600">
              Nous traitons l'information de façon neutre, équilibrée et sans parti 
pris
            </p>

          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">

            <div className="text-5xl mb-4">🎯</div>

            <h3 className="text-2xl font-bold mb-3">
              La Responsabilité 
            </h3>

            <p className="text-gray-600">
              Nous sommes conscients de l'impact de nos mots et de nos 
              images, et nous nous engageons à respecter scrupuleusement l'éthique 
              journalistique. 
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