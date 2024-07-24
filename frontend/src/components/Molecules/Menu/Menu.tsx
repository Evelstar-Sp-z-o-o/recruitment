import { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Unknown from '@/src/assets/noUserIcon.svg';
import Avt from '@/src/assets/userIcon.svg';
import AddNewPost from '@/src/components/Atoms/AddNewPost/AddNewPost';
import LoginModal from '@/src/components/Molecules/LoginModal/LoginModal';
import { setLogin, setUser } from '@/src/store';
import LoginIcon from '@mui/icons-material/Login';
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
import Typography from '@mui/material/Typography';
import { RootState } from '@reduxjs/toolkit/query';

interface IMenuProps {
  open: boolean;
  toggleMenu: () => void;
}

const Menu: FC<IMenuProps> = ({ open, toggleMenu }) => {
  const dispatch = useDispatch();
  const user = useSelector<RootState>((state) => state.user);
  const [openLogin, setOpenLogin] = useState(false);

  const handleToggleModal = () => {
    setOpenLogin((prevState) => !prevState);
  };

  const handleSnackbar = (isOpen) => {
    dispatch(setLogin(isOpen));
  };

  const handleLogout = () => {
    toggleMenu(false);
    handleSnackbar(true);
    dispatch(setUser(null));
  };

  return (
    <Drawer component="aside" open={open} onClose={toggleMenu}>
      <LoginModal isOpen={openLogin} handleClose={handleToggleModal} handleSnackbar={handleSnackbar} />
      <Box className="sideMenu">
        <Container className="menuHeader" maxWidth="xl">
          <Avatar alt="User" src={user ? Avt : (Unknown as string)} />
          <AddNewPost />
        </Container>
        <Container maxWidth="xl" sx={{ mb: '1rem' }}>
          <Typography color="text.secondary" sx={{ fontWeight: '700' }}>
            {user}
          </Typography>
        </Container>

        <MenuList>
          <Link href="/" color="inherit" underline="hover">
            <MenuItem>
              <ListItemText>Home</ListItemText>
            </MenuItem>
          </Link>
          {user ? (
            <Link href="/profile" color="inherit" underline="hover">
              <MenuItem>
                <ListItemText>My posts</ListItemText>
              </MenuItem>
            </Link>
          ) : null}
          {user ? (
            <MenuItem sx={{ mt: '3rem' }} onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Logout</ListItemText>
            </MenuItem>
          ) : (
            <MenuItem sx={{ mt: '3rem' }} onClick={handleToggleModal}>
              <ListItemIcon>
                <LoginIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Login</ListItemText>
            </MenuItem>
          )}
        </MenuList>
      </Box>
    </Drawer>
  );
};

export default Menu;
