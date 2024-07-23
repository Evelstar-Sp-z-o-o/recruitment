import { Button, Dialog, DialogContent, DialogContentText, DialogActions } from '@mui/material';

interface PostResponseModalProps {
  open: boolean;
  onClose: () => void;
  content: string;
  deleteAction?: boolean;
  onDelete?: () => void;
}

const PostResponseModal: React.FC<PostResponseModalProps> = ({ open, onClose, content, deleteAction, onDelete }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <DialogContentText id="alert-dialog-description">{content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        {deleteAction && (
          <Button onClick={onDelete} color="primary" autoFocus>
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
