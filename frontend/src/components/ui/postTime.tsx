import { secondsTimestampToTimeAgo } from '@/src/utils/secondsTimestampToTimeAgo';
import { Typography } from '@mui/material';

interface Props {
  created: number;
  edited: number;
}

const PostTime: React.FC<Props> = ({ created, edited }) => {
  const wasEdited = edited > created;

  return (
    <Typography pl={7} variant="body2">
      {wasEdited ? 'edited ' : 'created '}
      {secondsTimestampToTimeAgo(wasEdited ? edited : created)}
    </Typography>
  );
};

export default PostTime;
