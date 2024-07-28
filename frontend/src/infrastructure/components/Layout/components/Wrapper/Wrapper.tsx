import { FunctionComponent, ReactNode } from 'react';

import { Box, Grid } from '@mui/material';

type Props = {
  children: ReactNode;
};

const Wrapper: FunctionComponent<Props> = ({ children }) => {
  return (
    <Box
      sx={{
        flexGrow: 1,
        backgroundColor: '#E8F5E9',
      }}
    >
      <Grid container justifyContent="center" alignItems="center">
        <Grid item>{children}</Grid>
      </Grid>
    </Box>
  );
};

export default Wrapper;
