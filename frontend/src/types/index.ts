export interface Post {
  content: string;
  imageUrl: string | null;
  createdAt: number;
  updatedAt: number;
  username: string;
  numberOfLikes: number;
  id: string;
  likes: string[];
}

export interface NewPost {
  content: string;
  imageUrl: string | null;
  createdAt: number;
  updatedAt: number;
  username: string;
  numberOfLikes: number;
  likes: string[];
}
