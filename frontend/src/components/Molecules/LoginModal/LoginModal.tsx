import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import CloseModal from '@/src/components/Atoms/ClaseModal/CloseModal';
import { setUser } from '@/src/store';
import { Button, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';

const StyledModal = {
  width: 400,
  bgcolor: 'background.paper',
};

const LoginModal = ({ isOpen, handleClose, handleSnackbar }) => {
  const dispatch = useDispatch();
  const [isEmailCorrect, setIsEmailCorrect] = useState(true);
  const { t } = useTranslation();

  const submitLogin = (e) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    e.preventDefault();
    if (!emailRegex.test(e.target[0].value)) {
      setIsEmailCorrect(false);
      return;
    }

    handleClose(true);
    handleSnackbar(true);
    localStorage.removeItem('wasHomeModalShown');
    sessionStorage.setItem('user', e.target[0].value);

    return dispatch(setUser(e.target[0].value));
  };

  return (
    <Modal open={isOpen}>
      <>
        <Box sx={StyledModal} className="modal">
          <CloseModal handleClose={handleClose} />
          <Typography variant="h6" component="h2">
            {t('login.header')}
          </Typography>
          <Container sx={{ mt: 2 }}>
            <Container
              component="form"
              sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: '0 !important' }}
              onSubmit={submitLogin}
            >
              <TextField
                error={!isEmailCorrect}
                required
                inputProps={{
                  type: 'email',
                }}
                helperText={isEmailCorrect ? ' ' : t('login.incorrect')}
                label={t('login.email')}
                variant="standard"
              />{' '}
              <Button type="submit" variant="outlined">
                {t('login.button')}
              </Button>
            </Container>
          </Container>
        </Box>
      </>
    </Modal>
  );
};

export default LoginModal;
