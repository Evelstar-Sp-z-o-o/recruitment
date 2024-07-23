import apiService from '@/src/infrastructure/store/services/apiService';

import { PostsResponse } from './types';

const POSTS = 'posts';

const postsApi = apiService.enhanceEndpoints({ addTagTypes: [POSTS] }).injectEndpoints({
  endpoints(builder) {
    return {
      getPosts: builder.query<PostsResponse[], void>({
        query: () => ({
          url: '/api/posts',
        }),
        providesTags: [POSTS],
      }),
    };
  },
});

export default postsApi;

export const { useGetPostsQuery } = postsApi;
