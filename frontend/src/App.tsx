import { FC, FunctionComponent } from 'react';

import { Box, Paper, Typography } from '@mui/material';

import { useGetPostsQuery } from './presentation/posts/store/postsApi';

import './styles/main.scss';

const App: FunctionComponent = () => {
  const { data } = useGetPostsQuery();
  console.log('data');
  console.log(data);
  return (
    <Box className="center">
      <Paper sx={{ padding: 4 }}>
        <Typography variant="h6">Hello, please start here. 🙂</Typography>
      </Paper>
    </Box>
  );
};

export default App;
