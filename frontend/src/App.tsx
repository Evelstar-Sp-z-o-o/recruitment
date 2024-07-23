import { FC, useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Sidebar from './components/Sidebar';
import PostsLayout from './components/layout/PostsLayout';
import CreatePost from './pages/CreatePost';
import Home from './pages/Home';
import Posts from './pages/Posts';
import UpdatePost from './pages/UpdatePost';
import './styles/main.scss';
import { Post } from './types';

const App: FC = () => {
  const [posts, setPosts] = useState<Post[]>();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/posts');

        if (response.ok) {
          const data = await response.json();
          const dataWithId = data.map((post) => ({ ...post.data, id: post.id }));
          dataWithId.sort((a, b) => b.createdAt - a.createdAt);
          setPosts(dataWithId);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <BrowserRouter>
      <div className="main">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home posts={posts} />} />
          <Route path="/posts" element={<PostsLayout />}>
            <Route index element={<Posts posts={posts} />} />
            <Route path="create" element={<CreatePost />} />
            <Route path="update/:postId" element={<UpdatePost />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
