import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import logoSmall from '/assets/logo-sm.svg';
import logo from '/assets/logo.svg';

import { Home as HomeIcon, Note as NoteIcon, Menu as MenuIcon } from '@mui/icons-material';
import PostAddIcon from '@mui/icons-material/PostAdd';
import { IconButton, List, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material';

import { openModal } from '../redux/createModalSlice';

const styles = {
  listItemButton: {
    '&.Mui-selected': {
      backgroundColor: 'grey.300',
    },
    width: 250,
  },
  creationButton: {
    backgroundColor: '#028391',
    borderRadius: '25px',
    color: 'white',
    mt: 4,
    mx: 'auto',
    width: 230,
    '&:hover': {
      backgroundColor: 'rgba(2, 131, 145, 0.7)',
    },
  },
};

const Sidebar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const dispatch = useDispatch();

  const handleMenuClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuOpen = Boolean(anchorEl);

  return (
    <>
      {/* Dropdown under 768px */}
      <div className="sidebar-menu">
        <IconButton edge="start" color="inherit" onClick={handleMenuClick} aria-label="menu">
          <MenuIcon sx={{ fontSize: 30 }} />
        </IconButton>
        <Menu anchorEl={anchorEl} open={menuOpen} onClose={handleMenuClose}>
          <MenuItem selected={pathname === '/'} onClick={() => navigate('/')}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </MenuItem>
          <MenuItem selected={pathname === '/posts'} onClick={() => navigate('/posts')}>
            <ListItemIcon>
              <NoteIcon />
            </ListItemIcon>
            <ListItemText primary="My Posts" />
          </MenuItem>
          <MenuItem onClick={() => dispatch(openModal())}>
            <ListItemIcon>
              <PostAddIcon />
            </ListItemIcon>
            <ListItemText primary="Create a post" />
          </MenuItem>
        </Menu>
        <div className="logo-sm-box">
          <img src={logoSmall} alt="logo" className="logo-sm-image" />
          <span className="page-name">{pathname === '/' ? 'Home' : 'My Posts'}</span>
        </div>
      </div>
      {/* Sidebar over 768px */}
      <List className="sidebar-list">
        <div className="logo-box">
          <img src={logo} alt="logo" className="logo-image" />
        </div>
        <ListItemButton
          aria-label="menu"
          selected={pathname === '/'}
          onClick={() => navigate('/')}
          sx={{
            backgroundColor: pathname === '/' ? 'grey.300' : 'transparent',
            ...styles.listItemButton,
          }}
        >
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItemButton>
        <ListItemButton
          selected={pathname === '/posts'}
          onClick={() => navigate('/posts')}
          sx={{
            backgroundColor: pathname === '/posts' ? 'grey.300' : 'transparent',
            ...styles.listItemButton,
          }}
        >
          <ListItemIcon>
            <NoteIcon />
          </ListItemIcon>
          <ListItemText primary="My Posts" />
        </ListItemButton>
        <ListItemButton onClick={() => dispatch(openModal())} sx={styles.creationButton}>
          <ListItemIcon>
            <PostAddIcon sx={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText primary="Create a post" />
        </ListItemButton>
      </List>
    </>
  );
};

export default Sidebar;
