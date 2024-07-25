import { FC, ReactNode } from 'react';

import { Alert, Slide, Snackbar } from '@mui/material';

interface NotificationProps {
  handleClose: (event: any, reason: any) => void;
  open: boolean;
  message: string | ReactNode;
}

export const Notification: FC<NotificationProps> = ({ handleClose, open, message }) => {
  const SlideTransition = (props) => {
    return <Slide {...props} direction="down" />;
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={2500}
      onClose={handleClose}
      TransitionComponent={SlideTransition}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      style={{ marginTop: '4rem' }}
    >
      <Alert>{message}</Alert>
    </Snackbar>
  );
};
