import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';

import { AppDispatch } from '@/src/store/postStore';
import { setNickname } from '@/src/store/slices/userSlice';
import { Box, Button, Modal, TextField, Typography } from '@mui/material';

const MIN_LENGTH = 1;
const MAX_LENGTH = 40;

interface NicknameModalProps {
  nickname: string;
  isOpen: boolean;
  closeModal: () => void;
}

const NicknameModal: FC<NicknameModalProps> = ({ nickname, isOpen, closeModal }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [newNickname, setNewNickname] = useState<string>(nickname);
  const [error, setError] = useState<string | null>(null);

  const handleSave = () => {
    if (newNickname.length >= MIN_LENGTH && newNickname.length <= MAX_LENGTH) {
      dispatch(setNickname(newNickname));
      closeModal();
    } else {
      setError(`Nickname must be between ${MIN_LENGTH} and ${MAX_LENGTH} characters.`);
    }
  };

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewNickname(value);
    if (value.length < MIN_LENGTH || value.length > MAX_LENGTH) {
      setError(`Nickname must be between ${MIN_LENGTH} and ${MAX_LENGTH} characters.`);
    } else {
      setError(null);
    }
  };
  return (
    <Modal open={isOpen} onClose={closeModal}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <Typography variant="h6">{nickname ? 'Change Nickname' : 'Set your eveltter nickname!'}</Typography>
        <TextField
          label="Set your nickname"
          variant="outlined"
          value={newNickname}
          onChange={handleNicknameChange}
          fullWidth
          error={!!error}
          helperText={error}
        />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
          <Button variant="contained" color="primary" onClick={handleSave} disabled={!!error || !newNickname}>
            Save
          </Button>
          <Button variant="outlined" onClick={closeModal} disabled={!nickname}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default NicknameModal;
