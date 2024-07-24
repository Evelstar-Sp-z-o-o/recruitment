import { useEffect, useState } from 'react';

import { Box, Typography } from '@mui/material';

import Loader from '../components/Loader';
import MyPostBox from '../components/posts/MyPostBox';
import { Post } from '../types';

const Posts = () => {
  const [posts, setPosts] = useState<Post[]>();
  const currentUser = 'haniakim';

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`/api/posts`);

        if (response.ok) {
          const data = await response.json();
          const dataWithId = data.map((post) => ({ ...post.data, id: post.id }));
          dataWithId.sort((a, b) => b.createdAt - a.createdAt);
          const currentUserPosts = dataWithId.filter((post) => post.username === currentUser);
          setPosts(currentUserPosts);
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
        width: '100%',
        '@media (min-width: 768px)': {
          borderRight: '1px solid lightgray',
        },
      }}
    >
      {posts.length === 0 ? (
        <Box sx={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ mt: 2 }}>
            There are no posts yet
          </Typography>
        </Box>
      ) : (
        <>
          {posts.map((post) => (
            <Box
              key={post.id}
              sx={{
                borderBottom: '1px solid lightgray',
                paddingX: 2,
                paddingY: 4,
                '@media (min-width: 768px)': {
                  p: 4,
                },
              }}
            >
              <MyPostBox post={post} />
            </Box>
          ))}
        </>
      )}
    </Box>
  );
};

export default Posts;
