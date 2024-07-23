import { Paper, useMediaQuery, useTheme } from '@mui/material';

import { useGetPostsQuery } from '../../store/postsApi';

import Post from '../Post';

const Posts = () => {
  const { data: posts } = useGetPostsQuery();

  return posts?.map((x) => <Post />);
};

export default Posts;
