import Link from "next/link";
import { db } from "~/server/db";
import { changeColour } from "~/utils/changeColour";


type ReducedFolder = {
  id:number,
  name:string,
  parentFolder: { id:number } | null
}

/* export async function generateStaticParams() {
  const folders = await db.folder.findMany({ // Only folders
      select: { id: true, name: true, parentFolder: true },
  });

  // Helper to build nested paths
  const buildPaths = (folder:ReducedFolder, allFolders:Array<ReducedFolder>, currentPath:Array<string> = []):Array<{slug:string[]}> => {
      const path = [...currentPath, folder.name];
      const childFolders = allFolders.filter(f => f.parentFolder?.id === folder.id);
      if (childFolders.length === 0) {
          return [{ slug: path }];
      }
      return childFolders.flatMap(child => buildPaths(child, allFolders, path));
  };

  const topLevelFolders = folders.filter(folder => !folder.parentFolder?.id);

  const paths = topLevelFolders.flatMap(folder =>
      buildPaths(folder, folders)
  );  
  return paths;
} */



export default async function HomePage () {

  const years = await db.folder.findMany({
    where:{
      parentFolder: {
        name: "UTN"
      },
    },
    orderBy:{
      name: "asc"
    }
  })

  return (
    <main className="container flex justify-center">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
      {
        years.map((y,i) => {
          const isLastChild = i === years.length - 1;
          return (
            <Link key={y.id} href={`/${y.id}`}>
              <div className={`${isLastChild ? "lg:!col-span-3 md:!col-span-2" : ""} relative group h-64 w-full ${changeColour(y.name)} rounded-lg overflow-hidden shadow-lg transition-all duration-500 transform hover:scale-105 hover:shadow-2xl dark:shadow-gray-900 dark:bg-opacity-60`}>
                <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 bg-opacity-50 group-hover:bg-opacity-70 dark:bg-opacity-60 dark:group-hover:bg-opacity-80`}>
                  <h2 className="text-white text-xl font-bold">{y.name}</h2>
                </div>
              </div>
            </Link>
          );
        })
      }
    </div>
  </main>
  );
}
