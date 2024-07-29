import { useMutation, useQueryClient } from '@tanstack/react-query';

import { handleError } from '../utils/fetchErrorHandler';

import { deletePost } from '../api';

const useDeletePost = (postId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deletePost(postId),
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

export default useDeletePost;
