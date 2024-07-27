import { useSelector } from 'react-redux';

import { RootState } from '@/src/redux/store';
import { Button, Dialog, DialogContent, DialogContentText, DialogActions } from '@mui/material';

interface PostResponseModalProps {
  onClose: () => void;
  onDelete?: () => void;
}

const PostResponseModal: React.FC<PostResponseModalProps> = ({ onClose, onDelete }) => {
  const { isOpen, content, deleteAction } = useSelector((state: RootState) => state.responseModal);

  if (!isOpen) return null;

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <DialogContentText id="alert-dialog-description">{content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        {deleteAction && (
          <Button onClick={onDelete} color="primary">
            Delete
          </Button>
        )}
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PostResponseModal;
