import { Provider } from 'react-redux';

import { describe, it, expect, vi, beforeEach } from 'vitest';

import EditPost from '@/src/components/EditPost';
import { fetchPost, updatePost } from '@/src/redux/actions/posts';
import { RootState } from '@/src/redux/reducers';
import { configureStore } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';

// Mockowanie useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
  useParams: () => ({ id: '1' }), // Zakładamy, że id posta to 1
}));

// Mockowanie akcji fetchPost i updatePost
vi.mock('@/src/redux/actions/posts', () => ({
  fetchPost: vi.fn(),
  updatePost: vi.fn(),
}));

// Mockowanie komponentu Notification
vi.mock('@/src/components/common/Notification', () => ({
  __esModule: true,
  Notification: ({ open, handleClose, message }: { open: boolean; handleClose: () => void; message: string }) =>
    open ? <div>{message}</div> : null,
}));

// Przykładowy slice
const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    editingPost: {
      id: 1,
      data: {
        body: 'Original body',
        author: 'Original author',
        created: 1234567890,
        edited: 1234567890,
      },
    },
  },
  reducers: {
    updatePost: () => {},
  },
});

// Ustawienie testowego store z początkowym stanem
export function createTestStore(initialState: Partial<RootState> = {}) {
  return configureStore({
    reducer: {
      posts: postsSlice.reducer,
    },
    preloadedState: {
      posts: {
        editingPost: initialState.editingPost || {
          id: 1,
          data: {
            body: 'Original body',
            author: 'Original author',
            created: 1234567890,
            edited: 1234567890,
          },
        },
      },
    },
  });
}

describe('EditPost component', () => {
  let store: ReturnType<typeof createTestStore>;

  beforeEach(() => {
    store = createTestStore();
  });

  it('renders the form with pre-filled data and handles errors', async () => {
    // Ustawienie stanu testowego
    store = createTestStore({
      editingPost: {
        id: 1,
        data: {
          body: 'Original body',
          author: 'Original author',
          created: 1234567890,
          edited: 1234567890,
          postId: 'dfg456',
        },
      },
    });

    render(
      <Provider store={store}>
        <EditPost />
      </Provider>,
    );

    // Sprawdzenie, czy formularz jest renderowany z początkowymi danymi
    expect(screen.getByLabelText('Author')).toHaveValue('Original author');
    expect(screen.getByLabelText('Post text')).toHaveValue('Original body');

    // Wyczyszczenie pól
    fireEvent.change(screen.getByLabelText('Author'), { target: { value: '' } });
    fireEvent.change(screen.getByLabelText('Post text'), { target: { value: '' } });

    // Wywołanie błędu walidacji
    fireEvent.click(screen.getByText('Update Post'));
    expect(await screen.findByText('All fields are required')).toBeInTheDocument();

    // Wypełnianie formularza i aktualizacja
    fireEvent.change(screen.getByLabelText('Author'), { target: { value: 'Updated author' } });
    fireEvent.change(screen.getByLabelText('Post text'), { target: { value: 'Updated body' } });

    // Kliknięcie przycisku aktualizacji
    fireEvent.click(screen.getByText('Update Post'));

    // Sprawdzenie, czy updatePost został wywołany
    expect(updatePost).toHaveBeenCalled();
  });

  it('handles API errors and shows error messages', async () => {
    // Mockowanie błędu fetchPost
    (fetchPost as vi.Mock).mockImplementation(() => {
      throw new Error('Failed to fetch post');
    });

    render(
      <Provider store={store}>
        <EditPost />
      </Provider>,
    );

    // Sprawdzenie, czy komunikat o błędzie jest wyświetlany
    expect(await screen.findByText('Failed to fetch post')).toBeInTheDocument();
  });
});
