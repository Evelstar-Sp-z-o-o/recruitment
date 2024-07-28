import Order from '../constants/order';

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

type PostsRequest = {
  sort: string;
  order: Order;
  page: number;
};

type AddPostRequest = {
  body: string;
  author: string;
  created: number;
  postId: string;
  edited?: number | null;
};

type DeletePostRequest = {
  id: number;
};

type EditPostRequest = {
  body: string;
  author: string;
  created: number;
  postId: string;
  id: number;
  edited: number;
};

export type { PostsResponse, AddPostRequest, PostsRequest, DeletePostRequest, EditPostRequest };
