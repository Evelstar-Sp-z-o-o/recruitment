import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Post from '@/src/components/Post';
import { RootState, AppDispatch } from '@/src/store/postStore';
import { fetchPosts } from '@/src/store/postsSlice';
import { Box, Typography } from '@mui/material';

const PostsList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const postsState = useSelector((state: RootState) => state.posts);
  const { posts, status, error } = postsState;

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPosts());
    }
  }, [status, dispatch]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '8px 0',
      }}
    >
      {status === 'loading' && <Typography>Loading...</Typography>}
      {status === 'failed' && <Typography>{error}</Typography>}
      {status === 'succeeded' && posts.length > 0 && (
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
            mt: 2,
            gap: '18px',
            mb: 4,
          }}
        >
          {posts.map(({ id, data }) => (
            <Post key={id} author={data.author} text={data.body} postId={id} created={data.created} />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default PostsList;
