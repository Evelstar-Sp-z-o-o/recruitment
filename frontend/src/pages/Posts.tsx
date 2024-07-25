import { Box, Typography } from '@mui/material';

import MyPostBox from '../components/posts/MyPostBox';
import { Post } from '../types';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    '@media (min-width: 768px)': { borderRight: '1px solid lightgray' },
  },
  emptyContainer: { width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' },
  postContainer: {
    borderBottom: '1px solid lightgray',
    paddingX: 2,
    paddingY: 4,
    '@media (min-width: 768px)': {
      p: 4,
    },
  },
};

interface PostsProps {
  posts: Post[];
  removePost: (postId: string) => void;
}

const Posts: React.FC<PostsProps> = ({ posts, removePost }) => {
  return (
    <Box sx={styles.container}>
      {posts.length === 0 ? (
        <Box sx={styles.emptyContainer}>
          <Typography variant="h6" sx={{ mt: 2 }}>
            There are no posts yet
          </Typography>
        </Box>
      ) : (
        <>
          {posts.map((post) => (
            <Box key={post.id} sx={styles.postContainer}>
              <MyPostBox post={post} removePost={removePost} />
            </Box>
          ))}
        </>
      )}
    </Box>
  );
};

export default Posts;
