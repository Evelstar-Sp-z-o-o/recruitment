import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Avatar, Button, Card, CardActions, CardContent, Grid, Typography } from '@mui/material';

import { deletePost } from '../redux/actions/posts';
import { Post as PostType } from '../types';
import DeleteConfirmationDialog from './common/DeleteConfirmationDialog';
import { Notification } from './common/Notification';

interface PostProps {
  post: PostType;
}

const Post: FC<PostProps> = ({ post }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [openNotification, setOpenNotification] = useState<boolean>(false);

  const details = post.data;

  // Funkcja do usuwania posta
  const handleDelete = () => {
    dispatch(deletePost(post.id));
  };

  // Funkcja do edytowania posta
  const handleEdit = () => {
    navigate(`/edit/${post.id}`);
  };

  // Otwórz/zamknij dialog potwierdzenia usunięcia
  const handleOpenDialog = () => setIsDialogOpen(true);
  const handleCloseDialog = () => setIsDialogOpen(false);

  // Zamykanie powiadomienia
  const handleClose = (event: any, reason: string) => {
    if (reason === 'clickaway') return;
    setOpenNotification(false);
  };

  // Potwierdzenie usunięcia posta
  const handleConfirmDelete = () => {
    handleCloseDialog();
    setOpenNotification(true);

    setTimeout(() => {
      handleDelete();
    }, 1500);
  };

  // Formatowanie znacznika czasu
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
      role="post"
      variant="outlined"
      sx={{
        minWidth: 275,
        margin: 2,
        paddingTop: 1,
        background: 'background.paper',
        color: 'text.primary',
        borderRadius: 1,
      }}
    >
      <CardContent>
        <Grid container justifyContent="space-between">
          <Grid item role="author-wrapper" sx={{ display: 'flex', gap: 1 }}>
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
            sx={{ display: { xs: 'none', sm: 'block' }, marginRight: 1, textAlign: 'right' }}
          >
            <Typography sx={{ fontSize: '0.8rem' }} color="text.secondary">
              {details.created !== details.edited ? 'Edited' : ''}
            </Typography>

            <Typography sx={{ fontSize: '0.8rem' }} color="text.secondary">
              {formatUnixTimestamp(details.created)}
            </Typography>
          </Grid>
        </Grid>

        <Typography sx={{ padding: { xs: 1, sm: 3 } }}>{details.body}</Typography>
      </CardContent>

      <CardActions sx={{ justifyContent: 'flex-end', padding: '0 2rem 1.5rem 0' }}>
        <Button variant="outlined" color="primary" onClick={handleEdit}>
          Edit
        </Button>
        <Button variant="text" color="secondary" onClick={handleOpenDialog}>
          Delete
        </Button>
      </CardActions>
      <DeleteConfirmationDialog
        open={isDialogOpen}
        handleClose={handleCloseDialog}
        handleConfirm={handleConfirmDelete}
      />
      <Notification handleClose={handleClose} open={openNotification} message={'Successfully deleted post!'} />
    </Card>
  );
};

export default Post;
