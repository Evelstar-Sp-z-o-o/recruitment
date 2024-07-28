import { FC } from 'react';

import { StyledDialog, StyledDialogContent, DialogHeader, StyledButton } from '@/src/styles/styledComponents';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton, Typography, DialogActions } from '@mui/material';

interface DeleteDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteDialog: FC<DeleteDialogProps> = ({ open, onClose, onConfirm }) => (
  <StyledDialog open={open} onClose={onClose}>
    <StyledDialogContent>
      <IconButton aria-label="close" onClick={onClose} sx={{ position: 'absolute', top: 8, right: 8 }}>
        <CloseIcon />
      </IconButton>
      <DialogHeader>Confirm deletion</DialogHeader>
      <Typography variant="body1" sx={{ margin: '10px 0 8px 0' }}>
        Are you sure you want to delete this post? This action cannot be undone.
      </Typography>
      <DialogActions>
        <StyledButton onClick={onClose} className="cancel">
          Cancel
        </StyledButton>
        <StyledButton onClick={onConfirm} color="primary" variant="contained" autoFocus>
          Delete
        </StyledButton>
      </DialogActions>
    </StyledDialogContent>
  </StyledDialog>
);

export default DeleteDialog;
