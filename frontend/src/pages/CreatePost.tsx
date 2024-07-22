import { useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { PhotoSizeSelectActual } from '@mui/icons-material';
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

const CreatePost = () => {
  const [text, setText] = useState<string>();

  const { pathname } = useLocation();
  const openModal = pathname === '/create-post';

  const fileInputRef = useRef(null);

  const navigate = useNavigate();

  const handleSubmit = () => {};

  const handleFileChange = () => {};

  const handleClose = () => {
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
          <Input type="file" onChange={handleFileChange} required inputRef={fileInputRef} sx={{ display: 'none' }} />
          <IconButton
            onClick={() => {
              fileInputRef.current.click();
            }}
          >
            <PhotoSizeSelectActual sx={{ fontSize: 26 }} />
          </IconButton>
        </Box>
        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
          Post
        </Button>
      </Box>
    </Modal>
  );
};

export default CreatePost;
