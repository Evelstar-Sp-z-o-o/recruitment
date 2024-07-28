import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';

import { AppDispatch } from '@/src/store/postStore';
import { setNickname } from '@/src/store/slices/userSlice';
import { DialogHeader, StyledButton, StyledDialog, StyledDialogContent } from '@/src/styles/styledComponents';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, Dialog, IconButton, TextField, Typography } from '@mui/material';

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
    <StyledDialog open={isOpen} onClose={closeModal} maxWidth="md" fullWidth>
      <StyledDialogContent>
        {nickname ? (
          <IconButton onClick={closeModal} sx={{ position: 'absolute', top: 8, right: 8 }}>
            <CloseIcon />
          </IconButton>
        ) : null}
        <DialogHeader>{nickname ? 'Change Nickname' : 'Set your eveltter nickname!'}</DialogHeader>
        <TextField
          label="Set your nickname"
          variant="outlined"
          value={newNickname}
          onChange={handleNicknameChange}
          fullWidth
          error={!!error}
          helperText={error}
        />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, marginTop: '10px' }}>
          <StyledButton onClick={closeModal} disabled={!nickname} className="cancel">
            Cancel
          </StyledButton>
          <StyledButton variant="contained" color="primary" onClick={handleSave} disabled={!!error || !newNickname}>
            Save
          </StyledButton>
        </Box>
      </StyledDialogContent>
    </StyledDialog>
  );
};

export default NicknameModal;
