import Header from '@/src/components/Header';
import PostForm from '@/src/components/PostForm';
import PostsList from '@/src/components/PostsList';
import { Box } from '@mui/material';

const Home = () => {
  return (
    <Box>
      <Header />
      <PostForm />
      <PostsList />
    </Box>
  );
};

export default Home;
