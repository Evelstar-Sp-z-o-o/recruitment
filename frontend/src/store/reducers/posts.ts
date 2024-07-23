import { createSlice } from "@reduxjs/toolkit";
import { addPost, deletePost, editPost, fetchPosts } from "../actions/posts";

const postSlice = createSlice({
  name: "posts",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.unshift(action.payload);
      })
      .addCase(editPost.fulfilled, (state, action) => {
        const index = state.findIndex((post) => post.id === action.payload.id);
        if (index !== -1) {
          state[index] = action.payload;
        }
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        return state.filter((post) => post.id !== action.payload);
      });
  },
});

export default postSlice.reducer;
