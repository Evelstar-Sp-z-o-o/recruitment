import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import { AppBar, Toolbar, Typography, Container } from '@mui/material';

import PostForm from './components/PostForm';
import PostList from './components/PostList';

const App: React.FC = () => {
  return (
    <Router>
      <AppBar position="static">
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
      <Container>
        <Routes>
          <Route path="/" Component={PostList} />
          <Route path="/create" Component={PostForm} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
