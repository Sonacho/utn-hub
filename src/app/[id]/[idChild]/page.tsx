import { db } from "~/server/db";

const SubFolderComponent = async ({ params }: { params: { idChild: string } }) => {

    const childs = await db.folder.findMany({
        where:{
            parentId:parseInt(params.idChild)
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