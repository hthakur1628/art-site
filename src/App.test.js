import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Kunsthaus Canvas Bids', () => {
  render(<App />);
  const titleElement = screen.getByText(/Kunsthaus Canvas Bids/i);
  expect(titleElement).toBeInTheDocument();
});
