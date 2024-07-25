import { FC } from 'react';

import styled from 'styled-components';

import { Container, Typography } from '@mui/material';

import PostForm from '../components/PostForm';
import PostItem from '../shared/components/PostItem';
import { useGetPosts } from '../shared/react-query/use-post-queries';

const ModalContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #364fc7;
`;

const HomePage: FC = () => {
  const { data: posts, error, isLoading } = useGetPosts();

  if (isLoading) {
    return <Typography variant="h6">Loading...</Typography>;
  }

  if (error instanceof Error) {
    return <Typography variant="h6">Error: {error.message}</Typography>;
  }

  return (
    <>
      <Container>
        <PostForm />
        {posts?.map((post) => (
          <PostItem post={post} reducedView={true} />
        ))}
      </Container>
    </>
  );
};

export default HomePage;
