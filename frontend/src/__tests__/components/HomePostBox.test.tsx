import { vi } from 'vitest';

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import HomePostBox from '../../components/posts/HomePostBox';
import { mockPost, mockPostLiked } from '../mocks/mockData';

test('changes icon color to blue and increases number of likes when clicked', async () => {
  // Mocking fetch
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    json: () =>
      Promise.resolve({
        data: { ...mockPost, numberOfLikes: mockPost.numberOfLikes + 1, likes: ['haniakim'] },
        id: mockPost.id,
      }),
  });

  render(<HomePostBox post={mockPost} onUpdate={vi.fn()} />);
  const user = userEvent.setup();

  const likeButton = screen.getByTestId('thumbUpIcon');
  const numberOfLikes = screen.getByTestId('numOfLikes');

  // Check initial status
  expect(likeButton).toHaveStyle('color:rgb(128, 128, 128)');
  expect(numberOfLikes).toHaveTextContent(`${mockPost.numberOfLikes} Likes`);

  // Click like button
  await user.click(likeButton);

  // Check changes after click
  await waitFor(() => {
    const increasedLikes = mockPost.numberOfLikes + 1;
    expect(screen.getByTestId('thumbUpIcon')).toHaveStyle('color: rgb(30, 144, 255)');
    expect(numberOfLikes).toHaveTextContent(`${increasedLikes} Likes`);
  });
});

test('changes icon color to gray and decreases number of likes when clicked', async () => {
  // Mocking fetch
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    json: () =>
      Promise.resolve({
        data: { ...mockPostLiked, numberOfLikes: mockPostLiked.numberOfLikes - 1, likes: [] },
        id: mockPostLiked.id,
      }),
  });

  render(<HomePostBox post={mockPostLiked} onUpdate={vi.fn()} />);
  const user = userEvent.setup();

  const likeButton = screen.getByTestId('thumbUpIcon');
  const numberOfLikes = screen.getByTestId('numOfLikes');

  // Check initial status
  expect(likeButton).toHaveStyle('color: rgb(30, 144, 255)');
  expect(numberOfLikes).toHaveTextContent(`${mockPostLiked.numberOfLikes} Likes`);

  // Click like button
  await user.click(likeButton);

  // Check changes after click
  await waitFor(() => {
    const increasedLikes = mockPostLiked.numberOfLikes - 1;
    expect(screen.getByTestId('thumbUpIcon')).toHaveStyle('color:rgb(128, 128, 128)');
    expect(numberOfLikes).toHaveTextContent(`${increasedLikes} Like`);
  });
});
