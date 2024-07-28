import { ReactElement, StrictMode } from 'react';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import { render, RenderOptions } from '@testing-library/react';

import store from '../store';

const renderWithAppProviders = (ui: ReactElement, options?: Omit<RenderOptions, 'queries'>) =>
  render(ui, {
    ...options,
    wrapper: ({ children }) => (
      <StrictMode>
        <Provider store={store}>
          <ToastContainer />
          {options?.wrapper ? <options.wrapper>{children}</options.wrapper> : <>{children}</>}
        </Provider>
      </StrictMode>
    ),
  });

export default renderWithAppProviders;
