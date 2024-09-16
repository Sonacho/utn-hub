import Link from "next/link";
import { getFileId } from "~/utils/getfileid";

interface CardProps {
  isFile: boolean;
  id: number;
  path: string | null;
  name: string;
  parentId: number | null;
}

/* export const Card:React.FC<CardProps>  = ({path, name, parentId, id , isFile}) => {
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
 */

export const Card: React.FC<CardProps> = ({
  path,
  name,
  parentId,
  id,
  isFile,
}) => {
  return isFile ? (
    /*             <Link href={`/${parentId}/${getFileId(path)}`}>
                <div className="border border-gray-300 p-4 rounded-lg shadow-md bg-white hover:bg-gray-100 transition duration-300 ease-in-out dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:shadow-gray-900">
                    <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                        {name.replace(/.txt/g, "")}
                    </p>
                    <span className="text-sm text-gray-600 dark:text-gray-400">PDF 📖</span>
                </div>
            </Link> */
    <Link href={`/${parentId}/${getFileId(path)}`}>
      <div className="relative rounded-lg border border-gray-300 bg-red-100 p-4 shadow-md transition duration-300 ease-in-out hover:bg-red-200 dark:border-gray-700 dark:bg-gray-800 dark:shadow-gray-900 dark:hover:bg-gray-700">
        {/* Folded Corner Effect */}
        <div className="clip-path-polygon absolute right-0 top-0 h-8 w-8 rounded-bl-md rounded-tr-lg bg-red-500"></div>

        {/* PDF Label */}
        <div className="absolute right-0 top-0 mr-1 mt-1 rounded bg-red-600 px-2 py-0.5 text-xs font-bold text-white">
          PDF
        </div>

        {/* PDF Content */}
        <div className="pt-4">
          <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            {name.replace(/.txt/g, "")}
          </p>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            PDF 📖
          </span>
        </div>
      </div>
    </Link>
  ) : (
    /*<Link href={`${id}`}>
                <div className="border border-gray-300 p-4 rounded-lg shadow-md bg-white hover:bg-gray-100 transition duration-300 ease-in-out dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:shadow-gray-900">
                    <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">{name}</p>
                    <span className="text-sm text-gray-600 dark:text-gray-400">Folder</span>
                </div>
            </Link> */
    <Link href={`${id}`}>
      <div className="relative w-full rounded-lg border border-gray-300 bg-yellow-200 p-4 shadow-md transition duration-300 ease-in-out hover:bg-yellow-300 dark:border-gray-700 dark:bg-gray-700 dark:shadow-gray-900 dark:hover:bg-gray-600">
        {/* Folder Tab */}
        <div className="absolute left-3 top-0 h-4 w-12 rounded-t-md bg-yellow-300 dark:bg-gray-600"></div>

        {/* Folder Body */}
        <div className="pt-4">
          <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            {name}
          </p>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Folder
          </span>
        </div>
      </div>
    </Link>
  );
};
