import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { RootState } from '@/src/redux/store';
import { Box, Avatar, Typography, useMediaQuery, useTheme } from '@mui/material';

const avatarContainerStyles = {
  display: 'flex',
  alignItems: 'center',
  gap: 2,
  mt: 3,
};

const AccountLink = () => {
  const theme = useTheme();
  const user = useSelector((state: RootState) => state.user.user);
  const isMobile = useMediaQuery(() => theme.breakpoints.down('md'));

  if (!user) {
    return null;
  }

  return (
    <Box sx={avatarContainerStyles}>
      <Link to="/my-profile" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
        <Avatar alt={user.email}>{user.email.charAt(0).toUpperCase()}</Avatar>
        {!isMobile && (
          <Typography variant="subtitle1" color="textPrimary">
            {user.email}
          </Typography>
        )}
      </Link>
    </Box>
  );
};

export default AccountLink;
