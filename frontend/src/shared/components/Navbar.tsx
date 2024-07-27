import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { AppDispatch, RootState } from '@/src/store/postStore';
import { setNickname } from '@/src/store/slices/userSlice';
import { AppBar, Avatar, Box, Button, Modal, styled, TextField, Toolbar, Tooltip, Typography } from '@mui/material';
import Badge from '@mui/material/Badge';

import NicknameModal from './NicknameModal';

const AccountInfo = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  flexGrow: 0,
  cursor: 'pointer',
  border: `1px solid ${theme.palette.primary.main}`,
  padding: '6px',
  borderRadius: '29px',
  maxWidth: '50vw',

  '&:hover': {},
  p: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
}));

const NavbarAvatar = styled(Avatar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  width: '30px',
  height: '30px',
  fontSize: 16,
}));

const StyledNav = styled(AppBar)(({ theme }) => ({
  borderBottom: `2px solid ${theme.palette.primary.main}`,
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
  marginRight: '6px',

  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

const Navbar: FC = () => {
  const nickname = useSelector((state: RootState) => state.user.nickname);
  const [modalVisible, setModalVisible] = useState(false);
  const handleOpen = () => setModalVisible(true);

  const handleClose = () => {
    if (nickname) setModalVisible(false);
  };

  useEffect(() => {
    if (!nickname) {
      handleOpen();
    }
    console.dir(nickname);
  }, [nickname]);

  return (
    <>
      <StyledNav position="static" color="primary">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Typography variant="h6" sx={{ fontWeight: 600, letterSpacing: '-0.04em' }} color="primary">
              eveltter
            </Typography>
          </Link>
          {nickname ? (
            <Tooltip title="Change your nickname">
              <AccountInfo onClick={handleOpen}>
                <StyledBadge
                  overlap="circular"
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  variant="dot"
                >
                  <NavbarAvatar>{nickname[0].toUpperCase()}</NavbarAvatar>
                </StyledBadge>
                <Typography variant="body2">{nickname}</Typography>
              </AccountInfo>
            </Tooltip>
          ) : null}
        </Toolbar>
      </StyledNav>
      <NicknameModal nickname={nickname} isOpen={modalVisible} closeModal={handleClose} />
    </>
  );
};

export default Navbar;
