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
            path.unshift(`${folder.name}+${folder.id}`); // Add to the beginning of the array
            currentFolderId = folder.parentFolderId; // Move to the parent folder

        } else {
            break; // Stop if the folder is not found
        }
    }

    return path;
}

export default getFolderPath;