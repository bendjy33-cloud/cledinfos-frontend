"use client";

import { useState } from "react";

export default function SearchBar() {
  const [query, setQuery] = useState("");

  return (
    <form
      action="/search"
      className="flex"
    >
      <input
        type="text"
        name="q"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Rechercher..."
        className="px-4 py-2 rounded-l-md text-black w-56 outline-none"
      />

      <button
        type="submit"
        className="bg-red-600 px-4 rounded-r-md"
      >
        🔍
      </button>
    </form>
  );
}