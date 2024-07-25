import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import dayjs from 'dayjs';

import { AppDispatch } from '@/src/store/postStore';
import { deletePost } from '@/src/store/postsSlice';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Button, Card, CardActions, CardContent, Theme, Typography, useMediaQuery } from '@mui/material';

interface PostProps {
  postId: string;
  text: string;
  author: string;
  created: Date;
}

const Post = ({ postId, text, author, created }: PostProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const isSmallScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  const handleDelete = (postId: string) => {
    dispatch(deletePost(postId));
  };

  const formattedDate = dayjs(created).format('HH:mm DD/MM/YYYY');

  return (
    <Card
      variant="outlined"
      sx={{
        width: isSmallScreen ? '100%' : '600px',
        borderRadius: '20px',
        boxShadow: '8px 8px 24px 0px rgba(66, 68, 90, 1)',
      }}
    >
      <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: '20px', pb: 1 }}>
        <Typography>{text}</Typography>
        <Typography sx={{ fontSize: '12px', marginLeft: 'auto', color: 'gray' }}>{`~${author}`}</Typography>
        <Typography sx={{ fontSize: '12px', marginLeft: 'auto', color: 'gray' }}>{formattedDate}</Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end', mr: 2, p: 1 }}>
        <Button
          sx={{ padding: 0, margin: 0, minWidth: '10px' }}
          size="small"
          color="primary"
          component={Link}
          to={`/edit/${postId}`}
          endIcon={<EditIcon />}
        />
        <Button
          sx={{ padding: 0, margin: 0, minWidth: '10px' }}
          size="small"
          color="error"
          onClick={() => handleDelete(postId)}
          endIcon={<DeleteIcon />}
        />
      </CardActions>
    </Card>
  );
};

export default Post;
