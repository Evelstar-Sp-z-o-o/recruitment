import { Provider } from 'react-redux';

import { configureStore } from '@reduxjs/toolkit';
import { render } from '@testing-library/react';

import store from '../redux';
import rootReducer from '../redux/reducers';

export const createTestStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export const renderWithStore = (component: React.ReactElement) => {
  return render(<Provider store={store}>{component}</Provider>);
};
