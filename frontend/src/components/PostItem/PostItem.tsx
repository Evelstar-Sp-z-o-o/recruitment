import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { formatDistanceToNow } from 'date-fns';

import { AppDispatch } from '@/src/store/postStore';
import { deletePost } from '@/src/store/slices/postsSlice';
import { StyledAvatar } from '@/src/styles/styledComponents';
import { Post } from '@/src/types/types';
import { Typography, styled, Container, Box, useTheme, useMediaQuery } from '@mui/material';

import PostItemAdditionalInfo from './PostItemAdditionalInfo';
import PostItemMenu from './PostItemMenu';
import DeleteDialog from './dialogs/DeleteDialog';
import EditDialog from './dialogs/EditDialog';

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
  const theme = useTheme();
  const isScreenWidthLessThan600px = useMediaQuery(theme.breakpoints.down('sm'));

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
          <StyledAvatar sx={{ marginRight: '10px' }}>{post.data.author[0].toUpperCase()}</StyledAvatar>
          <Typography variant="body2" sx={{ maxWidth: '60vw', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {post.data.author}
          </Typography>
          {reducedView && !isScreenWidthLessThan600px ? (
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

      <EditDialog open={openEditModal} onClose={handleCloseEditModal} post={post} />
      <DeleteDialog open={openDeleteModal} onClose={handleCloseDeleteModal} onConfirm={confirmDelete} />
    </>
  );
};

export default PostItem;
