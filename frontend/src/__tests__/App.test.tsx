import { Provider } from 'react-redux';

import App from '@/src/App';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

import { createTestStore } from './utils';

describe('App Component', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(
      <Provider store={createTestStore()}>
        <App />
      </Provider>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  // Testowanie renderowania linków
  it('should render navigation links correctly', () => {
    const { getByText } = render(
      <Provider store={createTestStore()}>
        <App />
      </Provider>,
    );

    // Sprawdzenie, czy linki są obecne
    expect(getByText('Home')).toBeInTheDocument();
    expect(getByText('Create Post')).toBeInTheDocument();
  });
});
