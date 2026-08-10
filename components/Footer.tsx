import {Link} from "@/i18n/navigation";
import {getTranslations} from "next-intl/server";
import {FaFacebook,FaInstagram,FaYoutube,FaXTwitter,} 
from "react-icons/fa6";


type Props = {
  settings: any;
};

export default async function Footer({ settings }: Props) {

  const t = await getTranslations("footer");


  return (
    <footer className="bg-gray-900 text-gray-300 mt-20">


      <div className="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-4 gap-10">


        {/* BRAND */}

        <div>

          <h2 className="text-3xl font-bold text-white">
            {settings.site_name || "Clé d'Infos"}
          </h2>


          <p className="mt-5 text-gray-400 leading-7">
              {t("description")}
          </p>


        </div>



        {/* CONTACT */}

        <div>

          <h3 className="text-xl text-white font-bold mb-5">
            {t("contact")}
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
              {settings.address || t("defaultCountry")}
            </p>


          </div>


        </div>




        {/* LINKS */}

        <div>

          <h3 className="text-xl text-white font-bold mb-5">
            {t("links")}
          </h3>


          <div className="space-y-3">


            <Link href="/about"
              className="block hover:text-red-500">
             {t("about")}
            </Link>


            <Link href="/contact"
              className="block hover:text-red-500">
              {t("contact")}
            </Link>


            <Link href="/privacy"
              className="block hover:text-red-500">
             {t("privacy")}
            </Link>


            <Link href="/cookies"
              className="block hover:text-red-500">
              {t("cookies")}
            </Link>


            <Link href="/terms"
              className="block hover:text-red-500">
              {t("terms")}
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
      {settings.site_name || "Clé d'Infos"}.{" "}
      {t("copyright")}

      </div>


    </footer>
  );
}