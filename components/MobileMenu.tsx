"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Search } from "lucide-react";

type Category = {
  id: number;
  name: string;
  slug: string;
};

type Props = {
  categories: Category[];
};

export default function MobileMenu({ categories }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="lg:hidden p-1"
        aria-label="Menu"
      >
        {open ? <X size={30} /> : <Menu size={30} />}
      </button>

      {open && (
        <div className="absolute left-0 top-full w-full bg-slate-900 border-t border-slate-700 shadow-2xl z-50">

          <div className="p-4">

            {/* Search */}
            <form
              action="/search"
              method="GET"
              className="flex mb-5"
            >
               <input
                type="text"
                name="q"
                placeholder="Rechercher..."
                className="w-64 px-4 py-2 bg-white text-black placeholder:text-gray-500 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />

                  <button
                type="submit"
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-r-lg transition"
              >
                🔍
              </button>
            </form>

            <nav className="flex flex-col">

              <Link
                href="/"
                onClick={() => setOpen(false)}
                className="py-3 border-b border-slate-700 hover:text-red-400"
              >
                🏠 Accueil
              </Link>

              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/categories/${category.slug}`}
                  onClick={() => setOpen(false)}
                  className="py-3 border-b border-slate-700 hover:text-red-400"
                >
                  {category.name}
                </Link>
              ))}

              <Link
                href="/about"
                onClick={() => setOpen(false)}
                className="py-3 border-b border-slate-700 hover:text-red-400"
              >
                À propos
              </Link>

              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="py-3 border-b border-slate-700 hover:text-red-400"
              >
                Contact
              </Link>

            </nav>

          </div>

        </div>
      )}
    </>
  );
}