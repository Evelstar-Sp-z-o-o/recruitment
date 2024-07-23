export interface Post {
  content: string;
  imageUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
  username: string;
  numberOfLikes: number;
  id: string;
}
