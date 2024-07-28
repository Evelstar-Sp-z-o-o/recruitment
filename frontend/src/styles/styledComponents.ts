import { Box, Dialog, styled, Typography } from '@mui/material';

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
