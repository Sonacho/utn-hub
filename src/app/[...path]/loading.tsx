export default function Loading() {
  return (
    <div>
      {/* Skeleton for Child Folders */}
      <div className="container mt-4 grid grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((_, i) => (
          <div
            key={i}
            className="h-32 animate-pulse rounded-lg bg-gray-200 dark:bg-slate-700"
          >
            <div className="flex h-full flex-col justify-evenly p-4">
              <div className="ml-4 h-6 w-24 rounded bg-gray-300 dark:bg-slate-600"></div>
              <div className="ml-4 h-3 w-16 rounded bg-gray-300 dark:bg-slate-600"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Skeleton for Files */}
      <div className="container mt-4 grid grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((_, i) => (
          <div
            key={i}
            className="h-32 animate-pulse rounded-lg bg-gray-200 dark:bg-slate-700"
          >
            <div className="flex h-full flex-col justify-evenly p-4">
              <div className="ml-4 h-6 w-24 rounded bg-gray-300 dark:bg-slate-600"></div>
              <div className="ml-4 h-3 w-16 rounded bg-gray-300 dark:bg-slate-600"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
