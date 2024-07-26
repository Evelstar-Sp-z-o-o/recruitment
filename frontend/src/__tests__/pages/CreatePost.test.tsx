import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import { vi } from 'vitest';

import CreatePost from '@/src/pages/CreatePost';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { store } from '../App.test';

describe('Post creation flow', () => {
  test('initializes elements when modal is opened', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CreatePost refetchPosts={vi.fn()} />
        </MemoryRouter>
      </Provider>,
    );
    const textInput = screen.getByLabelText('Text');
    // Check if textarea exists
    expect(textInput).toBeInTheDocument();
  });
  test('alert appears when empty string is submitted', async () => {
    const user = userEvent.setup();
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CreatePost refetchPosts={vi.fn()} />
        </MemoryRouter>
      </Provider>,
    );

    const textInput = screen.getByLabelText('Text');
    const submitButton = screen.getByRole('button', { name: /submit/i });

    // Input empty string
    await user.clear(textInput);
    await user.type(textInput, ' ');

    // Click submit button
    await user.click(submitButton);

    //Check if alert appears
    await waitFor(() => {
      const alert = screen.getByTestId('SuccessOutlinedIcon');
      expect(alert).toBeInTheDocument();
    });

    // Input strings in textarea
    await user.clear(textInput);
    await user.type(textInput, 'post');

    // Click submit button
    await user.click(submitButton);

    // Check if alert disappears
    await waitFor(() => {
      const alert = screen.queryByTestId('SuccessOutlinedIcon');
      expect(alert).not.toBeInTheDocument();
    });
  });
});
