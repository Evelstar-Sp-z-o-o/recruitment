import React, { useState } from 'react';

import { Container, Typography, Grid, Paper } from '@mui/material';

import PostForm from './components/PostForm';
import PostList from './components/PostList';

const App: React.FC = () => {
  const [editingPostId, setEditingPostId] = useState<number | null>(null);

  const handleEditPost = (postId: number) => {
    setEditingPostId(postId);
  };

  const handleCancelEdit = () => {
    setEditingPostId(null);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Twitter-like App
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper>
            <PostList onEditPost={handleEditPost} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper>
            <PostForm postId={editingPostId} onCancelEdit={handleCancelEdit} />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default App;
