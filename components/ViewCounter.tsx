"use client";

import { useEffect } from "react";
import { incrementPostView } from "@/lib/api";

export default function ViewCounter({
  slug,
}: {
  slug: string;
}) {

  useEffect(() => {

    if (!slug) return;


    const key = `viewed_${slug}`;


    const viewed = localStorage.getItem(key);


   

    if (viewed === "true") {
      return;
    }


    async function addView() {

      try {

        const data = await incrementPostView(slug);




        localStorage.setItem(
          key,
          "true"
        );


      } catch (error) {

        console.error(
          "View error:",
          error
        );

      }

    }


    addView();


  }, [slug]);


  return null;
}