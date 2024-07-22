import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { Home as HomeIcon, Note as NoteIcon, Menu as MenuIcon } from '@mui/icons-material';
import PostAddIcon from '@mui/icons-material/PostAdd';
import { IconButton, List, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material';

import { openModal } from '../redux/modalSlice';

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const [selectedPage, setSelectedPage] = useState<string>();
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    setSelectedPage(pathname);
  }, [pathname]);

  const handleClick = (path) => {
    setSelectedPage(path);
    navigate(path);
    if (path === '/create-post') {
      dispatch(openModal());
    }
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
            <ListItemText primary="Posts" />
          </MenuItem>
          <MenuItem selected={selectedPage === '/create-post'} onClick={() => handleClick('/create-post')}>
            <ListItemIcon>
              <PostAddIcon />
            </ListItemIcon>
            <ListItemText primary="Create a post" />
          </MenuItem>
        </Menu>
      </div>
      {/* Sidebar powyzej 768px */}
      <List className="sidebar-list" sx={{ width: 250 }}>
        <ListItemButton
          selected={selectedPage === '/'}
          onClick={() => handleClick('/')}
          sx={{
            backgroundColor: selectedPage === '/' ? 'grey.300' : 'transparent',
            '&.Mui-selected': {
              backgroundColor: 'grey.300',
            },
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
          }}
        >
          <ListItemIcon>
            <NoteIcon />
          </ListItemIcon>
          <ListItemText primary="Posts" />
        </ListItemButton>
        <ListItemButton
          selected={selectedPage === '/create-post'}
          onClick={() => handleClick('/create-post')}
          sx={{
            backgroundColor: selectedPage === '/create-post' ? 'grey.300' : 'transparent',
            '&.Mui-selected': {
              backgroundColor: 'grey.300',
            },
          }}
        >
          <ListItemIcon>
            <PostAddIcon />
          </ListItemIcon>
          <ListItemText primary="Create a post" />
        </ListItemButton>
      </List>
    </>
  );
};

export default Sidebar;
