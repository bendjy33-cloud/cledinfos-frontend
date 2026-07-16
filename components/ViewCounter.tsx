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


    console.log("ViewCounter loaded:", slug);
    console.log("Already viewed:", viewed);


    if (viewed === "true") {
      return;
    }


    async function addView() {

      try {

        const data = await incrementPostView(slug);


        console.log("View incremented:", data);


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