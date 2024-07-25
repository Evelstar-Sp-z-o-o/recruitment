import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface Post {
  id: number;
  body: string;
  author: string;
  created: number;
  edited?: number;
  postId: string;
}

export const fetchPosts = createAsyncThunk<Post[]>(
  "posts/fetchPosts",
  async () => {
    const response = await axios.get("http://localhost:3000/api/posts");
    return response.data.map((item) => ({ ...item.data, id: item.id }));
  }
);

export const addPost = createAsyncThunk<Post, { body: string; author: string }>(
  "posts/addPost",
  async ({body, author}) => {
    const newPostData = {
      body,
      author,
      created: Date.now(),
      edited: Date.now(),
      postId: Math.random().toString(36).substr(2, 6),
    };
    const response = await axios.post("http://localhost:3000/api/posts", {
      data: newPostData,
    });
    return { ...response.data.data, id: response.data.id };
  }
);

export const editPost = createAsyncThunk<Post, { id: number; body: string }>(
  "posts/editPost",
  async ({ id, body }) => {
    const updatedPostData = (
      await axios.get(`http://localhost:3000/api/posts/${id}`)
    ).data.data;
    const response = await axios.put(`http://localhost:3000/api/posts/${id}`, {
      data: { ...updatedPostData, body, edited: Date.now() },
    });
    return { ...response.data.data, id: response.data.id };
  }
);

export const deletePost = createAsyncThunk<number, number>(
  "posts/deletePost",
  async (id) => {
    await axios.delete(`http://localhost:3000/api/posts/${id}`);
    return id;
  }
);
