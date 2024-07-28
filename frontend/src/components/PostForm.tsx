import { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import SendIcon from '@mui/icons-material/Send';
import { Box, IconButton, styled, TextField } from '@mui/material';

import { AppDispatch } from '../store/postStore';
import { addPost, updatePost } from '../store/slices/postsSlice';

import { Post } from '../types/types';

const StyledFormBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isEditing',
})<{ isEditing?: boolean }>(({ theme, isEditing }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  borderRadius: '0 0 13px 13px',
  ...(isEditing
    ? {
        marginTop: '16px',
      }
    : {
        marginTop: '0',
        padding: '16px',
        paddingTop: 0,
        border: `2px solid ${theme.palette.primary.main}`,
        borderTop: 'none',
      }),
}));

const MIN_LENGTH = 1;
const MAX_LENGTH = 255;

interface PostFormProps {
  selectedPost?: Post;
  onClose?: () => void;
}

const PostForm: FC<PostFormProps> = ({ selectedPost, onClose }) => {
  const [content, setContent] = useState('');
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (selectedPost) {
      setContent(selectedPost.data.body);
    }
  }, [selectedPost]);

  const validateContent = (value: string) => {
    if (value.length < MIN_LENGTH || value.length > MAX_LENGTH) {
      setError(`Content must be between ${MIN_LENGTH} and ${MAX_LENGTH} characters.`);
    } else {
      setError(null);
    }
  };

  const handleSubmit = async () => {
    validateContent(content);
    if (error) return;

    if (selectedPost) {
      dispatch(updatePost({ ...selectedPost, data: { ...selectedPost.data, body: content } }));
      onClose?.();
    } else {
      dispatch(addPost(content));
    }
    setContent('');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setContent(value);
    validateContent(value);
  };

  return (
    <StyledFormBox isEditing={!!selectedPost}>
      <TextField
        label="What is happening?"
        value={content}
        onChange={handleChange}
        fullWidth
        margin="normal"
        multiline
        error={!!error}
        helperText={error}
      />
      <IconButton
        type="submit"
        color="primary"
        onClick={handleSubmit}
        disabled={content.length < 1 || content.length > 255}
      >
        <SendIcon />
      </IconButton>
    </StyledFormBox>
  );
};

export default PostForm;
