import { Provider } from 'react-redux';

import { describe, it, expect, vi } from 'vitest';

import Post from '@/src/components/Post';
import { Post as PostType } from '@/src/types';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import { createTestStore } from './utils';

// Mockowane akcje Redux
vi.mock('@/src/redux/actions/posts', () => ({
  deletePost: (id: string) => ({ type: 'DELETE_POST', payload: id }),
}));

// Mockowanie useNavigate
vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useNavigate: () => vi.fn(),
}));

const mockPost: PostType = {
  id: 1,
  data: {
    author: 'John Doe',
    created: 1627812000,
    edited: 1627812000,
    body: 'This is a test post',
    postId: 'dfg456',
  },
};

describe('Post component', () => {
  it('renders post details correctly', () => {
    render(
      <Provider store={createTestStore()}>
        <Post post={mockPost} />
      </Provider>,
    );

    // Sprawdza, czy autor jest poprawnie wyświetlany
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('@john')).toBeInTheDocument();
    expect(screen.getByText('This is a test post')).toBeInTheDocument();
  });

  it('opens and closes delete confirmation dialog', () => {
    render(
      <Provider store={createTestStore()}>
        <Post post={mockPost} />
      </Provider>,
    );

    // Sprawdza, czy dialog nie jest otwarty na początku
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    // Kliknięcie przycisku "Delete"
    fireEvent.click(screen.getByText('Delete'));

    // Sprawdza, czy dialog jest otwarty
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    // Kliknięcie przycisku zamknięcia dialogu
    fireEvent.click(screen.getByText('Cancel'));

    // Sprawdza, czy dialog jest zamknięty
    waitFor(async () => {
      expect(await screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  it('dispatches deletePost action on confirm delete', async () => {
    render(
      <Provider store={createTestStore()}>
        <Post post={mockPost} />
      </Provider>,
    );

    // Kliknięcie przycisku "Delete"
    fireEvent.click(screen.getByText('Delete'));

    // Kliknięcie przycisku potwierdzenia usunięcia
    fireEvent.click(screen.getByText('Confirm'));

    // Sprawdzenie powiadomienia
    await waitFor(() => {
      expect(screen.getByText('Successfully deleted post!')).toBeInTheDocument();
    });
  });
});
