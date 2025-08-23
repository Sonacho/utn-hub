import { db } from "~/server/db";

export async function getReplies({
  fileId,
  currentUserId,
  parentId,
}: {
  fileId: string;
  currentUserId: string | undefined;
  parentId: string;
}) {
  const comments = await db.comment.findMany({
    where: { fileId, parentId: parentId }, // or parentId: null if top-level only
    orderBy: { createdAt: "desc" },
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
    },
  });
  return comments;
}
