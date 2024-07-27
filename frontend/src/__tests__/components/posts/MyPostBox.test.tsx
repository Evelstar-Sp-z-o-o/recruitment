import { Provider } from 'react-redux';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import type * as ReactRouterDom from 'react-router-dom';

import { vi } from 'vitest';

import MyPostBox from '@/src/components/posts/MyPostBox';
import { openModal } from '@/src/redux/responseModalSlice';
import { fireEvent, logRoles, render, screen, waitFor } from '@testing-library/react';

import { store } from '../../App.test';
import { mockPost } from '../../mocks/mockData';

// Mocking useNavigate
const mockedUserNavigate = vi.fn();
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal<typeof ReactRouterDom>();
  return { ...actual, ...vi.importActual('react-router-dom'), useNavigate: () => mockedUserNavigate };
});

describe('My post box flow', () => {
  let navigate;
  beforeEach(() => {
    navigate = useNavigate();
    navigate.mockImplementation();
    vi.spyOn(store, 'dispatch');
  });

  test('renders initial elements', async () => {
    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <MyPostBox post={mockPost} onDelete={vi.fn()} />
        </MemoryRouter>
      </Provider>,
    );
    logRoles(container);

    const image = await screen.queryByRole('img');
    const content = screen.queryByText(/post/i);
    const buttons = screen.queryAllByRole('button');

    // Check if all elements are rendered
    expect(image).toBeInTheDocument();
    expect(content).toBeInTheDocument();
    expect(buttons).toHaveLength(2);
  });

  test('navigates to the correct path when edit button is clicked', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <MyPostBox post={mockPost} onDelete={vi.fn()} />
        </MemoryRouter>
      </Provider>,
    );

    const editButton = screen.getByRole('button', { name: /edit/i });
    // Click edit button
    fireEvent.click(editButton);

    // Check if update page is opened
    await waitFor(() => expect(mockedUserNavigate).toHaveBeenCalledWith(expect.stringMatching('/posts/update/1')));
  });

  test('dispatches openModal action with success message when delete is successful', async () => {
    // Mocking fetch
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
    });

    const mockOnDelete = vi.fn();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <MyPostBox post={mockPost} onDelete={mockOnDelete} />
        </MemoryRouter>
      </Provider>,
    );

    const deleteButton = screen.getByRole('button', { name: /delete/i });
    // Click delete button
    fireEvent.click(deleteButton);

    // Check if success message is opened
    await waitFor(() => {
      expect(store.dispatch).toHaveBeenCalledWith(openModal('Successfully deleted a post!'));
    });
  });

  test('dispatches openModal action with failure message when delete fails', async () => {
    // Mocking fetch
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
    });

    const mockOnDelete = vi.fn();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <MyPostBox post={mockPost} onDelete={mockOnDelete} />
        </MemoryRouter>
      </Provider>,
    );

    const deleteButton = screen.getByRole('button', { name: /delete/i });
    // Click delete button
    fireEvent.click(deleteButton);

    // Check if failure message is opened
    await waitFor(() => {
      expect(store.dispatch).toHaveBeenCalledWith(openModal('Failed to delete the post'));
    });
  });
});
