import { Card } from "~/components/card";
import { db } from "~/server/db";

const FolderComponent = async ({ params }: { params: { id: string } }) => {

    const childs = await db.folder.findMany({
        where:{
            parentId:parseInt(params.id)
        },
        orderBy:{
            isFile:"asc"
        }
    })

    return ( 
        <div className="container grid grid-cols-2 gap-4">
            {
                childs?.map(c => 
                {
                    return(
                    <Card key={c.id} name={c.name} parentId={c.parentId} path={c.filePath} id={c.id} isFile={c.isFile}/>
                    )
                })
            }
        </div>
    );
}

export default FolderComponent