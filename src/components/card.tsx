import Link from "next/link"
import { getFileId } from "~/utils/getfileid"

interface CardProps{
    isFile: boolean
    id: number
    path: string | null
    name: string
    parentId: number | null
}

export const Card:React.FC<CardProps>  = ({path, name, parentId, id , isFile}) => {
    return(
        isFile ?
        <Link href={`/${parentId}/${getFileId(path)}`}>
            <div className="border border-slate-300 p-4 rounded-lg shadow-md bg-white hover:bg-slate-100 transition duration-300 ease-in-out dark:border-slate-900 dark:bg-slate-800 dark:hover:bg-slate-900 dark:shadow-slate-950">
                    <p className="text-lg font-semibold text-slate-900 dark:text-stone-200 ">
                        {name.replace(/.txt/g, "")}
                    </p>
                <span className="text-sm text-slate-500 dark:text-slate-200">File</span>
            </div>
        </Link>
        :
        <Link href={`${id}`}>
            <div className="border border-slate-300 p-4 rounded-lg shadow-md bg-white hover:bg-slate-100 transition duration-300 ease-in-out  dark:border-slate-900 dark:bg-slate-800 dark:hover:bg-slate-900 dark:shadow-slate-950">
                <p className="text-lg font-semibold text-slate-900 dark:text-stone-200 ">{name}</p>
                <span className="text-sm text-slate-500 dark:text-slate-200">Folder</span>
            </div>
        </Link>
    )
}