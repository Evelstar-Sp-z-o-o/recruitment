import { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import SendIcon from '@mui/icons-material/Send';
import { Box, IconButton, styled, TextField } from '@mui/material';

import { AppDispatch } from '../store/postStore';
import { addPost, updatePost } from '../store/postsSlice';

import { Post } from '../types/types';

const StyledFormBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isEditing',
})<{ isEditing?: boolean }>(({ theme, isEditing }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  borderTop: 'none',
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
      }),
}));

interface PostFormProps {
  selectedPost?: Post;
  onClose?: () => void;
}

const PostForm: FC<PostFormProps> = ({ selectedPost, onClose }) => {
  const [content, setContent] = useState('');
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (selectedPost) {
      setContent(selectedPost.data.body);
    }
  }, [selectedPost]);

  const handleSubmit = async () => {
    if (selectedPost) {
      dispatch(updatePost({ ...selectedPost, data: { ...selectedPost.data, body: content } }));
      onClose();
    } else {
      dispatch(addPost(content));
    }
    setContent('');
  };

  return (
    <StyledFormBox isEditing={!!selectedPost}>
      <TextField
        label="What is happening?"
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
        }}
        fullWidth
        margin="normal"
        multiline
      />
      <IconButton type="submit" color="primary" onClick={handleSubmit} disabled={content.length === 0}>
        <SendIcon />
      </IconButton>
    </StyledFormBox>
  );
};

export default PostForm;
