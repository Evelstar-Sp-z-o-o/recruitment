import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { TextField, Button } from '@mui/material';

import { createPost, updatePost, fetchPost } from '../store/actions/posts';
import { RootState } from '../store/reducers';

interface PostFormProps {
  postId: number | null;
  onCancelEdit: () => void;
}

const PostForm: React.FC<PostFormProps> = ({ postId, onCancelEdit }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const dispatch = useDispatch();
  const post = useSelector((state: RootState) => (postId !== null ? state.posts.find((p) => p.id === postId) : null));

  useEffect(() => {
    if (postId !== null) {
      dispatch(fetchPost(postId));
    }
  }, [dispatch, postId]);

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content);
    }
  }, [post]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (postId !== null) {
      dispatch(updatePost({ id: postId, title, content }));
      onCancelEdit();
    } else {
      dispatch(createPost({ title, content }));
      setTitle('');
      setContent('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField label="Title" value={title} onChange={(e) => setTitle(e.target.value)} fullWidth margin="normal" />
      <TextField
        label="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        fullWidth
        multiline
        rows={4}
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary">
        {postId !== null ? 'Update' : 'Create'}
      </Button>
      {postId !== null && (
        <Button onClick={onCancelEdit} variant="outlined" color="secondary" style={{ marginLeft: 8 }}>
          Cancel
        </Button>
      )}
    </form>
  );
};

export default PostForm;
