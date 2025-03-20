import { Card } from "~/components/card";
import { db } from "~/server/db";
import NotFound from "./not-found";

/* 
type Props = {
    params: Promise<{ id: string[] }>
}

export async function generateMetadata(
    { params }: Props,
): Promise<Metadata> {
  // read route params
    const id = (await params).id

  // fetch data
    const folder = await db.folder.findFirst({
    where: { name: decodeURI(id[id.length - 1]!) }})
  // optionally access and extend (rather than replace) parent metadata


    return {
        title: folder ? `Utn-hub || ${folder.name}` : "Utn-Hub"
    }
}
 */

const FolderComponent = async ({ params }: { params: { id: string}}) => {
  
    const folderId = params.id
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
      return (
        <div className="container h-full flex justify-center items-center">
            <div className="w-full h-full max-w-screen-lg p-4">
                <iframe 
                    src={`https://utn-hub-bucket.s3.us-east-1.amazonaws.com/${file?.s3Key}`} 
                    className="w-full h-[70vh] md:h-[80vh] lg:h-[90vh]" 
                    allowFullScreen 
                />
            </div>
        </div>
      )}
      if(!file){
        return <NotFound/>
      }
    }
    return (
        <div className="container">
            
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