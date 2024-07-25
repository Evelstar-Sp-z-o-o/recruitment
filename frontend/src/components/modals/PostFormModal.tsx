import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';

import { Post } from '@/src/types';
import { currentUser } from '@/src/utils';
import { CancelPresentation, PhotoSizeSelectActual } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import { Alert, Box, Button, IconButton, Input, Modal, TextField, Typography } from '@mui/material';

import Loader from '../Loader';

const styles = {
  formContainer: {
    position: 'relative',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    maxWidth: 500,
  },
  closeButton: { position: 'absolute', top: 2, right: 4 },
  title: { flex: '1', mb: 1 },
  imageContainer: { position: 'relative', width: 100, height: 100 },
  imageCancelButton: { position: 'absolute', top: -5, right: -5, color: 'gray' },
};

interface PostFormModalProps {
  isOpen: boolean;
  initialData?: Post;
  onClose: () => void;
  onSubmit: (post) => void;
  type: string;
  isLoading?: boolean;
}

const PostFormModal: React.FC<PostFormModalProps> = ({ initialData, onClose, onSubmit, type, isOpen, isLoading }) => {
  const [text, setText] = useState<string>('');
  const [tempImage, setTempImage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (initialData) {
      setText(initialData.content);
      setTempImage(initialData.imageUrl);
    }
  }, [initialData]);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!text.trim()) {
      setErrorMessage('Text must be input!');
      return;
    }

    const post = {
      content: text.trim(),
      imageUrl: tempImage || null,
      createdAt: type === 'edit' ? initialData.createdAt : new Date().getTime(),
      updatedAt: new Date().getTime(),
      username: currentUser,
      numberOfLikes: type === 'edit' ? initialData.numberOfLikes : 0,
      likes: type === 'edit' ? initialData.likes : [],
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
      {isLoading ? (
        <Loader />
      ) : (
        <Box component="form" onSubmit={handleSubmit} sx={styles.formContainer}>
          <IconButton onClick={onClose} sx={styles.closeButton} aria-label="close">
            <CloseIcon sx={{ color: 'black', fontSize: 18 }} />
          </IconButton>
          <Typography variant="h6" component="h2" sx={styles.title}>
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
              aria-label="image upload"
              onClick={() => {
                fileInputRef.current?.click();
              }}
            >
              <PhotoSizeSelectActual sx={{ fontSize: 26 }} />
            </IconButton>
          </Box>
          {tempImage && (
            <Box sx={styles.imageContainer}>
              <img src={tempImage} alt="post image" className="post-form-image" />
              <IconButton sx={styles.imageCancelButton} onClick={() => setTempImage(null)} aria-label="image-cancel">
                <CancelPresentation />
              </IconButton>
            </Box>
          )}
          <Button type="submit" variant="contained" sx={{ mt: 2 }}>
            Submit
          </Button>
          {errorMessage && (
            <Alert color="error" sx={{ mt: 2 }}>
              {errorMessage}
            </Alert>
          )}
        </Box>
      )}
    </Modal>
  );
};

export default PostFormModal;
