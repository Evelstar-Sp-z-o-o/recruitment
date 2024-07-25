import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { setUser, useCreatePostMutation, useGetPostsQuery } from '@/src/store';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { RootState } from '@reduxjs/toolkit/query';

const StyledCreatePost = {
  width: '80%',
  minWidth: '300px',
  height: '80%',
  bgcolor: 'background.paper',
};

const CreatePostModal = ({ open, close }) => {
  const { data: posts } = useGetPostsQuery();
  const [createPost] = useCreatePostMutation();
  const user = useSelector<RootState>((state) => state.user);
  const { t } = useTranslation();
  const [openLogin, setOpenLogin] = useState(false);
  const dispatch = useDispatch();
  const [isEmailCorrect, setIsEmailCorrect] = useState(true);
  const [isPostCorrect, setIsPostCorrect] = useState(true);

  const handleClose = () => {
    setOpenLogin(false);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const formData = new FormData(e.currentTarget);
    const formJson = Object.fromEntries((formData as any).entries());
    const email = formJson.email;
    if (!emailRegex.test(email)) {
      setIsEmailCorrect(false);
      return;
    }
    localStorage.removeItem('wasHomeModalShown');
    sessionStorage.setItem('user', email);
    handleClose();

    return dispatch(setUser(email));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      setOpenLogin(true);

      return;
    }

    const formData = new FormData(e.target);
    const formJson = Object.fromEntries((formData as any).entries());
    const body = formJson.body;

    if (!body) {
      setIsPostCorrect(false);

      return;
    }

    const postBody = {
      data: {
        body,
        author: user,
      },
      id: posts.length + 1,
    };
    createPost(postBody);
    close();
  };

  return (
    <>
      <Modal open={open}>
        <Box className="modal" sx={StyledCreatePost}>
          <Typography variant="h3" component="h2" color="textSecondary">
            {t('create.header')}
          </Typography>
          <Container maxWidth="xl" component="form" sx={{ mt: 2 }} onSubmit={handleSubmit}>
            <TextField
              multiline
              autoFocus
              required
              error={!isPostCorrect}
              id="body"
              name="body"
              sx={{ width: '100%' }}
              variant="standard"
              label={t('create.inputLabel')}
            />
            <Container sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 3 }}>
              <Button variant="contained" color="error" onClick={close}>
                {t('create.button.cancel')}
              </Button>
              <Button variant="contained" color="success" type="submit">
                {t('create.button.send')}
              </Button>
            </Container>
          </Container>
        </Box>
      </Modal>
      <Dialog
        open={openLogin}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: handleLogin,
        }}
      >
        <DialogTitle>Login</DialogTitle>
        <DialogContent>
          <DialogContentText>You must be logged in to publish a post.</DialogContentText>
          <TextField
            autoFocus
            required
            error={!isEmailCorrect}
            margin="dense"
            id="email"
            name="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{t('create.button.cancel')}</Button>
          <Button type="submit">{t('create.button.login')}</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CreatePostModal;
