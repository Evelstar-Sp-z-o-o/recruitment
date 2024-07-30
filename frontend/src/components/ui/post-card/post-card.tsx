import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Post } from '@/src/types';
import { Card, CardActionArea } from '@mui/material';

import PostCardContent from './post-card-content';

const containerStyles = {
  m: 0,
  width: '100%',
  border: 'none',
  borderBottom: '2px solid lightgray',
  boxShadow: 'none',
  borderRadius: 0,
};
const actionAreaStyles = {
  p: 2,
};

interface Props {
  post: Post;
}

const PostCard: React.FC<Props> = ({ post }) => {
  const navigate = useNavigate();
  const { id: postId } = post;

  const handleClick = (postId: string) => {
    navigate(`/posts/${postId}`);
  };

  return (
    <Card sx={containerStyles}>
      <CardActionArea sx={actionAreaStyles} onClick={() => handleClick(postId)}>
        <PostCardContent post={post} />
      </CardActionArea>
    </Card>
  );
};

export default PostCard;
