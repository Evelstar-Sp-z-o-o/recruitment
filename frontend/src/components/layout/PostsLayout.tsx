import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, useLocation } from 'react-router-dom';

import Posts from '@/src/pages/Posts';

import { openModal as editModal } from '../../redux/editModalSlice';

function PostsLayout() {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.startsWith('/posts/update/')) {
      dispatch(editModal());
    }
  }, [dispatch, location]);

  return (
    <>
      <Posts />
      <Outlet />
    </>
  );
}

export default PostsLayout;
