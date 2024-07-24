import { Post } from '@/src/types';
import { getFormattedDate } from '@/src/utils';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { Avatar, Box, Card, CardMedia, IconButton, Typography } from '@mui/material';

interface PostBoxProps {
  post: Post;
}
const PostBox: React.FC<PostBoxProps> = ({ post }) => {
  const { content, imageUrl, username, createdAt, numberOfLikes } = post;

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
              {`${numberOfLikes} ${numberOfLikes <= 1 ? 'Like' : 'Likes'}`}
            </Typography>
            <IconButton sx={{ width: 20, height: 20 }}>
              <ThumbUpIcon />
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

export default PostBox;
