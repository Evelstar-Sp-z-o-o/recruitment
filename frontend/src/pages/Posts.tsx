import { useEffect, useState } from 'react';

import { Box } from '@mui/material';

import Loader from '../components/Loader';
import PostCard from '../components/posts/PostCard';
import { Post } from '../types';

const Posts = () => {
  const [posts, setPosts] = useState<Post[]>();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/posts');

        if (response.ok) {
          const data = await response.json();
          const dataWithId = data.map((post) => ({ ...post.data, id: post.id }));
          setPosts(dataWithId);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchPosts();
  }, []);

  if (!posts) {
    return <Loader />;
  }

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
