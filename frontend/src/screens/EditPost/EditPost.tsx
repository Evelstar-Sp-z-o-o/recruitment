import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate, Link } from 'react-router-dom';

import PostForm from '@/src/components/PostForm';
import { RootState, AppDispatch } from '@/src/store/postStore';
import { updatePost } from '@/src/store/postsSlice';
import { Post } from '@/src/typings';
import { Box, Button, TextField, Typography } from '@mui/material';

const EditPost = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const post: Post = useSelector((state: RootState) => state.posts.posts.find((post) => post.id === id));
  const { author, body: postBody, created, postId } = post?.data || {};

  const [body, setBody] = useState('');

  useEffect(() => {
    if (post) {
      setBody(postBody);
    }
  }, [post]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const data = {
      body,
      author: author,
      created: created,
      edited: post.data.edited,
      postId,
    };
    dispatch(updatePost({ data, id }));
    navigate('/');
  };

  if (!post) {
    return <Typography>Post not found</Typography>;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minWidth: '350px',
        maxWidth: '600px',
        border: '1px solid black',
        borderRadius: '20px',
        padding: '20px',
        backgroundColor: 'white',
        boxShadow: '8px 8px 24px 0px rgba(66, 68, 90, 1)',
      }}
    >
      <Typography variant="h4">Edit your post</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Edit your post"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          variant="filled"
          margin="normal"
          multiline
          maxRows={6}
          fullWidth
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Save
        </Button>
        <Button sx={{ padding: 0, ml: '30px', minWidth: '10px' }} size="small" color="error" component={Link} to={`/`}>
          Cancel
        </Button>
      </form>
    </Box>
  );
};

export default EditPost;
