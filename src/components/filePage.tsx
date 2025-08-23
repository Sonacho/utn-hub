import { auth } from "~/lib/auth";
import { CommentSection } from "./commentSection";
import { getViewer } from "./viewers";
import Link from "next/link";
import { Button } from "./ui/button";

interface fileComponentProps {
  doc: {
    uri: string;
    fileType: string;
    name: string;
    fileId: string;
  };
}

export default async function FilePage({ doc }: fileComponentProps) {
  const session = await auth();
  const Viewer = getViewer(doc.fileType);

  return (
    <div className="flex flex-col items-center justify-center">
      <Viewer uri={doc.uri} name={doc.name} />
      <div className="flex items-center gap-3 pt-6">
        <h2 className="rounded-md bg-muted p-2 font-sans font-semibold">
          {doc.name}
        </h2>
        <a
          href={doc.uri}
          download={doc.name}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button asChild>
            <span>Ir a fuente/descargar</span>
          </Button>
        </a>
      </div>
      <CommentSection session={session} fileId={doc.fileId} />
    </div>
  );
}
