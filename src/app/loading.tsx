export default function Loading() {
  return (
    <main className="container flex justify-center">
      <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Skeleton cards for each year */}
        {[1, 2, 3, 4, 5, 6, 7].map((_, i) => (
          <div
            key={i}
            className={`group relative h-64 w-full animate-pulse overflow-hidden rounded-lg bg-gray-200`}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-6 w-24 rounded bg-gray-300"></div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
