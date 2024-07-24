import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import LoginModal from '@/src/components/Molecules/LoginModal/LoginModal';
import BaseView from '@/src/components/Templates/BaseView/BaseView';
import { setLogin, useGetPostsQuery } from '@/src/store';
import { Alert, Snackbar } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { RootState } from '@reduxjs/toolkit/query';

const Home = () => {
  const user = useSelector<RootState>((state) => state.user);
  const login = useSelector<RootState>((state) => state.login);
  const wasHomeModalShown = !!localStorage.getItem('wasHomeModalShown');
  const { data: posts, isLoading } = useGetPostsQuery();
  const [openLogin, setOpenLogin] = useState(!wasHomeModalShown && !user);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    setOpenLogin(!wasHomeModalShown && !user);
  }, [wasHomeModalShown, user]);

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
      <BaseView posts={posts} />
      <Backdrop open={isLoading} sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Snackbar open={!!login} autoHideDuration={6000}>
        <Alert onClose={() => handleSnackbar(false)} severity="success" variant="filled" sx={{ width: '100%' }}>
          {user ? t('login.confirmLogin', { user: user }) : t('login.confirmLogout')}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Home;
