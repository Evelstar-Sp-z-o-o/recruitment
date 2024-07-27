import { vi } from 'vitest';

import Home from '@/src/pages/Home';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { mockPosts } from '../mocks/mockData';

describe('Home page functionality', () => {
  test('renders posts when data is loaded', () => {
    render(<Home posts={mockPosts} editPost={vi.fn()} />);

    const posts = screen.getAllByTestId('post-box');

    // Check if all posts are rendered
    expect(posts).toHaveLength(3);
  });

  test('changes sort option when clicked', async () => {
    render(<Home posts={mockPosts} editPost={vi.fn()} />);

    const user = userEvent.setup();

    const latestBox = screen.getByTestId('latest-box');
    const popularBox = screen.getByTestId('popular-box');

    // Check initial color of the latest box
    expect(latestBox).toHaveStyle('background-color: #028391');

    // Click popular box
    await user.click(popularBox);

    // Check if colors of both boxes are changed
    expect(latestBox).toHaveStyle('background-color: rgb(211, 211, 211)');
    expect(popularBox).toHaveStyle('background-color: #028391');
  });
});
