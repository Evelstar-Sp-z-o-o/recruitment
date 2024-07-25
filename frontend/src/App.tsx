import { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';

import AppRoutes from './AppRoutes';
import './styles/main.scss';

const App: FC = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;
