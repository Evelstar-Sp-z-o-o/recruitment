import { FC } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import { AppBar, Toolbar, Typography, Container, Grid } from '@mui/material';

import EditPost from './components/EditPost';
import PostForm from './components/PostForm';
import PostList from './components/PostList';
import BottomNav from './components/layout/BottomNavigation';

const App: FC = () => {
  return (
    <Router>
      <AppBar sx={{ position: 'fixed', top: 0, left: 0, right: 0 }}>
        <Toolbar>
          <Typography variant="h6">
            <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>
              Home
            </Link>
          </Typography>
          <Typography variant="h6" style={{ marginLeft: 'auto' }}>
            <Link to="/create" style={{ color: '#fff', textDecoration: 'none' }}>
              Create Post
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>
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
