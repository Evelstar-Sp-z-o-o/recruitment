import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AddNewPost from '@/src/components/Atoms/AddNewPost/AddNewPost';
import LoginModal from '@/src/components/Molecules/LoginModal/LoginModal';
import Menu from '@/src/components/Molecules/Menu/Menu';
import Footer from '@/src/components/Organisms/Footer/Footer';
import Header from '@/src/components/Organisms/Header/Header';
import PostsList from '@/src/components/Organisms/PostsList/PostsList';
import { setLogin, useGetPostsQuery } from '@/src/store';
import { Alert, Snackbar } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { RootState } from '@reduxjs/toolkit/query';

const Home = () => {
  const user = !!useSelector<RootState>((state) => state.user);
  const login = useSelector<RootState>((state) => state.login);
  const wasHomeModalShown = !!localStorage.getItem('wasHomeModalShown') ?? false;
  const { data: posts, isLoading } = useGetPostsQuery();
  const [open, setOpen] = useState(false);
  const [openLogin, setOpenLogin] = useState(!wasHomeModalShown || !!user);
  const dispatch = useDispatch();

  const toggleMenu = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const handleClose = () => {
    setOpenLogin(false);
    localStorage.setItem('wasHomeModalShown', true);
  };

  const handleSnackbar = (isOpen) => {
    dispatch(setLogin(isOpen));
  };

  return (
    <Box>
      <LoginModal isOpen={openLogin} handleClose={handleClose} handleSnackbar={handleSnackbar} />
      <Backdrop open={isLoading} sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Header toggleMenu={toggleMenu} />
      <PostsList posts={posts} />
      <Menu open={open} toggleMenu={toggleMenu(false)} />
      <AddNewPost isFixed />
      <Footer />
      <Snackbar open={login} autoHideDuration={6000}>
        <Alert onClose={() => handleSnackbar(false)} severity="success" variant="filled" sx={{ width: '100%' }}>
          Logged {user ? 'in' : 'out'} successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Home;
