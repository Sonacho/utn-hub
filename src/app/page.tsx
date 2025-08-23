import Link from "next/link";
import { db } from "~/server/db";
import { changeColour } from "~/utils/changeColour";

export default async function HomePage() {
  const years = await db.folder.findMany({
    where: {
      parentFolder: {
        name: "UTN",
      },
    },
    orderBy: {
      name: "asc",
    },
  });

  return (
    <main className="container flex justify-center">
      <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {years.map((y, i) => {
          const isLastChild = i === years.length - 1;
          return (
            <Link
              key={y.id}
              href={`/${y.stringPath}`}
              className={`${isLastChild ? "col-span-full" : ""}`}
            >
              <div
                className={` ${isLastChild ? "lg:max-h-48" : ""} group relative h-64 w-full ${changeColour(y.name)} transform overflow-hidden rounded-lg shadow-lg transition-all duration-500 hover:scale-105 hover:shadow-2xl dark:bg-opacity-60 dark:shadow-gray-900`}
              >
                <div
                  className={`absolute inset-0 flex items-center justify-center bg-opacity-50 transition-opacity duration-500 group-hover:bg-opacity-70 dark:bg-opacity-60 dark:group-hover:bg-opacity-80`}
                >
                  <h2 className="text-xl font-bold text-white">{y.name}</h2>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
