import { HttpResponse, http } from 'msw';
import { describe, it } from 'vitest';

import mockApiEndpoints from '@/src/infrastructure/mocks/mockApiEndpoints';
import { mockPosts } from '@/src/infrastructure/mocks/posts';
import renderWithAppProviders from '@/src/infrastructure/testUtils/renderWithAppProviders';
import server from '@/src/infrastructure/testUtils/server';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import '../../../../../infrastructure/testUtils/clearStoreCache';
import EditPost from './EditPost';

const setup = () => {
  renderWithAppProviders(<EditPost post={mockPosts[0]} />);
};
describe('EditPost', () => {
  const openEditModalAndSetInput = async (inputValue: string) => {
    const openEditButton = screen.getByTestId('openEditButton');
    userEvent.click(openEditButton);

    await waitFor(() => {
      expect(screen.getByTestId('editModal')).toBeVisible();
    });

    const input = screen.getByTestId('inputController');
    fireEvent.change(input, { target: { value: inputValue } });
  };

  const clickEditButton = () => {
    const editButton = screen.getByTestId('editButton');
    userEvent.click(editButton);
  };

  beforeEach(() => {
    setup();
  });

  it('should display modal with edit form after clicking the edit button', async () => {
    const openEditButton = screen.getByTestId('openEditButton');
    userEvent.click(openEditButton);

    await waitFor(() => {
      expect(screen.getByTestId('editModal')).toBeVisible();
    });
  });

  it('should display success message when request is successful after editing a post', async () => {
    server.use(
      http.put(mockApiEndpoints.post, () => {
        return new HttpResponse(null, { status: 200 });
      }),
    );

    await openEditModalAndSetInput('This is a post edited by me.');

    clickEditButton();

    await waitFor(() => {
      expect(screen.getByText('Post edited successfully!')).toBeVisible();
    });
  });

  it('should display error message when an error occurs after editing a post', async () => {
    server.use(
      http.put(mockApiEndpoints.post, () => {
        return new HttpResponse(null, { status: 500 });
      }),
    );

    await openEditModalAndSetInput('This is a post edited by me.');

    clickEditButton();

    await waitFor(() => {
      expect(screen.getByText('Failed to edit post!')).toBeVisible();
    });
  });

  it('should display error message when post has less than 10 chars', async () => {
    server.use(
      http.put(mockApiEndpoints.post, () => {
        return new HttpResponse(null, { status: 200 });
      }),
    );

    await openEditModalAndSetInput('Edit');

    clickEditButton();

    await waitFor(() => {
      expect(screen.getByTestId('errorAlert')).toBeVisible();
    });
  });
});
