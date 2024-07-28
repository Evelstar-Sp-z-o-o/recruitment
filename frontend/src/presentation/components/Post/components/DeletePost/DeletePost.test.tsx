import { HttpResponse, http } from 'msw';
import { describe, it } from 'vitest';

import mockApiEndpoints from '@/src/infrastructure/mocks/mockApiEndpoints';
import renderWithAppProviders from '@/src/infrastructure/testUtils/renderWithAppProviders';
import server from '@/src/infrastructure/testUtils/server';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import '../../../../../infrastructure/testUtils/clearStoreCache';
import DeletePost from './DeletePost';

const setup = () => {
  renderWithAppProviders(<DeletePost id={1} />);
};
describe('DeletePost', () => {
  const clickDeleteButton = () => {
    const deleteButton = screen.getByTestId('deleteButton');
    userEvent.click(deleteButton);
  };

  beforeEach(() => {
    setup();
  });
  it('should display success message when is success after deleting a post', async () => {
    server.use(
      http.delete(mockApiEndpoints.post, () => {
        return HttpResponse.json({ status: 200 });
      }),
    );

    clickDeleteButton();

    await waitFor(() => {
      expect(screen.getByText('Post deleted successfully!')).toBeVisible();
    });
  });
  it('should display error message when an error occurs after deleting a post', async () => {
    server.use(
      http.get(mockApiEndpoints.posts, () => {
        return new HttpResponse(null, { status: 500 });
      }),
    );

    clickDeleteButton();

    await waitFor(() => {
      expect(screen.getByText('Failed to delete post!')).toBeVisible();
    });
  });
});
