import { vi } from 'vitest';

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import HomePostBox from '../../components/posts/HomePostBox';
import { mockPost } from '../mocks/mockData';

test('updates color and number of likes when clicked', async () => {
  render(<HomePostBox post={mockPost} onUpdate={vi.fn()} />);
  const user = userEvent.setup();

  const likeButton = screen.getByTestId('ThumbUpIcon');
  const numberOfLikes = screen.getByTestId('numOfLikes');

  // Check initial status
  expect(likeButton).toHaveStyle('color:rgb(128, 128, 128)');
  expect(numberOfLikes).toHaveTextContent(`${mockPost.numberOfLikes} Likes`);

  // Click like button
  await user.click(likeButton);

  // Check changes after click
  await waitFor(() => {
    const increasedLikes = mockPost.numberOfLikes + 1;
    expect(likeButton).toHaveStyle('color: rgb(30, 144, 255)');
    expect(numberOfLikes).toHaveTextContent(`${increasedLikes} Likes`);
  });
});
