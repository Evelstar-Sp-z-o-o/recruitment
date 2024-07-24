import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import background from '@/src/assets/bgr.webp';
import Logo from '@/src/assets/logo.svg?react';
import Unknown from '@/src/assets/noUserIcon.svg';
import Avt from '@/src/assets/userIcon.svg';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';
import { green } from '@mui/material/colors';
import { RootState } from '@reduxjs/toolkit/query';

const Header = ({ toggleMenu }) => {
  const user = useSelector<RootState>((state) => state.user);
  const location = useLocation();
  const isProfile = location.pathname.slice(1) === 'profile';

  const StyledLogo = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontSize: '3rem',
    display: isProfile ? 'none' : 'block',
  };

  const StyledAvatarButton = {
    width: isProfile ? '6rem' : '4rem',
    height: isProfile ? '6rem' : '4rem',
    position: isProfile ? 'absolute' : 'static',
    top: isProfile ? '100%' : 'unset',
    left: isProfile ? '50%' : 'unset',
    transform: isProfile ? 'translate(-50%, -50%)' : 'unset',
  };

  const StyledAvatarIcon = {
    width: isProfile ? '4rem' : '2.5rem',
    height: isProfile ? '4rem' : '2.5rem',
    bgcolor: isProfile ? green[700] : 'transparent',
  };

  const StyleHeaderWrapper = {
    p: '2rem',
    mb: isProfile ? '4rem' : '0',
    position: 'relative',
    minHeight: isProfile ? '10rem' : 'auto',
    background: isProfile ? `url(${background}) center / cover no-repeat` : 'unset',
  };

  const getInitials = () => {
    const initials = [];
    if (user && user.length > 0) {
      const name = user.substring(0, user.indexOf('@'));
      for (let i = 0; i < name.split('.').length; i++) {
        initials.push(name.split('.')[i][0].toUpperCase());
      }
    }

    return initials.join('');
  };

  return (
    <AppBar position="static" color="default" sx={StyleHeaderWrapper}>
      <IconButton onClick={toggleMenu(true)} sx={StyledAvatarButton}>
        <Avatar alt="User" src={isProfile ? null : user ? Avt : (Unknown as string)} sx={StyledAvatarIcon}>
          {isProfile ? getInitials() : null}
        </Avatar>
      </IconButton>
      {isProfile ? (
        <Typography
          variant="h5"
          component="h2"
          sx={{ position: 'absolute', top: '100%', left: '50%', transform: 'translate(-50%, 130%)' }}
        >
          {user.substring(0, user.indexOf('@'))}
        </Typography>
      ) : null}
      <SvgIcon inheritViewBox sx={StyledLogo}>
        <Logo className="logo" />
      </SvgIcon>
    </AppBar>
  );
};

export default Header;
