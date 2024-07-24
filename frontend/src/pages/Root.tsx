import { useState } from 'react';

import AddNewPost from '@/src/components/Atoms/AddNewPost/AddNewPost';
import Menu from '@/src/components/Molecules/Menu/Menu';
import Footer from '@/src/components/Organisms/Footer/Footer';
import Header from '@/src/components/Organisms/Header/Header';
import PostsList from '@/src/components/Organisms/PostsList/PostsList';
import { useGetPostsQuery } from '@/src/store';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

const Root = () => {
  const { data: posts, isLoading } = useGetPostsQuery();
  const [open, setOpen] = useState(false);

  const toggleMenu = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <Box>
      <Backdrop open={isLoading} sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Header toggleMenu={toggleMenu} />
      <PostsList posts={posts} />
      <Menu open={open} toggleMenu={toggleMenu(false)} />
      <AddNewPost isFixed />
      <Footer />
    </Box>
  );
};

export default Root;
