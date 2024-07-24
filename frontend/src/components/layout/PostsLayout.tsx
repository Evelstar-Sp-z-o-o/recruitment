import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, useLocation } from 'react-router-dom';

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
      <Outlet />
    </>
  );
}

export default PostsLayout;
