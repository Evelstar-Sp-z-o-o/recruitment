import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';

import { formatDate } from '@/src/utils/helpers/formatDate';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';

const PostsList = ({ posts }) => {
  const { t } = useTranslation();
  return (
    <>
      {posts && posts.length === 0 ? (
        posts.map((post, index) => (
          <Fragment key={post.id}>
            <Card sx={{ p: '1.5rem 1rem' }}>
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: blue[500] }} alt="">
                    <TextsmsOutlinedIcon />
                  </Avatar>
                }
                title={post.data.author}
                subheader={`${formatDate(post.data.created)}${
                  post.data.created !== post.data.edited ? ' (edited)' : null
                }`}
              />
              <CardContent>
                <Typography color="text.secondary">{post.data.body}</Typography>
              </CardContent>
              <CardActions disableSpacing sx={{ justifyContent: 'flex-end' }}>
                <IconButton aria-label="add to favorites">
                  <EditIcon />
                </IconButton>
                <IconButton aria-label="share">
                  <DeleteForeverIcon />
                </IconButton>
              </CardActions>
            </Card>
            {index !== posts.length - 1 ? <Divider /> : null}
          </Fragment>
        ))
      ) : (
        <Box maxWidth="dm" className="center">
          {t('noPosts')}
        </Box>
      )}
    </>
  );
};

export default PostsList;
