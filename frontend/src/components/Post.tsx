import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Avatar, Button, Card, CardActions, CardContent, Grid, Typography } from '@mui/material';

import { deletePost } from '../redux/actions/posts';
import { Post as PostType } from '../types';

interface PostProps {
  post: PostType;
}

const Post: FC<PostProps> = ({ post }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const details = post.data;

  const handleDelete = () => {
    dispatch(deletePost(post.id));
  };

  const handleEdit = () => {
    navigate(`/edit/${post.id}`);
  };

  const formatUnixTimestamp = (timestamp: number): string => {
    const date: Date = new Date(timestamp * 1000);
    const day: string = String(date.getDate()).padStart(2, '0');
    const month: string = String(date.getMonth() + 1).padStart(2, '0');
    const year: number = date.getFullYear();
    const hours: string = String(date.getHours()).padStart(2, '0');
    const minutes: string = String(date.getMinutes()).padStart(2, '0');
    return `${day}.${month}.${year} ${hours}:${minutes}`;
  };

  return (
    <Card
      variant="outlined"
      sx={{
        minWidth: 275,
        margin: '2.5rem 0',
        paddingTop: '0.5rem',
        background: 'background.paper',
        color: 'text.primary',
        borderRadius: '0.5rem',
      }}
    >
      <CardContent>
        <Grid container sx={{ justifyContent: 'space-between' }}>
          <Grid item role="author-wrapper" sx={{ display: 'flex', gap: '1rem ' }}>
            <Avatar alt="Avatar" src={`https://xsgames.co/randomusers/assets/avatars/pixel/${post.id}.jpg`} />
            <Typography component="div">
              {details.author} <br />
              <Typography sx={{ fontSize: '0.8rem' }} color="text.secondary">
                @{details.author.split(/[\s@]+/)[0].toLowerCase()}
              </Typography>
            </Typography>
          </Grid>
          <Grid
            item
            role="timeline-wrapper"
            sx={{ display: { xs: 'none', sm: 'block' }, marginRight: '1rem', textAlign: 'right' }}
          >
            <Typography sx={{ fontSize: '0.8rem' }} color="text.secondary">
              {details.created !== details.edited ? 'Edytowano' : ''}
            </Typography>

            <Typography sx={{ fontSize: '0.8rem' }} color="text.secondary">
              {formatUnixTimestamp(details.created)}
            </Typography>
          </Grid>
        </Grid>

        <Typography sx={{ padding: { xs: '1rem', sm: '1rem 3.5rem' } }}>{details.body}</Typography>
      </CardContent>

      <CardActions sx={{ justifyContent: 'flex-end', padding: '0 2rem 1.5rem 0' }}>
        <Button variant="outlined" color="primary" onClick={handleEdit}>
          Edit
        </Button>
        <Button variant="text" color="secondary" onClick={handleDelete}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default Post;
