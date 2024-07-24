import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { Home as HomeIcon, Note as NoteIcon, Menu as MenuIcon } from '@mui/icons-material';
import PostAddIcon from '@mui/icons-material/PostAdd';
import { IconButton, List, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material';

import logoSmall from '../../public/assets/logo-sm.svg';
import logo from '../../public/assets/logo.svg';
import { openModal } from '../redux/createModalSlice';

const Sidebar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [selectedPage, setSelectedPage] = useState<string>();
  const [anchorEl, setAnchorEl] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    setSelectedPage(pathname);
  }, [pathname]);

  const handleClick = (path) => {
    setSelectedPage(path);
    navigate(path);
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuOpen = Boolean(anchorEl);

  return (
    <>
      {/* Dropdown menu ponizej 768px */}
      <div className="sidebar-menu">
        <IconButton edge="start" color="inherit" onClick={handleMenuClick} aria-label="menu">
          <MenuIcon sx={{ fontSize: 30 }} />
        </IconButton>
        <Menu anchorEl={anchorEl} open={menuOpen} onClose={handleMenuClose}>
          <MenuItem selected={selectedPage === '/'} onClick={() => handleClick('/')}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </MenuItem>
          <MenuItem selected={selectedPage === '/posts'} onClick={() => handleClick('/posts')}>
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
      {/* Sidebar powyzej 768px */}
      <List className="sidebar-list">
        <div className="logo-box">
          <img src={logo} alt="logo" className="logo-image" />
        </div>
        <ListItemButton
          selected={selectedPage === '/'}
          onClick={() => handleClick('/')}
          sx={{
            backgroundColor: selectedPage === '/' ? 'grey.300' : 'transparent',
            '&.Mui-selected': {
              backgroundColor: 'grey.300',
            },
            width: 250,
          }}
        >
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItemButton>
        <ListItemButton
          selected={selectedPage === '/posts'}
          onClick={() => handleClick('/posts')}
          sx={{
            backgroundColor: selectedPage === '/posts' ? 'grey.300' : 'transparent',
            '&.Mui-selected': {
              backgroundColor: 'grey.300',
            },
            width: 250,
          }}
        >
          <ListItemIcon>
            <NoteIcon />
          </ListItemIcon>
          <ListItemText primary="My Posts" />
        </ListItemButton>
        <ListItemButton
          onClick={() => dispatch(openModal())}
          sx={{
            backgroundColor: '#028391',
            borderRadius: '25px',
            color: 'white',
            mt: 4,
            mx: 'auto',
            width: 230,
            '&:hover': {
              backgroundColor: 'rgba(2, 131, 145, 0.7)',
            },
          }}
        >
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
