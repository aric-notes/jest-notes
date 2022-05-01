import { render, screen } from '@testing-library/react';
import { Btn } from './btn';

test('btn should have hi text', () => {
  render(<Btn />);
  // screen.debug();
  expect(screen.getByText('hi')).toBeInTheDocument();
  expect(screen.getByText('hi')).toBeVisible();
  expect(screen.getByRole('button')).toHaveTextContent('hi');
});


test.only('btn snapshot test', () => {
  const { container } = render(<Btn />);
  expect(container).toMatchInlineSnapshot();
});