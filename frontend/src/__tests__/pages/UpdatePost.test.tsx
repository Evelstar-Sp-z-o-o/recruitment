import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { vi } from 'vitest';

import UpdatePost from '@/src/pages/UpdatePost';
import { openModal } from '@/src/redux/responseModalSlice';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { store } from '../App.test';
import { mockPost } from '../mocks/mockData';

// Mocking useLocation
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useParams: () => ({ postId: '1' }),
    useLocation: () => ({ pathname: '/posts/update/1' }),
    useNavigate: () => vi.fn(),
  };
});

describe('Post update flow', () => {
  beforeEach(() => {
    vi.spyOn(store, 'dispatch');
  });
  test('renders post elements with correct data', async () => {
    // Mocking fetchPostById with mock post
    const mockFetchPostById = vi.fn().mockReturnValue(mockPost);

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/posts/update/1']}>
          <Routes>
            <Route
              path="/posts/update/:postId"
              element={<UpdatePost editPost={vi.fn()} fetchPostById={mockFetchPostById} />}
            />
          </Routes>
        </MemoryRouter>
      </Provider>,
    );

    await waitFor(() => {
      const textInput = screen.getByRole('textbox');
      //Check if textarea appears with correct data
      expect(textInput).toBeInTheDocument();
      expect(textInput).toHaveValue('Post 1');

      const image = screen.getByRole('img');
      //Check if image appears
      expect(image).toBeInTheDocument();
    });
  });

  test('opens modal when invalid postId is provided', async () => {
    // Mocking fetchPostById with null
    const mockFetchPostById = vi.fn().mockReturnValue(null);

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/posts/update/invalid']}>
          <Routes>
            <Route
              path="/posts/update/:postId"
              element={<UpdatePost editPost={vi.fn()} fetchPostById={mockFetchPostById} />}
            />
          </Routes>
        </MemoryRouter>
      </Provider>,
    );

    await waitFor(() => {
      expect(store.dispatch).toHaveBeenCalledWith(openModal("Requested post doesn't exist"));
    });
  });

  test('dispatches openModal action with failure message when update fails', async () => {
    // Mocking fetch
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
    });

    const mockOnUpdate = vi.fn();

    // Mocking fetchPostById with mock post
    const mockFetchPostById = vi.fn().mockReturnValue(mockPost);

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/posts/update/1']}>
          <Routes>
            <Route
              path="/posts/update/:postId"
              element={<UpdatePost editPost={mockOnUpdate} fetchPostById={mockFetchPostById} />}
            />
          </Routes>
        </MemoryRouter>
      </Provider>,
    );

    const submitButton = screen.getByRole('button', { name: /submit/i });
    // Click submit button
    fireEvent.click(submitButton);

    //Check if failure message is opened
    await waitFor(() => {
      expect(store.dispatch).toHaveBeenCalledWith(openModal('Failed to update a post!'));
    });
  });

  test('dispatches openModal action with success message when update is successful', async () => {
    // Mocking fetch
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ data: { ...mockPost }, id: mockPost.id }),
    });

    const mockOnUpdate = vi.fn();

    // Mocking fetchPostById with mock post
    const mockFetchPostById = vi.fn().mockReturnValue(mockPost);

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/posts/update/1']}>
          <Routes>
            <Route
              path="/posts/update/:postId"
              element={<UpdatePost editPost={mockOnUpdate} fetchPostById={mockFetchPostById} />}
            />
          </Routes>
        </MemoryRouter>
      </Provider>,
    );

    const submitButton = screen.getByRole('button', { name: /submit/i });
    // Click submit button
    fireEvent.click(submitButton);

    //Check if success message is opened
    await waitFor(() => {
      expect(store.dispatch).toHaveBeenCalledWith(openModal('Successfully updated a post!'));
    });
  });
});
