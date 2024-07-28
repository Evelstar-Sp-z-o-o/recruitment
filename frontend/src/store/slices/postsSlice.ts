import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import {
  getPosts,
  createPost,
  updatePost as updatePostService,
  deletePost as deletePostService,
} from '../../services/postService';
import { Post } from '../../types/types';
import { RootState } from '../postStore';

interface PostsState {
  posts: Post[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: PostsState = {
  posts: [],
  status: 'idle',
  error: null,
};

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (_, { rejectWithValue }) => {
  try {
    const posts = await getPosts();
    return posts as Post[];
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch posts');
  }
});

export const addPost = createAsyncThunk('posts/addPost', async (content: string, { getState, rejectWithValue }) => {
  try {
    const state = getState() as RootState;
    const author = state.user.nickname;
    const newPost = await createPost(content, author);
    return newPost as Post;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to add post');
  }
});
export const updatePost = createAsyncThunk('posts/updatePost', async (post: Post, { rejectWithValue }) => {
  try {
    const updatedPost = await updatePostService(post);
    return updatedPost as Post;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to update post');
  }
});

export const deletePost = createAsyncThunk('posts/deletePost', async (id: number, { rejectWithValue }) => {
  try {
    await deletePostService(id);
    return id;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to delete post');
  }
});

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
        state.status = 'succeeded';
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action: PayloadAction<any>) => {
        state.status = 'failed';
        state.error = action.payload ?? 'Failed to fetch posts';
      })
      .addCase(addPost.fulfilled, (state, action: PayloadAction<Post>) => {
        state.posts.push(action.payload);
      })
      .addCase(addPost.rejected, (state, action: PayloadAction<any>) => {
        state.error = action.payload ?? 'Failed to add post';
      })
      .addCase(updatePost.fulfilled, (state, action: PayloadAction<Post>) => {
        const index = state.posts.findIndex((post) => post.data.postId === action.payload.data.postId);
        if (index !== -1) {
          state.posts[index] = action.payload;
        }
      })
      .addCase(updatePost.rejected, (state, action: PayloadAction<any>) => {
        state.error = action.payload ?? 'Failed to update post';
      })
      .addCase(deletePost.fulfilled, (state, action: PayloadAction<number>) => {
        state.posts = state.posts.filter((post) => post.id !== action.payload);
      })
      .addCase(deletePost.rejected, (state, action: PayloadAction<any>) => {
        state.error = action.payload ?? 'Failed to delete post';
      });
  },
});

export default postsSlice.reducer;
