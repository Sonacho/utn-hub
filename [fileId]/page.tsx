import FilePage from "~/components/filePage";
import { db } from "~/server/db";
import NotFound from "../not-found";

export default async function FilePageRoute({
  params,
}: {
  params: Promise<{ fileId: string }>;
}) {
  const id = (await params).fileId;
  async function getFile(id: string) {
    const file = await db.file.findUnique({
      where: { id: id },
    });
    return file;
  }
  const file = await getFile(id);
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
          <FilePage doc={doc} />
        </div>
      </div>
    );
  } else {
    return <NotFound />;
  }
}
