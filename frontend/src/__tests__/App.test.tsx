import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';

import configureMockStore from 'redux-mock-store';

import App from '@/src/App';
import '@testing-library/jest-dom';

// Initialize redux-mock-store
const mockStore = configureMockStore();

const initialState = {
  responseModal: {
    isOpen: false,
    content: '',
    deletionAction: false,
  },
};

export const store = mockStore(initialState);

describe('App', () => {
  it.skip('should match snapshot', () => {
    const snapshot = renderer
      .create(
        <Provider store={store}>
          <App />
        </Provider>,
      )
      .toJSON();
    expect(snapshot).toMatchSnapshot();
  });
});
