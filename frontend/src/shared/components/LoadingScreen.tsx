import { FC, useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '@/src/store/postStore';
import { Backdrop, CircularProgress } from '@mui/material';

const LoadingScreen: FC = () => {
  const status = useSelector((state: RootState) => state.posts.status);
  const isLoading = status === 'loading';
  // todo add delay for loading
  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: 'rgba(0, 0, 0, 0.85)' }}
      open={isLoading}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default LoadingScreen;
