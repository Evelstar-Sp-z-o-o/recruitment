import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import App from './App';
import store from './redux';

const container = document.getElementById('root')!;
const root = createRoot(container);
const theme = createTheme({
  palette: {
    primary: {
      main: '#256d64',
    },
    secondary: {
      main: '#e6edf3',
      contrastText: '#256d64',
    },
    background: {
      default: '#0d1117',
      paper: '#1c1c1c',
    },
    text: {
      primary: '#e6edf3',
      secondary: '#707070',
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  typography: {
    fontFamily: 'Noto Sans, sans-serif',
    h1: { fontSize: '2rem' },
    h2: { fontSize: '1.5rem' },
    body1: { fontSize: '1rem' },
  },
});

root.render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </Provider>
  </StrictMode>,
);
