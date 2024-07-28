import { Avatar, Box, Button, Dialog, styled, Typography } from '@mui/material';

export const StyledDialogContent = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  padding: '16px',
  position: 'relative',
  overflow: 'hidden',
}));

export const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiPaper-root': {
    backgroundColor: theme.palette.background.default,
    borderRadius: '19px',
  },
}));

export const DialogHeader = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  letterSpacing: '-0.03em',
  fontSize: 24,
  marginBottom: '20px',
  fontWeight: '700',
}));

export const StyledButton = styled(Button)(({ theme }) => ({
  letterSpacing: '-0.02em',
  textTransform: 'none',
  padding: '4px 16px',
  borderRadius: '19px',
  fontWeight: '600',
  fontSize: 16,
  '&.cancel': {
    fontWeight: '300',
    color: theme.palette.grey[400],
  },
  '&.MuiButtonBase-root:disabled': {
    cursor: 'not-allowed',
    pointerEvents: 'auto',
    color: theme.palette.grey[700],
  },
}));

export const StyledAvatar = styled(Avatar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  width: '30px',
  height: '30px',
  fontSize: 16,
}));
