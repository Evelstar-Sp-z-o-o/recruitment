import { Provider } from 'react-redux';

import CreatePost from '@/src/pages/CreatePost';
import { render, screen } from '@testing-library/react';

import { store } from '../App.test';

describe('Post creation flow', () => {
  test('initializes elements when modal is opened', () => {
    render(
      <Provider store={store}>
        <CreatePost />
      </Provider>,
    );
    const textInput = screen.getByRole('textbox', { name: 'Text' });
    expect(textInput).toBeInTheDocument();
  });
});
