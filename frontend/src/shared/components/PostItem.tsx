import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import PostForm from '@/src/components/PostForm';
import { AppDispatch } from '@/src/store/postStore';
import { deletePost } from '@/src/store/postsSlice';
import { Post } from '@/src/types/types';
import { Typography, Grid, Avatar, Button } from '@mui/material';

interface PostItemProps {
  post: Post;
  reducedView?: boolean;
}
const PostItem: FC<PostItemProps> = ({ post, reducedView }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [editMode, setEditMode] = useState(false);

  const handleDelete = () => {
    dispatch(deletePost(post.id));
  };

  const handlePostClick = () => {
    if (reducedView) {
      navigate(`/post/${post.id}`);
    }
  };

  return (
    <>
      {editMode ? (
        <PostForm selectedPost={post} onClose={() => setEditMode(false)} />
      ) : (
        <Grid marginY={2} container spacing={2} onClick={handlePostClick}>
          <Avatar sx={{ bgcolor: '#364fc7', marginRight: '10px' }}>{post.data.author[0].toUpperCase()}</Avatar>
          <Typography variant="body1">{post.data.author}</Typography>
          <Grid item xs={12}>
            <Typography variant="body1">{post.data.body}</Typography>
          </Grid>
          <Button onClick={handleDelete}>Delete</Button>
          <button onClick={() => setEditMode(true)}>Edit Post</button>
        </Grid>
      )}
    </>
  );
};

export default PostItem;
