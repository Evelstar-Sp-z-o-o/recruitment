import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';

import { TextField, Button, Typography } from '@mui/material';

import { updatePost, fetchPost } from '../redux/actions/posts';
import { RootState } from '../redux/reducers';
import { Post } from '../types';

const EditPost: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [body, setBody] = useState('');
  const [author, setAuthor] = useState('');

  const editingPost = useSelector((state: RootState) => state.posts.editingPost);

  useEffect(() => {
    if (id) {
      dispatch(fetchPost(Number(id)));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (editingPost) {
      setBody(editingPost.data.body);
      setAuthor(editingPost.data.author);
    }
  }, [editingPost]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (editingPost) {
      const updatedPost: Post = {
        ...editingPost,
        data: {
          ...editingPost.data,
          body,
          author,
          edited: Math.floor(Date.now() / 1000),
        },
      };
      dispatch(updatePost(updatedPost));
    }

    navigate('/');
  };

  return (
    <div>
      <Typography variant="h4">Edit Post</Typography>
      <form onSubmit={handleSubmit}>
        <TextField label="Body" value={body} onChange={(e) => setBody(e.target.value)} fullWidth margin="normal" />
        <TextField
          label="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Update Post
        </Button>
      </form>
    </div>
  );
};

export default EditPost;
