import { render, screen } from '@testing-library/react';
import { Btn } from './btn';

test('btn should have hi text', () => {
  render(<Btn />);
  // screen.debug();
  expect(screen.getByRole('button')).toHaveTextContent('hi');
});

test('btn snapshot test without props', () => {
  const { container } = render(<Btn />);
  expect(container).toMatchSnapshot();
});

test('btn snapshot test with props', () => {
  const { container } = render(<Btn hidden={false} disabled />);
  expect(container).toMatchSnapshot();
});