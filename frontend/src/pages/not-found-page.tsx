import { Box, Typography } from '@mui/material';

import BackToMainPageButton from '../components/ui/back-to-main-page-button';

const containerStyles = {
  minHeight: 'calc(100vh - 300px)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
};

const NotFoundPage = () => {
  return (
    <Box sx={containerStyles}>
      <Typography variant="h1" component="h1" fontWeight="bold">
        404
      </Typography>
      <Typography component="p" m={3}>
        Oops! The page you are looking for does not exist.
      </Typography>
      <BackToMainPageButton />
    </Box>
  );
};

export default NotFoundPage;
