import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { Container, Typography } from '@mui/material';

import { AppDispatch, RootState } from '../store/postStore';
import { fetchPosts } from '../store/slices/postsSlice';

import PostItem from '../components/PostItem/PostItem';

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
    return <Typography variant="h6">Error: {error}</Typography>;
  }

  if (!post) {
    return <Typography variant="h6">Post not found</Typography>;
  }

  return (
    <Container>
      <PostItem post={post} />
    </Container>
  );
};

export default PostPage;
