import { useEffect, useState } from 'react';

import { Box, Typography } from '@mui/material';

import Loader from '../components/Loader';
import HomePostBox from '../components/posts/HomePostBox';
import { Post } from '../types';

interface HomeProps {
  posts: Post[];
  editPost: (updatedPost: Post) => void;
}

const Home: React.FC<HomeProps> = ({ posts, editPost }) => {
  const [sortedPosts, setSortedPosts] = useState<Post[]>(posts);
  const [sortOption, setSortOption] = useState('latest');

  // Sort posts based on the selected option
  useEffect(() => {
    if (sortedPosts) {
      const sortedPosts = [...posts].sort((a, b) => {
        if (sortOption === 'popular') {
          return b.numberOfLikes - a.numberOfLikes; // based on number of likes
        }
        return b.createdAt - a.createdAt; // based on creation date
      });
      setSortedPosts(sortedPosts);
    }
  }, [sortOption]);

  if (!sortedPosts) {
    return <Loader />;
  }

  return (
    <Box sx={styles.homeBox}>
      <Box sx={styles.sortBox}>
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
      {sortedPosts.length === 0 ? (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          There are no posts yet
        </Typography>
      ) : (
        <>
          {sortedPosts.map((post) => (
            <Box key={post.id} sx={styles.postBox} data-testid="post-box">
              <HomePostBox post={post} onUpdate={editPost} />
            </Box>
          ))}
        </>
      )}
    </Box>
  );
};

export default Home;

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
  homeBox: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    '@media (min-width: 768px)': {
      borderRight: '1px solid lightgray',
    },
  },
  sortBox: { height: 50, width: '100%', display: 'flex' },
};
