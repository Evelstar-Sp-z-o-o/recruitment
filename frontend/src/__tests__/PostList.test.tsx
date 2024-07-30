import { Provider } from 'react-redux';
import { useDispatch } from 'react-redux';

import { describe, it, expect, vi, beforeEach } from 'vitest';

import PostList from '@/src/components/PostList';
import { fetchPosts } from '@/src/redux/actions/posts';
import { RootState } from '@/src/redux/reducers';
import { Post as PostType } from '@/src/types';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { createTestStore } from './utils';

// Mockowanie akcji fetchPosts
vi.mock('@/src/redux/actions/posts', () => ({
  fetchPosts: vi.fn(),
}));

// Mockowanie komponentów podrzędnych
vi.mock('@/src/components/CreatePost', () => ({
  __esModule: true,
  default: () => <div>CreatePost Component</div>,
}));

vi.mock('@/src/components/Post', () => ({
  __esModule: true,
  default: ({ post }: { post: PostType }) => <div>{post.data.body}</div>,
}));

const mockPosts: PostType[] = [
  {
    id: 1,
    data: {
      author: 'John Doe',
      created: 1627812000,
      edited: 1627812000,
      body: 'First post',
      postId: 'dfg456',
    },
  },
  {
    id: 2,
    data: {
      author: 'Jane Doe',
      created: 1627912000,
      edited: 1627912000,
      body: 'Second post',
      postId: 'dfg456',
    },
  },
];

describe('PostList component', () => {
  let store: ReturnType<typeof createTestStore>;

  beforeEach(() => {
    store = createTestStore();

    // Ustawienie wstępnego stanu Redux
    store.dispatch = vi.fn();
    store.getState = () =>
      ({
        posts: {
          posts: mockPosts,
        },
      } as RootState);
  });

  it('dispatches fetchPosts on mount', () => {
    render(
      <Provider store={store}>
        <PostList />
      </Provider>,
    );

    // Sprawdzenie, czy fetchPosts zostało wywołane
    expect(store.dispatch).toHaveBeenCalledWith(fetchPosts());
  });

  it('renders CreatePost component', () => {
    render(
      <Provider store={store}>
        <PostList />
      </Provider>,
    );

    // Sprawdzenie, czy CreatePost jest renderowane
    expect(screen.getByText('CreatePost Component')).toBeInTheDocument();
  });

  it('renders list of posts in reverse order', () => {
    render(
      <Provider store={store}>
        <PostList />
      </Provider>,
    );

    // Sprawdzenie, czy posty są renderowane w odwrotnej kolejności
    const posts = screen.getAllByText(/post/i);
    // posts[0] to create post component
    expect(posts[1]).toHaveTextContent('Second post');
    expect(posts[2]).toHaveTextContent('First post');
  });
});
