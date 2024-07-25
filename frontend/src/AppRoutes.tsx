import { Route, Routes, useLocation } from 'react-router-dom';

import Sidebar from './components/Sidebar';
import MainLayout from './components/layout/MainLayout';
import PostsLayout from './components/layout/PostsLayout';
import CreatePost from './pages/CreatePost';
import Home from './pages/Home';
import UpdatePost from './pages/UpdatePost';

const AppRoutes = () => {
  const location = useLocation();
  const background = location.state && location.state.background;

  return (
    <div className="main">
      <Sidebar />
      <Routes location={background || location}>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/posts" element={<PostsLayout />}>
            <Route path="update/:postId" element={<UpdatePost />} />
          </Route>
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
