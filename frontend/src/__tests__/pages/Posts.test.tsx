import { Provider } from 'react-redux';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import type * as ReactRouterDom from 'react-router-dom';

import { vi } from 'vitest';

import Posts from '@/src/pages/Posts';
import { openModal } from '@/src/redux/responseModalSlice';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { store } from '../App.test';
import { mockPosts } from '../mocks/mockData';

// Mocking useNavigate
const mockedUserNavigate = vi.fn();
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal<typeof ReactRouterDom>();
  return { ...actual, ...vi.importActual('react-router-dom'), useNavigate: () => mockedUserNavigate };
});

describe('Posts page functionality', () => {
  let navigate;
  beforeEach(() => {
    navigate = useNavigate();
    navigate.mockImplementation();
    vi.spyOn(store, 'dispatch');
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
          <Posts currentUserPosts={mockPosts} onDelete={mockOnDelete} />
        </MemoryRouter>
      </Provider>,
    );

    // Delete button of the first post
    const deleteButton = screen.getAllByRole('button', { name: /delete/i })[0];
    // Click delete button
    fireEvent.click(deleteButton);

    // Check if the confirmation modal is opened
    await waitFor(() => {
      expect(store.dispatch).toHaveBeenCalledWith(openModal('Are you sure to delete?'));
    });

    const modalDeleteButton = await screen.findByTestId('modal-delete');
    // Click delete button in modal
    fireEvent.click(modalDeleteButton);

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
          <Posts currentUserPosts={mockPosts} onDelete={mockOnDelete} />
        </MemoryRouter>
      </Provider>,
    );

    // Delete button of the first post
    const deleteButton = screen.getAllByRole('button', { name: /delete/i })[0];
    // Click delete button
    fireEvent.click(deleteButton);

    // Check if the confirmation modal is opened
    await waitFor(() => {
      expect(store.dispatch).toHaveBeenCalledWith(openModal('Are you sure to delete?'));
    });

    const modalDeleteButton = screen.getByTestId('modal-delete');
    // Click delete button in modal
    fireEvent.click(modalDeleteButton);

    // Check if failure  message is opened
    await waitFor(() => {
      expect(store.dispatch).toHaveBeenCalledWith(openModal('Failed to delete the post'));
    });
  });
});
