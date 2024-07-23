import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';

import { Post } from '../../types';
import PostResponseModal from '../modals/PostResponseModal';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const { content, imageUrl, username, id } = post;

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
          <Typography variant="body2" color="text.secondary">
            {username}
          </Typography>
        </CardContent>
        <CardActions>
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
