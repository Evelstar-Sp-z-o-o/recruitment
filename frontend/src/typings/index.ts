export interface Post {
  id: string;
  data: {
    body: string;
    author: string;
    created: Date;
    edited: Date;
    postId: string;
  };
}
