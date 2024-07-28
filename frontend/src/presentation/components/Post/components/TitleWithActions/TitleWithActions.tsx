import { FunctionComponent } from 'react';

import { PostsResponse } from '@/src/presentation/store/types';
import { Box, Typography } from '@mui/material';

import DeletePost from '../DeletePost';
import EditPost from '../EditPost';

type Props = {
  post: PostsResponse;
};

const TitleWithActions: FunctionComponent<Props> = ({ post }) => {
  return (
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Typography variant="caption">{post.data.author}</Typography>
      <Box>
        <EditPost post={post} />
        <DeletePost id={post.id} />
      </Box>
    </Box>
  );
};

export default TitleWithActions;
