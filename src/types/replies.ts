export type RepliesResponse = {
  id: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  authorId: string;
  isDeleted: boolean;
  parentId: string | null;
  fileId: string;

  // relations
  author: {
    id: string;
    name: string;
    avatar: string;
  };

  _count: {
    likedBy: number;
    replies: number;
  };

  likedBy: {
    id: string;
  }[];
}[];
