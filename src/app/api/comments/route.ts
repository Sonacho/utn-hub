import { NextRequest, NextResponse } from "next/server";
import { auth } from "~/lib/auth";
import { db } from "~/server/db";

export async function POST(req: NextRequest) {
  const session = await auth();

  if (!session?.user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { content, fileId, parentId } = await req.json();

  const user = await db.user.findUnique({
    where: {
      email: session.user.email!,
    },
  });

  const newComment = {
    parentId: parentId || null,
    authorId: user?.id!,
    fileId,
    content,
  };

  const comment = await db.comment.create({
    data: newComment,
  });

  return NextResponse.json(comment);
}

export async function DELETE(req: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { id } = await req.json();

  const comment = await db.comment.findUnique({
    where: { id },
    select: {
      authorId: true,
      _count: {
        select: {
          replies: true,
        },
      },
    },
  });

  if (!comment) {
    return new NextResponse("Comment not found", { status: 404 });
  }

  if (comment.authorId !== session.user.id) {
    return new NextResponse("Forbidden", { status: 403 });
  }
  if (comment._count.replies > 0) {
    await db.comment.update({
      where: { id },
      data: {
        content: "",
      },
    });
    return new NextResponse("Can't delete", { status: 202 });
  }
  await db.comment.delete({
    where: { id },
  });

  return new NextResponse("Deleted", { status: 200 });
}

export async function PATCH(req: NextRequest) {
  const session = await auth();

  if (!session?.user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { userId, commentId } = await req.json();

  const commentLike = await db.commentLike.findUnique({
    where: {
      userId_commentId: {
        userId,
        commentId,
      },
    },
  });

  if (commentLike) {
    await db.commentLike.delete({
      where: { id: commentLike.id },
    });
    return NextResponse.json({ liked: false });
  } else {
    await db.commentLike.create({
      data: { userId, commentId },
    });
    return NextResponse.json({ liked: true });
  }
}

export async function GET(req: NextRequest) {
  const session = await auth();
  const currentUserId = session?.user?.id;

  const { searchParams } = new URL(req.url);
  const fileId = searchParams.get("fileId")!;
  const parentId = searchParams.get("parentId");

  const replies = await db.comment.findMany({
    where: { fileId, parentId },
    orderBy: [{ likedBy: { _count: "desc" } }, { createdAt: "desc" }],
    include: {
      author: { select: { id: true, name: true, avatar: true } },
      _count: {
        select: { likedBy: true, replies: true },
      },
      likedBy: {
        where: { userId: currentUserId },
        select: { id: true },
      },
    },
  });

  return NextResponse.json(replies);
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
