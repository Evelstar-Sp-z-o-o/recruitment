import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Container, Typography } from '@mui/material';

import { AppDispatch, RootState } from '../store/postStore';
import { fetchPosts } from '../store/postsSlice';

import PostForm from '../components/PostForm';
import PostItem from '../components/PostItem/PostItem';

const HomePage: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const state = useSelector((state: RootState) => state.posts);
  const { posts, status, error } = state;

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPosts());
    }
  }, [dispatch, status]);

  if (status === 'failed') {
    return <Typography variant="h6">Error: {error}</Typography>;
  }

  return (
    <Container>
      <PostForm />
      {posts.length > 0 ? (
        posts.map((post) => <PostItem key={post.id} post={post} reducedView={true} />)
      ) : (
        <Typography variant="h6">No posts available</Typography>
      )}
    </Container>
  );
};

export default HomePage;
