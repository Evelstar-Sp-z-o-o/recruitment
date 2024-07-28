import { FunctionComponent } from 'react';

import AddPostForm from '@/src/presentation/components/AddPostForm';
import Posts from '@/src/presentation/components/Posts';
import { Box } from '@mui/material';

const Dashboard: FunctionComponent = () => (
  <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
    <AddPostForm />
    <Posts />
  </Box>
);

export default Dashboard;
