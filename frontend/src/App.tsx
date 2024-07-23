import { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Sidebar from './components/Sidebar';
import PostsLayout from './components/layout/PostsLayout';
import CreatePost from './pages/CreatePost';
import Home from './pages/Home';
import UpdatePost from './pages/UpdatePost';
import './styles/main.scss';

const App: FC = () => {
  return (
    <BrowserRouter>
      <div className="main">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts" element={<PostsLayout />}>
            <Route path="create" element={<CreatePost />} />
            <Route path="update/:postId" element={<UpdatePost />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
