import { Card } from "~/components/card";
import { db } from "~/server/db";
import NotFound from "./not-found";
import FileComponent from "~/components/fileComponent";
const FolderComponent = async ({params}:{params: Promise<{ id: string }>}) => {
  
    const folderId = (await params).id
    const folder = await db.folder.findUnique({
      where:{id: folderId},
      include:{
        childFolders:true,
        files:true
      }
      });
    if (!folder) {
      const file = await db.file.findUnique({
        where:{id: folderId}
      })
      if(file){
        const doc = 
          {
            uri: `https://utn-hub-bucket.s3.us-east-1.amazonaws.com/${file?.s3Key}`,
            fileType: file?.fileType,
            name: file?.name
          }
        
        return (
          <div className="container h-full flex justify-center items-center">
              <div className="w-full h-full max-w-screen-lg p-4">
                 <FileComponent doc={doc}/>
              </div>
          </div>
        )}
      if(!file){
        return <NotFound/>
      }
    }
    return (
        <div className="container h-full flex-grow">
            
            <div className="grid grid-cols-2 gap-4">
            {folder?.childFolders.map((subfolder) => (
                <Card key={subfolder.id} id={subfolder.id} name={subfolder.name} type={typeof subfolder} />
            ))}
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-4">
            {folder?.files.map((file) => (
                <Card key={file.id} id={file.id} name={file.name} type={"File"} fileType={file.fileType}/>
            ))}
            </div>
        </div>


      );
    }

export default FolderComponent