import { FunctionComponent } from 'react';

import useWidthScreen from '@/src/presentation/utils/useWidthScreen';
import RefreshIcon from '@mui/icons-material/Refresh';
import { Box, IconButton, Paper, Typography } from '@mui/material';

type Props = {
  refetch?: VoidFunction;
};

const ErrorBoundary: FunctionComponent<Props> = ({ refetch }) => {
  const { isSmallScreen } = useWidthScreen();

  return (
    <Paper sx={{ marginY: 4, padding: 4, width: isSmallScreen ? 350 : 600 }} data-testid="errorBoundary">
      <Typography variant="h5" color="error" textAlign="center">
        Ooops! We have some problems. Please try again later.
      </Typography>
      {refetch && (
        <Box display="flex" justifyContent="center" sx={{ marginTop: 2 }}>
          <IconButton aria-label="delete" size="large" onClick={refetch} color="error">
            <RefreshIcon fontSize="large" />
          </IconButton>
        </Box>
      )}
    </Paper>
  );
};

export default ErrorBoundary;
