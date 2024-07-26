import { useEffect, useState } from 'react';

import { Post } from '@/src/types';
import { currentUser, getFormattedDate } from '@/src/utils';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { Avatar, Box, Card, CardMedia, IconButton, Typography } from '@mui/material';

interface PostBoxProps {
  post: Post;
}

const styles = {
  container: { display: 'flex', gap: 1, alignItems: 'start', maxWidth: 600, margin: '0 auto' },
  contentContainer: { display: 'flex', flexDirection: 'column', width: '100%' },
  header: { display: 'flex', gap: 2 },
  likeContainer: { display: 'flex', gap: 1, alignItems: 'center', ml: 'auto', pr: 4 },
  image: { width: '100%', height: 'auto', aspectRatio: '1/1' },
  avatar: { width: 30, height: 30 },
  likeIcon: { width: 20, height: 20 },
};

const HomePostBox: React.FC<PostBoxProps> = ({ post }) => {
  const { content, imageUrl, username, createdAt, id, numberOfLikes, likes } = post;
  const [likeCount, setLikeCount] = useState<number>(numberOfLikes);
  const [likeUsers, setLikeUsers] = useState<string[]>(likes);

  useEffect(() => {
    setLikeCount(numberOfLikes);
    setLikeUsers(likes);
  }, [numberOfLikes, likes]);

  // Add or remove like
  const handleLike = async () => {
    try {
      const isLiked = likeUsers.includes(currentUser);
      const updatedPost = {
        numberOfLikes: isLiked ? likeCount - 1 : likeCount + 1,
        likes: isLiked ? likeUsers.filter((user) => user !== currentUser) : [...likeUsers, currentUser],
      };

      const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
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
      console.error(error);
    }
  };

  return (
    <Box sx={styles.container}>
      <Avatar sx={styles.avatar} />
      <Box sx={styles.contentContainer}>
        <Box sx={styles.header}>
          <Typography variant="body2" color="text.secondary">
            {username}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {getFormattedDate(createdAt)}
          </Typography>
          <Box sx={styles.likeContainer}>
            <Typography variant="body2" color="text.secondary" data-testid="numOfLikes">
              {`${likeCount} ${likeCount <= 1 ? 'Like' : 'Likes'}`}
            </Typography>
            <IconButton sx={styles.likeIcon} onClick={handleLike}>
              <ThumbUpIcon sx={{ color: `${likeUsers.includes(currentUser) ? 'dodgerBlue' : 'gray'}` }} />
            </IconButton>
          </Box>
        </Box>
        <Box sx={{ mt: 2 }}>
          <Typography variant="body1">{content}</Typography>
          {imageUrl && (
            <Card sx={{ mt: 2 }}>
              <CardMedia component="img" image={imageUrl} sx={styles.image} />
            </Card>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default HomePostBox;
