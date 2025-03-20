import Link from "next/link";

type FileTypeStyle = {
  bgColor: string; // Background color class (e.g., "bg-red-500")
};

type FileTypeStyles = {
  [key: string]: FileTypeStyle; // Dynamic keys for file types (e.g., "pdf", "txt")
};


interface CardProps {
  type: string;
  id: string;
  name: string;
  /* parentId: number | null; */
  s3key?: string;
  fileType?: string;
}
const fileTypeStyles:FileTypeStyles = {
  pdf: {
    bgColor: "bg-red-500", // Red for PDF
  },
  txt: {
    bgColor: "bg-blue-600", // Blue for TXT
  },
  docx: {
    bgColor: "bg-blue-400", // Light blue for DOCX
  },
  xlsx: {
    bgColor: "bg-green-500", // Green for XLSX
  },
  jpg: {
    bgColor: "bg-yellow-500", // Yellow for JPG
  },
  png: {
    bgColor: "bg-yellow-400", // Light yellow for PNG
  },
  mp4: {
    bgColor: "bg-purple-500", // Purple for MP4
  },
  zip: {
    bgColor: "bg-gray-500", // Gray for ZIP
  },
  // Add more file types as needed
};
export const Card: React.FC<CardProps> = ({
  name,
  type,
  id,
  fileType
}) => {

  
  return type == "File" ? (

<Link href={`/${id}`}>
  <div className="relative rounded-lg border border-gray-300 bg-red-100 p-4 shadow-md transition duration-300 ease-in-out hover:bg-red-200 dark:border-gray-700 dark:bg-gray-800 dark:shadow-gray-900 dark:hover:bg-gray-700">
    {/* Folded Corner Effect */}
    {/* Add your folded corner effect here if needed */}

    {/* File Type Label */}
    {fileType && (
      <div
        className={`absolute right-0 top-0 mr-1 mt-1 rounded px-2 py-0.5 text-xs font-bold text-white ${
          fileTypeStyles[fileType]?.bgColor || "bg-gray-500"
        }`}
      >
        {fileType.toUpperCase()}
      </div>
    )}

    {/* File Content */}
    <div className="pt-4">
      <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
        {name.split(".")[0]}
      </p>
      <span className="text-sm text-gray-600 dark:text-gray-400">
        {fileType}
      </span>
    </div>
  </div>
</Link>
  ) : (
    <Link href={`$/${id}`}>
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
