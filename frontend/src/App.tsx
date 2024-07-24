import { FC } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Container, Grid } from '@mui/material';

import EditPost from './components/EditPost';
import PostForm from './components/PostForm';
import PostList from './components/PostList';
import BottomNav from './components/layout/BottomNavigation';
import Navbar from './components/layout/Navbar';

const App: FC = () => {
  return (
    <Router>
      <Navbar />
      <Grid role="main" sx={{ padding: '80px 1rem', minHeight: '100vh', bgcolor: '#0d1117', color: '#e6edf3' }}>
        <Container>
          <Routes>
            <Route path="/" element={<PostList />} />
            <Route path="/create" element={<PostForm />} />
            <Route path="/edit/:id" element={<EditPost />} />
          </Routes>
        </Container>
        <BottomNav />
      </Grid>
    </Router>
  );
};

export default App;
