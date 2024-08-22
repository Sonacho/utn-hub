import Link from "next/link";
import { db } from "~/server/db";
import { getFileId } from "~/utils/getfileid";

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
        <div>
            {
                childs?.map(c => {
                    return(
                    c.isFile ?
                    <Link key={c.id} href={`/${c.parentId}/${getFileId(c.filePath)}`}>
                        {c.name.replace(/.txt/g, "")}
                    </Link> 
                    :
                    <Link key={c.id} href={`/${c.id}`}>
                        <div>
                            {c.name}
                        </div>
                    </Link>
                    )
                })
            }
        </div>
    );
}

export default FolderComponent