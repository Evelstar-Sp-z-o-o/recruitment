import { FC } from 'react';
import { Link } from 'react-router-dom';

import HomeIcon from '@mui/icons-material/Home';
import { AppBar, Avatar, Container, Grid, Toolbar } from '@mui/material';

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
      <Container role="wrapper" sx={{ padding: '0 !important' }}>
        <Toolbar sx={{ maxWidth: '1200px', display: 'flex', justifyContent: 'space-between' }}>
          <Link to="/">
            <HomeIcon fontSize="large" />
          </Link>

          <Grid container spacing={8} sx={{ width: 'fit-content', alignItems: 'center', margin: '0' }}>
            <Link to="/create" style={{ marginRight: '1.5rem' }}>
              Create Post
            </Link>
            <Avatar alt="Avatar" />
          </Grid>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
