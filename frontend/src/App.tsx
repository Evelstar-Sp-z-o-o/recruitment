import { FC } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { Box } from '@mui/material';

import HomePage from './pages/homePage';
import './styles/main.scss';

const App: FC = () => {
  return (
    <Router>
      <Box className="main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Box>
    </Router>
  );
};

export default App;
