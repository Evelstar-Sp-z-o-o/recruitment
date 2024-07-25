import { FC } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { Box } from '@mui/material';

import HomePage from './pages/HomePage';
import PostPage from './pages/PostPage';
import Footer from './shared/components/Footer';
import Navbar from './shared/components/Navbar';
import './styles/main.scss';

const App: FC = () => {
  return (
    <Router>
      <Navbar />
      <Box className="main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/post/:id" element={<PostPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Box>
      <Footer />
    </Router>
  );
};

export default App;
