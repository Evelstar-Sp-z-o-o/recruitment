type Post = {
  body: string;
  author: string;
  created: number;
  edited: number;
  id: string;
};

type PostFormData = Pick<Post, 'body'>;

type User = {
  email: string;
};

export type { Post, PostFormData, User };
