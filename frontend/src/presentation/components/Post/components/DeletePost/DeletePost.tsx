import { FunctionComponent } from 'react';
import { toast } from 'react-toastify';

import { useDeletePostMutation } from '@/src/presentation/store/postsApi';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';

type Props = {
  id: number;
};

const DeletePost: FunctionComponent<Props> = ({ id }) => {
  const [triggerDeletePost] = useDeletePostMutation();

  const handleClick = async () => {
    try {
      await triggerDeletePost({ id }).unwrap();

      toast.success('Post deleted successfully!', {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    } catch (error) {
      toast.error(error.message ?? 'Failed to delete post!', {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
  };

  return (
    <IconButton aria-label="delete" size="small" onClick={handleClick} data-testid="deleteButton">
      <DeleteIcon fontSize="small" />
    </IconButton>
  );
};

export default DeletePost;
