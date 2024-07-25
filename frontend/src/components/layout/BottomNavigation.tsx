import { FC, useState } from 'react';

import ArchiveIcon from '@mui/icons-material/Archive';
import FavoriteIcon from '@mui/icons-material/Favorite';
import RestoreIcon from '@mui/icons-material/Restore';
import { Paper, BottomNavigation, BottomNavigationAction, Slide } from '@mui/material';

import { Notification } from '../common/Notification';

const BottomNav: FC = () => {
  const [value, setValue] = useState<number>(0);
  const [openNotification, setOpenNotification] = useState<boolean>(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setOpenNotification(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenNotification(false);
  };

  return (
    <>
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation showLabels value={value} onChange={handleChange} sx={{ background: '#121212' }}>
          <BottomNavigationAction sx={{ color: 'secondary.dark' }} label="Recents" icon={<RestoreIcon />} />
          <BottomNavigationAction sx={{ color: 'secondary.dark' }} label="Favorites" icon={<FavoriteIcon />} />
          <BottomNavigationAction sx={{ color: 'secondary.dark' }} label="Archive" icon={<ArchiveIcon />} />
        </BottomNavigation>
      </Paper>
      <Notification
        handleClose={handleClose}
        open={openNotification}
        message={`I'm not actually doing anything. I'm just here for the app's aesthetics 😊`}
      />
    </>
  );
};

export default BottomNav;
