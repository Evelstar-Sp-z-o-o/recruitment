import { HttpResponse, http } from 'msw';
import { describe, it } from 'vitest';

import mockApiEndpoints from '@/src/infrastructure/mocks/mockApiEndpoints';
import renderWithAppProviders from '@/src/infrastructure/testUtils/renderWithAppProviders';
import server from '@/src/infrastructure/testUtils/server';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import '../../../infrastructure/testUtils/clearStoreCache';
import AddPostForm from './AddPostForm';

const setup = () => {
  renderWithAppProviders(<AddPostForm />);
};
describe('AddPostForm', () => {
  const setInput = async (inputValue: string) => {
    const input = screen.getByTestId('post');
    fireEvent.change(input, { target: { value: inputValue } });
  };

  const clickAddButton = () => {
    const addButton = screen.getByTestId('addPostButton');
    userEvent.click(addButton);
  };

  beforeEach(() => {
    setup();
  });

  it('should display success message when request is successful after adding a post', async () => {
    server.use(
      http.post(mockApiEndpoints.posts, () => {
        return new HttpResponse(null, { status: 200 });
      }),
    );

    await setInput('This is a post added by me.');

    clickAddButton();

    await waitFor(() => {
      expect(screen.getByText('Post added successfully!')).toBeVisible();
    });
  });

  it('should display error message when an error occurs after adding a post', async () => {
    server.use(
      http.post(mockApiEndpoints.posts, () => {
        return new HttpResponse(null, { status: 500 });
      }),
    );

    await setInput('This is a post added by me.');

    clickAddButton();

    await waitFor(() => {
      expect(screen.getByText('Failed to add post!')).toBeVisible();
    });
  });

  it('should display error message when post has less than 10 chars', async () => {
    server.use(
      http.post(mockApiEndpoints.posts, () => {
        return new HttpResponse(null, { status: 200 });
      }),
    );

    await setInput('Edit');

    clickAddButton();

    await waitFor(() => {
      expect(screen.getByTestId('errorAlert')).toBeVisible();
    });
  });
});
