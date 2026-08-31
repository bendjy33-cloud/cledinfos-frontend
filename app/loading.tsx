export default function Loading() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-10">
      <div className="animate-pulse">

        {/* Breadcrumb */}
        <div className="h-4 w-32 bg-gray-200 dark:bg-slate-700 rounded mb-6" />

        {/* Page title */}
        <div className="h-10 w-56 sm:w-72 bg-gray-200 dark:bg-slate-700 rounded-lg mb-8" />

        {/* Content skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">

          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="
                bg-white
                dark:bg-slate-900
                rounded-xl
                overflow-hidden
                border
                border-gray-100
                dark:border-slate-800
                shadow-md
              "
            >

              {/* Image */}
              <div
                className="
                  aspect-[16/9]
                  w-full
                  bg-gray-200
                  dark:bg-slate-700
                "
              />

              {/* Content */}
              <div className="p-4 sm:p-5">

                {/* Category */}
                <div className="h-4 w-20 bg-gray-200 dark:bg-slate-700 rounded mb-3" />

                {/* Title */}
                <div className="space-y-2 mb-4">
                  <div className="h-5 w-full bg-gray-200 dark:bg-slate-700 rounded" />
                  <div className="h-5 w-5/6 bg-gray-200 dark:bg-slate-700 rounded" />
                  <div className="h-5 w-2/3 bg-gray-200 dark:bg-slate-700 rounded" />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <div className="h-4 w-full bg-gray-200 dark:bg-slate-700 rounded" />
                  <div className="h-4 w-4/5 bg-gray-200 dark:bg-slate-700 rounded" />
                </div>

                {/* Meta */}
                <div className="flex justify-between gap-4 mt-5">
                  <div className="h-4 w-20 bg-gray-200 dark:bg-slate-700 rounded" />
                  <div className="h-4 w-24 bg-gray-200 dark:bg-slate-700 rounded" />
                </div>

              </div>
            </div>
          ))}

        </div>

      </div>
    </main>
  );
}