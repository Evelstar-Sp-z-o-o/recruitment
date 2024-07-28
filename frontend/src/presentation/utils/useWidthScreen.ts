import { useMediaQuery, useTheme } from '@mui/material';

const useWidthScreen = () => {
  const theme = useTheme();

  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return { isSmallScreen };
};

export default useWidthScreen;
