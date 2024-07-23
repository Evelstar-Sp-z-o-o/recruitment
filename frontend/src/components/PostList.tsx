import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { List, ListItem, ListItemText, IconButton, ListItemSecondaryAction } from '@mui/material';

import { fetchPosts, deletePost } from '../store/actions/posts';
import { RootState } from '../store/reducers';

interface PostListProps {
  onEditPost: (postId: number) => void;
}

const PostList: React.FC<PostListProps> = ({ onEditPost }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state: RootState) => state.posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleDelete = (id: number) => {
    dispatch(deletePost(id));
  };

  return (
    <List>
      {posts.map((post) => (
        <ListItem key={post.id} divider>
          <ListItemText primary={post.title} secondary={post.content} />
          <ListItemSecondaryAction>
            <IconButton edge="end" onClick={() => onEditPost(post.id)}>
              <EditIcon />
            </IconButton>
            <IconButton edge="end" onClick={() => handleDelete(post.id)}>
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );
};

export default PostList;
