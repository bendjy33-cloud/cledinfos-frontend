"use client";

import { useEffect, useState } from "react";

export default function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");

    if (!consent) {
      setShow(true);
    }
  }, []);

  function accept() {
    localStorage.setItem("cookie-consent", "accepted");
    setShow(false);
  }

  function reject() {
    localStorage.setItem("cookie-consent", "rejected");
    setShow(false);
  }

  if (!show) return null;

  return (
    <div className="fixed bottom-5 left-5 right-5 lg:left-auto lg:w-[480px] bg-white shadow-2xl rounded-2xl border p-6 z-[9999]">

      <h3 className="text-xl font-bold mb-3">
        🍪 Cookies
      </h3>

      <p className="text-gray-600 leading-7">
        Clé d'Infos utilise des cookies afin d'améliorer votre
        expérience, mesurer l'audience et personnaliser certains
        contenus.
      </p>

      <div className="flex gap-3 mt-6">

        <button
          onClick={accept}
          className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl"
        >
          Accepter
        </button>

        <button
          onClick={reject}
          className="flex-1 border py-3 rounded-xl hover:bg-gray-100"
        >
          Refuser
        </button>

      </div>

    </div>
  );
}