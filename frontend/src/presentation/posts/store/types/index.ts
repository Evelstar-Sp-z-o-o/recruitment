type PostsResponse = {
  data: Data;
  id: number;
};

type Data = {
  body: string;
  author: string;
  created: number;
  edited: number;
  postId: string;
};

export type { PostsResponse };
