import { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Sidebar from './components/Sidebar';
import MainLayout from './components/layout/MainLayout';
import PostsLayout from './components/layout/PostsLayout';
import Home from './pages/Home';
import Posts from './pages/Posts';
import UpdatePost from './pages/UpdatePost';
import './styles/main.scss';

const App: FC = () => {
  return (
    <BrowserRouter>
      <div className="main">
        <Sidebar />
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="/posts" element={<PostsLayout />}>
              <Route index element={<Posts />} />
              <Route path="update/:postId" element={<UpdatePost />} />
            </Route>
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
