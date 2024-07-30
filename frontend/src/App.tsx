import { saveUserToLocalStorage } from './utils/localStorage';

import QueryProvider from './components/providers/query-provider';
import ReduxProvider from './components/providers/redux-provider';
import RouterProvider from './components/providers/router-provider';
import './styles/main.scss';

// init with mocked user
saveUserToLocalStorage({ email: 'test_user@gmail.com' });

const App = () => {
  return (
    <ReduxProvider>
      <QueryProvider>
        <RouterProvider />
      </QueryProvider>
    </ReduxProvider>
  );
};

export default App;
