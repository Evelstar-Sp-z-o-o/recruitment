import { FC } from 'react';

import { formatRelative } from 'date-fns';

import { Post } from '@/src/types/types';
import { Box, Typography } from '@mui/material';

interface PostItemAdditionalInfoProps {
  post: Post;
}

const PostItemAdditionalInfo: FC<PostItemAdditionalInfoProps> = ({ post }) => {
  return (
    <Box>
      <Typography variant="body2" color="textSecondary">
        {formatRelative(new Date(post.data.created), new Date())}
      </Typography>
      {post.data.created !== post.data.edited ? (
        <Typography variant="body2" color="textSecondary" sx={{ marginTop: '4px' }}>
          Edited: {formatRelative(new Date(post.data.edited), new Date())}
        </Typography>
      ) : null}
    </Box>
  );
};

export default PostItemAdditionalInfo;
