export async function getSeachResults(
  query: string,
): Promise<
  { stringPath: string; name: string; parentFolder: { name: string } }[]
> {
  if (!query) return [];

  const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
  if (!res.ok) {
    throw new Error("Failed to fetch search results");
  }
  const returnPromise: Promise<
    { stringPath: string; name: string; parentFolder: { name: string } }[]
  > = res.json();
  return returnPromise;
}
