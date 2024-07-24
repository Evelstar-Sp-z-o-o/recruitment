import { FC } from 'react';
import { Link } from 'react-router-dom';

import { AppBar, Toolbar, Typography } from '@mui/material';

const Navbar: FC = () => {
  return (
    <AppBar sx={{ position: 'fixed', top: 0, left: 0, right: 0 }}>
      <Toolbar>
        <Typography variant="h6">
          <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>
            Home
          </Link>
        </Typography>
        <Typography variant="h6" style={{ marginLeft: 'auto' }}>
          <Link to="/create" style={{ color: '#fff', textDecoration: 'none' }}>
            Create Post
          </Link>
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
