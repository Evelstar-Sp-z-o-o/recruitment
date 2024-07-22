import { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Sidebar from './components/SideBar';
import CreatePost from './pages/CreatePost';
import Home from './pages/Home';
import Posts from './pages/Posts';
import UpdatePost from './pages/UpdatePost';
import './styles/main.scss';

const App: FC = () => {
  return (
    <BrowserRouter>
      <div className='main'>
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/update-post" element={<UpdatePost />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
