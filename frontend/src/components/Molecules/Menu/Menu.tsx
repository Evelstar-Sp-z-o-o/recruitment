import { FC } from 'react';

import Avt from '@/src/assets/userIcon.svg';
import AddNewPost from '@/src/components/Atoms/AddNewPost/AddNewPost';
import LogoutIcon from '@mui/icons-material/Logout';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Drawer from '@mui/material/Drawer';
import Link from '@mui/material/Link';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';

interface IMenuProps {
  open: boolean;
  toggleMenu: () => void;
}

const Menu: FC<IMenuProps> = ({ open, toggleMenu }) => {
  return (
    <Drawer component="aside" open={open} onClose={toggleMenu}>
      <Box className="sideMenu">
        <Container className="menuHeader" maxWidth="xl">
          <Avatar alt="User" src={Avt as string} />
          <AddNewPost />
        </Container>
        <MenuList>
          <Link href="/" color="inherit" underline="hover">
            <MenuItem>
              <ListItemText>Home</ListItemText>
            </MenuItem>
          </Link>
          <Link href="/profile" color="inherit" underline="hover">
            <MenuItem>
              <ListItemText>My posts</ListItemText>
            </MenuItem>
          </Link>
          <Link href="/logout" color="inherit" underline="hover">
            <MenuItem sx={{ mt: '3rem' }}>
              <ListItemIcon>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Logout</ListItemText>
            </MenuItem>
          </Link>
        </MenuList>
      </Box>
    </Drawer>
  );
};

export default Menu;
