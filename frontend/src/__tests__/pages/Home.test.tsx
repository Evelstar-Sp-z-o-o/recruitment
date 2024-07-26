import Home from '@/src/pages/Home';
import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Home page functionality', () => {
  test('renders loading state initially', () => {
    const { container } = render(<Home />);
    const loader = container.querySelector('.MuiCircularProgress-root');

    // Check if loader appears when page is mounting
    expect(loader).toBeInTheDocument();
  });
  test('renders posts when data is loaded', async () => {
    render(<Home />);

    const posts = await screen.findAllByText(/Post/i);

    // Check if all posts are rendered
    expect(posts).toHaveLength(3);
  });
  test('changes sort option when clicked', async () => {
    render(<Home />);

    const user = userEvent.setup();

    const latestBox = await screen.findByTestId('latest-box');
    const popularBox = await screen.findByTestId('popular-box');

    // Check initial color of the latest box
    await waitFor(() => {
      expect(latestBox).toHaveStyle('background-color: #028391');
    });

    // Click popular box
    await user.click(popularBox);

    // Check if colors of both boxes are changed
    expect(latestBox).toHaveStyle('background-color: rgb(211, 211, 211)');
    expect(popularBox).toHaveStyle('background-color: #028391');
  });
});
