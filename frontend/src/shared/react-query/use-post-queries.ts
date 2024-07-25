import { useQuery, useQueryClient, useMutation } from 'react-query';

import { getPosts, createPost, updatePost, deletePost, getPostById } from '@/src/services/postService';
import { Post } from '@/src/types/types';

const POST_KEY = 'post';
export const POSTS_KEY = 'posts';

export const useGetPosts = () => {
  return useQuery(POSTS_KEY, getPosts);
};

export const useGetPostById = (id: string) => {
  return useQuery([POST_KEY, id], () => getPostById(id), {
    enabled: !!id,
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation(createPost, {
    onSuccess: () => {
      queryClient.invalidateQueries(POSTS_KEY);
    },
  });
};

export const useUpdatePost = () => {
  const queryClient = useQueryClient();

  return useMutation((post: Post) => updatePost(post), {
    onSuccess: () => {
      queryClient.invalidateQueries(POSTS_KEY);
    },
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation((id: number) => deletePost(id), {
    onSuccess: () => {
      queryClient.invalidateQueries(POSTS_KEY);
    },
  });
};
