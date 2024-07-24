import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { List, ListItem, ListItemText, IconButton, ListItemSecondaryAction } from '@mui/material';

import { fetchPosts, deletePost } from '../redux/actions/posts';
import { RootState } from '../redux/reducers';
import Post from './Post';

const PostList: React.FC = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state: RootState) => state.posts.posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleDelete = (id: number) => {
    console.log(id);
    dispatch(deletePost(id));
  };

  return (
    <div>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostList;
