// Change Log: No changes.
import { render, screen } from '@testing-library/react';
import Home from '../app/page';

test('renders homepage', () => {
  render(<Home />);
  expect(screen.getByText('Robot Marketplace')).toBeInTheDocument();
});