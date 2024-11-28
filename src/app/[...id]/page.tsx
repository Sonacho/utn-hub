import { Card } from "~/components/card";
import { db } from "~/server/db";
import { getFileId } from "~/utils/getfileid";
import type { Metadata} from 'next'


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



function getIframeSrc(id:string | null | undefined){
    const finalUrl = `https://drive.google.com/file/d/${id}/preview`
    return finalUrl
}


const FolderComponent = async ({ params }: { params: Promise<{ id: string[] }> }) => {

    const { id } = await params;

    const folderPath = id.join("/");

    const folder = await db.folder.findFirst({
        where: { name: decodeURI(id[id.length - 1]!) }, 
        include: { children: true }, 
    })
    if (!folder) {
        return <h1>Not Found</h1>;
    }

    return folder.isFile ? ( 
        folder.filePath && 
        <div className="container h-full flex justify-center items-center">
            <div className="w-full h-full max-w-screen-lg p-4">
                <iframe 
                    src={getIframeSrc(getFileId(folder.filePath))} 
                    className="w-full h-[70vh] md:h-[80vh] lg:h-[90vh]" 
                    allowFullScreen 
                />
            </div>
        </div>)
        :
        (
            <div className="container grid grid-cols-2 gap-4">
                {
                    folder.children?.sort(e => e.isFile ? 1 : -1).map(c =>   
                    {
                        return(
                            <Card key={c.id} name={c.name} parentId={c.parentId} path={c.filePath} id={c.id} isFile={c.isFile} folderPath={folderPath}/>
                        )
                    })
                }
            </div>
        )
}

export default FolderComponent