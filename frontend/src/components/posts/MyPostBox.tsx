import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Post } from '@/src/types';
import { getFormattedDate } from '@/src/utils';
import { Box, Button, Card, CardMedia, Typography } from '@mui/material';

import PostResponseModal from '../modals/PostResponseModal';

interface PostBoxProps {
  post: Post;
}

const MyPostBox: React.FC<PostBoxProps> = ({ post }) => {
  const { content, imageUrl, id, createdAt, numberOfLikes } = post;

  const [responseModal, setResponseModal] = useState(false);
  const [responseMessage, setResponseMessage] = useState<string>();
  const [deletePost, setDeletePost] = useState(true);

  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setDeletePost(false);
        setResponseMessage('Successfully deleted a post!');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    setResponseModal(false);
    setDeletePost(true);
    navigate('/posts');
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          alignItems: 'start',
          maxWidth: 400,
          '@media (min-width: 768px)': {
            maxWidth: 600,
            flexDirection: 'row',
          },
          margin: '0 auto',
        }}
      >
        {imageUrl && (
          <Card
            sx={{
              display: 'flex',
              width: '100%',
              height: '100%',
              flexShrink: 0,
              '@media (min-width: 768px)': {
                width: 200,
              },
            }}
          >
            <CardMedia
              component="img"
              image={imageUrl}
              sx={{
                width: '100%',
                height: 'auto',
                aspectRatio: '1/1',
              }}
            />
          </Card>
        )}
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant="body1">{content}</Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Typography variant="body2" color="text.secondary">
              {getFormattedDate(createdAt)}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                {`${numberOfLikes} ${numberOfLikes <= 1 ? 'Like' : 'Likes'}`}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
            <Button
              size="small"
              variant="contained"
              sx={{ fontSize: '12px' }}
              onClick={() => navigate(`/posts/update/${id}`)}
            >
              Edit
            </Button>
            <Button
              size="small"
              variant="outlined"
              sx={{ fontSize: '12px' }}
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
