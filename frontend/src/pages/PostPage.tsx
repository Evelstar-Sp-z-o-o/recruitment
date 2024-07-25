import { FC } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

import { Avatar, Box, Typography } from '@mui/material';

import PostItem from '../shared/components/PostItem';
import { useGetPostById } from '../shared/react-query/use-post-queries';

const PostPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: post, error, isLoading } = useGetPostById(id);

  if (isLoading) {
    return <Typography variant="h6">Loading...</Typography>;
  }

  if (error instanceof Error) {
    return <Typography variant="h6">Error: {error.message}</Typography>;
  }

  if (!post) {
    return <Typography variant="h6">Post not found</Typography>;
  }

  return <PostItem post={post}></PostItem>;
};

export default PostPage;
