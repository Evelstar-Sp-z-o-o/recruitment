import Home from '@/src/pages/Home';
import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Home Component', () => {
  test('renders loading state initially', () => {
    const { container } = render(<Home />);
    const loader = container.querySelector('.MuiCircularProgress-root');
    expect(loader).toBeInTheDocument();
  });
  test('renders posts when data is loaded', async () => {
    render(<Home />);

    const posts = await screen.findAllByText(/Post/i);
    expect(posts).toHaveLength(3);
  });
  test('changes sort option when clicked', async () => {
    render(<Home />);

    const user = userEvent.setup();

    const latestBox = await screen.findByTestId('latest-box');
    const popularBox = await screen.findByTestId('popular-box');

    await waitFor(() => {
      expect(latestBox).toHaveStyle('background-color: #028391');
    });

    await user.click(popularBox);
    expect(latestBox).toHaveStyle('background-color: rgb(211, 211, 211)');
    expect(popularBox).toHaveStyle('background-color: #028391');
  });
});
