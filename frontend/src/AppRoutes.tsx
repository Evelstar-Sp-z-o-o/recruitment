import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './components/Loader';
import NotFound from './components/NotFound';
import Sidebar from './components/Sidebar';
import MainLayout from './components/layout/MainLayout';
import PostsLayout from './components/layout/PostsLayout';
import useGetPosts from './hooks/useGetPosts';
import CreatePost from './pages/CreatePost';
import Home from './pages/Home';
import UpdatePost from './pages/UpdatePost';

const AppRoutes = () => {
  const location = useLocation();
  const background = location.state && location.state.background;

  const { posts, isLoading, refetch, editPost, deletePost, fetchPostById } = useGetPosts();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="main">
      <Sidebar />
      <Routes location={background || location}>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home posts={posts} editPost={editPost} />} />
          <Route path="create" element={<CreatePost refetchPosts={refetch} />} />
          <Route path="posts" element={<PostsLayout posts={posts} deletePost={deletePost} />}>
            <Route path="update/:postId" element={<UpdatePost editPost={editPost} fetchPostById={fetchPostById} />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      {background && (
        <Routes>
          <Route path="create" element={<CreatePost refetchPosts={refetch} />} />
        </Routes>
      )}
    </div>
  );
};

export default AppRoutes;
