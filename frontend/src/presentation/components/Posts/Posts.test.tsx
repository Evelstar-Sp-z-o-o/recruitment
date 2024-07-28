import { HttpResponse, http } from 'msw';
import { describe, it } from 'vitest';

import mockApiEndpoints from '@/src/infrastructure/mocks/mockApiEndpoints';
import { mockPosts } from '@/src/infrastructure/mocks/posts';
import renderWithAppProviders from '@/src/infrastructure/testUtils/renderWithAppProviders';
import server from '@/src/infrastructure/testUtils/server';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import '../../../infrastructure/testUtils/clearStoreCache';
import Posts from './Posts';

const setup = () => {
  renderWithAppProviders(<Posts />);
};
describe('Posts', () => {
  it('should display components with posts', async () => {
    setup();

    server.use(
      http.get(mockApiEndpoints.posts, () => {
        return HttpResponse.json(mockPosts, { status: 200 });
      }),
    );

    await waitFor(() => {
      expect(screen.getByTestId('posts')).toBeVisible();
    });
  });
  it('should display two posts', async () => {
    setup();

    server.use(
      http.get(mockApiEndpoints.posts, () => {
        return HttpResponse.json(mockPosts, { status: 200 });
      }),
    );

    await waitFor(() => {
      expect(screen.getAllByTestId('post').length).toBe(2);
    });
  });
  it('should display loaders when data is loading', () => {
    setup();

    server.use(
      http.get(mockApiEndpoints.posts, () => {
        return HttpResponse.json(mockPosts, { status: 200 });
      }),
    );

    expect(screen.getAllByTestId('loader')[0]).toBeVisible();
    expect(screen.getAllByTestId('loader').length).toBe(5);
  });
  it('should display error when an error occurs', async () => {
    setup();

    server.use(
      http.get(mockApiEndpoints.posts, () => {
        return new HttpResponse(null, { status: 500 });
      }),
    );

    await waitFor(() => {
      expect(screen.getByTestId('errorBoundary')).toBeVisible();
    });
  });
  it('should delete post successfully', async () => {
    setup();

    server.use(
      http.get(mockApiEndpoints.posts, () => {
        return HttpResponse.json(mockPosts, { status: 200 });
      }),
    );

    await waitFor(() => {
      const deleteButton = screen.getAllByTestId('deleteButton');
      userEvent.click(deleteButton[0]);
      expect(screen.getAllByTestId('post').length).toBe(1);
    });
  });
});
