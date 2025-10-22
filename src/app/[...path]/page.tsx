import { Card } from "~/components/card";
import { db } from "~/server/db";
import NotFound from "./not-found";
import FilePage from "~/components/filePage";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ path: string[] }>;
}) {
  const { path } = await params;

  const stringPath = decodeURIComponent(path.join("/")) + "/";

  const folder = await db.folder.findUnique({
    where: { stringPath: stringPath },
  });
  if (!folder) {
    const fileS3Key = decodeURIComponent(path.join("/"));
    const file = await db.file.findUnique({
      where: { s3Key: fileS3Key },
    });
    return {
      title: file?.name ?? "Unknown",
    };
  }

  return {
    title: folder?.name ?? "Unknown",
  };
}

export default async function FolderPage({
  params,
}: {
  params: Promise<{ path: string[] }>;
}) {
  const { path } = await params;

  const stringPath = decodeURIComponent(path.join("/")) + "/";

  async function getFolder(path: string) {
    const folder = await db.folder.findUnique({
      where: { stringPath: path },
      include: {
        childFolders: true,
        files: true,
      },
    });
    return folder;
  }

  const folder = await getFolder(stringPath);

  if (folder) {
    return (
      <div className="container h-full flex-grow">
        <div className="grid grid-cols-2 gap-4">
          {folder?.childFolders.map((subfolder) => (
            <Card
              key={subfolder.id}
              id={subfolder.id}
              stringPath={subfolder.stringPath}
              name={subfolder.name}
              type={typeof subfolder}
            />
          ))}
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4">
          {folder?.files.map((file) => (
            <Card
              key={file.id}
              folderId={folder.id}
              s3key={file.s3Key}
              id={file.id}
              name={file.name}
              type={"File"}
              fileType={file.fileType}
            />
          ))}
        </div>
      </div>
    );
  }
  const fileS3Key = decodeURIComponent(path.join("/"));
  const file = await db.file.findUnique({
    where: {
      s3Key: fileS3Key,
    },
  });

  if (file) {
    const doc = {
      uri: `https://utn-hub-bucket.s3.us-east-1.amazonaws.com/${file.s3Key}`,
      fileType: file.fileType,
      name: file.name,
      fileId: file.id,
    };

    return (
      <div className="container flex h-full items-center justify-center">
        <div className="h-full w-full max-w-screen-lg p-4">
          <div className="text-center text-sm italic text-foreground opacity-75">
            Es común que a veces el documento no cargue a la primera, intenta
            recargar si eso pasa.
          </div>
          <FilePage doc={doc} />
        </div>
      </div>
    );
  } else {
    return <NotFound />;
  }
}
