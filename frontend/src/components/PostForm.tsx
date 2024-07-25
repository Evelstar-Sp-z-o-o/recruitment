import { FC, useEffect, useState } from 'react';

import { Button, TextField, Typography } from '@mui/material';

import { useCreatePost, useUpdatePost } from '../shared/react-query/use-post-queries';
import { Post } from '../types/types';

interface PostFormProps {
  selectedPost?: Post;
  onClose?: () => void;
}

const PostForm: FC<PostFormProps> = ({ selectedPost, onClose }) => {
  const [content, setContent] = useState('');

  const { mutate: createPost } = useCreatePost();
  const { mutate: updatePost } = useUpdatePost();

  useEffect(() => {
    if (selectedPost) {
      setContent(selectedPost.data.body);
    }
  }, [selectedPost]);

  const handleSubmit = async () => {
    if (selectedPost) {
      updatePost({ ...selectedPost, data: { ...selectedPost.data, body: content } });
    } else {
      createPost(content);
    }
    setContent('');
    onClose();
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
      />
      <Button type="submit" variant="contained" color="primary" onClick={handleSubmit}>
        Submit
      </Button>
    </>
  );
};

export default PostForm;
