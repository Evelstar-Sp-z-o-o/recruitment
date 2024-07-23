import { useEffect, useState } from 'react';

import { Box, Typography } from '@mui/material';

import PostCard from '../components/posts/PostCard';
import { Post } from '../types';

interface HomeProps {
  posts: Post[];
}

const Home: React.FC<HomeProps> = ({ posts }) => {
  const [recentPosts, setRecentPosts] = useState<Post[]>();

  useEffect(() => {
    if (posts) {
      const now = new Date();
      const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000); // 1 tydzien temu
      const latestPosts = posts.filter((post) => post.updatedAt > oneWeekAgo);
      setRecentPosts(latestPosts);
    }
  }, [posts]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        width: '100%',
        '@media (min-width: 768px)': {
          borderRight: '1px solid lightgray',
          pt: 4,
        },
      }}
    >
      <Typography variant="h6" component="h2">
        Recent Posts
      </Typography>

      {!recentPosts || recentPosts.length === 0 ? (
        <Box>No posts created within a week</Box>
      ) : (
        <Box>
          {recentPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default Home;
