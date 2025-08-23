"use client";
import { useState, useEffect } from "react";
import JSZip from "jszip";
import { Button } from "../ui/button";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

type Entry = {
  name: string;
  dir: boolean;
  textContent: string | undefined;
}[];

export default function ZipViewer({ uri }: { uri: string }) {
  const [contents, setContents] = useState<Entry>([]);

  useEffect(() => {
    (async () => {
      const res = await fetch(uri);
      const buffer = await res.arrayBuffer();
      const zip = await JSZip.loadAsync(buffer);

      // Only keep top-level files (ignore nested folders)
      const entries = await Promise.all(
        Object.keys(zip.files)
          .filter((fileName) => {
            const file = zip.files[fileName]!;
            const parts = file.name.split("/").filter(Boolean);

            return parts.length == 1;
          })
          .map(async (fileName) => {
            const file = zip.files[fileName]!;

            return {
              name: file.name,
              dir: file.dir,
              textContent: file.name.endsWith(".txt")
                ? await file.async("text")
                : undefined,
            };
          }),
      );

      setContents(entries);
    })();
  }, [uri]);

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Preview del archivo ZIP</CardTitle>
        </CardHeader>
        <CardContent>
          {contents.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No se encontraron archivos de nivel superior.
            </p>
          ) : (
            <ul className="space-y-3">
              {contents.map((item, idx) => (
                <li
                  key={idx}
                  className="rounded-lg border bg-muted/50 p-3 transition hover:bg-muted"
                >
                  <p className="font-medium">
                    {item.name}
                    {item.dir && "..."}
                  </p>
                  {item.textContent && (
                    <pre className="mt-2 overflow-x-auto rounded border bg-background p-2 text-sm">
                      {item.textContent}
                    </pre>
                  )}
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>

      <Link href={uri} target="_blank">
        <Button className="w-full">Descargar ZIP</Button>
      </Link>
    </div>
  );
}
