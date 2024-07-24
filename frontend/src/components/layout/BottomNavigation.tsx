import { FC, useState } from 'react';

import ArchiveIcon from '@mui/icons-material/Archive';
import FavoriteIcon from '@mui/icons-material/Favorite';
import RestoreIcon from '@mui/icons-material/Restore';
import { Paper, BottomNavigation, BottomNavigationAction, Alert, Snackbar, Slide } from '@mui/material';

const BottomNav: FC = () => {
  const [value, setValue] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const SlideTransition = (props) => {
    return <Slide {...props} direction="down" />;
  };
  return (
    <>
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation showLabels value={value} onChange={handleChange} sx={{ background: '#121212' }}>
          <BottomNavigationAction sx={{ color: '#e6edf3' }} label="Aktualności" icon={<RestoreIcon />} />
          <BottomNavigationAction sx={{ color: '#e6edf3' }} label="Ulubione" icon={<FavoriteIcon />} />
          <BottomNavigationAction sx={{ color: '#e6edf3' }} label="Archiwum" icon={<ArchiveIcon />} />
        </BottomNavigation>
      </Paper>
      <Snackbar
        open={open}
        autoHideDuration={2500}
        onClose={handleClose}
        TransitionComponent={SlideTransition}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        style={{ marginTop: '4rem' }}
      >
        <Alert>Nic nie robię. Jestem tutaj dla wyglądu 😊</Alert>
      </Snackbar>
    </>
  );
};

export default BottomNav;
