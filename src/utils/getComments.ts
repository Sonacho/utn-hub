import { db } from "~/server/db";

export async function getComments({
  fileId,
  currentUserId,
}: {
  fileId: string;
  currentUserId: string | undefined;
}) {
  const comments = await db.comment.findMany({
    where: { fileId, parentId: null },
    orderBy: [{ likedBy: { _count: "desc" } }, { createdAt: "desc" }],
    include: {
      author: {
        select: {
          id: true,
          name: true,
          avatar: true,
        },
      },
      _count: {
        select: {
          likedBy: true, // total likes
          replies: true, // total replies
        },
      },
      likedBy: {
        where: { userId: currentUserId }, // filter likes only for the logged-in user
        select: { id: true },
      },
    },
  });
  return comments;
}

/* replies: {
        take: 3, // e.g. preview only 3 replies
        orderBy: { createdAt: "asc" },
        include: {
          author: {
            select: { id: true, name: true, avatar: true },
          },
          _count: {
            select: { likedBy: true },
          },
          likedBy: {
            where: { userId: currentUserId },
            select: { id: true },
          },
        },
      }, */
