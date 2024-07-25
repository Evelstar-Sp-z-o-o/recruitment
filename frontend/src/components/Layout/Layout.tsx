import { ReactNode } from 'react';

import { Box, createTheme, ThemeProvider } from '@mui/material';

interface LayoutProps {
  children: ReactNode;
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#2B7AD4',
    },
    secondary: {
      main: '#302BD4',
    },
    info: {
      main: '#2BCFD4',
    },
  },
});

const Layout = ({ children }: LayoutProps) => {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          height: 'auto',
          justifyContent: 'flex-start',
          alignItems: 'center',
          flexDirection: 'column',
          backgroundColor: 'lightblue',
        }}
      >
        <Box sx={{ maxWidth: '900px', height: '100%', padding: '10px' }}>{children}</Box>
      </Box>
    </ThemeProvider>
  );
};

export default Layout;
