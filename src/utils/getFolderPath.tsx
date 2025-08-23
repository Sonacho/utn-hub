import { db } from "~/server/db";

async function getFolderPath(folderId: string | null): Promise<string[]> {
    const path: string[] = [];

    let currentFolderId = folderId;

    while (currentFolderId) {
        const file = await db.file.findUnique({
          where:{
            id:currentFolderId
          }
        })
        if(file?.folderId){
          path.unshift(`${file.name}+${file.id}`)
          currentFolderId = file.folderId
        }
        const folder = await db.folder.findUnique({
            where: { id: currentFolderId },
            select: { id: true, name: true, parentFolderId: true }
        });

        if (folder) {
            path.unshift(`${folder.name}+${folder.id}`); 
            currentFolderId = folder.parentFolderId; 
        } else {
            break; 
        }
    }

    return path;
}

export default getFolderPath;