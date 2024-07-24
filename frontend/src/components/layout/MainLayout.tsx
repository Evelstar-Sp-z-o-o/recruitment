import { Outlet } from 'react-router-dom';

import CreatePost from '@/src/pages/CreatePost';

const MainLayout = () => {
  return (
    <>
      <CreatePost />
      <Outlet />
    </>
  );
};

export default MainLayout;
