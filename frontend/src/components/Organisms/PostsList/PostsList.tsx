import { Fragment, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { useRemovePostMutation } from '@/src/store';
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
import { RootState } from '@reduxjs/toolkit/query';

const PostsList = ({ posts, handleEdit }) => {
  const user = useSelector<RootState>((state) => state.user);
  const { t } = useTranslation();
  const [sortedPosts, setSortedPosts] = useState([]);

  useEffect(() => {
    if (posts) {
      const sorted = [...posts];
      sorted.sort((a, b) => {
        return b.data.created - a.data.created;
      });

      setSortedPosts([...sorted]);
    }
  }, [posts]);

  return (
    <>
      {sortedPosts && sortedPosts.length > 0 ? (
        sortedPosts.map((post, index) => (
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
                <IconButton
                  disabled={!user || user?.toLowerCase() !== post.data.author.toLowerCase()}
                  onClick={() => handleEdit(post)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton disabled={!user || user?.toLowerCase() !== post.data.author.toLowerCase()}>
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
