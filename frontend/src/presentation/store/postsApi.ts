import apiService from '@/src/infrastructure/store/services/apiService';

import { ITEMS_PER_PAGE } from './constants/pagination';
import POSTS from './constants/tags';
import { AddPostRequest, DeletePostRequest, EditPostRequest, PostsRequest, PostsResponse } from './types';

const postsApi = apiService.enhanceEndpoints({ addTagTypes: [POSTS] }).injectEndpoints({
  endpoints(builder) {
    return {
      getPosts: builder.query<PostsResponse[], PostsRequest>({
        query: ({ sort, order, page }) => ({
          url: `/api/posts?_sort=${sort}&_order=${order}&_page=${page}&_limit=${ITEMS_PER_PAGE}`,
        }),
        serializeQueryArgs: ({ endpointName }) => {
          return endpointName;
        },
        merge: (currentCache, newItems, { arg: { page } }) => {
          if (page === 1) {
            return newItems;
          }
          return [...currentCache, ...newItems.filter((item) => !currentCache.some((cached) => cached.id === item.id))];
        },
        forceRefetch({ currentArg, previousArg }) {
          return currentArg !== previousArg;
        },
        providesTags: (result) =>
          result
            ? [...result.map(({ id }) => ({ type: POSTS, id })), { type: POSTS, id: 'LIST' }]
            : [{ type: POSTS, id: 'LIST' }],
      }),
      addPost: builder.mutation<PostsResponse, AddPostRequest>({
        query: (data) => ({
          url: '/api/posts',
          method: 'post',
          body: { data },
        }),
        onQueryStarted: async (post, { dispatch, queryFulfilled }) => {
          try {
            const { data: newPost } = await queryFulfilled;
            dispatch(
              postsApi.util.updateQueryData('getPosts', undefined, (draft) => {
                draft.unshift({ id: newPost.id, data: newPost.data });
              }),
            );
          } catch {
            console.error('Failed to add new post');
          }
        },
      }),
      deletePost: builder.mutation<void, DeletePostRequest>({
        query: ({ id }) => ({
          url: `/api/posts/${id}`,
          method: 'delete',
        }),
        async onQueryStarted({ id }, { dispatch, queryFulfilled }) {
          const patchResult = dispatch(
            postsApi.util.updateQueryData('getPosts', undefined, (draft) => {
              if (draft) {
                const index = draft.findIndex((post) => post.id === id);
                if (index !== -1) {
                  draft.splice(index, 1);
                }
              }
            }),
          );
          try {
            await queryFulfilled;
          } catch {
            patchResult.undo();
          }
        },
      }),
      editPost: builder.mutation<PostsResponse, EditPostRequest>({
        query: ({ id, ...data }) => ({
          url: `/api/posts/${id}`,
          method: 'put',
          body: { data: { ...data } },
        }),
        async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
          const patchResult = dispatch(
            postsApi.util.updateQueryData('getPosts', undefined, (draft) => {
              const index = draft.findIndex((post) => post.id === id);
              if (index !== -1) {
                draft[index] = {
                  id: id,
                  data: patch,
                };
              }
            }),
          );
          try {
            const { data: updatedPost } = await queryFulfilled;
            dispatch(
              postsApi.util.updateQueryData('getPosts', undefined, (draft) => {
                const index = draft.findIndex((post) => post.id === id);
                if (index !== -1) {
                  draft[index] = updatedPost;
                }
              }),
            );
          } catch {
            patchResult.undo();
          }
        },
      }),
    };
  },
});

export default postsApi;

export const { useGetPostsQuery, useAddPostMutation, useDeletePostMutation, useEditPostMutation } = postsApi;
