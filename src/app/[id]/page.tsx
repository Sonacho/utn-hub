import Link from "next/link";
import { db } from "~/server/db";

const FolderComponent = async ({ params }: { params: { id: string } }) => {

    const childs = await db.folder.findMany({
        where:{
            parentId:parseInt(params.id)
        }
    })

    return ( 
        <div>
            {
                childs?.map(c => {
                    return(
                    <Link href={`/${c.id}`}>
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