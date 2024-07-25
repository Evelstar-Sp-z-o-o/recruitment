import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Post } from '@/src/types';
import { getFormattedDate } from '@/src/utils';
import { Box, Button, Card, CardMedia, Typography } from '@mui/material';

import PostResponseModal from '../modals/PostResponseModal';

interface PostBoxProps {
  post: Post;
  removePost: (postId: string) => void;
}

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

const MyPostBox: React.FC<PostBoxProps> = ({ post, removePost }) => {
  const { content, imageUrl, id, createdAt, numberOfLikes } = post;

  const [responseModal, setResponseModal] = useState(false);
  const [responseMessage, setResponseMessage] = useState<string | null>(null);
  const [deletePost, setDeletePost] = useState(true);

  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        setDeletePost(false);
        setResponseMessage('Failed to delete the post');
        setResponseModal(true);
        return;
      }

      setDeletePost(false);
      setResponseMessage('Successfully deleted a post!');
      removePost(id);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClose = () => {
    setResponseModal(false);
    setDeletePost(true);
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
            <Button
              size="small"
              variant="outlined"
              sx={styles.button}
              onClick={() => {
                setResponseMessage('Are you sure to delete?');
                setResponseModal(true);
              }}
            >
              Delete
            </Button>
          </Box>
        </Box>
      </Box>
      <PostResponseModal
        open={responseModal}
        onClose={handleClose}
        content={responseMessage}
        deleteAction={deletePost}
        onDelete={handleDelete}
      />
    </>
  );
};

export default MyPostBox;
