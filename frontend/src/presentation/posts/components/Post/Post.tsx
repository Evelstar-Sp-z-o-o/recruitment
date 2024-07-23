import { FunctionComponent } from 'react';

import { Paper, useMediaQuery, useTheme } from '@mui/material';

const Post: FunctionComponent = () => {
  const theme = useTheme();

  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Paper
      sx={{
        padding: 2,
        textAlign: 'center',
        width: isSmallScreen ? 300 : 600,
        height: 600,
      }}
    >
      <div>eo</div>
    </Paper>
  );
};

export default Post;
