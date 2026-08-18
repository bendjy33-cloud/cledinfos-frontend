import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import {
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaXTwitter,
} from "react-icons/fa6";

type Props = {
  settings: any;
};

export default async function Footer({ settings }: Props) {
  const t = await getTranslations("footer");

  return (
    <footer className="bg-gray-900 text-gray-300 mt-12 sm:mt-16 lg:mt-20">

      {/* MAIN FOOTER */}
      <div
        className="
          max-w-7xl
          mx-auto
          px-4
          sm:px-6
          py-10
          sm:py-14
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-4
          gap-8
          sm:gap-10
        "
      >

        {/* BRAND */}
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            {settings.site_name || "Clé d'Infos"}
          </h2>

          <p className="mt-4 sm:mt-5 text-sm sm:text-base text-gray-400 leading-7">
            {t("description")}
          </p>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="text-lg sm:text-xl text-white font-bold mb-4 sm:mb-5">
            {t("contact")}
          </h3>

          <div className="space-y-3 sm:space-y-4 text-sm sm:text-base">

            <p className="break-words">
              📧{" "}
              {settings.email || "contact@cledinfos.com"}
            </p>

            <p>
              📞{" "}
              {settings.phone || "+509 0000 0000"}
            </p>

            <p className="break-words">
              📍{" "}
              {settings.address || t("defaultCountry")}
            </p>

          </div>
        </div>

        {/* LINKS */}
        <div>
          <h3 className="text-lg sm:text-xl text-white font-bold mb-4 sm:mb-5">
            {t("links")}
          </h3>

          <div className="space-y-3 text-sm sm:text-base">

            <Link
              href="/about"
              className="block hover:text-red-500 transition"
            >
              {t("about")}
            </Link>

            <Link
              href="/contact"
              className="block hover:text-red-500 transition"
            >
              {t("contact")}
            </Link>

            <Link
              href="/privacy"
              className="block hover:text-red-500 transition"
            >
              {t("privacy")}
            </Link>

            <Link
              href="/cookies"
              className="block hover:text-red-500 transition"
            >
              {t("cookies")}
            </Link>

            <Link
              href="/terms"
              className="block hover:text-red-500 transition"
            >
              {t("terms")}
            </Link>

          </div>
        </div>

        {/* SOCIAL MEDIA */}
        <div>
          <h3 className="text-lg sm:text-xl text-white font-bold mb-4 sm:mb-5">
           {t("social")}
          </h3>

          <div className="space-y-3 sm:space-y-4">

            {settings.facebook && (
              <a
                href={settings.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  flex
                  items-center
                  gap-3
                  text-sm
                  sm:text-base
                  text-gray-300
                  hover:text-blue-500
                  transition
                "
              >
                <FaFacebook className="text-xl sm:text-2xl shrink-0" />
                <span>Facebook</span>
              </a>
            )}

            {settings.instagram && (
              <a
                href={settings.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  flex
                  items-center
                  gap-3
                  text-sm
                  sm:text-base
                  text-gray-300
                  hover:text-pink-500
                  transition
                "
              >
                <FaInstagram className="text-xl sm:text-2xl shrink-0" />
                <span>Instagram</span>
              </a>
            )}

            {settings.youtube && (
              <a
                href={settings.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  flex
                  items-center
                  gap-3
                  text-sm
                  sm:text-base
                  text-gray-300
                  hover:text-red-500
                  transition
                "
              >
                <FaYoutube className="text-xl sm:text-2xl shrink-0" />
                <span>YouTube</span>
              </a>
            )}

            {settings.twitter && (
              <a
                href={settings.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  flex
                  items-center
                  gap-3
                  text-sm
                  sm:text-base
                  text-gray-300
                  hover:text-white
                  transition
                "
              >
                <FaXTwitter className="text-xl sm:text-2xl shrink-0" />
                <span>X</span>
              </a>
            )}

          </div>
        </div>

      </div>

      {/* COPYRIGHT */}
      <div
        className="
          border-t
          border-gray-800
          px-4
          sm:px-6
          py-5
          sm:py-6
          text-center
          text-xs
          sm:text-sm
          leading-6
        "
      >
        © {new Date().getFullYear()}{" "}
        {settings.site_name || "Clé d'Infos"}.{" "}
        {t("copyright")}
      </div>

    </footer>
  );
}