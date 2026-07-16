"use client";

import { useEffect, useState } from "react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setVisible(window.scrollY > 400);
    }

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function scrollTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  if (!visible) return null;

  return (
    <button
      onClick={scrollTop}
      aria-label="Retour en haut"
      className="fixed bottom-6 right-6 z-50 bg-red-600 hover:bg-red-700 text-white w-12 h-12 rounded-full shadow-xl transition-all duration-300"
    >
      ↑
    </button>
  );
}