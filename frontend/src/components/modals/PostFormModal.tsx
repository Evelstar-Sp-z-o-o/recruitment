import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';

import { Post } from '@/src/types';
import { CancelPresentation, PhotoSizeSelectActual } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, IconButton, Input, Modal, TextField, Typography } from '@mui/material';

const formStyle = {
  position: 'relative',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  maxWidth: 500,
};

interface PostFormModalProps {
  isOpen: boolean;
  initialData?: Post;
  onClose: () => void;
  onSubmit: (post) => void;
  type: string;
}

const PostFormModal: React.FC<PostFormModalProps> = ({ initialData, onClose, onSubmit, type, isOpen }) => {
  const [text, setText] = useState<string>();
  const [tempImage, setTempImage] = useState<string | null>(null);

  useEffect(() => {
    if (initialData) {
      setText(initialData.content);
      setTempImage(initialData.imageUrl);
    }
  }, [initialData]);

  const fileInputRef = useRef(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const post = {
      content: text,
      imageUrl: tempImage || null,
      createdAt: type === 'edit' ? initialData.createdAt : new Date().getDate(),
      updatedAt: new Date().getTime(),
      username: 'haniakim',
      numberOfLikes: type === 'edit' ? initialData.numberOfLikes : 0,
    };
    onSubmit(post);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        if (typeof fileReader.result === 'string') {
          setTempImage(fileReader.result);
        }
      };
      fileReader.readAsDataURL(e.target.files[0]);
    } else {
      setTempImage(null);
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box component="form" onSubmit={handleSubmit} sx={formStyle}>
        <IconButton onClick={onClose} sx={{ position: 'absolute', top: 2, right: 4 }}>
          <CloseIcon sx={{ color: 'black', fontSize: 18 }} />
        </IconButton>
        <Typography variant="h6" component="h2" sx={{ flex: '1', mb: 1 }}>
          {type === 'create' ? 'Create Your Post' : 'Edit Your Post'}
        </Typography>
        <TextField
          label="Text"
          variant="outlined"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
          multiline
          rows={3}
          sx={{ width: '100%' }}
        />
        <Box>
          <Input type="file" onChange={handleFileChange} inputRef={fileInputRef} sx={{ display: 'none' }} />
          <IconButton
            onClick={() => {
              fileInputRef.current.click();
            }}
          >
            <PhotoSizeSelectActual sx={{ fontSize: 26 }} />
          </IconButton>
        </Box>
        {tempImage && (
          <Box sx={{ position: 'relative', width: 100, height: 100 }}>
            <img src={tempImage} alt="post image" className="post-form-image" />
            <IconButton
              sx={{ position: 'absolute', top: -5, right: -5, color: 'gray' }}
              onClick={() => setTempImage(null)}
            >
              <CancelPresentation />
            </IconButton>
          </Box>
        )}
        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
          Submit
        </Button>
      </Box>
    </Modal>
  );
};

export default PostFormModal;
