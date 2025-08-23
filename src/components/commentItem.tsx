"use client";
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  CornerDownRight,
  CornerUpLeft,
  Heart,
  Trash2,
  UserIcon,
} from "lucide-react";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import CommentBox from "./commentBox";

interface CommentItemProps {
  id: string;
  avatar: string;
  name: string;
  authorId: string;
  content: string;
  session: Session | null;
  createdAt: Date;
  hasReplies: boolean;
  fileId: string;
  likes: number;
  likedByMe?: boolean;
  onDeleteReply?: (id: string) => void;
}

const CommentItem = ({
  id,
  avatar,
  name,
  authorId,
  content,
  session,
  createdAt,
  hasReplies,
  likes,
  fileId,
  likedByMe = false,
  onDeleteReply,
}: CommentItemProps) => {
  const [likeCount, setLikeCount] = useState(likes);
  const [isLiked, setIsLiked] = useState(session ? likedByMe : false);
  const [isToggled, setIsToggled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [replies, setReplies] = useState<any[]>([]);
  const [showReplies, setShowReplies] = useState(false);
  const [loadingReplies, setLoadingReplies] = useState(false);
  const [commentContent, setCommentContent] = useState(content);

  const router = useRouter();

  async function handleDelete() {
    if (!confirm("Desea eliminar el comentario?")) return;
    setLoading(true);
    try {
      const res = await fetch("/api/comments", {
        method: "DELETE",
        body: JSON.stringify({ id }),
      });
      if (res.ok && res.status == 202) {
        setCommentContent("");
      }
      if (res.ok && res.status != 202) {
        if (onDeleteReply) {
          onDeleteReply(id);
        }
      }
    } finally {
      setLoading(false);
      router.refresh();
    }
  }
  async function handleLike() {
    if (!session?.user) return;

    // optimistic update
    setIsLiked(!isLiked);
    setLikeCount((prev) => prev + (isLiked ? -1 : 1));

    try {
      const res = await fetch("/api/comments", {
        method: "PATCH",
        body: JSON.stringify({ userId: session.user.id, commentId: id }),
      });

      if (!res.ok) {
        // rollback if failed
        setIsLiked(isLiked);
        setLikeCount(likes);
      }
    } catch (err) {
      // rollback on error
      setIsLiked(isLiked);
      setLikeCount(likes);
    }
  }

  function handleReply() {
    setIsToggled(!isToggled);
  }

  async function handleShowReplies() {
    if (showReplies) {
      // collapse replies if already open
      setShowReplies(false);
      return;
    }

    setLoadingReplies(true);
    try {
      const res = await fetch(`/api/comments?fileId=${fileId}&parentId=${id}`);
      if (res.ok) {
        const data = await res.json();
        setReplies(data);
        setShowReplies(true);
      }
    } finally {
      setLoadingReplies(false);
    }
  }

  return (
    <>
      <div className="flex gap-3 rounded-2xl px-4 py-3 hover:bg-muted/40">
        {/* Avatar */}
        <Avatar className="h-10 w-10">
          <AvatarImage src={avatar} />
          <AvatarFallback>
            <UserIcon />
          </AvatarFallback>
        </Avatar>

        {/* Content */}
        <div className="flex w-full flex-col">
          {/* Header */}
          <div className="flex items-center gap-2">
            <span className="font-semibold">{name}</span>
            <span className="text-xs text-muted-foreground">
              {createdAt.toLocaleDateString()}
            </span>
          </div>

          {/* Body */}
          <p className="whitespace-pre-wrap break-all text-sm text-foreground">
            {commentContent ? (
              commentContent
            ) : (
              <h6 className="rounded-md bg-gray-300 italic">
                Comentario eliminado por el autor
              </h6>
            )}
          </p>

          {/* Actions */}
          <div className="mt-1 flex items-center gap-4 text-xs text-muted-foreground">
            <button onClick={handleReply} className="hover:text-blue-500">
              <CornerUpLeft size={18} />
            </button>

            <button
              onClick={handleLike}
              disabled={loading}
              className={`flex items-center gap-1 hover:text-pink-500 ${
                isLiked ? "text-pink-500" : ""
              }`}
            >
              <Heart
                size={18}
                fill={isLiked ? "currentColor" : "none"}
                strokeWidth={isLiked ? 0 : 2}
              />
              {likeCount > 0 && <span>{likeCount}</span>}
            </button>

            {session?.user?.id === authorId && content != "" && (
              <button
                onClick={handleDelete}
                disabled={loading}
                className="hover:text-red-700"
              >
                <Trash2 size={18} />
              </button>
            )}
            {hasReplies && (
              <button onClick={handleShowReplies} disabled={loadingReplies}>
                {loadingReplies
                  ? "Cargando..."
                  : showReplies
                    ? "Ocultar Respuestas -"
                    : `Mostrar Respuestas (${hasReplies ? " +" : ""})`}
              </button>
            )}
          </div>
        </div>
      </div>
      {isToggled ? (
        <div className="ml-20 flex text-muted-foreground">
          <CornerDownRight size={40} />
          <CommentBox
            fileId={fileId}
            parentId={id}
            isReply={true}
            setToggle={setIsToggled}
            session={session}
            showReplies={handleShowReplies}
          />
        </div>
      ) : (
        ""
      )}
      {showReplies && replies.length > 0 && (
        <div className="ml-10 border-l pl-4">
          {replies.map((reply: any) => (
            <CommentItem
              key={reply.id}
              id={reply.id}
              avatar={reply.author.avatar}
              name={reply.author.name}
              authorId={reply.author.id}
              content={reply.content}
              createdAt={new Date(reply.createdAt)}
              session={session}
              hasReplies={reply._count.replies > 0}
              fileId={fileId}
              likes={reply._count.likedBy}
              likedByMe={reply.likedBy.length > 0}
              onDeleteReply={(deletedId) =>
                setReplies((prev) => prev.filter((r) => r.id !== deletedId))
              }
            />
          ))}
        </div>
      )}
    </>
  );
};

export default CommentItem;
