"use client";

export default function Error({
  reset,
}: {
  reset: () => void;
}) {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center">

      <h1 className="text-5xl font-bold">
        Une erreur est survenue
      </h1>

      <button
        onClick={() => reset()}
        className="mt-6 bg-red-600 text-white px-6 py-3 rounded"
      >
        Réessayer
      </button>

    </main>
  );
}