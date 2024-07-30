import { useQuery } from '@tanstack/react-query';

import { getSinglePost } from '../api';

const useSinglePost = (id: string) => {
  return useQuery({
    queryKey: [`post-${id}`],
    queryFn: () => getSinglePost(id),
  });
};

export default useSinglePost;
