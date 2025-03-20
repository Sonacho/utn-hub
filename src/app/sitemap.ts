/* import { MetadataRoute } from "next";
import { db } from "~/server/db";

type ReducedFolder = {
    id:number,
    name:string,
    parentFolderId:number | null
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

    const folders = await db.folder.findMany({
  // Only folders
        select: { id: true, name: true, parentFolderId: true },
    });

    // Helper to build nested paths
    const buildPaths = (folder:ReducedFolder, allFolders:Array<ReducedFolder>, currentPath:Array<string> = []):Array<{slug:string[]}> => {
        const path = [...currentPath, encodeURI(folder.name)];
        const childFolders = allFolders.filter(f => f.parentFolderId === folder.id);
        if (childFolders.length === 0) {
            return [{ slug: path }];
        }
        return childFolders.flatMap(child => buildPaths(child, allFolders, path));
    };

    const topLevelFolders = folders.filter(folder => !folder.parentFolderId);

    const paths = topLevelFolders.flatMap(folder =>
        buildPaths(folder, folders)
    );
    

    const entries = paths.map(e =>{
        const baseUrl = "https://utn-hub.vercel.app/"
        return {url:baseUrl.concat(e.slug.join("/"))}
    }
    )

    return [ 
        {
            url: "https://utn-hub.vercel.app"
        },
        ...entries
    ]
} */