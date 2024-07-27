import { FC } from 'react';

import { AppBar, Toolbar, Typography } from '@mui/material';

const Navbar: FC = () => {
  return (
    <AppBar position="static" color="primary" enableColorOnDark>
      <Toolbar>
        <Typography variant="h6" sx={{ fontWeight: 600, letterSpacing: '-0.04em' }}>
          eveltter
        </Typography>
        {/* <Button color="inherit">Login</Button> */}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
