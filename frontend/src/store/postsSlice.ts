import { Post } from '@/src/typings';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

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

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await fetch('http://localhost:3000/api/posts');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return (await response.json()) as Post[];
});

export const addPost = createAsyncThunk('posts/addPost', async ({ data, id }: Post) => {
  const response = await fetch('http://localhost:3000/api/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ data, id }),
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return (await response.json()) as Post;
});

export const updatePost = createAsyncThunk('posts/updatePost', async ({ data, id }: Post) => {
  const response = await fetch(`http://localhost:3000/api/posts/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ data }),
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return (await response.json()) as Post;
});

export const deletePost = createAsyncThunk('posts/deletePost', async (id: string) => {
  const response = await fetch(`http://localhost:3000/api/posts/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return id;
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
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? null;
      })
      .addCase(addPost.fulfilled, (state, action: PayloadAction<Post>) => {
        state.posts.push(action.payload);
      })
      .addCase(updatePost.fulfilled, (state, action: PayloadAction<Post>) => {
        const index = state.posts.findIndex((post) => post.data.postId === action.payload.data.postId);
        if (index !== -1) {
          state.posts[index] = action.payload;
        }
      })
      .addCase(deletePost.fulfilled, (state, action: PayloadAction<string>) => {
        state.posts = state.posts.filter((post) => post.id !== action.payload);
      });
  },
});

export default postsSlice.reducer;
