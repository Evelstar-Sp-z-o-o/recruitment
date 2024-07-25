import { FC } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Container, GlobalStyles, Grid } from '@mui/material';

import EditPost from './components/EditPost';
import PostForm from './components/PostForm';
import PostList from './components/PostList';
import BottomNav from './components/layout/BottomNavigation';
import Navbar from './components/layout/Navbar';

const globalStyles = (
  <GlobalStyles
    styles={{
      body: {
        margin: 0,
        padding: 0,
        backgroundColor: '#0d1117',
        color: '#e6edf3',
        fontFamily: 'Noto Sans, sans-serif',
      },
      a: {
        textDecoration: 'none',
        color: 'inherit',
      },
    }}
  />
);

const App: FC = () => {
  return (
    <Router>
      {globalStyles}
      <Navbar />
      <Container role="main" sx={{ padding: '80px 1rem', minHeight: '100vh' }}>
        <Routes>
          <Route path="/" element={<PostList />} />
          <Route path="/create" element={<PostForm />} />
          <Route path="/edit/:id" element={<EditPost />} />
        </Routes>
        <BottomNav />
      </Container>
    </Router>
  );
};

export default App;
