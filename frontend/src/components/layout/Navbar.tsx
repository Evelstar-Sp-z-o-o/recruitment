import { FC } from 'react';
import { Link } from 'react-router-dom';

import HomeIcon from '@mui/icons-material/Home';
import { AppBar, Avatar, Container, Toolbar } from '@mui/material';

const Navbar: FC = () => {
  return (
    <AppBar
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
      }}
    >
      <Container role="top-navigation" sx={{ padding: '0 !important' }}>
        <Toolbar sx={{ maxWidth: '1200px', display: 'flex', justifyContent: 'space-between' }}>
          <Link to="/">
            <HomeIcon fontSize="large" />
          </Link>

          <Avatar alt="Avatar" src="https://xsgames.co/randomusers/assets/avatars/female/11.jpg" />
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
