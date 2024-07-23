import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router';

import router from './infrastructure/routing/router';
import store from './infrastructure/store';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
);
