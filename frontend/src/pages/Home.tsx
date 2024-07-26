import { useEffect, useState } from 'react';

import { Box, Typography } from '@mui/material';

import Loader from '../components/Loader';
import HomePostBox from '../components/posts/HomePostBox';
import { Post } from '../types';

const styles = {
  base: {
    width: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    fontSize: '14px',
  },
  active: {
    backgroundColor: '#028391',
    color: 'white',
  },
  inactive: {
    backgroundColor: 'lightgray',
  },
  postBox: {
    borderBottom: '1px solid lightgray',
    paddingX: 2,
    paddingY: 4,
    '@media (min-width: 768px)': {
      p: 4,
    },
  },
};

const Home = () => {
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
        console.error(error);
      }
    };
    fetchPosts();
  }, []);

  // Sort posts based on the selected option
  useEffect(() => {
    if (posts) {
      const sortedPosts = [...posts].sort((a, b) => {
        if (sortOption === 'popular') {
          return b.numberOfLikes - a.numberOfLikes; // based on number of likes
        }
        return b.createdAt - a.createdAt; // based on creation date
      });
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
        <Box
          sx={{ ...styles.base, ...(sortOption === 'latest' ? styles.active : styles.inactive) }}
          onClick={() => setSortOption('latest')}
          data-testid="latest-box"
        >
          Latest
        </Box>
        <Box
          sx={{ ...styles.base, ...(sortOption === 'popular' ? styles.active : styles.inactive) }}
          onClick={() => setSortOption('popular')}
          data-testid="popular-box"
        >
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
            <Box key={post.id} sx={styles.postBox}>
              <HomePostBox post={post} />
            </Box>
          ))}
        </>
      )}
    </Box>
  );
};

export default Home;
