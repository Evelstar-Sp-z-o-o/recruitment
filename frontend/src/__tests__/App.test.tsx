import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';

import configureMockStore from 'redux-mock-store';

import App from '@/src/App';
import '@testing-library/jest-dom';

// Initialize redux-mock-store
const mockStore = configureMockStore();

const initialState = {
  createModal: {
    isOpen: false,
  },
  editModal: {
    isOpen: false,
  },
};

export const store = mockStore(initialState);

describe('App', () => {
  it('should match snapshot', () => {
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
