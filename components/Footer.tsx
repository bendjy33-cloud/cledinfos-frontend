import Link from "next/link";
import {FaFacebook,FaInstagram,FaYoutube,FaXTwitter,} from "react-icons/fa6";

type Props = {
  settings: any;
};

export default function Footer({ settings }: Props) {


  return (
    <footer className="bg-gray-900 text-gray-300 mt-20">


      <div className="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-4 gap-10">


        {/* BRAND */}

        <div>

          <h2 className="text-3xl font-bold text-white">
            {settings.site_name || "Clé d'Infos"}
          </h2>


          <p className="mt-5 text-gray-400 leading-7">
            {settings.about ||
              "Clé d'Infos est un média numérique engagé à apporter une information claire, fiable et rapide au public. Voici une présentation détaillée de notre identité, de notre mission et de notre vision."}
          </p>


        </div>



        {/* CONTACT */}

        <div>

          <h3 className="text-xl text-white font-bold mb-5">
            Contact
          </h3>


          <div className="space-y-4">


            <p>
              📧{" "}
              {settings.email ||
                "contact@cledinfos.com"}
            </p>


            <p>
              📞{" "}
              {settings.phone ||
                "+509 0000 0000"}
            </p>


            <p>
              📍{" "}
              {settings.address ||
                "Haïti"}
            </p>


          </div>


        </div>




        {/* LINKS */}

        <div>

          <h3 className="text-xl text-white font-bold mb-5">
            Liens utiles
          </h3>


          <div className="space-y-3">


            <Link href="/about"
              className="block hover:text-red-500">
              À propos
            </Link>


            <Link href="/contact"
              className="block hover:text-red-500">
              Contact
            </Link>


            <Link href="/privacy"
              className="block hover:text-red-500">
              Politique de confidentialité
            </Link>


            <Link href="/cookies"
              className="block hover:text-red-500">
              Politique cookies
            </Link>


            <Link href="/terms"
              className="block hover:text-red-500">
              Conditions d'utilisation
            </Link>


          </div>


        </div>




        <div>


          <div className="space-y-4">

              {settings.facebook && (
                <a
                  href={settings.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-gray-300 hover:text-blue-500 transition"
                >
                  <FaFacebook className="text-2xl" />
                  <span>Facebook</span>
                </a>
              )}


              {settings.instagram && (
                <a
                  href={settings.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-gray-300 hover:text-pink-500 transition"
                >
                  <FaInstagram className="text-2xl" />
                  <span>Instagram</span>
                </a>
              )}


              {settings.youtube && (
                <a
                  href={settings.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-gray-300 hover:text-red-500 transition"
                >
                  <FaYoutube className="text-2xl" />
                  <span>YouTube</span>
                </a>
              )}


              {settings.twitter && (
                <a
                  href={settings.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-gray-300 hover:text-white transition"
                >
                  <FaXTwitter className="text-2xl" />
                  <span>X</span>
                </a>
              )}

            </div>


        </div>


      </div>





      <div className="border-t border-gray-800 py-6 text-center text-sm">

        © {new Date().getFullYear()}{" "}
        {settings.site_name || "Clé d'Infos"}.
        Tous droits réservés.

      </div>


    </footer>
  );
}