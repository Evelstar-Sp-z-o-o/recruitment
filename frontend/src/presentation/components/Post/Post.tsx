import { FunctionComponent } from 'react';

import formatTimestampToDate from '@/src/infrastructure/utils/formatTimestampToDate';
import { Avatar, Card, CardContent, CardHeader, Typography } from '@mui/material';

import { PostsResponse } from '../../store/types';

import useWidthScreen from '../../utils/useWidthScreen';

import TitleWithActions from './components/TitleWithActions';

type Props = {
  post: PostsResponse;
};

const Post: FunctionComponent<Props> = ({ post }) => {
  const { isSmallScreen } = useWidthScreen();

  const {
    data: { author, created, edited, body },
  } = post;

  return (
    <Card sx={{ width: isSmallScreen ? 350 : 600, marginY: 2 }} data-testid="post">
      <CardHeader
        avatar={<Avatar>{author.charAt(0).toUpperCase()}</Avatar>}
        title={<TitleWithActions post={post} />}
        subheader={formatTimestampToDate(created)}
      />
      <CardContent sx={{ display: 'flex', gap: 2, flexDirection: 'column' }}>
        <Typography variant="body2" sx={{ marginLeft: 2 }} data-testid="bodyPost">
          {body}
        </Typography>
        {edited ? (
          <Typography variant="caption" textAlign={'right'}>
            Edited: {formatTimestampToDate(edited)}
          </Typography>
        ) : null}
      </CardContent>
    </Card>
  );
};

export default Post;
