import { FC } from 'react';

import PostForm from '@/src/components/PostForm';
import { StyledDialog, StyledDialogContent, DialogHeader } from '@/src/styles/styledComponents';
import { Post } from '@/src/types/types';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';

interface EditDialogProps {
  open: boolean;
  onClose: () => void;
  post: Post;
}

const EditDialog: FC<EditDialogProps> = ({ open, onClose, post }) => (
  <StyledDialog open={open} onClose={onClose} maxWidth="md" fullWidth>
    <StyledDialogContent>
      <IconButton aria-label="close" onClick={onClose} sx={{ position: 'absolute', top: 8, right: 8 }}>
        <CloseIcon />
      </IconButton>
      <DialogHeader>Edit your post</DialogHeader>
      <PostForm selectedPost={post} onClose={onClose} />
    </StyledDialogContent>
  </StyledDialog>
);

export default EditDialog;
