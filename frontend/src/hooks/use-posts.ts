import { Post } from '@/src/types';
import { useQuery } from '@tanstack/react-query';

import { getPosts } from '../api';

const usePosts = () => {
  return useQuery<Post[]>({
    queryKey: ['posts'],
    queryFn: () => getPosts(),
  });
};

export default usePosts;
