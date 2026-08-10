import {Link} from "@/i18n/navigation";
import { useTranslations } from "next-intl";

type Item = {
  label: string;
  href?: string;
};

type Props = {
  items: Item[];
};

export default function Breadcrumb({ items }: Props) {

  const t = useTranslations("Breadcrumb");


  return (
    <nav
     aria-label={t("ariaLabel")}
      className="mb-8 text-sm text-gray-600"
    >

      <ol className="flex flex-wrap items-center gap-2">


        <li>

          <Link
            href="/"
            className="hover:text-red-600"
          >
            {t("home")}
          </Link>

        </li>


        {items.map((item, index) => (

          <li
            key={index}
            className="flex items-center gap-2"
          >

            <span>/</span>


            {item.href ? (

              <Link
                href={item.href}
                className="hover:text-red-600"
              >
                {item.label}
              </Link>

            ) : (

              <span className="font-semibold text-gray-900">
                {item.label}
              </span>

            )}

          </li>

        ))}


      </ol>

    </nav>
  );
}