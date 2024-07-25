import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes, useLocation } from 'react-router-dom';

import NotFound from './components/NotFound';
import Sidebar from './components/Sidebar';
import MainLayout from './components/layout/MainLayout';
import PostsLayout from './components/layout/PostsLayout';
import CreatePost from './pages/CreatePost';
import Home from './pages/Home';
import UpdatePost from './pages/UpdatePost';
import { openModal as openCreateModal } from './redux/createModalSlice';
import { openModal as openEditModal } from './redux/editModalSlice';

const AppRoutes = () => {
  const location = useLocation();
  const background = location.state && location.state.background;

  const dispatch = useDispatch();

  // Open edit modal if current path is /posts/update/
  useEffect(() => {
    if (location.pathname.startsWith('/create')) {
      dispatch(openCreateModal());
    }
  }, [dispatch, location]);

  // Open edit modal if current path is /posts/update/
  useEffect(() => {
    if (location.pathname.startsWith('/posts/update/')) {
      dispatch(openEditModal());
    }
  }, [dispatch, location]);

  return (
    <div className="main">
      <Sidebar />
      <Routes location={background || location}>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="create" element={<CreatePost />} />
          <Route path="posts" element={<PostsLayout />}>
            <Route path="update/:postId" element={<UpdatePost />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      {background && (
        <Routes>
          <Route path="create" element={<CreatePost />} />
        </Routes>
      )}
    </div>
  );
};

export default AppRoutes;
