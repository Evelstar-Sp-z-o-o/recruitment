import { HttpResponse, http } from 'msw';
import { describe, it } from 'vitest';

import mockApiEndpoints from '@/src/infrastructure/mocks/mockApiEndpoints';
import { mockPosts } from '@/src/infrastructure/mocks/posts';
import renderWithAppProviders from '@/src/infrastructure/testUtils/renderWithAppProviders';
import server from '@/src/infrastructure/testUtils/server';
import { act, fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import '../../../infrastructure/testUtils/clearStoreCache';
import Dashboard from './Dashboard';

const setup = () => {
  renderWithAppProviders(<Dashboard />);
};

describe('Dashboard', () => {
  it('should add post successfully', async () => {
    setup();

    server.use(
      http.get(mockApiEndpoints.posts, () => {
        return HttpResponse.json(mockPosts, { status: 200 });
      }),
    );

    server.use(
      http.post(mockApiEndpoints.posts, () => {
        return HttpResponse.json(
          { data: { author: 'Joe Doe', created: Date.now(), edited: null, postId: 'asdF' } },
          { status: 200 },
        );
      }),
    );

    const addButton = screen.getByTestId('addPostButton');

    const input = screen.getByTestId('inputController');
    fireEvent.change(input, { target: { value: 'This is a new post added.' } });

    userEvent.click(addButton);

    await waitFor(() => {
      expect(screen.getAllByTestId('post').length).toBe(3);
    });
  });
});
