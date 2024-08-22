import { db } from "~/server/db";

const SubFolderComponent = async ({ params }: { params: { id: string } }) => {

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
                        <div>
                            {c.name}
                        </div>
                    )
                })
            }
        </div>
    );
}

export default SubFolderComponent