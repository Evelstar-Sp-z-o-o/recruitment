import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { Container, styled, Typography } from '@mui/material';

import { AppDispatch, RootState } from '../store/postStore';
import { fetchPosts } from '../store/slices/postsSlice';

import PostItem from '../components/PostItem/PostItem';

export const ErrorText = styled(Typography)({
  padding: '16px',
});

const PostPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();

  const state = useSelector((state: RootState) => state.posts);
  const { posts, status, error } = state;

  const post = posts.find((post) => post.id === +id);

  useEffect(() => {
    if (id && !post && status === 'idle') {
      dispatch(fetchPosts());
    }
  }, [id, post, status, dispatch]);

  if (status === 'failed' && error) {
    return <ErrorText variant="h6">Error: {error}</ErrorText>;
  }

  if (!post) {
    return <ErrorText variant="h6">Post with id {id} could not be found.</ErrorText>;
  }

  return (
    <Container>
      <PostItem post={post} />
    </Container>
  );
};

export default PostPage;
