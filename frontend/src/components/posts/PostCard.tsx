import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { Box, Button, Card, CardActions, CardContent, CardMedia, IconButton, Typography } from '@mui/material';

import { Post } from '../../types';
import PostResponseModal from '../modals/PostResponseModal';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const { content, imageUrl, username, id, createdAt, numberOfLikes } = post;

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

  const formatDate = (timeStamp: number) => {
    const date = new Date(timeStamp);
    const formattedDate = date.toLocaleDateString('pl-PL');
    return formattedDate;
  };

  return (
    <>
      <Card
        sx={{
          maxWidth: 400,
          width: '100%',
          margin: '0 auto',
          '@media (min-width: 768px)': {
            width: 400,
          },
          border: '1px solid lightgray',
        }}
      >
        {imageUrl && <CardMedia sx={{ width: '100%', height: 'auto', aspectRatio: '1/1' }} image={imageUrl} />}
        <CardContent>
          <Typography variant="body1" color="text.secondary">
            {content}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            {username}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {formatDate(createdAt)}
          </Typography>
        </CardContent>
        <CardActions>
          <Box
            sx={{
              fontSize: '12px',
              flexGrow: 1,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <IconButton>
              <ThumbUpIcon />
            </IconButton>
            <Typography variant="body2" color="text.secondary">
              {`${numberOfLikes} ${numberOfLikes <= 1 ? 'Like' : 'Likes'}`}
            </Typography>
          </Box>
          <Button
            size="small"
            sx={{ fontSize: '12px', '&:hover': { textDecoration: 'underline' } }}
            onClick={() => navigate(`/posts/update/${id}`)}
          >
            Edit
          </Button>
          <Button
            size="small"
            sx={{ fontSize: '12px', '&:hover': { textDecoration: 'underline' } }}
            onClick={() => {
              setResponseMessage('Are you sure to delete?');
              setResponseModal(true);
            }}
          >
            Delete
          </Button>
        </CardActions>
      </Card>
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

export default PostCard;
