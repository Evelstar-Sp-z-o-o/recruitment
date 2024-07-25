import axios from 'axios';

import { PostData } from '../types/types';

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

export const getPostById = async (id: number) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createPost = async (content: string) => {
  const timestamp = new Date().getTime();
  const post: PostData = {
    body: content,
    author: 'abc@gmail.com',
    created: timestamp,
    edited: timestamp,
    postId: getRandomId(),
  };
  const response = await axios.post(API_URL, { data: post });
  return response.data;
};

export const updatePost = async (id: number, post: { title: string; content: string }) => {
  const response = await axios.put(`${API_URL}/${id}`, post);
  return response.data;
};

export const deletePost = async (id: number) => {
  await axios.delete(`${API_URL}/${id}`);
};
