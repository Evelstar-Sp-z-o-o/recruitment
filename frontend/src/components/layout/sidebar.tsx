import { Link } from 'react-router-dom';

import { HomeOutlined, AccountBoxOutlined } from '@mui/icons-material';
import { List, ListItemIcon, ListItemText, useMediaQuery, Box, ListItemButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import AccountLink from '../ui/account-link';
import Logo from './logo';

const containerStyles = {
  display: { xs: 'none', sm: 'block' },
  padding: { xs: 2, md: 4 },
  borderRight: '1px solid lightgray',
};

const listItemStyles = {
  paddingLeft: 0,
};

const largeIconStyles = {
  color: 'black',
};

const Sidebar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box component="aside" sx={containerStyles}>
      <Logo />
      <List>
        <Link to="/posts">
          <ListItemButton sx={listItemStyles}>
            <ListItemIcon>
              <HomeOutlined sx={largeIconStyles} fontSize="large" />
            </ListItemIcon>
            {!isMobile && <ListItemText primary="Home" />}
          </ListItemButton>
        </Link>
        <Link to="/my-profile">
          <ListItemButton sx={listItemStyles}>
            <ListItemIcon>
              <AccountBoxOutlined sx={largeIconStyles} fontSize="large" />
            </ListItemIcon>
            {!isMobile && <ListItemText primary="Profile" />}
          </ListItemButton>
        </Link>
      </List>
      <Box mt={6}>
        <AccountLink />
      </Box>
    </Box>
  );
};

export default Sidebar;
