"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

export default function TableOfContents() {

  const t = useTranslations("TableOfContents");


  const [headings, setHeadings] = useState<
    {
      id: string;
      text: string;
    }[]
  >([]);


  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll("article h2")
    );


    const data = elements.map((heading, index) => {

      const id = `heading-${index}`;

      heading.id = id;


      return {
        id,
        text: heading.textContent || "",
      };

    });


    setHeadings(data);

  }, []);


  if (!headings.length) return null;


  return (
    <div className="border rounded-xl p-6 mb-10 bg-gray-50">


      <h2 className="font-bold text-xl mb-4">
        {t("title")}
      </h2>


      <ul className="space-y-2">


        {headings.map((item) => (

          <li key={item.id}>

            <a
              href={`#${item.id}`}
              className="text-red-600 hover:underline"
            >
              {item.text}
            </a>

          </li>

        ))}


      </ul>


    </div>
  );
}