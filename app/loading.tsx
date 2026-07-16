export default function Loading() {
  return (
    <main className="max-w-7xl mx-auto px-6 py-16">

      <div className="animate-pulse">

        <div className="h-12 w-2/3 bg-gray-300 rounded mb-8"></div>

        <div className="h-[450px] w-full bg-gray-300 rounded-xl mb-10"></div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="rounded-xl border overflow-hidden"
            >
              <div className="h-52 bg-gray-300"></div>

              <div className="p-5">
                <div className="h-6 bg-gray-300 rounded mb-3"></div>
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 w-3/4 bg-gray-300 rounded"></div>
              </div>
            </div>
          ))}

        </div>

      </div>

    </main>
  );
}