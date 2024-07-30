import React from 'react';
import { FallbackProps } from 'react-error-boundary';

import RefreshIcon from '@mui/icons-material/Refresh';
import { Typography, Button, Container } from '@mui/material';

const containerStyles = {
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
};

const ErrorBoundaryComponent: React.FC<FallbackProps> = ({ error, resetErrorBoundary }) => {
  return (
    <Container component="main" maxWidth="xs" sx={containerStyles}>
      <Typography variant="h3" color="error" gutterBottom>
        Oops!
      </Typography>
      <Typography variant="body1" color="textSecondary" paragraph>
        Something went wrong:
      </Typography>
      <Typography variant="body2" color="textSecondary" paragraph>
        {error.message}
      </Typography>
      <Button variant="text" color="primary" onClick={resetErrorBoundary} startIcon={<RefreshIcon />}>
        Try to reload Page
      </Button>
    </Container>
  );
};

export default ErrorBoundaryComponent;
