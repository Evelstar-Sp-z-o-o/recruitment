import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { CancelPresentation, PhotoSizeSelectActual } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, IconButton, Input, Modal, TextField, Typography } from '@mui/material';

import { closeModal } from '../redux/modalSlice';
import { RootState } from '../redux/store';

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

const CreatePost = () => {
  const [text, setText] = useState<string>();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [tempImage, setTempImage] = useState<string | null>(null);

  const openModal = useSelector((state: RootState) => state.modal.isOpen);
  const dispatch = useDispatch();

  const fileInputRef = useRef(null);

  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const post = tempImage ? { content: text, imageUrl: tempImage } : { content: text };
    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: post }),
      });

      if (!response.ok) {
        console.log('Failed to create a post');
        return;
      }
      const data = await response.json();
      console.log('Successfully created a post', data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImageFile(e.target.files[0]);
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      if (typeof fileReader.result === 'string') {
        setTempImage(fileReader.result);
      }
    };
    fileReader.readAsDataURL(e.target.files[0]);
  };

  const handleClose = () => {
    setTempImage(null);
    setImageFile(null);
    dispatch(closeModal());
    navigate(-1);
  };

  return (
    <Modal open={openModal} onClose={handleClose}>
      <Box component="form" onSubmit={handleSubmit} sx={formStyle}>
        <IconButton onClick={handleClose} sx={{ position: 'absolute', top: 2, right: 4 }}>
          <CloseIcon sx={{ color: 'black', fontSize: 18 }} />
        </IconButton>
        <Typography variant="h6" component="h2" sx={{ flex: '1', mb: 1 }}>
          Create Your Post
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
          Post
        </Button>
      </Box>
    </Modal>
  );
};

export default CreatePost;
