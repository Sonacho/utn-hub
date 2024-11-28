import Link from "next/link";

interface CardProps {
  isFile: boolean;
  id: number;
  path: string | null;
  name: string;
  parentId: number | null;
  folderPath: string
}

export const Card: React.FC<CardProps> = ({
  name,
  isFile,
  folderPath
}) => {
  return isFile ? (

    <Link href={`/${folderPath}/${name}`}>
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
    <Link href={`/${folderPath}/${name}`}>
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
