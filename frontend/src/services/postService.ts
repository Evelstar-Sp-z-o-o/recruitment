import axios from 'axios';

import { Post, PostData } from '../types/types';

const API_URL = 'http://localhost:3000/api/posts';

const getRandomId = () => {
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }
  return result;
};

export const getPosts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getPostById = async (id: string) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createPost = async (content: string, author: string) => {
  const timestamp = new Date().getTime();
  const post: PostData = {
    body: content,
    author: author,
    created: timestamp,
    edited: timestamp,
    postId: getRandomId(),
  };
  const response = await axios.post(API_URL, { data: post });
  return response.data;
};

export const updatePost = async (post: Post) => {
  const editedPost: Post = {
    id: post.id,
    data: {
      ...post.data,
      edited: new Date().getTime(),
    },
  };
  const response = await axios.put(`${API_URL}/${post.id}`, editedPost);
  return response.data;
};

export const deletePost = async (id: number) => {
  await axios.delete(`${API_URL}/${id}`);
};
