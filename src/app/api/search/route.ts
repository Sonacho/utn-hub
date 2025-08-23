import { NextResponse } from "next/server";
import { db } from "~/server/db"; // adjust path

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q");

  if (!query || query.trim() === "") {
    return NextResponse.json([]);
  }

  try {
    const folders = await db.folder.findMany({
      where: {
        name: {
          contains: query,
          mode: "insensitive",
        },
      },
      select: {
        stringPath: true,
        name: true,
        parentFolder: {
          select: {
            name: true,
          },
        },
      },
      take: 8,
    });
    return NextResponse.json(folders);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to search" }, { status: 500 });
  }
}
