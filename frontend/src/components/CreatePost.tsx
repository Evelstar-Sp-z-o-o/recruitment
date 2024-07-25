import { FC, useState, FormEvent } from 'react';
import { useDispatch } from 'react-redux';

import AddAPhotoTwoToneIcon from '@mui/icons-material/AddAPhotoTwoTone';
import AddPhotoAlternateTwoToneIcon from '@mui/icons-material/AddPhotoAlternateTwoTone';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { Avatar, Box, Button, Card, Grid, TextField } from '@mui/material';

import { createPost } from '../redux/actions/posts';
import { PostData } from '../types';
import { Notification } from './common/Notification';

const CreatePost: FC = () => {
  const dispatch = useDispatch();
  const [openNotification, setOpenNotification] = useState<boolean>(false);

  const [post, setPost] = useState<PostData>({
    body: '',
    author: '',
    created: Date.now() / 1000,
    edited: Date.now() / 1000,
    postId: '',
  });

  const [errors, setErrors] = useState({
    author: '',
    body: '',
  });

  const validate = () => {
    let isValid = true;
    const newErrors = { author: '', body: '' };

    if (post.author.trim() === '') {
      newErrors.author = 'Author name is required';
      isValid = false;
    }
    if (post.body.trim() === '') {
      newErrors.body = 'Message is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validate()) {
      dispatch(createPost({ id: 0, data: post }));
      setPost({
        body: '',
        author: '',
        created: Date.now() / 1000,
        edited: Date.now() / 1000,
        postId: generateRandomId(7),
      });
      setErrors({ author: '', body: '' });
      setOpenNotification(true);
    }
  };

  const generateRandomId = (length) => {
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenNotification(false);
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-end', position: 'relative' }}>
      <Avatar
        alt="Avatar"
        src="https://xsgames.co/randomusers/assets/avatars/female/11.jpg"
        sx={{ alignSelf: 'flex-end', margin: '10px 20px 5px 16px' }}
      />
      <Card
        sx={{
          width: '100%',
          background: 'background.paper',
          position: 'relative',
          padding: '16px',
          boxShadow: 'none',
          overflow: 'visible',
          '&::after': {
            content: '""',
            position: 'absolute',
            top: '92%',
            left: '-10px',
            width: 0,
            height: 0,
            borderTop: '10px solid transparent',
            borderBottom: '10px solid transparent',
            borderRight: '10px solid #1c1c1c ',
            transform: 'translateY(-50%)',
          },
        }}
      >
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
          <TextField
            label="Your name"
            value={post.author}
            onChange={(e) => setPost({ ...post, author: e.target.value })}
            sx={{ marginBottom: '16px' }}
            error={!!errors.author}
            helperText={errors.author}
          />
          <TextField
            label="What's on your mind?"
            value={post.body}
            onChange={(e) => setPost({ ...post, body: e.target.value })}
            multiline
            minRows={5}
            sx={{ marginBottom: '16px' }}
            error={!!errors.body}
            helperText={errors.body}
          />
          <Grid
            container
            sx={{ width: 'fit-content', marginLeft: 'auto', alignItems: 'center', gap: '1rem', cursor: 'pointer' }}
          >
            <AddAPhotoTwoToneIcon />
            <AddPhotoAlternateTwoToneIcon />
            <AttachFileIcon />
            <Button type="submit" variant="contained" color="primary">
              Create Post
            </Button>
          </Grid>
        </form>
      </Card>
      <Notification handleClose={handleClose} open={openNotification} message={'Succesfully created post!'} />
    </Box>
  );
};

export default CreatePost;
