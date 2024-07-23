import { Box } from '@mui/material';

import PostCard from '../components/posts/PostCard';
import { Post } from '../types';

interface PostsProps {
  posts: Post[];
}

const Posts: React.FC<PostsProps> = ({ posts }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        width: '100%',
        p: 2,
        '@media (min-width: 768px)': {
          borderRight: '1px solid lightgray',
          pt: 4,
        },
      }}
    >
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </Box>
  );
};

export default Posts;
