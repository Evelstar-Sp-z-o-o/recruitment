import { Dispatch } from 'redux';

import { PostActionTypes, Post } from '../../types';

export const fetchPosts = () => async (dispatch: Dispatch<PostActionTypes>) => {
  const response = await fetch('http://localhost:3000/api/posts');
  const data: Post[] = await response.json();
  dispatch({ type: 'FETCH_POSTS', payload: data });
};

export const fetchPost = (id: number) => async (dispatch: Dispatch<PostActionTypes>) => {
  const response = await fetch(`http://localhost:3000/api/posts/${id}`);
  const data: Post = await response.json();
  dispatch({ type: 'FETCH_POST', payload: data });
};

export const createPost = (post: Omit<Post, 'id'>) => async (dispatch: Dispatch<PostActionTypes>) => {
  const response = await fetch('http://localhost:3000/api/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(post),
  });
  const data: Post = await response.json();
  dispatch({ type: 'CREATE_POST', payload: data });
};

export const updatePost = (post: Post) => async (dispatch: Dispatch<PostActionTypes>) => {
  const response = await fetch(`http://localhost:3000/api/posts/${post.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(post),
  });
  const data: Post = await response.json();
  dispatch({ type: 'UPDATE_POST', payload: data });
};

export const deletePost = (id: number) => async (dispatch: Dispatch<PostActionTypes>) => {
  await fetch(`http://localhost:3000/api/posts/${id}`, {
    method: 'DELETE',
  });
  dispatch({ type: 'DELETE_POST', payload: id });
};

export const setEditingPost = (post: Post | null) => (dispatch: Dispatch<PostActionTypes>) => {
  dispatch({ type: 'SET_EDITING_POST', payload: post });
};
