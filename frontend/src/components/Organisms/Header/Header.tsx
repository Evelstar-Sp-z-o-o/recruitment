import Logo from '@/src/assets/logo.svg?react';
import Avt from '@/src/assets/userIcon.svg';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import SvgIcon from '@mui/material/SvgIcon';

const Header = ({ toggleMenu }) => {
  const StyledLogo = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontSize: '3rem',
  };

  return (
    <AppBar position="static" color="default" sx={{ padding: '2rem', position: 'relative' }}>
      <IconButton onClick={toggleMenu(true)} sx={{ width: '4rem', height: '4rem' }}>
        <Avatar alt="User" src={Avt as string} />
      </IconButton>
      <SvgIcon inheritViewBox sx={StyledLogo}>
        <Logo className="logo" />
      </SvgIcon>
    </AppBar>
  );
};

export default Header;
