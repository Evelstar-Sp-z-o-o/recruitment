import { FC, useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Loader from './components/Loader';
import Sidebar from './components/Sidebar';
import MainLayout from './components/layout/MainLayout';
import PostsLayout from './components/layout/PostsLayout';
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
        {posts ? (
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Home posts={posts} />} />
              <Route path="/posts" element={<PostsLayout />}>
                <Route index element={<Posts posts={posts} />} />
                <Route path="update/:postId" element={<UpdatePost />} />
              </Route>
            </Route>
          </Routes>
        ) : (
          <Loader />
        )}
      </div>
    </BrowserRouter>
  );
};

export default App;
