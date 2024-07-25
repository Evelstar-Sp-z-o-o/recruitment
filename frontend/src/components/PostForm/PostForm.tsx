import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { v4 as uuidv4 } from 'uuid';

import { AppDispatch } from '@/src/store/postStore';
import { addPost } from '@/src/store/postsSlice';
import { TextField, Button, Typography, Box } from '@mui/material';

const PostForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [postBody, setPostBody] = useState('');
  const [author, setAuthor] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const newId = uuidv4();
    const newPostId = uuidv4();

    dispatch(
      addPost({
        data: {
          body: postBody,
          author: author,
          created: new Date(),
          edited: new Date(),
          postId: newPostId,
        },
        id: newId,
      }),
    );
    setPostBody('');
    setAuthor('');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '20px',
        padding: '20px',
        backgroundColor: 'white',
        boxShadow: '8px 8px 24px 0px rgba(66, 68, 90, 1)',
      }}
    >
      <form onSubmit={handleSubmit}>
        <Typography textAlign="center">What's on your mind?</Typography>
        <TextField
          label="What's on your mind"
          value={postBody}
          onChange={(e) => setPostBody(e.target.value)}
          variant="filled"
          margin="normal"
          multiline
          maxRows={6}
          fullWidth
          required
        />
        <TextField
          label="Your nick"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          variant="filled"
          margin="normal"
          fullWidth
          required
        />
        <Button type="submit" variant="contained" color="primary">
          {'Add post'}
        </Button>
      </form>
    </Box>
  );
};

export default PostForm;
