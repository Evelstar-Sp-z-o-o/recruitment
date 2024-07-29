import './styles/main.scss';
import QueryProvider from './components/providers/query-provider';
import RouterProvider from './components/providers/router-provider';
import ReduxProvider from './components/providers/redux-provider';
import { saveUserToLocalStorage } from './utils/localStorage';

// init with mocked user
saveUserToLocalStorage({ email: 'test_user@gmail.com' })

const App = () => {
  return (
    <ReduxProvider>
      <QueryProvider>
        <RouterProvider />
      </QueryProvider>
    </ReduxProvider>
  )
}

export default App;
