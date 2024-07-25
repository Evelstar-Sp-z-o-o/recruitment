import { FC } from 'react';
import { useQuery } from 'react-query';

import { Container, Typography } from '@mui/material';

import { getPosts } from '../services/postService';

const HomePage: FC = () => {
  const { data: posts, error, isLoading } = useQuery('posts', getPosts);

  if (isLoading) {
    return <Typography variant="h6">Loading...</Typography>;
  }

  if (error instanceof Error) {
    return <Typography variant="h6">Error: {error.message}</Typography>;
  }

  return (
    <>
      <Container>
        {posts?.map((post) => (
          <Typography key={post.id}>{post.data.body}</Typography>
        ))}
      </Container>
    </>
  );
};

export default HomePage;
