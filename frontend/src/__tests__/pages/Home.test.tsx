import Home from '@/src/pages/Home';
import { render, screen } from '@testing-library/react';

test('posts are rendered after fetching', async () => {
  const { container } = render(<Home />);

  const loader = container.querySelector('.MuiCircularProgress-circle');
  expect(loader).toBeInTheDocument();

  await screen.findByText('Post 1');
  expect(screen.getByText('Post2')).toBeInTheDocument();
  expect(screen.getByText('Post3')).toBeInTheDocument();
});
