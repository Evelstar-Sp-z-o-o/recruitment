import { useNavigate } from 'react-router-dom';

import { ErrorOutline as ErrorOutlineIcon } from '@mui/icons-material';
import { Box, Button, Container, Typography } from '@mui/material';

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };
  return (
    <Container maxWidth="md" sx={{ textAlign: 'center', mt: 10 }}>
      <Box display="flex" flexDirection="column" alignItems="center">
        <ErrorOutlineIcon sx={{ fontSize: 50, color: 'primary.main' }} />
        <Typography variant="h2" component="h1">
          404
        </Typography>
        <Typography variant="h5" gutterBottom>
          Page is not found
        </Typography>
        <Button variant="contained" color="primary" onClick={handleGoHome}>
          Go Home
        </Button>
      </Box>
    </Container>
  );
};

export default NotFound;
