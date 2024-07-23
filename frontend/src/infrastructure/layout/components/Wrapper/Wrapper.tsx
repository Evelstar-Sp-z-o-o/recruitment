import { FunctionComponent, ReactNode } from 'react';

import { Box, Grid } from '@mui/material';

type Props = {
  children: ReactNode;
};

const Wrapper: FunctionComponent<Props> = ({ children }) => {
  return (
    <Box
      style={{
        flexGrow: 1,
        backgroundColor: '#8EC5FC',
        backgroundImage: 'linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%)',
      }}
    >
      <Grid container justifyContent="center" alignItems="center">
        <Grid item>{children}</Grid>
      </Grid>
    </Box>
  );
};

export default Wrapper;
