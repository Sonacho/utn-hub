export default function Loading() {
  return (
    <main className="container flex justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {/* Skeleton cards for each year */}
        {[1, 2, 3, 4, 5, 6, 7].map((_, i) => (
          <div
            key={i}
            className={`relative group h-64 w-full bg-gray-200 rounded-lg overflow-hidden animate-pulse `}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-6 w-24 bg-gray-300 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}