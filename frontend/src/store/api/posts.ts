import { v4 as uuidv4 } from 'uuid';

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  }),
  tagTypes: ['Posts'],
  endpoints: (builder) => ({
    getPosts: builder.query<IArticlesDataTypes, void>({
      query: () => ({
        url: '/',
      }),
      providesTags: ['Posts'],
    }),
    updatePost: builder.mutation({
      query: (body) => ({
        url: `/${body.id}`,
        method: 'PUT',
        body: {
          data: {
            body: body.data.body,
            author: body.data.author,
            created: body.data.created,
            edited: Date.now(),
            postId: body.data.postId,
          },
          id: body.id,
        },
      }),
      invalidatesTags: ['Posts'],
    }),
    createPost: builder.mutation({
      query: (body) => ({
        url: `/`,
        method: 'POST',
        body: {
          data: {
            body: body.data.body,
            author: body.data.author,
            created: Date.now(),
            edited: Date.now(),
            postId: uuidv4(),
          },
          id: body.id,
        },
      }),
      invalidatesTags: ['Posts'],
    }),
    removePost: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
        credentials: 'include',
      }),
      invalidatesTags: ['Posts'],
    }),
  }),
});

export const { useGetPostsQuery, useCreatePostMutation, useUpdatePostMutation, useRemovePostMutation } = postsApi;
