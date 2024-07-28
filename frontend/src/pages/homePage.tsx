import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Container, Typography } from '@mui/material';

import { AppDispatch, RootState } from '../store/postStore';
import { fetchPosts } from '../store/slices/postsSlice';

import PostForm from '../components/PostForm';
import PostItem from '../components/PostItem/PostItem';
import { ErrorText } from './PostPage';

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
    return <ErrorText variant="h6">Error: {error}</ErrorText>;
  }

  return (
    <Container>
      <PostForm />
      {posts.length > 0 ? (
        posts.map((post) => <PostItem key={post.id} post={post} reducedView={true} />)
      ) : (
        <ErrorText variant="h6">No posts available</ErrorText>
      )}
    </Container>
  );
};

export default HomePage;
