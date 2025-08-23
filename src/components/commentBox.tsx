// components/CommentBox.tsx
"use client";
import { z } from "zod";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import { Card, CardContent } from "~/components/ui/card";
import { Frown, Paperclip } from "lucide-react"; // Optional icons
import { useRouter } from "next/navigation";
import { Session } from "next-auth";

interface CommentBox {
  fileId: string;
  parentId?: string;
  isReply?: boolean;
  setToggle?: Dispatch<SetStateAction<boolean>>;
  showReplies?: () => void;
  session: Session | null;
}

export default function CommentBox({
  fileId,
  parentId,
  setToggle,
  isReply = false,
  showReplies,
  session,
}: CommentBox) {
  const [comment, setComment] = useState<Comment>({
    content: "",
    fileId: fileId,
  });
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const maxLength = 2000;
  const CommentSchema = z.object({
    content: z.string().max(2000).min(2),
    fileId: z.string(),
    parentId: z.string().optional(),
  });

  type Comment = z.infer<typeof CommentSchema>;

  async function handleSubmit() {
    if (CommentSchema.safeParse(comment).success && !loading) {
      const payload = parentId ? { ...comment, parentId } : comment;

      try {
        setLoading(true);
        await fetch("/api/comments", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        setComment({ content: "", fileId });
        router.refresh();

        if (setToggle && showReplies) {
          setToggle(false);
          showReplies();
        }
      } catch (e) {
        console.error("Unable to post Comment:", e);
      } finally {
        setLoading(false);
      }
    }
  }
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  // Auto-resize effect
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [comment]);

  if (!session) {
    return (
      <div className={`${parentId ? "flex items-end" : ""}`}>
        <p className="flex items-center justify-center gap-2 text-xl font-bold">
          Tienes que iniciar sesión para comentar <Frown />
        </p>
      </div>
    );
  }
  return (
    <Card className="w-full rounded-2xl border">
      <CardContent className="p-4">
        <Textarea
          ref={textareaRef}
          placeholder="Escribe un comentario..."
          className="min-h-[40px] resize-none border-none shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
          value={comment.content}
          maxLength={maxLength}
          onChange={(e) =>
            setComment({
              content: e.target.value,
              fileId,
            })
          }
        />

        <div className="mt-3 flex items-center justify-between">
          {/* Left icons */}
          <div className="flex items-center gap-3 text-muted-foreground">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              title="Subir Archivo"
            >
              <Paperclip className="h-4 w-4 -rotate-45" />
            </Button>
            <p>
              {comment.content.length}/{maxLength}
            </p>
          </div>

          {/* Right action buttons */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              onClick={() => {
                setComment({
                  content: "",
                  fileId,
                });
                if (isReply && setToggle) {
                  setToggle(false);
                }
              }}
              className="text-sm"
            >
              Cancelar
            </Button>
            <Button
              disabled={
                !comment.content.trim() ||
                comment.content.length > 2000 ||
                loading
              }
              onClick={handleSubmit}
              type="submit"
              className="text-sm"
            >
              Comentar
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
