import { logRoles, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import HomePostBox from '../../../components/posts/HomePostBox';
import { mockPost } from '../../mocks/mockData';

test('updates color and number of likes when clicked', async () => {
  const { container } = render(<HomePostBox post={mockPost} />);
  const user = userEvent.setup();

  const likeButton = await screen.findByTestId('ThumbUpIcon');
  const numberOfLikes = screen.getByTestId('numOfLikes');

  // Check initial status
  expect(likeButton).toHaveStyle('color:rgb(128, 128, 128)');
  expect(numberOfLikes).toHaveTextContent(`${mockPost.numberOfLikes} Likes`);

  // Click like button
  await user.click(likeButton);
  logRoles(container);

  const increasedLikes = mockPost.numberOfLikes + 1;

  // Check changes after click
  expect(likeButton).toHaveStyle('color: rgb(30, 144, 255)');
  expect(numberOfLikes).toHaveTextContent(`${increasedLikes} Likes`);
});
