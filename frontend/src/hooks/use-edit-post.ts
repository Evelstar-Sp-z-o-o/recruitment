import type { PostFormData } from '@/src/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { handleError } from '../utils/fetchErrorHandler';

import { updatePost } from '../api';

const useEditPost = (postId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postData: PostFormData) => updatePost(postId, { ...postData, edited: Math.round(Date.now() / 1000) }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      queryClient.invalidateQueries({
        queryKey: [`post-${postId}`],
      });
    },
    onError: (error) => {
      handleError(error);
    },
  });
};

export default useEditPost;
