import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';

import i18next from 'i18next';

import { store } from '@/src/store';

const AppProviders = ({ children }) => {
  return (
    <I18nextProvider i18n={i18next}>
      <Provider store={store}>{children}</Provider>
    </I18nextProvider>
  );
};

export default AppProviders;
