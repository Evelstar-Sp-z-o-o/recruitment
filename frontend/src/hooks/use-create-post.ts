import { useSelector } from 'react-redux';

import type { PostFormData } from '@/src/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { handleError } from '../utils/fetchErrorHandler';

import { createPost } from '../api';
import { RootState } from '../redux/store';

const useCreatePost = () => {
  const queryClient = useQueryClient();
  const user = useSelector((state: RootState) => state.user.user);

  return useMutation({
    mutationFn: (postData: PostFormData) =>
      createPost({
        body: postData.body,
        author: user.email,
        created: Math.round(Date.now() / 1000),
        edited: Math.round(Date.now() / 1000),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
    onError: (error) => {
      handleError(error);
    },
  });
};

export default useCreatePost;
