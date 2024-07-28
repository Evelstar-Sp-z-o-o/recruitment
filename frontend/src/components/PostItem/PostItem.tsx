import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { formatDistanceToNow } from 'date-fns';

import PostForm from '@/src/components/PostForm';
import { AppDispatch } from '@/src/store/postStore';
import { deletePost } from '@/src/store/slices/postsSlice';
import { DialogHeader, StyledDialog, StyledDialogContent } from '@/src/styles/styledComponents';
import { Post } from '@/src/types/types';
import CloseIcon from '@mui/icons-material/Close';
import { Typography, Avatar, styled, Container, Box, Dialog, IconButton, DialogActions, Button } from '@mui/material';

import PostItemAdditionalInfo from './PostItemAdditionalInfo';
import PostItemMenu from './PostItemMenu';

const PostWrapper = styled(Container, {
  shouldForwardProp: (prop) => prop !== 'reducedView',
})<{ reducedView?: boolean }>(({ theme, reducedView }) => ({
  position: 'relative',
  border: `1px solid ${theme.palette.grey[800]}`,
  borderRadius: '13px',
  margin: '16px 0',
  padding: '16px',
  overflow: 'hidden',
  transition: 'border 0.3s',
  ...(reducedView
    ? {
        cursor: 'pointer',
        '&:hover': {
          border: `1px solid ${theme.palette.primary.main}`,
        },
      }
    : {
        cursor: 'default',
      }),
}));

const MenuWrapper = styled('div')({
  position: 'absolute',
  top: '8px',
  right: '8px',
});

interface PostItemProps {
  post: Post;
  reducedView?: boolean;
}

const PostItem: FC<PostItemProps> = ({ post, reducedView }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [editMode, setEditMode] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const stopPropagation = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  const handleDelete = async () => {
    await dispatch(deletePost(post.id)).unwrap();
    if (!reducedView) {
      navigate(`/`);
    }
  };

  const handlePostClick = () => {
    if (reducedView) {
      navigate(`/post/${post.id}`);
    }
  };

  const handleOpenEditModal = () => {
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    setEditMode(false);
  };

  const handleOpenDeleteModal = () => {
    setOpenDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  const confirmDelete = () => {
    handleDelete();
    handleCloseDeleteModal();
  };

  return (
    <>
      <PostWrapper onClick={handlePostClick} reducedView={reducedView}>
        <Box display="flex" alignItems="center" gap={1} marginBottom={2}>
          <Avatar sx={{ bgcolor: '#364fc7', marginRight: '10px' }}>{post.data.author[0].toUpperCase()}</Avatar>
          <Typography variant="body2">{post.data.author}</Typography>
          {reducedView ? (
            <Typography variant="body2" color="textSecondary">
              {formatDistanceToNow(new Date(post.data.created))}
            </Typography>
          ) : null}
        </Box>
        <Typography variant="body1" sx={{ marginBottom: '16px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {post.data.body}
        </Typography>
        {reducedView ? null : <PostItemAdditionalInfo post={post} />}
        <MenuWrapper onClick={stopPropagation}>
          <PostItemMenu handleDeleteClick={handleOpenDeleteModal} handleEditClick={handleOpenEditModal} />
        </MenuWrapper>
      </PostWrapper>

      <StyledDialog open={openEditModal} onClose={handleCloseEditModal} maxWidth="md" fullWidth>
        <StyledDialogContent>
          <IconButton aria-label="close" onClick={handleCloseEditModal} sx={{ position: 'absolute', top: 8, right: 8 }}>
            <CloseIcon />
          </IconButton>
          <DialogHeader>Edit your post</DialogHeader>
          <PostForm selectedPost={post} onClose={handleCloseEditModal} />
        </StyledDialogContent>
      </StyledDialog>

      <StyledDialog open={openDeleteModal} onClose={handleCloseDeleteModal}>
        <StyledDialogContent>
          <IconButton
            aria-label="close"
            onClick={handleCloseDeleteModal}
            sx={{ position: 'absolute', top: 8, right: 8 }}
          >
            <CloseIcon />
          </IconButton>
          <DialogHeader>Confirm deletion</DialogHeader>
          <Typography variant="body1" sx={{ margin: '10px 0 8px 0' }}>
            Are you sure you want to delete this post? This action cannot be undone.
          </Typography>
          <DialogActions>
            <Button onClick={handleCloseDeleteModal}>Cancel</Button>
            <Button onClick={confirmDelete} color="primary" variant="contained" autoFocus>
              Delete
            </Button>
          </DialogActions>
        </StyledDialogContent>
      </StyledDialog>
    </>
  );
};

export default PostItem;
