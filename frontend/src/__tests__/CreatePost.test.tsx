import { Provider } from 'react-redux';

import { describe, it, expect, vi, beforeEach } from 'vitest';

import CreatePost from '@/src/components/CreatePost';
import { createPost } from '@/src/redux/actions/posts';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import { createTestStore } from './utils';

// Mockowanie akcji createPost
vi.mock('@/src/redux/actions/posts', () => ({
  createPost: vi.fn(),
}));

// Mockowanie komponentu Notification
vi.mock('@/src/components/common/Notification', () => ({
  __esModule: true,
  Notification: ({ open, handleClose, message }: { open: boolean; handleClose: () => void; message: string }) =>
    open ? <div>{message}</div> : null,
}));

describe('CreatePost component', () => {
  let store: ReturnType<typeof createTestStore>;

  beforeEach(() => {
    store = createTestStore();

    // Ustawienie wstępnego stanu Redux
    store.dispatch = vi.fn();
  });

  it('renders the form with fields and buttons', () => {
    render(
      <Provider store={store}>
        <CreatePost />
      </Provider>,
    );

    // Sprawdzenie, czy wszystkie elementy formularza są renderowane
    expect(screen.getByLabelText('Your name')).toBeInTheDocument();
    expect(screen.getByLabelText("What's on your mind?")).toBeInTheDocument();
    expect(screen.getByText('Create Post')).toBeInTheDocument();
  });

  it('shows validation errors when fields are empty', async () => {
    render(
      <Provider store={store}>
        <CreatePost />
      </Provider>,
    );

    // Kliknięcie przycisku "Create Post" bez wypełnienia formularza
    fireEvent.click(screen.getByText('Create Post'));

    // Sprawdzenie komunikatów o błędach
    expect(await screen.findByText('Author name is required')).toBeInTheDocument();
    expect(await screen.findByText('Message is required')).toBeInTheDocument();
  });

  it('dispatches createPost action and shows notification on valid form submission', async () => {
    render(
      <Provider store={store}>
        <CreatePost />
      </Provider>,
    );

    // Wypełnienie formularza
    fireEvent.change(screen.getByLabelText('Your name'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText("What's on your mind?"), { target: { value: 'This is a new post' } });

    // Kliknięcie przycisku "Create Post"
    fireEvent.click(screen.getByText('Create Post'));

    // Sprawdzenie, czy createPost został wywołany
    expect(createPost).toHaveBeenCalled();

    // Sprawdzenie powiadomienia
    expect(await screen.findByText('Successfully created post!')).toBeInTheDocument();
  });

  it('clears form and errors after successful submission', async () => {
    render(
      <Provider store={store}>
        <CreatePost />
      </Provider>,
    );

    // Wypełnienie formularza
    fireEvent.change(screen.getByLabelText('Your name'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText("What's on your mind?"), { target: { value: 'This is a new post' } });

    // Kliknięcie przycisku "Create Post"
    fireEvent.click(screen.getByText('Create Post'));

    // Sprawdzenie, czy formularz został wyczyszczony
    await waitFor(() => {
      expect(screen.getByLabelText('Your name')).toHaveValue('');
      expect(screen.getByLabelText("What's on your mind?")).toHaveValue('');
    });

    // Sprawdzenie, czy komunikaty o błędach zostały wyczyszczone
    expect(screen.queryByText('Author name is required')).not.toBeInTheDocument();
    expect(screen.queryByText('Message is required')).not.toBeInTheDocument();
  });
});
