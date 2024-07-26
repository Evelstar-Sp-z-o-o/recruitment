import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { closeModal, openModal } from '@/src/redux/responseModalSlice';
import { Post } from '@/src/types';
import { getFormattedDate } from '@/src/utils';
import { Box, Button, Card, CardMedia, Typography } from '@mui/material';

import PostResponseModal from '../modals/PostResponseModal';

interface PostBoxProps {
  post: Post;
  onDelete: (postId: string) => void;
}

const MyPostBox: React.FC<PostBoxProps> = ({ post, onDelete }) => {
  const { content, imageUrl, id, createdAt, numberOfLikes } = post;

  const navigate = useNavigate();

  const dispatch = useDispatch();

  // Remove a selected post from database
  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        dispatch(openModal('Failed to delete the post'));
        return;
      }

      onDelete(id);
      dispatch(openModal('Successfully deleted a post!'));
    } catch (error) {
      console.error(error);
    }
  };

  const handleClose = () => {
    dispatch(closeModal());
    navigate('/posts');
  };

  return (
    <>
      <Box sx={styles.container}>
        {imageUrl && (
          <Card sx={styles.card}>
            <CardMedia component="img" image={imageUrl} sx={styles.cardMedia} />
          </Card>
        )}
        <Box sx={styles.contentContainer}>
          <Typography variant="body1">{content}</Typography>
          <Box sx={styles.infoContainer}>
            <Typography variant="body2" color="text.secondary">
              {getFormattedDate(createdAt)}
            </Typography>
            <Box sx={styles.likesContainer}>
              <Typography variant="body2" color="text.secondary">
                {`${numberOfLikes} ${numberOfLikes <= 1 ? 'Like' : 'Likes'}`}
              </Typography>
            </Box>
          </Box>
          <Box sx={styles.actionContainer}>
            <Button size="small" variant="contained" sx={styles.button} onClick={() => navigate(`/posts/update/${id}`)}>
              Edit
            </Button>
            <Button size="small" variant="outlined" sx={styles.button} onClick={handleDelete}>
              Delete
            </Button>
          </Box>
        </Box>
      </Box>
      <PostResponseModal onClose={handleClose} />
    </>
  );
};

export default MyPostBox;

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    alignItems: 'start',
    maxWidth: 400,
    margin: '0 auto',
    '@media (min-width: 768px)': {
      maxWidth: 600,
      flexDirection: 'row',
    },
  },
  card: {
    display: 'flex',
    width: '100%',
    height: '100%',
    flexShrink: 0,
    '@media (min-width: 768px)': {
      width: 200,
    },
  },
  cardMedia: {
    width: '100%',
    height: 'auto',
    aspectRatio: '1/1',
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  infoContainer: {
    display: 'flex',
    gap: 2,
  },
  likesContainer: {
    display: 'flex',
    gap: 1,
    alignItems: 'center',
  },
  actionContainer: {
    display: 'flex',
    gap: 1,
    mt: 2,
  },
  button: {
    fontSize: '12px',
  },
};
