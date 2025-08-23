import { Session } from "next-auth";
import React from "react";
import CommentBox from "./commentBox";
import CommentItem from "./commentItem";
import { getComments } from "~/utils/getComments";

interface CommentSection {
  session: Session | null;
  fileId: string;
}
export const CommentSection = async ({ session, fileId }: CommentSection) => {
  const currentUserId = session?.user?.id;
  const comments = await getComments({ fileId, currentUserId });

  return (
    <>
      <h1 className="py-4 text-3xl font-bold">Comments section</h1>
      <div className="h-auto w-full rounded-2xl p-4 dark:bg-gray-800">
        <CommentBox fileId={fileId} session={session} />

        {comments.map((c) => {
          return (
            <CommentItem
              key={c.id}
              fileId={fileId}
              id={c.id}
              likes={c._count.likedBy}
              session={session}
              avatar={c.author.avatar}
              hasReplies={c._count.replies > 0}
              name={c.author.name}
              authorId={c.authorId}
              content={c.content}
              likedByMe={c.likedBy.length > 0 ? true : false}
              createdAt={c.createdAt}
            />
          );
        })}
      </div>
    </>
  );
};
