import type { Post } from './types';

export const BASE_API_URL = 'http://localhost:3000/api';

const getPosts = async () => {
  const ENDPOINT = '/posts';

  const res = await fetch(BASE_API_URL + ENDPOINT);

  if (!res.ok) {
    throw new Error('Something went wrong when loading Posts list.');
  }

  const data = await res.json();

  return data as unknown as Post[];
};

const getSinglePost = async (postId: string) => {
  const ENDPOINT = `/posts/${postId}`;

  const res = await fetch(BASE_API_URL + ENDPOINT);

  if (!res.ok) {
    throw new Error('Something went wrong when loading Post details.');
  }

  const data = await res.json();
  return data as unknown as Post;
};

const deletePost = async (postId: string) => {
  const ENDPOINT = `/posts/${postId}`;

  const res = await fetch(BASE_API_URL + ENDPOINT, {
    method: 'DELETE',
  });

  if (!res.ok) {
    throw new Error('Something went wrong when deleting post.');
  }

  const data = await res.json();
  return data as unknown as Post;
};

const updatePost = async (postId: string, postData: Partial<Post>) => {
  const ENDPOINT = `/posts/${postId}`;

  const res = await fetch(BASE_API_URL + ENDPOINT, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postData),
  });

  if (!res.ok) {
    throw new Error('Something went wrong when updating post.');
  }

  const data = await res.json();
  return data as unknown as Post;
};

const createPost = async (postData: Partial<Post>) => {
  const ENDPOINT = `/posts`;

  const res = await fetch(BASE_API_URL + ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postData),
  });

  if (!res.ok) {
    throw new Error('Something went wrong when creating post.');
  }

  const data = await res.json();

  return data as unknown as Post;
};

export { getPosts, getSinglePost, updatePost, createPost, deletePost };
