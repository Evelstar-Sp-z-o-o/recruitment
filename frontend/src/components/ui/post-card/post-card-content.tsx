import React, { useState } from 'react';

import { Post } from '@/src/types';
import { CardContent, Typography, Box, Avatar, Button } from '@mui/material';

import PostTime from '../postTime';

const cardHeaderStyles = {
  display: 'flex',
  alignItems: 'center',
  gap: 2,
};

const showMoreButtonStyles = { textTransform: 'none' };

interface Props {
  post: Post;
}

const PostCardContent: React.FC<Props> = ({ post }) => {
  const { author, body, created, edited } = post;
  const characterLimit = 280;

  const truncatedBody = body.length > characterLimit ? `${body.slice(0, characterLimit)}...` : body;

  return (
    <CardContent>
      <Box sx={cardHeaderStyles}>
        <Avatar alt={author}>{author.charAt(0)}</Avatar>
        <Typography variant="subtitle1" fontWeight={600}>
          {author}
        </Typography>
      </Box>
      <PostTime created={created} edited={edited} />
      <Typography mt={3} ml={7}>
        {body.length > characterLimit ? truncatedBody : body}
        {body.length > characterLimit && (
          <Button variant="text" sx={showMoreButtonStyles}>
            Show more
          </Button>
        )}
      </Typography>
    </CardContent>
  );
};

export default PostCardContent;
