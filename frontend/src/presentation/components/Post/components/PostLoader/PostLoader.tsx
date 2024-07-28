import { FunctionComponent } from 'react';

import useWidthScreen from '@/src/presentation/utils/useWidthScreen';
import { Card, CardContent, CardHeader, Skeleton } from '@mui/material';

const PostLoader: FunctionComponent = () => {
  const { isSmallScreen } = useWidthScreen();

  return (
    <Card sx={{ width: isSmallScreen ? 350 : 600, marginY: 2 }} data-testid="loader">
      <CardHeader
        avatar={<Skeleton animation="wave" variant="circular" width={40} height={40} />}
        title={<Skeleton animation="wave" height={10} width="50%" style={{ marginBottom: 6 }} />}
        subheader={<Skeleton animation="wave" height={10} width="40%" />}
      />

      <CardContent>
        <>
          <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} width="90%" />
          <Skeleton animation="wave" height={10} width="80%" />
        </>
      </CardContent>
    </Card>
  );
};

export default PostLoader;
