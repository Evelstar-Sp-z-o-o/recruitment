import { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Button, TextField } from '@mui/material';

import { AppDispatch } from '../store/postStore';
import { addPost, updatePost } from '../store/postsSlice';

import { Post } from '../types/types';

interface PostFormProps {
  selectedPost?: Post;
  onClose?: () => void;
}

const PostForm: FC<PostFormProps> = ({ selectedPost, onClose }) => {
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (selectedPost) {
      setContent(selectedPost.data.body);
    }
  }, [selectedPost]);

  const validateContent = (content: string) => {
    if (content.trim() === '') {
      setError('Content cannot be empty.');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = async () => {
    if (!validateContent(content)) {
      return;
    }

    if (selectedPost) {
      dispatch(updatePost({ ...selectedPost, data: { ...selectedPost.data, body: content } }));
    } else {
      dispatch(addPost(content));
    }
    setContent('');
    onClose?.();
  };

  return (
    <>
      <TextField
        label="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        fullWidth
        margin="normal"
        multiline
        error={!!error}
        helperText={error}
      />
      <Button type="submit" variant="contained" color="primary" onClick={handleSubmit} disabled={content.trim() === ''}>
        Submit
      </Button>
    </>
  );
};

export default PostForm;
