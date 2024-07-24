import { useEffect, useState } from 'react';

import { Post } from '@/src/types';
import { currentUser, getFormattedDate } from '@/src/utils';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { Avatar, Box, Card, CardMedia, IconButton, Typography } from '@mui/material';

interface PostBoxProps {
  post: Post;
}
const HomePostBox: React.FC<PostBoxProps> = ({ post }) => {
  const { content, imageUrl, username, createdAt, id } = post;
  const [likeCount, setLikeCount] = useState<number>();
  const [likeUsers, setLikeUsers] = useState<string[]>();

  useEffect(() => {
    if (post) {
      setLikeCount(post.numberOfLikes);
      setLikeUsers(post.likes);
    }
  }, [post]);

  const handleLike = async () => {
    try {
      let updatedPost;
      if (likeUsers.includes(currentUser)) {
        updatedPost = {
          numberOfLikes: likeCount - 1,
          likes: likeUsers.filter((user) => user !== currentUser),
        };
      } else {
        updatedPost = {
          numberOfLikes: likeCount + 1,
          likes: [...likeUsers, currentUser],
        };
      }
      const response = await fetch(`/api/posts/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: { ...post, ...updatedPost } }),
      });

      if (response.ok) {
        const data = await response.json();
        setLikeCount(data.data.numberOfLikes);
        setLikeUsers(data.data.likes);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box sx={{ display: 'flex', gap: 1, alignItems: 'start', maxWidth: 600, margin: '0 auto' }}>
      <Avatar sx={{ width: 30, height: 30 }} />
      <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Typography variant="body2" color="text.secondary">
            {username}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {getFormattedDate(createdAt)}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', ml: 'auto', pr: 4 }}>
            <Typography variant="body2" color="text.secondary">
              {`${likeCount} ${likeCount <= 1 ? 'Like' : 'Likes'}`}
            </Typography>
            <IconButton sx={{ width: 20, height: 20 }} onClick={handleLike}>
              <ThumbUpIcon sx={{ color: `${likeUsers && likeUsers.includes(currentUser) ? 'dodgerBlue' : 'gray'}` }} />
            </IconButton>
          </Box>
        </Box>
        <Box sx={{ mt: 2 }}>
          <Typography variant="body1">{content}</Typography>
          {imageUrl && (
            <Card sx={{ mt: 2 }}>
              <CardMedia component="img" image={imageUrl} sx={{ width: '100%', height: 'auto', aspectRatio: '1/1' }} />
            </Card>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default HomePostBox;
