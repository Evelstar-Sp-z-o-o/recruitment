import type { Post } from '@/src/types';
import { Box, CircularProgress, Typography } from '@mui/material';
import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query';

import FetchErrorWrapper from '../ui/fetch-error-wrapper';
import PostCard from '../ui/post-card/post-card';

const listContainerStyles = {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
};

interface Props {
  posts: Post[] | undefined;
  isLoading: boolean;
  isError: boolean;
  refetch: (options?: RefetchOptions) => Promise<QueryObserverResult<Post[], Error>>;
}

const emptyListContainerStyles = {
  height: '500px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
};

const PostsList: React.FC<Props> = ({ posts, isLoading, isError, refetch }) => {
  if (isLoading)
    return (
      <Box sx={emptyListContainerStyles}>
        <CircularProgress />
      </Box>
    );

  if (isError)
    return <FetchErrorWrapper errorText="Something went wrong when fetching modules list." refetchFn={refetch} />;

  if (!posts || posts.length === 0)
    return (
      <Box sx={emptyListContainerStyles}>
        <Typography>Did not found any posts.</Typography>
      </Box>
    );

  return (
    <Box sx={listContainerStyles} component="ul">
      {posts.map((post) => {
        return (
          <li key={post.id}>
            <PostCard post={post} />
          </li>
        );
      })}
    </Box>
  );
};

export default PostsList;
