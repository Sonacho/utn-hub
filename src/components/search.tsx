"use client";
import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { getSeachResults } from "~/utils/getSearchResults";
import useDebounce from "~/utils/useDebounce";
import Link from "next/link";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

export const Search = () => {
  const [query, setQuery] = useState("");
  const [folders, setFolders] = useState<
    { stringPath: string; name: string; parentFolder: { name: string } }[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const debouncedQuery = useDebounce(query, 500);
  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      if (!debouncedQuery) {
        setFolders([]);
        setOpen(false);
        return;
      }
      setLoading(true);
      const results = await getSeachResults(debouncedQuery);
      if (!cancelled) {
        setFolders(results);
        setLoading(false);
        setOpen(true); // show popover when we have a query
      }
    };

    run();
    return () => {
      cancelled = true;
    };
  }, [debouncedQuery]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="w-80">
          <Input
            className="w-full shadow-sm"
            placeholder="Buscar..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => query && setOpen(false)}
            onKeyDown={(e) => e.key === "Escape" && setOpen(false)}
          />
        </div>
      </PopoverTrigger>

      <PopoverContent
        className="w-80 p-2"
        side="bottom"
        align="start"
        onOpenAutoFocus={(e) => e.preventDefault()} // keep focus on input; avoids blur loop
      >
        {loading && <p className="text-sm text-muted-foreground">Loading...</p>}
        {!loading && folders.length === 0 && (
          <p className="text-sm text-muted-foreground">
            No se encontraron resultados
          </p>
        )}

        <div className="flex flex-col gap-2">
          {folders.map((e) => (
            <Link
              key={e.stringPath}
              href={`/${e.stringPath}`}
              className="rounded p-2 hover:bg-accent"
              onClick={() => setOpen(false)} // close when selecting a result
            >
              <p className="truncate">{e.name}</p>
              <small className="text-xs text-gray-500">
                En: {e.parentFolder.name}
              </small>
            </Link>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};
