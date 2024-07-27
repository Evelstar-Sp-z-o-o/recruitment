import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { closeModal, onDeleteAction, openModal, resetDeleteAction } from '@/src/redux/responseModalSlice';
import { Box, Typography } from '@mui/material';

import PostResponseModal from '../components/modals/PostResponseModal';
import MyPostBox from '../components/posts/MyPostBox';
import { Post } from '../types';

interface PostsProps {
  currentUserPosts: Post[];
  onDelete: (postId: string) => void;
}

const Posts: React.FC<PostsProps> = ({ currentUserPosts, onDelete }) => {
  const [postToDelete, setPostToDelete] = useState<string | null>(null);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  // Remove a selected post from database
  const handleDelete = async () => {
    if (postToDelete) {
      dispatch(resetDeleteAction());
      try {
        const response = await fetch(`/api/posts/${postToDelete}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          dispatch(openModal('Failed to delete the post'));
          return;
        } else {
          onDelete(postToDelete);
          dispatch(openModal('Successfully deleted a post!'));
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleDeleteClick = (postId: string) => {
    setPostToDelete(postId);
    dispatch(onDeleteAction());
    dispatch(openModal('Are you sure to delete?'));
  };

  const handleClose = () => {
    dispatch(closeModal());
    setPostToDelete(null);
    navigate('/posts');
  };
  return (
    <>
      <Box sx={styles.container}>
        {currentUserPosts.length === 0 ? (
          <Box sx={styles.emptyContainer}>
            <Typography variant="h6" sx={{ mt: 2 }}>
              There are no posts yet
            </Typography>
          </Box>
        ) : (
          <>
            {currentUserPosts.map((post) => (
              <Box key={post.id} sx={styles.postContainer}>
                <MyPostBox post={post} onDelete={handleDeleteClick} />
              </Box>
            ))}
          </>
        )}
      </Box>
      <PostResponseModal onClose={handleClose} onDelete={handleDelete} />
    </>
  );
};

export default Posts;

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    '@media (min-width: 768px)': { borderRight: '1px solid lightgray' },
  },
  emptyContainer: { width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' },
  postContainer: {
    borderBottom: '1px solid lightgray',
    paddingX: 2,
    paddingY: 4,
    '@media (min-width: 768px)': {
      p: 4,
    },
  },
};
