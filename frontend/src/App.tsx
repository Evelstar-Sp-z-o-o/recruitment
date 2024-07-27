import { FC } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { Box, ThemeProvider, CssBaseline } from '@mui/material';

import HomePage from './pages/HomePage';
import PostPage from './pages/PostPage';
import LoadingScreen from './shared/components/LoadingScreen';
import Navbar from './shared/components/Navbar';
import './styles/main.scss';
import darkTheme from './theme';

const App: FC = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Router>
        <LoadingScreen />
        <Navbar />
        <Box className="main">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/post/:id" element={<PostPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Box>
      </Router>
    </ThemeProvider>
  );
};

export default App;
