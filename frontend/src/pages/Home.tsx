import { useEffect, useState } from 'react';

import { Box, Typography } from '@mui/material';

import Loader from '../components/Loader';
import PostBox from '../components/posts/PostBox';
import { Post } from '../types';

interface HomeProps {
  posts: Post[];
}

const sortOptionStyle = {
  width: '50%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#028391;',
  color: 'white',
  cursor: 'pointer',
  fontSize: '14px',
};

const basicStyle = {
  width: '50%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'lightgray',
  cursor: 'pointer',
  fontSize: '14px',
};

const Home: React.FC<HomeProps> = () => {
  const [posts, setPosts] = useState<Post[]>();
  const [sortOption, setSortOption] = useState('latest');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/posts');

        if (response.ok) {
          const data = await response.json();
          const dataWithId = data.map((post) => ({ ...post.data, id: post.id }));
          dataWithId.sort((a, b) => b.createdAt - a.createdAt);
          setPosts(dataWithId);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    if (posts) {
      const postsCopy = [...posts];
      const sortedPosts =
        sortOption === 'popular'
          ? postsCopy.sort((a, b) => b.numberOfLikes - a.numberOfLikes)
          : postsCopy.sort((a, b) => b.createdAt - a.createdAt);
      setPosts(sortedPosts);
    }
  }, [sortOption]);

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
      <Box sx={{ height: 50, width: '100%', display: 'flex' }}>
        <Box sx={sortOption === 'latest' ? sortOptionStyle : basicStyle} onClick={() => setSortOption('latest')}>
          Latest
        </Box>
        <Box sx={sortOption === 'popular' ? sortOptionStyle : basicStyle} onClick={() => setSortOption('popular')}>
          Most popular
        </Box>
      </Box>
      {posts.length === 0 ? (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          There are no posts yet
        </Typography>
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
              <PostBox post={post} />
            </Box>
          ))}
        </>
      )}
    </Box>
  );
};

export default Home;
