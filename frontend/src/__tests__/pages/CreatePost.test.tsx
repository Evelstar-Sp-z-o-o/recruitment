import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { vi } from 'vitest';

import CreatePost from '@/src/pages/CreatePost';
import { openModal } from '@/src/redux/responseModalSlice';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { store } from '../App.test';

// Mocking useLocation
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useLocation: () => ({ pathname: '/create' }),
    useNavigate: () => vi.fn(),
  };
});

describe('Post creation flow', () => {
  beforeEach(() => {
    vi.spyOn(store, 'dispatch');
  });
  test('initializes elements when modal is opened', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/create']}>
          <Routes>
            <Route path="/create" element={<CreatePost refetchPosts={vi.fn()} />} />
          </Routes>
        </MemoryRouter>
      </Provider>,
    );

    await waitFor(() => {
      const textInput = screen.queryByRole('textbox');
      // Check if textarea exists with empty box
      expect(textInput).toBeInTheDocument();
      expect(textInput).toHaveTextContent('');
    });
  });

  test('alert appears when empty string is submitted', async () => {
    const user = userEvent.setup();
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/create']}>
          <Routes>
            <Route path="/create" element={<CreatePost refetchPosts={vi.fn()} />} />
          </Routes>
        </MemoryRouter>
      </Provider>,
    );

    const textInput = screen.getByRole('textbox');
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

  test('dispatches openModal action with failure message when creation fails', async () => {
    // Mocking fetch
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
    });

    const user = userEvent.setup();

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/create']}>
          <Routes>
            <Route path="/create" element={<CreatePost refetchPosts={vi.fn()} />} />
          </Routes>
        </MemoryRouter>
      </Provider>,
    );

    const textInput = screen.queryByRole('textbox');
    const submitButton = screen.getByRole('button', { name: /submit/i });

    // Input new post in textarea
    await user.clear(textInput);
    await user.type(textInput, 'new post');

    // Click submit button
    await user.click(submitButton);

    // Check if error message is opened when creation fails
    await waitFor(() => {
      expect(store.dispatch).toHaveBeenCalledWith(openModal('Failed to create a post!'));
    });
  });

  test('dispatches openModal action with success message when creation is successful', async () => {
    // Mocking fetch
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
    });

    const user = userEvent.setup();

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/create']}>
          <Routes>
            <Route path="/create" element={<CreatePost refetchPosts={vi.fn()} />} />
          </Routes>
        </MemoryRouter>
      </Provider>,
    );

    const textInput = screen.queryByRole('textbox');
    const submitButton = screen.getByRole('button', { name: /submit/i });

    // Input new post in textarea
    await user.clear(textInput);
    await user.type(textInput, 'new post');

    // Click submit button
    await user.click(submitButton);

    // Check if error message is opened when creation fails
    await waitFor(() => {
      expect(store.dispatch).toHaveBeenCalledWith(openModal('Successfully created a post!'));
    });
  });
});
