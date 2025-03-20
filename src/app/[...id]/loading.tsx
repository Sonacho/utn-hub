export default function Loading() {
    return (
      <div>
        {/* Skeleton for Child Folders */}
        <div className="container grid grid-cols-2 gap-4 mt-4">
          {[1, 2, 3, 4].map((_, i) => (
            <div
              key={i}
              className="h-32 bg-gray-200 dark:bg-slate-700 rounded-lg animate-pulse"
            >
              <div className="flex flex-col h-full justify-evenly p-4">
                <div className="h-6 w-24 bg-gray-300 dark:bg-slate-600 rounded ml-4"></div>
                <div className="h-3 w-16 bg-gray-300 dark:bg-slate-600 rounded ml-4"></div>
              </div>
            </div>
          ))}
        </div>
  
        {/* Skeleton for Files */}
        <div className="container grid grid-cols-2 gap-4 mt-4">
          {[1, 2, 3, 4].map((_, i) => (
            <div
              key={i}
              className="h-32 bg-gray-200 dark:bg-slate-700 rounded-lg animate-pulse"
            >
              <div className="flex flex-col h-full justify-evenly p-4">
                <div className="h-6 w-24 bg-gray-300 dark:bg-slate-600 rounded ml-4"></div>
                <div className="h-3 w-16 bg-gray-300 dark:bg-slate-600 rounded ml-4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }