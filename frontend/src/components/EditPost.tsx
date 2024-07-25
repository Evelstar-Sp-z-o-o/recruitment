import { FC, FormEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';

import AddAPhotoTwoToneIcon from '@mui/icons-material/AddAPhotoTwoTone';
import AddPhotoAlternateTwoToneIcon from '@mui/icons-material/AddPhotoAlternateTwoTone';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { TextField, Button, Typography, Grid, Container, Paper, CircularProgress } from '@mui/material';

import { updatePost, fetchPost } from '../redux/actions/posts';
import { RootState } from '../redux/reducers';
import { Post } from '../types';
import { Notification } from './common/Notification';

const EditPost: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [body, setBody] = useState('');
  const [author, setAuthor] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openNotification, setOpenNotification] = useState<boolean>(false);

  const editingPost = useSelector((state: RootState) => state.posts.editingPost);

  useEffect(() => {
    const fetchPostData = () => {
      try {
        if (id) {
          dispatch(fetchPost(Number(id)));
        }
      } catch (err) {
        setError('Failed to fetch post');
      } finally {
        setLoading(false);
      }
    };

    fetchPostData();
  }, [id, dispatch]);

  useEffect(() => {
    if (editingPost) {
      setBody(editingPost.data.body);
      setAuthor(editingPost.data.author);
    }
  }, [editingPost]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!body || !author) {
      setError('All fields are required');
      return;
    }

    try {
      if (editingPost) {
        const updatedPost: Post = {
          ...editingPost,
          data: {
            ...editingPost.data,
            body,
            author,
            edited: Math.floor(Date.now() / 1000),
          },
        };

        dispatch(updatePost(updatedPost));
        setTimeout(() => navigate('/'), 1500);
        setOpenNotification(true);
      }
    } catch (err) {
      setError('Failed to update post');
    }
  };

  const handleClose = (event: any, reason: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenNotification(false);
  };

  return (
    <Container component="main" maxWidth="lg">
      <Paper elevation={3} sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h5">Edit Post</Typography>
        {loading ? (
          <CircularProgress />
        ) : (
          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <TextField
              label="Author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <TextField
              label="Post text"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              fullWidth
              margin="normal"
              multiline
              minRows={5}
              variant="outlined"
            />

            {error && (
              <Typography color="error" variant="body2" sx={{ margin: '16px 0' }}>
                {error}
              </Typography>
            )}
            <Grid
              container
              sx={{
                width: 'fit-content',
                marginTop: 2,
                marginLeft: 'auto',
                alignItems: 'center',
                gap: 1,
                flexWrap: 'nowrap',
                cursor: 'pointer',
              }}
            >
              <AddAPhotoTwoToneIcon />
              <AddPhotoAlternateTwoToneIcon />
              <AttachFileIcon />
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Update Post
              </Button>
            </Grid>
          </form>
        )}
      </Paper>
      <Notification handleClose={handleClose} open={openNotification} message={'Successfully edited post!'} />
    </Container>
  );
};

export default EditPost;
